/**
 * Google Apps Script para la gestión de usuarios y accesos de Banesco Seguros.
 * 1. Crea una hoja de cálculo con las pestañas "USUARIOS" y "historial".
 * 2. En "USUARIOS" define las columnas: Nombre, Correo, Rol, Fecha Nacimiento, Cédula (Contraseña), Vicepresidencia, Cargo, Progreso, Pólizas, Suscrito, Cobrado, Categoría.
 * 3. En "historial" define las columnas: Timestamp, Correo, Cédula Intentada, Estatus, Datos Retornados.
 * 4. Despliega este script como "Aplicación Web" con acceso para "Cualquier persona".
 */

const SPREADSHEET_ID = 'TU_ID_DE_HOJA_DE_CALCULO_AQUI'; // REEMPLAZA CON TU ID

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
  const historySheet = ss.getSheetByName('historial');
  const data = userSheet.getDataRange().getValues();
  
  let user = null;
  // Buscamos coincidencia de Correo (columna 2) y Cédula (columna 5)
  for (let i = 1; i < data.length; i++) {
    if (data[i][1].toString().toLowerCase() === email.toLowerCase() && data[i][4].toString() === password.toString()) {
      user = {
        name: data[i][0],
        email: data[i][1],
        role: data[i][2],
        birthDate: data[i][3],
        id: data[i][4],
        vicepresidencia: data[i][5],
        cargo: data[i][6],
        progreso: Number(data[i][7] || 0),
        prog_pol: Number(data[i][8] || 0),
        prog_sus: Number(data[i][9] || 0),
        prog_cob: Number(data[i][10] || 0),
        avatar: data[i][11] || 'Base'
      };
      break;
    }
  }

  // Registrar en historial
  const timestamp = new Date();
  const status = user ? 'EXITOSO' : 'FALLIDO';
  historySheet.appendRow([timestamp, email, password, status, user ? JSON.stringify(user) : 'Credenciales Incorrectas']);

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
      name: data[i][0],
      email: data[i][1],
      role: data[i][2],
      id: data[i][4],
      vicepresidencia: data[i][5],
      cargo: data[i][6],
      progreso: Number(data[i][7] || 0),
      prog_pol: Number(data[i][8] || 0),
      prog_sus: Number(data[i][9] || 0),
      prog_cob: Number(data[i][10] || 0),
      avatar: data[i][11] || 'Base'
    });
  }

  return createResponse({ users: users });
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
