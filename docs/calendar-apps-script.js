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
        // Convertimos a objeto Date y luego a string YYYY-MM-DD para el frontend
        dateStr = Utilities.formatDate(new Date(dateVal), tz, "yyyy-MM-dd");
      } catch (e) {
        continue; 
      }

      const dayData = {
        date: dateStr,
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
    const tz = ss.getSpreadsheetTimeZone();
    
    if (!sheet) {
      sheet = ss.insertSheet(SH_CALENDARIO);
      sheet.appendRow(["date", "event_1", "event_2", "event_3", "event_4", "event_5", "birthday_1", "birthday_2", "birthday_3", "birthday_4", "birthday_5"]);
    }

    const range = sheet.getDataRange();
    const values = range.getValues();
    let rowIndex = -1;

    // Buscar si la fecha ya existe comparando el formato yyyy-MM-dd para evitar fallos por formato de celda
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

    // Preparar fila completa: [fecha, e1, e2, e3, e4, e5, b1, b2, b3, b4, b5]
    // Usamos T12:00:00 para garantizar que la fecha se mantenga en el día correcto
    const targetDate = new Date(dateStr + "T12:00:00"); 
    const newRow = [targetDate];
    
    const events = updates.events || [];
    const birthdays = updates.birthdays || [];
    
    for (let i = 0; i < 5; i++) newRow.push(events[i] || "");
    for (let i = 0; i < 5; i++) newRow.push(birthdays[i] || "");

    if (rowIndex !== -1) {
      // Actualizar fila existente
      sheet.getRange(rowIndex, 1, 1, 11).setValues([newRow]);
    } else {
      // Añadir nueva fila
      sheet.appendRow(newRow);
    }
    
    // Forzar guardado de cambios en Google Sheets
    SpreadsheetApp.flush();

    return { success: true, message: "Cambios registrados en la fila: " + (rowIndex === -1 ? "final (nueva)" : rowIndex) };
  } catch (e) {
    return { success: false, message: "Error escribiendo en la hoja: " + e.toString() };
  }
}

/**
 * Formatea la respuesta como JSON.
 */
function handleResponse(content) {
  return ContentService.createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON);
}