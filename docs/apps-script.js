/**
 * Google Apps Script para el Portal Corporativo Banesco Seguros.
 * Maneja peticiones POST enviadas como texto plano para evitar Preflight de CORS.
 */

const SPREADSHEET_ID = ''; // Opcional si el script está vinculado a la hoja

function getSS() {
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);
  return SpreadsheetApp.getActiveSpreadsheet();
}

function doGet(e) {
  return createResponse({ success: true, message: "El script está ACTIVO." });
}

function doPost(e) {
  try {
    // Al enviar como text/plain, el cuerpo viene en e.postData.contents
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;
    
    if (action === 'login') {
      return handleLogin(requestData.email, requestData.password);
    }
    
    return createResponse({ success: false, message: 'Acción no reconocida.' });
  } catch (error) {
    return createResponse({ success: false, message: 'Error en el servidor: ' + error.toString() });
  }
}

function handleLogin(email, password) {
  try {
    const ss = getSS();
    const userSheet = ss.getSheetByName('USUARIOS');
    const historySheet = ss.getSheetByName('HISTORIAL');
    
    if (!userSheet) return createResponse({ success: false, message: 'Hoja USUARIOS no encontrada.' });
    
    const data = userSheet.getDataRange().getValues();
    let user = null;

    for (let i = 1; i < data.length; i++) {
      const sheetEmail = data[i][1] ? data[i][1].toString().toLowerCase().trim() : "";
      const inputEmail = email ? email.toString().toLowerCase().trim() : "";
      const sheetPass = data[i][4] ? data[i][4].toString().trim() : ""; // Cédula en columna E
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
    return createResponse({ success: false, message: 'Error de servidor: ' + e.toString() });
  }
}

function createResponse(data) {
  // Devolvemos como TEXT para evitar problemas de CORS en entornos restringidos
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.TEXT);
}