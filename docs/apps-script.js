/**
 * Google Apps Script para el Portal Corporativo Banesco Seguros.
 * Versión optimizada para comunicación GET/POST desde entornos restringidos.
 */

const SPREADSHEET_ID = ''; // Opcional: Solo si el script no está unido a la hoja

function getSS() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Maneja tanto peticiones GET como POST
 */
function doGet(e) {
  return processRequest(e);
}

function doPost(e) {
  return processRequest(e);
}

function processRequest(e) {
  const action = e.parameter.action;
  
  if (action === 'login') {
    return handleLogin(e.parameter.email, e.parameter.password);
  } else if (action === 'getData') {
    return handleGetData();
  }
  
  return createResponse({ success: false, message: 'Acción no reconocida: ' + action });
}

function handleLogin(email, password) {
  try {
    const ss = getSS();
    const userSheet = ss.getSheetByName('USUARIOS');
    const historySheet = ss.getSheetByName('HISTORIAL');
    
    if (!userSheet) return createResponse({ success: false, message: 'Error: Hoja USUARIOS no encontrada.' });
    
    const data = userSheet.getDataRange().getValues();
    let user = null;

    for (let i = 1; i < data.length; i++) {
      const sheetEmail = data[i][1] ? data[i][1].toString().toLowerCase().trim() : "";
      const inputEmail = email ? email.toString().toLowerCase().trim() : "";
      const sheetPass = data[i][4] ? data[i][4].toString().trim() : ""; 
      const inputPass = password ? password.toString().trim() : "";

      if (sheetEmail === inputEmail && sheetPass === inputPass) {
        user = {
          id: data[i][4].toString(),
          name: data[i][0], 
          email: data[i][1], 
          rol: data[i][2], 
          cargo: data[i][3] 
        };
        break;
      }
    }

    if (historySheet) {
      historySheet.appendRow([new Date(), email || 'unknown', 'LOGIN', user ? 'EXITOSO' : 'FALLIDO']);
    }

    if (user) {
      return createResponse({ success: true, user: user });
    } else {
      return createResponse({ success: false, message: 'Credenciales inválidas.' });
    }
  } catch (e) {
    return createResponse({ success: false, message: 'Error: ' + e.toString() });
  }
}

function handleGetData() {
  try {
    const ss = getSS();
    const userSheet = ss.getSheetByName('USUARIOS');
    if (!userSheet) return createResponse({ success: false, message: 'No hay hoja USUARIOS' });

    const data = userSheet.getDataRange().getValues();
    const users = [];

    for (let i = 1; i < data.length; i++) {
      if (data[i][1]) {
        users.push({
          id: data[i][4].toString(),
          name: data[i][0],
          email: data[i][1],
          rol: data[i][2],
          cargo: data[i][3]
        });
      }
    }

    return createResponse({ success: true, users: users });
  } catch (e) {
    return createResponse({ success: false, message: e.toString() });
  }
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.TEXT);
}