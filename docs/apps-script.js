// --- CONFIGURACIÓN DE HOJAS ---
const SH_USUARIOS = "USUARIOS";
const SH_HISTORIAL = "HISTORIAL";

/**
 * Responde a peticiones GET (útil para pruebas o redirecciones).
 */
function doGet(e) {
  return handleResponse({ success: true, message: "Servidor de Autenticación ACTIVO", status: "OK" });
}

/**
 * Responde a peticiones POST (donde viajan las credenciales).
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'login') {
      const res = handleLogin(data.username, data.password);
      return handleResponse(res);
    } else {
      return handleResponse({ success: false, message: "Acción no reconocida." });
    }
  } catch (err) {
    return handleResponse({ success: false, message: "Error en el servidor: " + err.toString() });
  }
}

/**
 * Función central para validar credenciales.
 */
function handleLogin(usuario, cedula) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetUsers = ss.getSheetByName(SH_USUARIOS);
  const data = sheetUsers.getDataRange().getValues();
  
  // Buscar usuario (Col B es índice 1, Cédula es Col F índice 5)
  // Estructura: Nombre(0), Usuario(1), Rol(2), Nacimiento(3), Cargo(4), Cédula(5)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[1].toString().trim() === usuario && row[5].toString().trim() === cedula) {
      
      const userObj = {
        name: row[0],
        username: row[1],
        rol: row[2],
        birthDate: row[3],
        cargo: row[4],
        email: row[1] 
      };

      registrarHistorial(usuario, "LOGIN", "ÉXITO", "Acceso concedido al portal.");
      return { success: true, user: userObj };
    }
  }

  registrarHistorial(usuario, "LOGIN", "FALLO", "Credenciales incorrectas.");
  return { success: false, message: "Usuario o cédula incorrectos." };
}

/**
 * Registra cada intento en la hoja HISTORIAL.
 */
function registrarHistorial(correo, accion, estatus, detalles) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheetLog = ss.getSheetByName(SH_HISTORIAL);
  
  if (!sheetLog) {
    sheetLog = ss.insertSheet(SH_HISTORIAL);
    sheetLog.appendRow(["Timestamp", "Correo", "Acción", "Estatus", "Detalles"]);
  }
  
  sheetLog.appendRow([new Date(), correo, accion, estatus, detalles]);
}

/**
 * Asegura que la respuesta sea siempre JSON válido.
 */
function handleResponse(content) {
  return ContentService.createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON);
}
