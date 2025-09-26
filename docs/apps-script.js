// ------------------- CONFIGURACIÓN -------------------
// 1. Reemplaza esta URL con la URL de tu hoja de cálculo de Google.
const SPREADSHEET_URL = "URL_DE_TU_HOJA_DE_CALCULO"; 

// 2. Define los nombres de las hojas que usarás. Deben coincidir EXACTAMENTE.
const SHEET_NAMES = {
  USERS: "USUARIOS",
  DATA: "DATA"
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
    // 'getData' es la acción por defecto para compatibilidad con GET
    const action = requestData.action || 'getData'; 

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
    // El método GET solo se usará para obtener el ranking (hoja DATA)
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
    row['Correo'] && row['Correo'].toString().toLowerCase() === email.toLowerCase() &&
    row['Contraseña'] && row['Contraseña'].toString() === password
  );

  if (!userRow) {
    return createJsonResponse({ error: true, message: "Credenciales inválidas." });
  }
  
  // Usar los nombres de columna EXACTOS de la hoja USUARIOS.
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
      // Usa el nombre del encabezado como clave.
      // El frontend espera 'puntaje', no 'Puntaje'. Se ajustará en el frontend.
      rowData[header.toLowerCase()] = row[index];
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
