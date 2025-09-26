// ------------------- CONFIGURACIÓN -------------------
// 1. Reemplaza esta URL con la URL de tu hoja de cálculo de Google.
const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1Xy_JDI2AXD503kS2Wg6Enm3fM_eBGN4d8G1F2q3x-pM/edit#gid=0"; 

// 2. Define los nombres de las hojas que usarás. Deben coincidir EXACTAMENTE.
const SHEET_NAMES = {
  USERS: "USUARIOS",
  DATA: "DATA"
};
// -----------------------------------------------------


// --- NO EDITAR DEBAJO DE ESTA LÍNEA ---

const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);

/**
 * Función principal que maneja las peticiones POST.
 */
function doPost(e) {
  try {
    // Parsea el cuerpo de la petición que viene como un string JSON.
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;

    switch (action) {
      case 'register':
        return handleRegister(requestData);
      case 'login':
        return handleLogin(requestData);
      case 'getData':
         // Aunque getData usualmente es GET, lo manejamos aquí por consistencia del proxy.
        return handleGetData(requestData);
      default:
        return createJsonResponse({ error: true, message: "Acción no reconocida." });
    }
  } catch (error) {
    Logger.log(`Error en doPost: ${error.toString()}\nStack: ${error.stack}`);
    return createJsonResponse({ error: true, message: `Error en el servidor: ${error.toString()}` });
  }
}

/**
 * La función doGet ahora se usa específicamente para peticiones GET simples.
 * El frontend estático no la usará, pero es bueno mantenerla por si se prueba la URL directamente.
 */
function doGet(e) {
    if (e.parameter && e.parameter.action === 'getData') {
        return handleGetData(e.parameter);
    }
    return createJsonResponse({ info: true, message: "El script está activo. Usa peticiones POST para interactuar." });
}


/**
 * Maneja el registro de un nuevo usuario.
 */
function handleRegister(data) {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    return createJsonResponse({ error: true, message: "Nombre, email y contraseña son requeridos." });
  }

  const usersSheet = spreadsheet.getSheetByName(SHEET_NAMES.USERS);
  if (!usersSheet) {
    return createJsonResponse({ error: true, message: `La hoja "${SHEET_NAMES.USERS}" no fue encontrada.` });
  }
  
  const usersData = getSheetData(usersSheet);
  const userExists = usersData.some(row => row['correo'] && row['correo'].toString().toLowerCase() === email.toLowerCase());

  if (userExists) {
    return createJsonResponse({ error: true, message: "El correo electrónico ya está registrado." });
  }
  
  usersSheet.appendRow([name, email, password, 'Explorador', 1, 0]);

  return createJsonResponse({ success: true, message: "Usuario registrado exitosamente." });
}


/**
 * Maneja el inicio de sesión de un usuario.
 */
function handleLogin(data) {
  const { email, password } = data;
  if (!email || !password) {
    return createJsonResponse({ error: true, message: "Email y contraseña son requeridos." });
  }

  const usersSheet = spreadsheet.getSheetByName(SHEET_NAMES.USERS);
  if (!usersSheet) {
    return createJsonResponse({ error: true, message: `La hoja "${SHEET_NAMES.USERS}" no fue encontrada.` });
  }
  
  const usersData = getSheetData(usersSheet);
  const userRow = usersData.find(row => 
    row['correo'] && row['correo'].toString().toLowerCase() === email.toLowerCase() &&
    row['contraseña'] && row['contraseña'].toString() === password
  );

  if (!userRow) {
    return createJsonResponse({ error: true, message: "Credenciales inválidas." });
  }
  
  const userData = {
      id: userRow['correo'],
      name: userRow['nombre'],
      email: userRow['correo'],
      level: parseInt(userRow['nivel'], 10) || 1,
      xp: parseInt(userRow['puntaje'], 10) || 0,
      avatar: userRow['avatar'] || 'Explorador'
  };

  return createJsonResponse({ success: true, user: userData });
}

/**
 * Obtiene los datos para el ranking desde la hoja DATA.
 */
function handleGetData(params) {
  try {
    const dataSheet = spreadsheet.getSheetByName(SHEET_NAMES.DATA);
    if (!dataSheet) {
        return createJsonResponse({ error: true, message: `La hoja "${SHEET_NAMES.DATA}" no fue encontrada.` });
    }
    const data = {
      users: getSheetData(dataSheet),
      error: false
    };

    return createJsonResponse(data);
  } catch (error) {
    return createJsonResponse({ error: true, message: `No se pudieron obtener los datos: ${error.toString()}` });
  }
}


/**
 * Función de utilidad para convertir una hoja en un array de objetos.
 */
function getSheetData(sheet) {
  if (!sheet) return [];
  const range = sheet.getDataRange();
  if (range.getNumRows() < 2) return [];

  const rows = range.getValues();
  const headers = rows.shift().map(header => header.toString().trim().toLowerCase());
  
  return rows.map(row => {
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = row[index];
    });
    return rowData;
  });
}


/**
 * Función de utilidad para crear una respuesta JSON estándar.
 */
function createJsonResponse(data) {
  return ContentService