# Estructura de la Base de Datos en Google Sheets

Para que el Google Apps Script funcione correctamente, tu hoja de cálculo debe contener exactamente las siguientes hojas (pestañas) y columnas. Los nombres deben ser idénticos y sin espacios adicionales.

### Hoja: `USUARIOS`

Contiene la información de autenticación de cada usuario.

| Columna | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `Nombre` | Nombre completo del usuario. | `Carlos Rodríguez` |
| `Correo` | Correo electrónico del usuario (único). | `carlos.rodriguez@example.com` |
| `Contraseña` | Contraseña elegida por el usuario. | `secreto123` |

---

### Hoja: `DATA`

Contiene la información pública y el progreso de cada usuario para el ranking.

| Columna  | Descripción                               | Ejemplo                      |
| :------- | :---------------------------------------- | :--------------------------- |
| `Nombre`   | Nombre completo del usuario.              | `Carlos Rodríguez`           |
| `Correo`   | Correo electrónico del usuario (único).   | `carlos.rodriguez@example.com` |
| `Sexo`     | Sexo del usuario (ej. "Masculino", "Femenino"). | `Masculino`                  |
| `Puntaje`  | Puntos de experiencia (CONECTCOINS) acumulados. | `850`                        |
| `Nivel`    | Nivel numérico actual del usuario.        | `1`                          |
| `Avatar`   | Nombre del avatar actual del usuario.     | `Explorador`                 |


### Hoja: `Misiones`

Contiene la lista de todas las misiones disponibles en el juego.

| Columna       | Descripción                                  | Ejemplo                                                  |
| :------------ | :------------------------------------------- | :------------------------------------------------------- |
| `title`       | Título de la misión.                         | `Participación en capacitaciones o actividades de integración` |
| `description` | Breve explicación de la misión.              | `Asiste a eventos que fortalecen al equipo.`             |
| `level`       | Nivel requerido para esta misión.            | `1`                                                      |
| `xp`          | Puntos de experiencia que otorga la misión.  | `10`                                                     |
| `status`      | Estado de la misión para el usuario.         | `completed` o `pending`                                  |

### Hoja: `Niveles`

Define los diferentes niveles o mundos del juego.

| Columna        | Descripción                                    | Ejemplo                                   |
| :------------- | :--------------------------------------------- | :---------------------------------------- |
| `id`           | Identificador numérico único para el nivel.    | `1`                                       |
| `name`         | Nombre del nivel.                              | `Nivel 1`                                 |
| `xpThreshold`  | XP necesarios para alcanzar este nivel.        | `1000`                                    |
| `worldName`    | Nombre temático del mundo.                     | `Las Selvas Exteriores`                   |
| `worldImageId` | ID que conecta con una imagen de `PlaceholderImages`. | `world-level-1`                           |
| `story`        | Narrativa o historia del nivel.                | `Bienvenido a las Selvas Exteriores...`     |

### Hoja: `Avatares`

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

### Hoja: `Premios` (NUEVA)

Contiene los premios disponibles para canjear en el "Cajero".

| Columna     | Descripción                               | Ejemplo                                   |
| :---------- | :---------------------------------------- | :---------------------------------------- |
| `id`        | ID único del premio.                      | `1`                                       |
| `name`      | Nombre del premio.                        | `Taza de Explorador`                      |
| `description` | Descripción del premio.                   | `Una taza para tus bebidas calientes.`    |
| `cost`      | Costo en CONECTCOINS.                     | `100`                                     |
| `imageUrl`  | URL de la imagen del premio.              | `https://.../taza.png?raw=true`           |

### Hoja: `Canjes` (NUEVA)

Registra cada vez que un usuario canjea un premio.

| Columna     | Descripción                               | Ejemplo                        |
| :---------- | :---------------------------------------- | :----------------------------- |
| `idCanje`   | ID único del canje (puede ser un timestamp). | `1678886400000`                |
| `correoUsuario` | Correo del usuario que hizo el canje.     | `carlos.rodriguez@example.com` |
| `idPremio`  | ID del premio canjeado.                   | `1`                            |
| `nombrePremio` | Nombre del premio canjeado.               | `Taza de Explorador`           |
| `costo`     | Costo del premio en CONECTCOINS.          | `100`                          |
| `fecha`     | Fecha y hora del canje.                   | `2023-03-15 12:00:00`          |
