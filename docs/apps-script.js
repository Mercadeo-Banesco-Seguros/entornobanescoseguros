// --- CONFIGURACIÓN DE HOJAS ---
const SH_USUARIOS = "USUARIOS";
const SH_HISTORIAL = "HISTORIAL";

/**
 * Responde a peticiones GET.
 */
function doGet(e) {
  return handleResponse({ 
    success: true, 
    message: "Servidor de Autenticación ACTIVO", 
    status: "OK" 
  });
}

/**
 * Responde a peticiones POST.
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'login') {
      return handleResponse(handleLogin(data.username, data.password));
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
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetUsers = ss.getSheetByName(SH_USUARIOS);
    
    if (!sheetUsers) return { success: false, message: "Error: No se encontró la hoja de USUARIOS." };

    const data = sheetUsers.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const dbUsuario = row[1] ? row[1].toString().trim() : "";
      const dbCedula = row[5] ? row[5].toString().trim() : "";

      if (dbUsuario === usuario.toString().trim() && dbCedula === cedula.toString().trim()) {
        const userObj = {
          name: row[0],
          username: row[1],
          rol: row[2],
          birthDate: row[3],
          cargo: row[4],
          email: row[1],
          vicepresidencia: row[6] || ""
        };
        registrarHistorial(usuario, "LOGIN", "ÉXITO", "Acceso concedido al portal.");
        return { success: true, user: userObj };
      }
    }
    registrarHistorial(usuario, "LOGIN", "FALLO", "Credenciales incorrectas.");
    return { success: false, message: "Usuario o cédula incorrectos." };
  } catch (e) {
    return { success: false, message: "Error en la base de datos: " + e.message };
  }
}

function registrarHistorial(correo, accion, estatus, detalles) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheetLog = ss.getSheetByName(SH_HISTORIAL);
    if (!sheetLog) {
      sheetLog = ss.insertSheet(SH_HISTORIAL);
      sheetLog.appendRow(["Timestamp", "Correo", "Acción", "Estatus", "Detalles"]);
    }
    sheetLog.appendRow([new Date(), correo, accion, estatus, detalles]);
  } catch (e) {}
}

function handleResponse(content) {
  return ContentService.createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON);
}