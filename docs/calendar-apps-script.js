/**
 * SCRIPT EXCLUSIVO PARA GESTIÓN DE CALENDARIO
 * Hoja: "CALENDARIO"
 * Estructura: [date, event_1, event_2, event_3, event_4, event_5, birthday_1, birthday_2, birthday_3, birthday_4, birthday_5]
 */

const SH_CALENDARIO = "CALENDARIO";

/**
 * Maneja peticiones GET para verificar estado.
 */
function doGet(e) {
  return handleResponse({ success: true, message: "Servidor de Calendario ACTIVO" });
}

/**
 * Maneja peticiones POST desde la aplicación.
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'getCalendar') {
      return handleResponse(getCalendarData());
    } else if (data.action === 'updateCalendar') {
      return handleResponse(updateCalendarDay(data.date, data.updates));
    } else {
      return handleResponse({ success: false, message: "Acción no reconocida en servidor de calendario." });
    }
  } catch (err) {
    return handleResponse({ success: false, message: "Error en servidor de calendario: " + err.toString() });
  }
}

/**
 * Obtiene todos los eventos y cumpleaños registrados.
 */
function getCalendarData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SH_CALENDARIO);
    if (!sheet) return { success: true, data: [] };

    const values = sheet.getDataRange().getValues();
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

      // Columnas 1-5: Eventos (B-F)
      for (let j = 1; j <= 5; j++) {
        if (row[j]) dayData.events.push(row[j].toString().trim());
      }
      // Columnas 6-10: Cumpleaños (G-K)
      for (let j = 6; j <= 10; j++) {
        if (row[j]) dayData.birthdays.push(row[j].toString().trim());
      }

      if (dayData.events.length > 0 || dayData.birthdays.length > 0) {
        data.push(dayData);
      }
    }

    return { success: true, data: data };
  } catch (e) {
    return { success: false, message: "Error leyendo datos: " + e.toString() };
  }
}

/**
 * Actualiza o inserta eventos para una fecha específica.
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
    const targetDate = new Date(dateStr + "T12:00:00"); // Forzar mediodía para evitar desfases de zona horaria
    let rowIndex = -1;

    // Buscar si la fecha ya existe
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] instanceof Date) {
        const rowDateStr = Utilities.formatDate(values[i][0], "GMT-4", "yyyy-MM-dd");
        if (rowDateStr === dateStr) {
          rowIndex = i + 1;
          break;
        }
      }
    }

    // Preparar fila completa: [fecha, e1, e2, e3, e4, e5, b1, b2, b3, b4, b5]
    const newRow = [targetDate];
    for (let i = 0; i < 5; i++) newRow.push(updates.events[i] || "");
    for (let i = 0; i < 5; i++) newRow.push(updates.birthdays[i] || "");

    if (rowIndex !== -1) {
      // Actualizar fila existente
      sheet.getRange(rowIndex, 1, 1, 11).setValues([newRow]);
    } else {
      // Añadir nueva fila
      sheet.appendRow(newRow);
    }

    return { success: true, message: "Calendario actualizado correctamente." };
  } catch (e) {
    return { success: false, message: "Error guardando: " + e.toString() };
  }
}

/**
 * Formatea la respuesta como JSON.
 */
function handleResponse(content) {
  return ContentService.createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON);
}