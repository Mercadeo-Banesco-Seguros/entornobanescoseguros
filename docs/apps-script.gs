/**
 * @OnlyCurrentDoc
 *
 * El código anterior le indica a Apps Script que este secuencia de comandos solo necesita acceso al archivo actual.
 * Esto se muestra al usuario cuando se le solicita que autorice la secuencia de comandos.
 */

/**
 * Convierte un rango de una hoja de cálculo en un array de objetos.
 * La primera fila del rango se utiliza como las claves de los objetos.
 *
 * @param {Object[][]} data El rango de datos de la hoja.
 * @return {Object[]} Un array de objetos.
 */
function sheetDataToObjects(data) {
  const headers = data[0];
  const objects = [];
  for (let i = 1; i < data.length; i++) {
    const object = {};
    for (let j = 0; j < headers.length; j++) {
      if (headers[j]) { // Asegurarse de que el encabezado no esté vacío
        object[headers[j]] = data[i][j];
      }
    }
    objects.push(object);
  }
  return objects;
}


/**
 * Maneja las solicitudes POST al script.
 * Lee los datos de varias hojas y los devuelve como una respuesta JSON.
 *
 * @param {Object} e El objeto de evento de la solicitud POST.
 * @return {ContentService.TextOutput} La respuesta JSON.
 */
function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // Obtener datos de cada hoja
    const usersSheet = spreadsheet.getSheetByName("Users");
    const tasksSheet = spreadsheet.getSheetByName("Tasks");
    const levelsSheet = spreadsheet.getSheetByName("Levels");
    const avatarsSheet = spreadsheet.getSheetByName("Avatars");
    const placeholderImagesSheet = spreadsheet.getSheetByName("PlaceholderImages");
    
    // Validar que todas las hojas existan
    if (!usersSheet || !tasksSheet || !levelsSheet || !avatarsSheet || !placeholderImagesSheet) {
      throw new Error("Una o más hojas requeridas no se encontraron. Asegúrate de que existan las hojas: Users, Tasks, Levels, Avatars, PlaceholderImages.");
    }

    // Convertir datos a objetos
    const usersData = sheetDataToObjects(usersSheet.getDataRange().getValues());
    const tasksData = sheetDataToObjects(tasksSheet.getDataRange().getValues());
    const levelsData = sheetDataToObjects(levelsSheet.getDataRange().getValues());
    const avatarsData = sheetDataToObjects(avatarsSheet.getDataRange().getValues());
    const placeholderImagesData = sheetDataToObjects(placeholderImagesSheet.getDataRange().getValues());

    const responseData = {
      users: usersData,
      tasks: tasksData,
      levels: levelsData,
      avatars: avatarsData,
      placeholderImages: placeholderImagesData,
    };
    
    // Preparar y devolver la respuesta JSON
    const jsonResponse = JSON.stringify(responseData);
    
    return ContentService.createTextOutput(jsonResponse)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Manejo de errores
    Logger.log(error.toString());
    const errorResponse = JSON.stringify({ 
      error: 'Ha ocurrido un error en el servidor de Apps Script.', 
      message: error.toString() 
    });

    return ContentService.createTextOutput(errorResponse)
      .setMimeType(ContentService.MimeType.JSON)
      // Aunque es un error, lo devolvemos con un código 200 para que el cliente
      // pueda procesar el mensaje de error JSON.
      // Un manejo más avanzado implicaría códigos de estado HTTP,
      // pero esto es más simple para Google Sites.
  }
}
