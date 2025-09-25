// El email del usuario que se asume para pruebas locales desde el editor de Apps Script.
// Cámbialo por el email de un usuario de tu hoja de cálculo para probar.
const TEST_EMAIL = 'carlos.rodriguez@example.com';

/**
 * Función principal que se ejecuta cuando se accede a la URL del script.
 * Utiliza el método GET.
 */
function doGet(e) {
  try {
    // Intenta obtener el email del usuario que ha iniciado sesión en Google.
    // Esto funciona cuando el script se ejecuta como una aplicación web a la que accede un usuario.
    const activeUserEmail = Session.getActiveUser().getEmail();

    // Si no hay un usuario activo (por ejemplo, al probar desde el editor), usa el email de prueba.
    const emailForLookup = activeUserEmail || TEST_EMAIL;

    // Obtiene todos los datos de la hoja de cálculo.
    const allData = getAllDataFromSheets();

    // Filtra los datos para el usuario específico.
    const userData = filterDataForUser(allData, emailForLookup);

    // Devuelve los datos en formato JSON.
    return ContentService.createTextOutput(JSON.stringify(userData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // En caso de error, devuelve un mensaje de error en formato JSON.
    return ContentService.createTextOutput(JSON.stringify({ error: true, message: error.message, stack: error.stack }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Convierte un rango de datos de una hoja de cálculo a un array de objetos.
 * La primera fila del rango se usa como las claves (headers) de los objetos.
 */
function sheetRangeToObjects(range) {
  const values = range.getValues();
  if (values.length < 2) {
    return []; // No hay datos o solo hay encabezados.
  }
  const headers = values[0].map(h => h.trim());
  const data = values.slice(1);

  return data.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

/**
 * Obtiene todos los datos de todas las hojas relevantes.
 */
function getAllDataFromSheets() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const usersSheet = ss.getSheetByName('Usuarios');
    const tasksSheet = ss.getSheetByName('Misiones');
    const levelsSheet = ss.getSheetByName('Niveles');
    const avatarsSheet = ss.getSheetByName('Avatares');
    const placeholderSheet = ss.getSheetByName('PlaceholderImages');
    
    const users = sheetRangeToObjects(usersSheet.getDataRange());
    const tasks = sheetRangeToObjects(tasksSheet.getDataRange());
    const levels = sheetRangeToObjects(levelsSheet.getDataRange());
    const avatars = sheetRangeToObjects(avatarsSheet.getDataRange());
    const placeholderImages = sheetRangeToObjects(placeholderSheet.getDataRange());
    
    return {
        users: users,
        tasks: tasks,
        levels: levels,
        avatars: avatars,
        placeholderImages: placeholderImages
    };
}


/**
 * Filtra los datos para devolver solo la información relevante para un usuario.
 */
function filterDataForUser(allData, email) {
    const currentUser = allData.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!currentUser) {
        throw new Error('Usuario no encontrado en la base de datos.');
    }
    
    // Asegurarse de que los valores numéricos sean tratados como números.
    currentUser.level = Number(currentUser.level);
    currentUser.xp = Number(currentUser.xp);

    // Mapear el estado de las misiones para el usuario.
    // El estado viene de la hoja "Misiones", por lo que no es específico del usuario aquí.
    // Esto significa que el estado 'completed' o 'pending' es global para todas las misiones.
    const userTasks = allData.tasks.map(task => ({
        ...task,
        level: Number(task.level),
        xp: Number(task.xp),
        // El 'status' se toma directamente de la columna en la hoja 'Misiones'
        status: task.status || 'pending' 
    }));
    
    // Devolvemos todos los datos maestros (niveles, avatares) junto con los datos del usuario.
    return {
        currentUser: currentUser,
        users: allData.users,
        tasks: userTasks,
        levels: allData.levels.map(l => ({ ...l, id: Number(l.id), xpThreshold: Number(l.xpThreshold) })),
        avatars: allData.avatars.map(a => ({ ...a, id: Number(a.id), level: Number(a.level) })),
        placeholderImages: allData.placeholderImages
    };
}
