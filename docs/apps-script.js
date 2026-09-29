// Archivo listo para el nuevo diseño de lógica de servidor.
// Pendiente instrucciones del usuario.

function doGet(e) {
  return ContentService.createTextOutput("Servidor de Autenticación en espera de configuración...")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  return ContentService.createTextOutput("Servidor de Autenticación en espera de configuración...")
    .setMimeType(ContentService.MimeType.TEXT);
}
