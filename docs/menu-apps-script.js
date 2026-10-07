/**
 * SCRIPT PARA GESTIÓN DE MENÚ (SABOR SEGURO)
 * Hoja: "MENU"
 * Estructura: [Día (A), Tipo de Menú (B), Nombre Menu (C), Descripción Menú (D), URL Imagen Menú (E)]
 * Formato Día: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo
 * Tipos sugeridos: Clásico, Dieta, Ejecutivo
 */

const SH_MENU = "MENU";

/**
 * Responde a peticiones GET.
 */
function doGet(e) {
  return handleResponse({ success: true, message: "Servidor de Menú ACTIVO" });
}

/**
 * Responde a peticiones POST para obtener los datos.
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'getMenu') {
      return handleResponse(getMenuData());
    } else {
      return handleResponse({ success: false, message: "Acción no reconocida." });
    }
  } catch (err) {
    return handleResponse({ success: false, message: "Error en el servidor: " + err.toString() });
  }
}

/**
 * Obtiene todos los platos registrados en la hoja MENU.
 */
function getMenuData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SH_MENU);
    
    if (!sheet) {
      return { success: true, data: [] };
    }

    const values = sheet.getDataRange().getValues();
    const data = [];

    // Empezamos en 1 para saltar el encabezado
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row[0]) { // Si hay día definido
        data.push({
          day: row[0].toString().trim(),
          type: row[1] ? row[1].toString().trim() : "Clásico",
          name: row[2] ? row[2].toString().trim() : "",
          description: row[3] ? row[3].toString().trim() : "",
          imageUrl: row[4] ? row[4].toString().trim() : ""
        });
      }
    }

    return { success: true, data: data };
  } catch (e) {
    return { success: false, message: "Error leyendo datos del menú: " + e.toString() };
  }
}

function handleResponse(content) {
  return ContentService.createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON);
}
