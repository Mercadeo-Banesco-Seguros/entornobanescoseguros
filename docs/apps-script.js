// --- CONFIGURACIÓN DE HOJAS ---
const SH_USUARIOS = "USUARIOS";
const SH_HISTORIAL = "HISTORIAL";
const SH_CALENDARIO = "CALENDARIO";

/**
 * Responde a peticiones GET.
 */
function doGet(e) {
  return handleResponse({ 
    success: true, 
    message: "Servidor de Autenticación y Calendario ACTIVO", 
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
    } else if (data.action === 'getCalendar') {
      return handleResponse(getCalendarData());
    } else if (data.action === 'updateCalendar') {
      return handleResponse(updateCalendarDay(data.date, data.updates));
    } else {
      return handleResponse({ success: false, message: "Acción no reconocida." });
    }
  } catch (err) {
    return handleResponse({ success: false, message: "Error en el servidor: " + err.toString() });
  }
}

/**
 * Obtiene todos los eventos del calendario.
 */
function getCalendarData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SH_CALENDARIO);
    if (!sheet) return { success: true, data: [] };

    const values = sheet.getDataRange().getValues();
    const headers = values[0];
    const data = [];

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const date = row[0];
      if (!date) continue;

      const dayData = {
        date: Utilities.formatDate(new Date(date), "GMT-4", "yyyy-MM-dd"),
        events: [],
        birthdays: []
      };

      // Columnas 1-5: Eventos
      for (let j = 1; j <= 5; j++) {
        if (row[j]) dayData.events.push(row[j].toString());
      }
      // Columnas 6-10: Cumpleaños
      for (let j = 6; j <= 10; j++) {
        if (row[j]) dayData.birthdays.push(row[j].toString());
      }

      if (dayData.events.length > 0 || dayData.birthdays.length > 0) {
        data.push(dayData);
      }
    }

    return { success: true, data: data };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

/**
 * Actualiza o añade eventos para una fecha específica.
 */
function updateCalendarDay(dateStr, updates) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SH_CALENDARIO);
    if (!sheet) {
      sheet = ss.insertSheet(SH_CALENDARIO);
      sheet.appendRow(["date", "event_1", "event_2", "event_3", "event_4", "event_5", "birthday_1", "birthday_2", "birthday_3", "birthday_4", "birthday_5"]);
    }

    const values = sheet.getDataRange().getValues();
    const targetDate = new Date(dateStr);
    let rowIndex = -1;

    // Buscar si la fecha ya existe
    for (let i = 1; i < values.length; i++) {
      const rowDate = new Date(values[i][0]);
      if (Utilities.formatDate(rowDate, "GMT-4", "yyyy-MM-dd") === dateStr) {
        rowIndex = i + 1;
        break;
      }
    }

    // Preparar fila [fecha, e1, e2, e3, e4, e5, b1, b2, b3, b4, b5]
    const newRow = [targetDate];
    for (let i = 0; i < 5; i++) newRow.push(updates.events[i] || "");
    for (let i = 0; i < 5; i++) newRow.push(updates.birthdays[i] || "");

    if (rowIndex !== -1) {
      sheet.getRange(rowIndex, 1, 1, 11).setValues([newRow]);
    } else {
      sheet.appendRow(newRow);
    }

    return { success: true, message: "Calendario actualizado correctamente." };
  } catch (e) {
    return { success: false, message: e.toString() };
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