/**
 * SCRIPT EXCLUSIVO PARA GESTIÓN DE CALENDARIO
 * Hoja: "CALENDARIO"
 * Estructura: [date (A), event_1 (B), event_2 (C), event_3 (D), event_4 (E), event_5 (F), birthday_1 (G), birthday_2 (H), birthday_3 (I), birthday_4 (J), birthday_5 (K)]
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
    if (!e || !e.postData || !e.postData.contents) {
      return handleResponse({ success: false, message: "Error: No se recibieron datos en el cuerpo del POST." });
    }
    
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'getCalendar') {
      return handleResponse(getCalendarData());
    } else if (data.action === 'updateCalendar') {
      return handleResponse(updateCalendarDay(data.date, data.updates));
    } else {
      return handleResponse({ success: false, message: "Acción no reconocida: " + (data.action || "ninguna") });
    }
  } catch (err) {
    return handleResponse({ success: false, message: "Error crítico en el servidor (doPost): " + err.toString() });
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
    const tz = ss.getSpreadsheetTimeZone();

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const dateVal = row[0];
      if (!dateVal) continue;

      let dateStr;
      try {
        dateStr = Utilities.formatDate(new Date(dateVal), tz, "yyyy-MM-dd");
      } catch (e) {
        continue; 
      }

      const dayData = {
        date: dateStr,
        events: [],
        birthdays: []
      };

      for (let j = 1; j <= 5; j++) {
        if (row[j]) dayData.events.push(row[j].toString().trim());
      }
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
 * Actualiza, inserta o elimina eventos para una fecha específica.
 */
function updateCalendarDay(dateStr, updates) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SH_CALENDARIO);
    const tz = ss.getSpreadsheetTimeZone();
    
    if (!sheet) {
      sheet = ss.insertSheet(SH_CALENDARIO);
      sheet.appendRow(["date", "event_1", "event_2", "event_3", "event_4", "event_5", "birthday_1", "birthday_2", "birthday_3", "birthday_4", "birthday_5"]);
    }

    const range = sheet.getDataRange();
    const values = range.getValues();
    let rowIndex = -1;

    for (let i = 1; i < values.length; i++) {
      const rowDate = values[i][0];
      if (rowDate) {
        try {
          const rowDateStr = Utilities.formatDate(new Date(rowDate), tz, "yyyy-MM-dd");
          if (rowDateStr === dateStr) {
            rowIndex = i + 1;
            break;
          }
        } catch (e) {
          continue;
        }
      }
    }

    const events = updates.events || [];
    const birthdays = updates.birthdays || [];
    
    // Determinar si el registro está vacío
    const isEmpty = events.every(e => !e || e.toString().trim() === "") && 
                    birthdays.every(b => !b || b.toString().trim() === "");

    if (isEmpty) {
      if (rowIndex !== -1) {
        sheet.deleteRow(rowIndex);
        SpreadsheetApp.flush();
        return { success: true, message: "Registro eliminado (vacío)." };
      }
      return { success: true, message: "No había registro previo para eliminar." };
    }

    const targetDate = new Date(dateStr + "T12:00:00"); 
    const newRow = [targetDate];
    
    for (let i = 0; i < 5; i++) newRow.push(events[i] || "");
    for (let i = 0; i < 5; i++) newRow.push(birthdays[i] || "");

    if (rowIndex !== -1) {
      sheet.getRange(rowIndex, 1, 1, 11).setValues([newRow]);
    } else {
      sheet.appendRow(newRow);
    }
    
    SpreadsheetApp.flush();

    return { success: true, message: "Datos actualizados correctamente." };
  } catch (e) {
    return { success: false, message: "Error escribiendo en la hoja: " + e.toString() };
  }
}

function handleResponse(content) {
  return ContentService.createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON);
}
