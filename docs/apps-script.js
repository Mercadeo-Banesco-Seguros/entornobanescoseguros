// apps-script.gs

// --- CONFIGURACIÓN ---
const USERS_SHEET_NAME = "Users";
const ACCESS_LOGS_SHEET_NAME = "Access Logs";

// --- ENTRADA PRINCIPAL ---
function doPost(e) {
  let responseData;
  try {
    // Intentar parsear el JSON de la petición
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;

    if (action === 'login') {
      responseData = handleLogin(payload);
    } else {
      responseData = { success: false, message: "Acción no reconocida" };
    }
  } catch (error) {
    responseData = { success: false, message: "Error en el servidor: " + error.toString() };
  }

  // CRÍTICO PARA EVITAR ERROR DE CORS:
  // Usamos MimeType.TEXT en lugar de JSON. Google añade cabeceras CORS
  // automáticamente a las respuestas de tipo texto, pero no a las de tipo JSON.
  return ContentService
    .createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.TEXT);
}

// Para pruebas rápidas
function doGet(e) {
  return ContentService.createTextOutput("Servidor de Autenticación Activo")
    .setMimeType(ContentService.MimeType.TEXT);
}

// --- LÓGICA DE NEGOCIO ---
function handleLogin(payload) {
  const email = payload.email;
  const password = payload.password;

  if (!email || !password) {
    return { success: false, message: "Correo y contraseña son requeridos." };
  }

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(USERS_SHEET_NAME);
    
    if (!sheet) {
      return { success: false, message: "Error de base de datos: Hoja 'Users' no encontrada." };
    }

    const data = sheet.getDataRange().getValues();
    const emailLower = email.toString().toLowerCase().trim();
    const passStr = password.toString().trim();

    // Buscar usuario (omitimos cabecera en fila 1)
    for (let i = 1; i < data.length; i++) {
      const sheetEmail = data[i][0] ? data[i][0].toString().toLowerCase().trim() : "";
      const sheetPass = data[i][1] ? data[i][1].toString().trim() : "";

      if (sheetEmail === emailLower && sheetPass === passStr) {
        logAccess(email, "login", "success");
        return { success: true, message: "Acceso concedido" };
      }
    }

    logAccess(email, "login", "failure");
    return { success: false, message: "Credenciales incorrectas (Verifique su cédula)." };

  } catch (e) {
    return { success: false, message: "Error al acceder a Google Sheets: " + e.toString() };
  }
}

function logAccess(email, type, status) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ACCESS_LOGS_SHEET_NAME);
    if (sheet) {
      sheet.appendRow([new Date(), email, type, status]);
    }
  } catch (e) {
    console.error("No se pudo registrar el log: " + e.toString());
  }
}
