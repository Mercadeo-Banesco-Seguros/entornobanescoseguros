/**
 * Google Apps Script para el Portal Corporativo Banesco Seguros.
 * 
 * ESTRUCTURA DE LA HOJA:
 * 1. USUARIOS: Nombre (A), Correo (B), Rol (C), Fecha Nacimiento (D), Cargo (E), Cédula (F).
 * 2. HISTORIAL: Timestamp (A), Correo (B), Acción (C), Estatus (D), Navegador/Info (E).
 * 3. CARGOS: Nombre del Cargo (A).
 * 
 * Despliega como "Aplicación Web" con acceso para "Cualquier persona".
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
  // Buscamos coincidencia de Correo (B / índice 1) y Cédula (F / índice 5)
  for (let i = 1; i < data.length; i++) {
    const sheetEmail = data[i][1].toString().toLowerCase().trim();
    const inputEmail = email.toString().toLowerCase().trim();
    const sheetPass = data[i][5].toString().trim();
    const inputPass = password.toString().trim();

    if (sheetEmail === inputEmail && sheetPass === inputPass) {
      user = {
        id: data[i][5].toString(), // Cédula como ID
        name: data[i][0],
        email: data[i][1],
        rol: data[i][2], // Administrador o Usuario
        birthDate: data[i][3],
        cargo: data[i][4]
      };
      break;
    }
  }

  // Auditoría
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
      id: userData[i][5].toString(),
      name: userData[i][0],
      email: userData[i][1],
      rol: userData[i][2],
      cargo: userData[i][4]
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
