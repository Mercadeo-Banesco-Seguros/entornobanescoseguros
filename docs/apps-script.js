// ------------------- CONFIGURACIÓN -------------------
// 1. Reemplaza esta URL con la URL de tu hoja de cálculo de Google.
const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/10t2ToIlBben3d-IN9P3g-k5wu5hGRzlo1Tg2ch-4Xo4/edit#gid=1042210733"; 

// 2. Define los nombres de las hojas que usarás. Deben coincidir EXACTAMENTE.
const SHEET_NAMES = {
  CANJES: "Canjes" // Hoja para registrar canjes
};
// -----------------------------------------------------


// --- NO EDITAR DEBAJO DE ESTA LÍNEA ---

const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);

/**
 * Función para manejar las peticiones OPTIONS (preflight de CORS).
 */
function doOptions(e) {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .withHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
}

/**
 * Crea una respuesta JSON estándar con las cabeceras CORS correctas.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .withHeaders({ 'Access-Control-Allow-Origin': '*' });
}

/**
 * Función principal que maneja las peticiones POST.
 */
function doPost(e) {
  let requestData;
  try {
    if (e.postData && e.postData.contents) {
        requestData = JSON.parse(e.postData.contents);
    } else {
        requestData = e.parameter;
    }
  } catch (error) {
    return createJsonResponse({ error: true, message: `Petición inválida. Se esperaba un JSON. Contenido recibido: ${e.postData ? e.postData.contents : 'ninguno'}` });
  }

  try {
    const action = requestData.action;

    if (action === 'registerPurchase') {
      return handleRegisterPurchase(requestData);
    } else {
      return createJsonResponse({ error: true, message: "Acción no reconocida." });
    }
  } catch (error) {
    Logger.log(`Error en doPost: ${error.toString()}\nStack: ${error.stack}`);
    return createJsonResponse({ error: true, message: `Error en el servidor: ${error.toString()}` });
  }
}

/**
 * La función doGet se mantiene para pruebas.
 */
function doGet(e) {
    return createJsonResponse({ info: "El script de Bazar está activo. Usa peticiones POST con la acción 'registerPurchase'." });
}


/**
 * Maneja el registro de una nueva compra/canje.
 */
function handleRegisterPurchase(data) {
  const { userId, prizeId, prizeName, cost } = data;
  if (!userId || !prizeId || !prizeName || cost === undefined) {
    return createJsonResponse({ error: true, message: "Faltan datos para registrar el canje." });
  }

  const canjesSheet = spreadsheet.getSheetByName(SHEET_NAMES.CANJES);
  if (!canjesSheet) {
    return createJsonResponse({ error: true, message: `La hoja "${SHEET_NAMES.CANJES}" no fue encontrada.` });
  }
  
  try {
    const idCanje = new Date().getTime(); // ID único basado en timestamp
    const fecha = new Date();

    // Columnas: idCanje, correoUsuario, idPremio, nombrePremio, costo, fecha
    canjesSheet.appendRow([idCanje, userId, prizeId, prizeName, cost, fecha]);

    return createJsonResponse({ success: true, message: "Canje registrado exitosamente en la hoja Canjes." });
  } catch (error) {
     Logger.log(`Error en handleRegisterPurchase: ${error.toString()}\nStack: ${error.stack}`);
     return createJsonResponse({ error: true, message: `No se pudo registrar el canje: ${error.toString()}` });
  }
}
