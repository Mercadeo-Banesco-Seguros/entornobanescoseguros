// apps-script.gs

// --- CONFIGURATION ---
const USERS_SHEET_NAME = "Users";
const ACCESS_LOGS_SHEET_NAME = "Access Logs";
const CALENDAR_EVENTS_SHEET_NAME = "Calendar Events";
const MENU_SHEET_NAME = "Menu";

// --- MAIN ROUTER ---
function doPost(e) {
  let responseData;
  let action;

  try {
    // Manejamos el envío como text/plain desde el portal
    const payload = JSON.parse(e.postData.contents);
    action = payload.action;

    switch (action) {
      case 'login':
        responseData = handleLogin(payload);
        break;
      case 'getCalendarEvents':
        responseData = { success: true, data: getCalendarEventsFromSheet() };
        break;
      case 'getMenuItems':
        responseData = { success: true, data: getMenuItemsFromSheet() };
        break;
      default:
        responseData = { success: false, message: `Unknown action: ${action}` };
    }
  } catch (error) {
    responseData = { success: false, message: `Server error: ${error.toString()}` };
  }

  // Devolvemos como TEXT para evitar problemas de CORS en redirecciones de Google
  return ContentService
    .createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.TEXT);
}

// Para pruebas rápidas en navegador
function doGet(e) {
  return ContentService.createTextOutput("El script está ACTIVO y listo para recibir peticiones POST.")
    .setMimeType(ContentService.MimeType.TEXT);
}

// --- ACTION HANDLERS ---
function handleLogin(payload) {
  if (!payload.email || !payload.password) {
    return { success: false, message: "Correo y contraseña (cédula) son requeridos." };
  }
  return loginUser(payload.email, payload.password);
}

// --- CORE FUNCTIONS ---
function loginUser(email, password) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(USERS_SHEET_NAME);
    if (!sheet) return { success: false, message: "Hoja 'Users' no encontrada." };
    
    const data = sheet.getDataRange().getValues();
    const emailLower = email.toString().toLowerCase().trim();
    const passStr = password.toString().trim();

    for (let i = 1; i < data.length; i++) {
      const sheetEmail = data[i][0] ? data[i][0].toString().toLowerCase().trim() : "";
      const sheetPass = data[i][1] ? data[i][1].toString().trim() : "";

      if (sheetEmail === emailLower && sheetPass === passStr) {
        logAccess(email, "login", "success");
        return { success: true, message: "Login successful." };
      }
    }
    
    logAccess(email, "login", "failure");
    return { success: false, message: "Cédula o correo incorrectos." };
  } catch (e) {
    return { success: false, message: "Error de base de datos: " + e.toString() };
  }
}

function logAccess(email, type, status) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ACCESS_LOGS_SHEET_NAME);
    if (sheet) sheet.appendRow([new Date(), email, type, status]);
  } catch (e) {}
}

function getCalendarEventsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CALENDAR_EVENTS_SHEET_NAME);
  if (!sheet) return [];
  // Lógica de obtención simplificada...
  return [];
}

function getMenuItemsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MENU_SHEET_NAME);
  if (!sheet) return [];
  // Lógica de obtención simplificada...
  return [];
}