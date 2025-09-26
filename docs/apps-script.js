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
 * Todas las peticiones (GET/POST) desde el proxy de Next.js se convierten en POST.
 */
function doPost(e) {
  try {
    // e.postData.contents contiene el cuerpo de la petición como un string JSON.
    const requestData = JSON.parse(e.postData.contents);
    
    // Obtener la acción del cuerpo de la petición.
    const action = requestData.action;

    switch (action) {
      case 'register':
        return handleRegister(requestData);
      case 'login':
        return handleLogin(requestData);
      case 'getData':
        return handleGetData(requestData);
      default:
        // Si la acción no es reconocida, o si es una petición GET simple sin 'action'.
        if (e.parameter && e.parameter.action === 'getData') {
          return handleGetData(e.parameter);
        }
        return createJsonResponse({ error: true, message: "Acción no reconocida." });
    }
  } catch (error) {
    Logger.log(`Error en doPost: ${error.toString()}\nStack: ${error.stack}`);
    return createJsonResponse({ error: true, message: `Error en el servidor: ${error.toString()}` });
  }
}

/**
 * La función doGet ahora simplemente redirige a doPost,
 * ya que el proxy maneja todas las solicitudes como POST.
 */
function doGet(e) {
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
  const userExists = usersData.some(row => row['correo'] && row['correo'].toString().toLowerCase() === email.toLowerCase());

  if (userExists) {
    return createJsonResponse({ error: true, message: "El correo electrónico ya está registrado." });
  }

  // Valores por defecto para un nuevo usuario
  const newAvatar = 'Explorador';
  const newLevel = 1;
  const newScore = 0;

  // Añadir a la hoja USUARIOS
  usersSheet.appendRow([name, email, password, newAvatar, newLevel, newScore]);
  
  // Añadir también a la hoja DATA para el ranking
  const dataSheet = spreadsheet.getSheetByName(SHEET_NAMES.DATA);
  if (dataSheet) {
      // Asumiendo que 'Sexo' puede quedar en blanco inicialmente.
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
    row['correo'] && row['correo'].toString().toLowerCase() === email.toLowerCase() &&
    row['contraseña'] && row['contraseña'].toString() === password
  );

  if (!userRow) {
    return createJsonResponse({ error: true, message: "Credenciales inválidas." });
  }
  
  // Usar los nombres de columna en minúsculas como los devuelve getSheetData.
  const userData = {
      id: userRow['correo'], // Usamos el correo como ID único
      name: userRow['nombre'],
      email: userRow['correo'],
      level: parseInt(userRow['nivel'], 10),
      xp: parseInt(userRow['puntaje'], 10),
      avatar: userRow['avatar']
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
      // El nombre de la propiedad 'users' es importante para el frontend.
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
 * Limpia los encabezados de espacios en blanco y los convierte a minúsculas.
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
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
