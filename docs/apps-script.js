
// ------------------- CONFIGURACIÓN -------------------
// 1. Reemplaza esta URL con la URL de tu hoja de cálculo de Google.
const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1rRXSKOPScB4Wmmy1UrhRS4cIMBzMmx_xxtcl4yi81y4/edit"; 

// 2. Define los nombres de las hojas que usarás. Deben coincidir EXACTAMENTE.
const SHEET_NAMES = {
  USERS: "USUARIOS",
};
// -----------------------------------------------------


// --- NO EDITAR DEBAJO DE ESTA LÍNEA ---

/**
 * Crea una respuesta JSON estándar con las cabeceras CORS correctas.
 * (Versión segura sin encadenamiento de métodos)
 */
function createJsonResponse(data) {
  // 1. Crear el objeto de salida con el JSON
  var output = ContentService.createTextOutput(JSON.stringify(data));
  
  // 2. Establecer el tipo MIME
  output.setMimeType(ContentService.MimeType.JSON);
  
  // 3. Añadir la cabecera CORS
  output.addHeader('Access-Control-Allow-Origin', '*');
  
  // 4. Devolver el objeto configurado
  return output;
}

/**
 * Función principal que maneja las peticiones POST. Unifica toda la lógica.
 */
function doPost(e) {
  try {
    let requestData;
    try {
      if (!e || !e.postData || !e.postData.contents) {
        throw new Error("Petición inválida. No se recibió contenido (postData).");
      }
      requestData = JSON.parse(e.postData.contents);
    } catch (error) {
      Logger.log(`Error parseando JSON: ${error.message}. Contenido recibido: ${e.postData ? e.postData.contents : 'ninguno'}`);
      return createJsonResponse({ error: true, message: `Petición inválida. Se esperaba un JSON. Error: ${error.message}` });
    }

    if (!requestData || !requestData.action) {
      return createJsonResponse({ error: true, message: "Acción no reconocida o datos inválidos." });
    }
    
    const action = requestData.action;

    switch (action) {
      case 'login':
        return handleLogin(requestData);
      case 'getData':
        return handleGetData(requestData);
      default:
        return createJsonResponse({ error: true, message: `Acción no reconocida: "${action}"` });
    }
  } catch (error) {
    Logger.log(`Error crítico en el servidor de Apps Script: ${error.toString()}\nStack: ${error.stack}`);
    return createJsonResponse({ error: true, message: `Error interno en el servidor: ${error.toString()}` });
  }
}

/**
 * La función doGet ahora simplemente simula una petición POST.
 * Esto centraliza toda la lógica en doPost.
 */
function doGet(e) {
    const mockPostEvent = {
      postData: {
        contents: JSON.stringify(e.parameters),
        type: 'application/json'
      }
    };
    return doPost(mockPostEvent);
}

/**
 * Maneja el inicio de sesión de un usuario.
 */
function handleLogin(data) {
  const { username, password } = data;
  if (!username || !password) {
    return createJsonResponse({ error: true, message: "Usuario y contraseña son requeridos." });
  }

  const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  const usersSheet = spreadsheet.getSheetByName(SHEET_NAMES.USERS);
  if (!usersSheet) {
    throw new Error(`La hoja "${SHEET_NAMES.USERS}" no fue encontrada. Verifica la URL y el nombre de la hoja.`);
  }
  
  const usersData = getSheetData(usersSheet);

  const userRow = usersData.find(row => 
    row && row['usuario'] && row['usuario'].toString().toLowerCase() === username.toLowerCase() &&
    row && row['contraseña'] && row['contraseña'].toString() === password
  );

  if (!userRow) {
    return createJsonResponse({ error: true, message: "Credenciales inválidas." });
  }
  
  const userData = {
      id: userRow['usuario'],
      name: userRow['nombre'],
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
    const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    const dataSheet = spreadsheet.getSheetByName(SHEET_NAMES.USERS);
    if (!dataSheet) {
        throw new Error(`La hoja "${SHEET_NAMES.USERS}" no fue encontrada.`);
    }
    
    const users = getSheetData(dataSheet).map(u => ({
        id: u.usuario,
        name: u.nombre,
        vicepresidencia: u.vicepresidencia,
        cargo: u.cargo,
        avatar: u.premio_cat,
        progreso: parseFloat(u.logro) || 0,
        posicion: parseInt(u.posicion, 10) || 0,
        xp: (parseFloat(u.logro) || 0) * 100,
        level: 1 
    }));

    return createJsonResponse({ users: users, error: false });
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
      if(header){ // Solo añade la propiedad si el encabezado no está vacío
        rowData[header] = row[index];
      }
    });
    return rowData;
  });
}

