/**
 * Google Apps Script para el Portal Corporativo Banesco Seguros.
 * 
 * ESTRUCTURA DE LA HOJA "USUARIOS" (Columnas A-E):
 * A: Nombre | B: Correo | C: Rol | D: Cargo | E: Cédula (Contraseña)
 * 
 * ESTRUCTURA DE LA HOJA "HISTORIAL":
 * A: Timestamp | B: Correo | C: Acción | D: Estatus | E: Detalles
 * 
 * ESTRUCTURA DE LA HOJA "CARGOS":
 * A: Nombre del Cargo
 */

const SPREADSHEET_ID = 'TU_ID_DE_HOJA_DE_CALCULO_AQUI';

/**
 * Función para responder a peticiones GET (cuando abres la URL en el navegador)
 */
function doGet(e) {
  return ContentService.createTextOutput("El script de Banesco Seguros está ACTIVO. Si ves este mensaje, la conexión es posible.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Función para responder a peticiones POST (desde la aplicación)
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;

    if (action === 'login') {
      return handleLogin(body.email, body.password);
    } else if (action === 'getData') {
      return handleGetData();
    }
    
    return createResponse({ error: true, message: 'Acción no reconocida' });
  } catch (err) {
    return createResponse({ error: true, message: err.toString() });
  }
}

function handleLogin(email, password) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const userSheet = ss.getSheetByName('USUARIOS');
  const historySheet = ss.getSheetByName('HISTORIAL');
  
  if (!userSheet) return createResponse({ success: false, message: 'Error: No se encontró la hoja USUARIOS' });
  
  const data = userSheet.getDataRange().getValues();
  let user = null;

  // Buscamos coincidencia de Correo (B / índice 1) y Cédula (E / índice 4)
  for (let i = 1; i < data.length; i++) {
    const sheetEmail = data[i][1] ? data[i][1].toString().toLowerCase().trim() : "";
    const inputEmail = email.toString().toLowerCase().trim();
    const sheetPass = data[i][4] ? data[i][4].toString().trim() : ""; // Cédula en columna E
    const inputPass = password.toString().trim();

    if (sheetEmail === inputEmail && sheetPass === inputPass) {
      user = {
        id: data[i][4].toString(), // Cédula como ID
        name: data[i][0], // Nombre
        email: data[i][1], // Correo
        rol: data[i][2], // Administrador o Usuario
        cargo: data[i][3] // Cargo
      };
      break;
    }
  }

  // Auditoría en hoja HISTORIAL
  if (historySheet) {
    historySheet.appendRow([
      new Date(), 
      email, 
      'LOGIN', 
      user ? 'EXITOSO' : 'FALLIDO', 
      user ? 'Acceso concedido como ' + user.rol : 'Credenciales incorrectas'
    ]);
  }

  if (user) {
    return createResponse({ success: true, user: user });
  } else {
    return createResponse({ success: false, message: 'El correo o la cédula son incorrectos.' });
  }
}

function handleGetData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const userSheet = ss.getSheetByName('USUARIOS');
  const cargoSheet = ss.getSheetByName('CARGOS');
  
  if (!userSheet) return createResponse({ error: true, message: 'No se encontró la hoja USUARIOS' });

  const userData = userSheet.getDataRange().getValues();
  const users = [];

  for (let i = 1; i < userData.length; i++) {
    if (userData[i][1]) { // Si tiene correo
      users.push({
        id: userData[i][4].toString(),
        name: userData[i][0],
        email: userData[i][1],
        rol: userData[i][2],
        cargo: userData[i][3]
      });
    }
  }

  const cargos = [];
  if (cargoSheet) {
    const cargoData = cargoSheet.getDataRange().getValues();
    for (let i = 1; i < cargoData.length; i++) {
      if (cargoData[i][0]) cargos.push(cargoData[i][0]);
    }
  }

  return createResponse({ users: users, cargos: cargos });
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
