/**
 * Google Apps Script para el Portal Corporativo.
 * Maneja peticiones POST enviadas como texto plano (text/plain) para evitar Preflight de CORS.
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
    let requestData;
    try {
      requestData = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createResponse({ success: false, message: 'Formato de datos inválido.' });
    }

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
    
    if (!userSheet) return createResponse({ success: false, message: 'Hoja USUARIOS no encontrada.' });
    
    const data = userSheet.getDataRange().getValues();
    let found = false;

    // Buscamos coincidencia de correo y cédula (columna E)
    for (let i = 1; i < data.length; i++) {
      const sheetEmail = data[i][1] ? data[i][1].toString().toLowerCase().trim() : "";
      const inputEmail = email ? email.toString().toLowerCase().trim() : "";
      const sheetPass = data[i][4] ? data[i][4].toString().trim() : ""; 
      const inputPass = password ? password.toString().trim() : "";

      if (sheetEmail === inputEmail && sheetPass === inputPass) {
        found = true;
        break;
      }
    }

    if (found) {
      return createResponse({ success: true, message: 'Acceso autorizado.' });
    } else {
      return createResponse({ success: false, message: 'Cédula o correo incorrectos.' });
    }
  } catch (e) {
    return createResponse({ success: false, message: 'Error de base de datos: ' + e.toString() });
  }
}

function createResponse(data) {
  // Devolvemos como TEXT para evitar problemas de redirección de Google
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.TEXT);
}