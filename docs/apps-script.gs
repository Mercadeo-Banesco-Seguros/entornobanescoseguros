/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// --- CONFIGURACIÓN ---
// REEMPLAZA ESTO con el ID de tu Hoja de Cálculo de Google.
const SPREADSHEET_ID = "ID_DE_TU_HOJA_DE_CALCULO"; 

// --- NOMBRES DE LAS HOJAS ---
// Asegúrate de que estos nombres coincidan EXACTAMENTE con los nombres de las pestañas en tu Google Sheet.
const SHEET_NAMES = {
  USERS: "DATA",
  TASKS: "Misiones",
  LEVELS: "Niveles",
  AVATARS: "Avatares",
  PLACEHOLDER_IMAGES: "PlaceholderImages"
};

/**
 * Función principal que se ejecuta cuando un usuario visita la URL de la aplicación web.
 * Permite peticiones GET y devuelve los datos del juego en formato JSON.
 * @param {GoogleAppsScript.Events.DoGet} e - El objeto de evento de la petición GET.
 * @returns {GoogleAppsScript.Content.TextOutput} - La respuesta JSON.
 */
function doGet(e) {
  try {
    const userEmail = Session.getActiveUser().getEmail();

    if (!userEmail) {
      return createJsonResponse({ 
        error: true, 
        message: "No se pudo obtener el correo del usuario. El usuario debe estar logueado en una cuenta de Google Workspace." 
      }, 401);
    }
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Obtener todos los datos de las hojas
    const allUsers = getSheetData(spreadsheet, SHEET_NAMES.USERS);
    const allTasks = getSheetData(spreadsheet, SHEET_NAMES.TASKS);
    const allLevels = getSheetData(spreadsheet, SHEET_NAMES.LEVELS);
    const allAvatars = getSheetData(spreadsheet, SHEET_NAMES.AVATARS);
    const allPlaceholderImages = getSheetData(spreadsheet, SHEET_NAMES.PLACEHOLDER_IMAGES);

    // Encontrar al usuario actual
    // Los encabezados en la hoja DATA son: Nombre, Correo, Sexo, Puntaje, Nivel, Avatar
    const currentUserData = allUsers.find(row => row.Correo && row.Correo.toLowerCase() === userEmail.toLowerCase());

    if (!currentUserData) {
      return createJsonResponse({ 
        error: true, 
        message: `Usuario con correo '${userEmail}' no encontrado en la hoja '${SHEET_NAMES.USERS}'.`
      }, 404);
    }

    // Formatear los datos del usuario para que coincidan con la estructura que espera la app
    const currentUser = {
      id: allUsers.indexOf(currentUserData) + 1, // Generar un ID simple
      name: currentUserData.Nombre,
      email: currentUserData.Correo,
      level: parseInt(currentUserData.Nivel, 10),
      xp: parseInt(currentUserData.Puntaje, 10),
      avatar: currentUserData.Avatar
    };

    // Formatear todos los usuarios para la página de Ranking
    const usersForRanking = allUsers.map((row, index) => ({
      id: index + 1,
      name: row.Nombre,
      email: row.Correo,
      level: parseInt(row.Nivel, 10),
      xp: parseInt(row.Puntaje, 10),
      avatar: row.Avatar
    }));

    // Estructurar la respuesta final
    const responsePayload = {
      currentUser: currentUser,
      users: usersForRanking,
      tasks: allTasks,
      levels: allLevels,
      avatars: allAvatars,
      placeholderImages: allPlaceholderImages
    };

    return createJsonResponse(responsePayload);

  } catch (error) {
    Logger.log(error.toString());
    return createJsonResponse({ 
      error: true, 
      message: "Ha ocurrido un error interno en el servidor.",
      details: error.toString()
    }, 500);
  }
}

/**
 * Convierte una hoja de cálculo en un array de objetos JSON.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet - La hoja de cálculo activa.
 * @param {string} sheetName - El nombre de la hoja a procesar.
 * @returns {Array<Object>} - Un array de objetos, donde cada objeto representa una fila.
 */
function getSheetData(spreadsheet, sheetName) {
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`La hoja con el nombre "${sheetName}" no fue encontrada.`);
  }
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const headers = values.shift(); // La primera fila son los encabezados

  return values.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      // Si el valor es numérico, lo convertimos.
      obj[header] = !isNaN(row[index]) && row[index] !== '' ? Number(row[index]) : row[index];
    });
    return obj;
  });
}

/**
 * Crea una respuesta JSON estandarizada.
 * @param {Object} payload - El objeto a convertir en JSON.
 * @param {number} [statusCode=200] - El código de estado HTTP.
 * @returns {GoogleAppsScript.Content.TextOutput} - La respuesta en formato JSON.
 */
function createJsonResponse(payload, statusCode = 200) {
  // Aunque Apps Script no maneja códigos de estado HTTP directamente en `doGet`,
  // es una buena práctica tenerlo por si se usa en otros contextos.
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
