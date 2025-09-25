// Versión 1.1

// Esta función se ejecuta cuando se recibe una solicitud POST en la URL de despliegue.
function doPost(e) {
  try {
    // Abre la hoja de cálculo activa. Asegúrate de que este script esté vinculado
    // a la hoja de cálculo de Google Sheets correcta.
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Lee los datos de cada una de las hojas.
    const usersData = getDataFromSheet(ss.getSheetByName('Usuarios'));
    const tasksData = getDataFromSheet(ss.getSheetByName('Misiones'));
    const levelsData = getDataFromSheet(ss.getSheetByName('Niveles'));
    const avatarsData = getDataFromSheet(ss.getSheetByName('Avatares'));
    const placeholderImagesData = getDataFromSheet(ss.getSheetByName('PlaceholderImages'));
    
    // Construye el objeto de respuesta final que la aplicación espera.
    const responseData = {
      users: usersData,
      tasks: tasksData,
      levels: levelsData,
      avatars: avatarsData,
      placeholderImages: placeholderImagesData
    };

    // Convierte el objeto a una cadena JSON y lo devuelve con el tipo de contenido correcto.
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // En caso de error, registra el error en los logs de Apps Script y devuelve
    // una respuesta de error en formato JSON.
    Logger.log(error.toString());
    return ContentService.createTextOutput(JSON.stringify({ error: 'No se pudieron obtener los datos.', details: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Esta función se ejecuta cuando se recibe una solicitud GET (útil para pruebas rápidas desde el navegador).
function doGet(e) {
  // Simplemente llama a doPost para mantener una sola lógica.
  return doPost(e);
}

/**
 * Función auxiliar para convertir los datos de una hoja de cálculo en un array de objetos.
 * La primera fila de la hoja se usa como las claves (headers) para los objetos.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - La hoja de la que se van a extraer los datos.
 * @returns {Array<Object>} Un array de objetos, donde cada objeto representa una fila.
 */
function getDataFromSheet(sheet) {
  if (!sheet) return [];

  // Obtiene todos los datos de la hoja.
  const data = sheet.getDataRange().getValues();
  
  // La primera fila contiene los encabezados (ej: 'name', 'email', 'xp').
  const headers = data.shift();
  
  // Convierte cada fila en un objeto usando los encabezados como claves.
  return data.map(function(row) {
    const obj = {};
    headers.forEach(function(header, index) {
      obj[header] = row[index];
    });
    return obj;
  });
}
