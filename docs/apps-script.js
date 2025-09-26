// ------------------- CONFIGURACIÓN -------------------
// 1. Reemplaza esta URL con la URL de tu hoja de cálculo de Google.
const SPREADSHEET_URL = "URL_DE_TU_HOJA_DE_CALCULO"; 

// 2. Define los nombres de las hojas que usarás. Deben coincidir EXACTAMENTE.
const SHEET_NAMES = {
  USERS: "USUARIOS",
  DATA: "DATA",
  MISSIONS: "Misiones",
  LEVELS: "Niveles",
  AVATARS: "Avatares",
  PLACEHOLDERS: "PlaceholderImages"
};
// -----------------------------------------------------


// --- NO EDITAR DEBAJO DE ESTA LÍNEA ---

const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);

/**
 * Función principal que maneja las peticiones POST y GET.
 * Actúa como un enrutador basado en el parámetro 'action'.
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action || 'getData'; // 'getData' es la acción por defecto

    switch (action) {
      case 'register':
        return handleRegister(requestData);
      case 'login':
        return handleLogin(requestData);
      case 'getData':
        return handleGetData(requestData);
      default:
        return createJsonResponse({ error: true, message: "Acción no reconocida." });
    }
  } catch (error) {
    return createJsonResponse({ error: true, message: `Error en el servidor: ${error.toString()}` });
  }
}

function doGet(e) {
    // Para simplificar, hacemos que GET se comporte como un POST con action=getData
    return handleGetData(e.parameter);
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
  const userExists = usersData.some(row => row['Correo'] && row['Correo'].toString().toLowerCase() === email.toLowerCase());

  if (userExists) {
    return createJsonResponse({ error: true, message: "El correo electrónico ya está registrado." });
  }

  // Valores por defecto para un nuevo usuario
  const newAvatar = 'Explorador';
  const newLevel = 1;
  const newScore = 0;

  // Añadir al a hoja USUARIOS
  usersSheet.appendRow([name, email, password, newAvatar, newLevel, newScore]);
  
  // Añadir también a la hoja DATA para el ranking
  const dataSheet = spreadsheet.getSheetByName(SHEET_NAMES.DATA);
  if (dataSheet) {
      dataSheet.appendRow([name, email, 'No especificado', newScore, newLevel, newAvatar]);
  }

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
    row['Correo'] && row['Correo'].toString().toLowerCase() === email.toLowerCase() &&
    row['Contraseña'] && row['Contraseña'].toString() === password
  );

  if (!userRow) {
    return createJsonResponse({ error: true, message: "Credenciales inválidas." });
  }
  
  const userData = {
      id: userRow['Correo'], // Usamos el correo como ID único
      name: userRow['Nombre'],
      email: userRow['Correo'],
      level: parseInt(userRow['Nivel'], 10),
      xp: parseInt(userRow['Puntaje'], 10),
      avatar: userRow['Avatar']
  };

  return createJsonResponse({ success: true, user: userData });
}

/**
 * Obtiene todos los datos necesarios para la aplicación.
 */
function handleGetData(params) {
  try {
    const data = {
      users: getSheetData(spreadsheet.getSheetByName(SHEET_NAMES.DATA)),
      tasks: getSheetData(spreadsheet.getSheetByName(SHEET_NAMES.MISSIONS)),
      levels: getSheetData(spreadsheet.getSheetByName(SHEET_NAMES.LEVELS)),
      avatars: getSheetData(spreadsheet.getSheetByName(SHEET_NAMES.AVATARS)),
      placeholderImages: getSheetData(spreadsheet.getSheetByName(SHEET_NAMES.PLACEHOLDERS)),
      error: false
    };

    return createJsonResponse(data);
  } catch (error) {
    return createJsonResponse({ error: true, message: `No se pudieron obtener los datos: ${error.toString()}` });
  }
}


/**
 * Función de utilidad para convertir una hoja en un array de objetos.
 * Limpia los encabezados de espacios en blanco.
 */
function getSheetData(sheet) {
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];
  
  const headers = rows.shift().map(header => header.toString().trim());
  
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
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
