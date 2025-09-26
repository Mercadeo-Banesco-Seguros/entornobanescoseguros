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
 * Función principal que maneja las peticiones POST para compatibilidad con el proxy y el sitio estático.
 */
function doPost(e) {
  let requestData;
  try {
    // Parsea el cuerpo de la petición que viene como un string JSON.
    requestData = JSON.parse(e.postData.contents);
  } catch (error) {
    return createJsonResponse({ error: true, message: "Petición inválida. Se esperaba un JSON." });
  }

  try {
    const action = requestData.action;

    switch (action) {
      case 'register':
        return handleRegister(requestData);
      case 'login':
        return handleLogin(requestData);
      case 'getData':
         // Se maneja getData vía POST para consistencia del proxy.
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
 * La función doGet se mantiene para pruebas directas de la URL.
 * El frontend no la usará directamente.
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
  
  // Añade el nuevo usuario a la hoja USUARIOS
  usersSheet.appendRow([name, email, password, 'Explorador', 1, 0]);

  // También añade el usuario a la hoja DATA para el ranking
  const dataSheet = spreadsheet.getSheetByName(SHEET_NAMES.DATA);
  if (dataSheet) {
      dataSheet.appendRow([name, email, 'No especificado', 0, 1, 'Explorador']);
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
    row['correo'] && row['correo'].toString().toLowerCase() === email.toLowerCase() &&
    row['contraseña'] && row['contraseña'].toString() === password
  );

  if (!userRow) {
    return createJsonResponse({ error: true, message: "Credenciales inválidas." });
  }
  
  // Se obtiene la información pública del usuario desde la hoja DATA para asegurar consistencia.
  const dataSheet = spreadsheet.getSheetByName(SHEET_NAMES.DATA);
  let publicData = { avatar: 'Explorador', xp: 0, level: 1 }; // Default values

  if(dataSheet) {
    const dataUsers = getSheetData(dataSheet);
    const publicUserRow = dataUsers.find(u => u['correo'] && u['correo'].toString().toLowerCase() === email.toLowerCase());
    if(publicUserRow) {
      publicData.avatar = publicUserRow['avatar'] || 'Explorador';
      publicData.xp = parseInt(publicUserRow['puntaje'], 10) || 0;
      publicData.level = parseInt(publicUserRow['nivel'], 10) || 1;
    }
  }


  const userData = {
      id: userRow['correo'],
      name: userRow['nombre'],
      email: userRow['correo'],
      level: publicData.level,
      xp: publicData.xp,
      avatar: publicData.avatar
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
 * Los encabezados se convierten a minúsculas para consistencia.
 */
function getSheetData(sheet) {
  if (!sheet) return [];
  const range = sheet.getDataRange();
  // Comienza desde la fila 2 si hay encabezados
  if (range.getNumRows() < 2) return [];

  const rows = range.getValues();
  const headers = rows.shift().map(header => header.toString().trim().toLowerCase());
  
  return rows.map(row => {
    const rowData = {};
    headers.forEach((header, index) => {
      // Asegurarse de que la propiedad del objeto exista antes de asignarla
      if(header){
        rowData[header] = row[index];
      }
    });
    return rowData;
  });
}


/**
 * Función de utilidad para crear una respuesta JSON estándar.
 * Esto asegura que todas las respuestas del script tengan el formato y header correctos.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
