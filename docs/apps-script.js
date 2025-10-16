// ------------------- CONFIGURACIÓN -------------------
// 1. Reemplaza esta URL con la URL de tu hoja de cálculo de Google.
const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/10t2ToIlBben3d-IN9P3g-k5wu5hGRzlo1Tg2ch-4Xo4/edit#gid=1042210733"; 

// 2. Define los nombres de las hojas que usarás. Deben coincidir EXACTAMENTE.
const SHEET_NAMES = {
  USERS: "USUARIOS",
  DATA: "DATA",
  CANJES: "Canjes" // Nueva hoja para registrar canjes
};
// -----------------------------------------------------


// --- NO EDITAR DEBAJO DE ESTA LÍNEA ---

const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);

/**
 * Función para manejar las peticiones OPTIONS (preflight de CORS).
 * Esto es CRUCIAL para que las peticiones desde el cliente funcionen.
 */
function doOptions(e) {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .withHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
}


/**
 * Crea una respuesta JSON estándar con las cabeceras CORS correctas.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .withHeaders({ 'Access-Control-Allow-Origin': '*' });
}


/**
 * Función principal que maneja las peticiones POST.
 */
function doPost(e) {
  let requestData;
  try {
    if (e.postData && e.postData.contents) {
        requestData = JSON.parse(e.postData.contents);
    } else {
        requestData = e.parameter;
    }
  } catch (error) {
    return createJsonResponse({ error: true, message: `Petición inválida. Se esperaba un JSON. Contenido recibido: ${e.postData ? e.postData.contents : 'ninguno'}` });
  }

  try {
    const action = requestData.action;

    switch (action) {
      case 'register':
        return handleRegister(requestData);
      case 'login':
        return handleLogin(requestData);
      case 'getData':
        return handleGetData(requestData);
      case 'registerPurchase':
        return handleRegisterPurchase(requestData);
      default:
        return createJsonResponse({ error: true, message: "Acción no reconocida." });
    }
  } catch (error) {
    Logger.log(`Error en doPost: ${error.toString()}\nStack: ${error.stack}`);
    return createJsonResponse({ error: true, message: `Error en el servidor: ${error.toString()}` });
  }
}

/**
 * La función doGet se mantiene para pruebas, pero la lógica principal se centraliza en doPost.
 */
function doGet(e) {
    if (e.parameter && e.parameter.action === 'getData') {
        return handleGetData(e.parameter);
    }
    return createJsonResponse({ info: "El script está activo. Usa peticiones POST con una acción válida." });
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

  const dataSheet = spreadsheet.getSheetByName(SHEET_NAMES.DATA);
  if (dataSheet) {
      dataSheet.appendRow([name, email, 'No especificado', 0, 1, 'Explorador']);
  }

  return createJsonResponse({ success: true, message: "Usuario registrado exitosamente." });
}

/**
 * Maneja el registro de una nueva compra/canje.
 */
function handleRegisterPurchase(data) {
  const { userId, prizeId, prizeName, cost } = data;
  if (!userId || !prizeId || !prizeName || cost === undefined) {
    return createJsonResponse({ error: true, message: "Faltan datos para registrar el canje." });
  }

  const canjesSheet = spreadsheet.getSheetByName(SHEET_NAMES.CANJES);
  if (!canjesSheet) {
    return createJsonResponse({ error: true, message: `La hoja "${SHEET_NAMES.CANJES}" no fue encontrada.` });
  }
  
  try {
    const idCanje = new Date().getTime(); // ID único basado en timestamp
    const fecha = new Date();

    // idCanje, correoUsuario, idPremio, nombrePremio, costo, fecha
    canjesSheet.appendRow([idCanje, userId, prizeId, prizeName, cost, fecha]);

    return createJsonResponse({ success: true, message: "Canje registrado exitosamente." });
  } catch (error) {
     Logger.log(`Error en handleRegisterPurchase: ${error.toString()}\nStack: ${error.stack}`);
     return createJsonResponse({ error: true, message: `No se pudo registrar el canje: ${error.toString()}` });
  }
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
  
  const dataSheet = spreadsheet.getSheetByName(SHEET_NAMES.DATA);
  let publicData = { avatar: 'Explorador', xp: 0, level: 1 }; // Valores por defecto

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
 * Es más robusta para manejar hojas vacías o con solo cabeceras.
 */
function getSheetData(sheet) {
  if (!sheet) return [];
  const range = sheet.getDataRange();
  if (range.getNumRows() < 2) return [];

  const values = range.getValues();
  const headers = values.shift().map(header => header.toString().trim().toLowerCase());
  
  return values.map(row => {
    const rowData = {};
    headers.forEach((header, index) => {
      if(header){
        rowData[header] = row[index];
      }
    });
    return rowData;
  });
}

/**
 * Igual que getSheetData, pero incluye el índice de la fila original.
 */
function getSheetDataWithRowIndex(sheet) {
  if (!sheet) return [];
  const range = sheet.getDataRange();
  if (range.getNumRows() < 2) return [];

  const values = range.getValues();
  const headers = values.shift().map(header => header.toString().trim().toLowerCase());
  
  return values.map((row, rowIndex) => {
    const rowData = {};
    headers.forEach((header, index) => {
      if(header){
        rowData[header] = row[index];
      }
    });
    // El índice de la fila en la hoja es rowIndex + 2 (1 por el header, 1 porque es 0-indexed)
    return { rowIndex: rowIndex + 2, data: rowData };
  });
}
