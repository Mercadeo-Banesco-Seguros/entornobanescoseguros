/**
 * Google Apps Script para el Portal Corporativo Banesco Seguros.
 * 
 * INSTRUCCIONES:
 * 1. Pega este código en el editor de Apps Script.
 * 2. Si el script está unido a la hoja, usará la hoja activa automáticamente.
 * 3. Si el script es independiente, sustituye el ID abajo.
 * 4. Implementa como APLICACIÓN WEB.
 * 5. Ejecutar como: YO.
 * 6. Quién tiene acceso: CUALQUIER PERSONA DE [TU ORGANIZACIÓN].
 */

const SPREADSHEET_ID = ''; // Opcional: Solo si el script no está unido a la hoja

function getSS() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Responde a peticiones GET (para verificar conexión en el navegador)
 */
function doGet(e) {
  return ContentService.createTextOutput("El script de Banesco Seguros está ACTIVO. Si ves este mensaje, tu navegador ha autorizado la sesión de Google para este dominio.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Responde a peticiones POST (desde la aplicación)
 */
function doPost(e) {
  // Configuración de CORS manual para permitir la entrada de datos
  try {
    const contents = e.postData.contents;
    const body = JSON.parse(contents);
    const action = body.action;

    if (action === 'login') {
      return handleLogin(body.email, body.password);
    } else if (action === 'getData') {
      return handleGetData();
    }
    
    return createResponse({ success: false, message: 'Acción no reconocida' });
  } catch (err) {
    return createResponse({ success: false, message: 'Error en el servidor: ' + err.toString() });
  }
}

function handleLogin(email, password) {
  try {
    const ss = getSS();
    const userSheet = ss.getSheetByName('USUARIOS');
    const historySheet = ss.getSheetByName('HISTORIAL');
    
    if (!userSheet) return createResponse({ success: false, message: 'Error: No se encontró la hoja USUARIOS' });
    
    const data = userSheet.getDataRange().getValues();
    let user = null;

    // Buscamos coincidencia de Correo (Columna B / índice 1) y Cédula (Columna E / índice 4)
    for (let i = 1; i < data.length; i++) {
      const sheetEmail = data[i][1] ? data[i][1].toString().toLowerCase().trim() : "";
      const inputEmail = email.toString().toLowerCase().trim();
      const sheetPass = data[i][4] ? data[i][4].toString().trim() : ""; 
      const inputPass = password.toString().trim();

      if (sheetEmail === inputEmail && sheetPass === inputPass) {
        user = {
          id: data[i][4].toString(), // Cédula como ID
          name: data[i][0], 
          email: data[i][1], 
          rol: data[i][2], 
          cargo: data[i][3] 
        };
        break;
      }
    }

    // Registro en HISTORIAL
    if (historySheet) {
      historySheet.appendRow([
        new Date(), 
        email, 
        'LOGIN', 
        user ? 'EXITOSO' : 'FALLIDO', 
        user ? 'Acceso concedido - Rol: ' + user.rol : 'Credenciales incorrectas'
      ]);
    }

    if (user) {
      return createResponse({ success: true, user: user });
    } else {
      return createResponse({ success: false, message: 'El correo o la cédula son incorrectos.' });
    }
  } catch (e) {
    return createResponse({ success: false, message: 'Error al acceder a la hoja: ' + e.message });
  }
}

function handleGetData() {
  try {
    const ss = getSS();
    const userSheet = ss.getSheetByName('USUARIOS');
    const cargoSheet = ss.getSheetByName('CARGOS');
    
    if (!userSheet) return createResponse({ success: false, message: 'No se encontró la hoja USUARIOS' });

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
  } catch (e) {
    return createResponse({ success: false, message: e.message });
  }
}

function createResponse(data) {
  // Devolvemos el JSON como texto plano para evitar problemas de CORS Preflight
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.TEXT);
}
