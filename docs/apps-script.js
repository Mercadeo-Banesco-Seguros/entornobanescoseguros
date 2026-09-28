/**
 * Google Apps Script para el Portal Corporativo Banesco Seguros.
 * 
 * ESTRUCTURA DE LA HOJA:
 * 1. USUARIOS: Nombre (A), Correo (B), Rol (C), Cargo (D), Cédula (E).
 * 2. HISTORIAL: Timestamp (A), Correo (B), Acción (C), Estatus (D), Detalles (E).
 * 3. CARGOS: Nombre del Cargo (A).
 * 
 * INSTRUCCIONES DE DESPLIEGUE:
 * 1. Reemplaza SPREADSHEET_ID por el ID de tu hoja.
 * 2. Haz clic en "Implementar" > "Nueva implementación".
 * 3. Selecciona "Aplicación web".
 * 4. Ejecutar como: "Yo" (Tu correo).
 * 5. Quién tiene acceso: "Cualquier persona" (IMPORTANTE).
 */

const SPREADSHEET_ID = 'TU_ID_DE_HOJA_DE_CALCULO_AQUI';

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
  const data = userSheet.getDataRange().getValues();
  
  let user = null;
  // Buscamos coincidencia de Correo (B / índice 1) y Cédula (E / índice 4)
  for (let i = 1; i < data.length; i++) {
    const sheetEmail = data[i][1].toString().toLowerCase().trim();
    const inputEmail = email.toString().toLowerCase().trim();
    const sheetPass = data[i][4].toString().trim();
    const inputPass = password.toString().trim();

    if (sheetEmail === inputEmail && sheetPass === inputPass) {
      user = {
        id: data[i][4].toString(), // Cédula como ID
        name: data[i][0],
        email: data[i][1],
        rol: data[i][2], // Administrador o Usuario
        cargo: data[i][3]
      };
      break;
    }
  }

  // Auditoría en hoja HISTORIAL
  const timestamp = new Date();
  if (historySheet) {
    historySheet.appendRow([
      timestamp, 
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
  
  const userData = userSheet.getDataRange().getValues();
  const users = [];

  for (let i = 1; i < userData.length; i++) {
    users.push({
      id: userData[i][4].toString(),
      name: userData[i][0],
      email: userData[i][1],
      rol: userData[i][2],
      cargo: userData[i][3]
    });
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
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}