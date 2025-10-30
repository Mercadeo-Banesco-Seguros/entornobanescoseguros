// ------------------- CONFIGURACIÓN -------------------
// 1. Reemplaza esta URL con la URL de tu hoja de cálculo de Google.
const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1rRXSKOPScB4Wmmy1UrhRS4cIMBzMmx_xxtcl4yi81y4/edit#gid=0"; 

// 2. Define los nombres de las hojas que usarás. Deben coincidir EXACTAMENTE.
const SHEET_NAMES = {
  USERS: "USUARIOS",
};
// -----------------------------------------------------


// --- NO EDITAR DEBAJO DE ESTA LÍNEA ---

const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);

/**
 * Función para manejar las peticiones OPTIONS (preflight de CORS).
 * Esto es CRUCIAL para que las peticiones desde el cliente funcionen.
 */
function doOptions(e) {
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.withHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  return response;
}


/**
 * Crea una respuesta JSON estándar con las cabeceras CORS correctas.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .withHeaders({ 'Access-control-allow-origin': '*' });
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
        return createJsonResponse({ error: true, message: `Petición inválida. No se recibió contenido.` });
    }
  } catch (error) {
    return createJsonResponse({ error: true, message: `Petición inválida. Se esperaba un JSON. Contenido recibido: ${e.postData ? e.postData.contents : 'ninguno'}` });
  }

  try {
    const action = requestData.action;

    switch (action) {
      case 'login':
        return handleLogin(requestData);
      case 'getData':
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
 * La función doGet ahora simplemente redirige a doPost para consistencia,
 * pasando los parámetros de la URL como si fueran el cuerpo de la petición.
 */
function doGet(e) {
    if (e.parameter && e.parameter.action) {
      const mockPostData = {
          type: 'application/json',
          contents: JSON.stringify(e.parameter)
      };
      return doPost({ postData: mockPostData });
    }
    return createJsonResponse({ error: true, message: "Acción no especificada para GET." });
}

/**
 * Maneja el inicio de sesión de un usuario.
 */
function handleLogin(data) {
  const { username, password } = data;
  if (!username || !password) {
    return createJsonResponse({ error: true, message: "Usuario y contraseña son requeridos." });
  }

  const usersSheet = spreadsheet.getSheetByName(SHEET_NAMES.USERS);
  if (!usersSheet) {
    return createJsonResponse({ error: true, message: `La hoja "${SHEET_NAMES.USERS}" no fue encontrada.` });
  }
  
  const usersData = getSheetData(usersSheet);

  const userRow = usersData.find(row => 
    row['usuario'] && row['usuario'].toString().toLowerCase() === username.toLowerCase() &&
    row['contraseña'] && row['contraseña'].toString() === password
  );

  if (!userRow) {
    return createJsonResponse({ error: true, message: "Credenciales inválidas." });
  }
  
  const userData = {
      id: userRow['usuario'],
      name: userRow['nombre'],
      email: userRow['usuario'],
      vicepresidencia: userRow['vicepresidencia'],
      cargo: userRow['cargo'],
      avatar: userRow['premio_cat'],
      progreso: parseFloat(userRow['logro']) || 0,
      posicion: parseInt(userRow['posicion'], 10) || 0,
      xp: (parseFloat(userRow['logro']) || 0) * 100 
  };

  return createJsonResponse({ success: true, user: userData });
}

/**
 * Obtiene todos los datos de los usuarios desde la hoja USUARIOS.
 */
function handleGetData(params) {
  try {
    const dataSheet = spreadsheet.getSheetByName(SHEET_NAMES.USERS);
    if (!dataSheet) {
        return createJsonResponse({ error: true, message: `La hoja "${SHEET_NAMES.USERS}" no fue encontrada.` });
    }
    
    const users = getSheetData(dataSheet).map(u => ({
        id: u.usuario,
        name: u.nombre,
        email: u.usuario,
        vicepresidencia: u.vicepresidencia,
        cargo: u.cargo,
        avatar: u.premio_cat,
        progreso: parseFloat(u.logro) || 0,
        posicion: parseInt(u.posicion, 10) || 0,
        xp: (parseFloat(u.logro) || 0) * 100,
        level: 1 
    }));

    const data = {
      users: users,
      error: false
    };

    return createJsonResponse(data);
  } catch (error) {
    return createJsonResponse({ error: true, message: `No se pudieron obtener los datos: ${error.toString()}` });
  }
}


/**
 * Función de utilidad para convertir una hoja en un array de objetos.
 * Convierte los encabezados a minúsculas para un acceso consistente.
 */
function getSheetData(sheet) {
  if (!sheet) return [];
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  if (values.length < 2) return [];

  const headers = values[0].map(header => header.toString().trim().toLowerCase());
  
  return values.slice(1).map(row => {
    const rowData = {};
    headers.forEach((header, index) => {
      if(header){
        rowData[header] = row[index];
      }
    });
    return rowData;
  });
}
