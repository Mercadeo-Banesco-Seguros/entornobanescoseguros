# Estructura de la Base de Datos en Google Sheets

Para que el Google Apps Script funcione correctamente, tu hoja de cálculo debe contener exactamente las siguientes hojas (pestañas) y columnas. Los nombres deben ser idénticos.

### Hoja: `Users`

Contiene la información de cada usuario participante.

| Columna | Descripción                               | Ejemplo                      |
| :------ | :---------------------------------------- | :--------------------------- |
| `name`    | Nombre completo del usuario.              | `Carlos Rodríguez`           |
| `email`   | Correo electrónico del usuario.           | `carlos.rodriguez@example.com` |
| `level`   | Nivel actual del usuario (numérico).      | `1`                          |
| `xp`      | Puntos de experiencia acumulados.         | `850`                        |
| `avatar`  | Nombre del avatar actual.                 | `Explorador`                 |

### Hoja: `Tasks`

Contiene la lista de todas las misiones disponibles en el juego.

| Columna       | Descripción                                  | Ejemplo                                                  |
| :------------ | :------------------------------------------- | :------------------------------------------------------- |
| `title`       | Título de la misión.                         | `Participación en capacitaciones o actividades de integración` |
| `description` | Breve explicación de la misión.              | `Asiste a eventos que fortalecen al equipo.`             |
| `level`       | Nivel requerido para esta misión.            | `1`                                                      |
| `xp`          | Puntos de experiencia que otorga la misión.  | `10`                                                     |
| `status`      | Estado de la misión para el usuario.         | `completed` o `pending`                                  |

### Hoja: `Levels`

Define los diferentes niveles o mundos del juego.

| Columna        | Descripción                                    | Ejemplo                                   |
| :------------- | :--------------------------------------------- | :---------------------------------------- |
| `id`           | Identificador numérico único para el nivel.    | `1`                                       |
| `name`         | Nombre del nivel.                              | `Nivel 1`                                 |
| `xpThreshold`  | XP necesarios para alcanzar este nivel.        | `1000`                                    |
| `worldName`    | Nombre temático del mundo.                     | `Las Selvas Exteriores`                   |
| `worldImageId` | ID que conecta con una imagen de `PlaceholderImages`. | `world-level-1`                           |
| `story`        | Narrativa o historia del nivel.                | `Bienvenido a las Selvas Exteriores...`     |

### Hoja: `Avatars`

Define las evoluciones o avatares que el usuario puede desbloquear.

| Columna       | Descripción                                  | Ejemplo                                                 |
| :------------ | :------------------------------------------- | :------------------------------------------------------ |
| `id`          | Identificador numérico único para el avatar. | `1`                                                     |
| `name`        | Nombre del avatar.                           | `Explorador`                                            |
| `level`       | Nivel en el que se desbloquea este avatar.   | `1`                                                     |
| `imageUrl`    | URL de la imagen del avatar.                 | `https://.../AVATAR%20HOMBRE1.png?raw=true`            |
| `description` | Breve historia o descripción del avatar.     | `Inicia su viaje, lleno de curiosidad...`               |

### Hoja: `PlaceholderImages`

Contiene las URLs de las imágenes para los mundos.

| Columna     | Descripción                               | Ejemplo                                   |
| :---------- | :---------------------------------------- | :---------------------------------------- |
| `id`        | ID único de la imagen.                    | `world-level-1`                           |
| `description` | Descripción de la imagen.                 | `Las Selvas Exteriores`                   |
| `imageUrl`  | URL de la imagen.                         | `https://.../primer%20nivel.png?raw=true` |
| `imageHint` | Pista para la IA (opcional).              | `jungle ruins`                            |
