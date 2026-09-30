// --- CONFIGURACIÓN DE HOJAS ---
const SH_USUARIOS = "USUARIOS";
const SH_HISTORIAL = "HISTORIAL";

/**
 * Recibe las peticiones de inicio de sesión desde el portal.
 */
function doPost(e) {
  let res;
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'login') {
      res = handleLogin(data.username, data.password);
    } else {
      res = { success: false, message: "Acción no reconocida." };
    }
  } catch (err) {
    res = { success: false, message: "Error en el servidor: " + err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(res))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Valida credenciales y registra en historial.
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
        email: row[1] // Usamos el usuario como identificador único
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
 * Estructura: Timestamp, Correo, Acción, Estatus, Detalles
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
 * Función simple para verificar que el script está conectado.
 */
function doGet() {
  return ContentService.createTextOutput("Servidor de Autenticación ACTIVO")
    .setMimeType(ContentService.MimeType.TEXT);
}
