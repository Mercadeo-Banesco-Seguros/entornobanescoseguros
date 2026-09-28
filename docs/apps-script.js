/**
 * Google Apps Script para la gestión de usuarios y accesos del Portal Corporativo.
 * 
 * 1. Crea una hoja de cálculo con las pestañas "USUARIOS" e "HISTORIAL".
 * 2. En "USUARIOS" define las columnas: Nombre (A), Correo (B), Rol (C), Fecha Nacimiento (D), Cédula (E).
 * 3. En "HISTORIAL" define las columnas: Timestamp, Correo, Cédula Intentada, Estatus, Datos Retornados.
 * 4. Despliega este script como "Aplicación Web" con acceso para "Cualquier persona".
 */

const SPREADSHEET_ID = 'TU_ID_DE_HOJA_DE_CALCULO_AQUI'; // REEMPLAZA CON TU ID DE HOJA DE CÁLCULO

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
  // Buscamos coincidencia de Correo (columna B / índice 1) y Cédula/Contraseña (columna E / índice 4)
  for (let i = 1; i < data.length; i++) {
    const sheetEmail = data[i][1].toString().toLowerCase().trim();
    const inputEmail = email.toString().toLowerCase().trim();
    const sheetPass = data[i][4].toString().trim();
    const inputPass = password.toString().trim();

    if (sheetEmail === inputEmail && sheetPass === inputPass) {
      user = {
        id: data[i][4], // Usamos la cédula como ID único
        name: data[i][0],
        email: data[i][1],
        role: data[i][2],
        birthDate: data[i][3],
        avatar: 'Base',
        xp: 0,
        level: 1
      };
      break;
    }
  }

  // Registrar en historial de auditoría
  const timestamp = new Date();
  const status = user ? 'EXITOSO' : 'FALLIDO';
  if (historySheet) {
    historySheet.appendRow([timestamp, email, '********', status, user ? 'Acceso Concedido' : 'Credenciales Incorrectas']);
  }

  if (user) {
    return createResponse({ success: true, user: user });
  } else {
    return createResponse({ success: false, message: 'Correo o Cédula incorrectos.' });
  }
}

function handleGetData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('USUARIOS');
  const data = sheet.getDataRange().getValues();
  const users = [];

  for (let i = 1; i < data.length; i++) {
    users.push({
      id: data[i][4],
      name: data[i][0],
      email: data[i][1],
      role: data[i][2],
      avatar: 'Base'
    });
  }

  return createResponse({ users: users });
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
