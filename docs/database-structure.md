# Estructura de la Base de Datos (Google Sheets)

Tu hoja de cálculo debe tener las siguientes pestañas con los nombres exactos:

## Hoja 1: `Users`
| Columna | Nombre | Descripción |
| :--- | :--- | :--- |
| A | **Email** | Correo @banescoseguros.com |
| B | **Password** | Cédula de Identidad |

## Hoja 2: `Access Logs`
| Columna | Nombre |
| :--- | :--- |
| A | **Timestamp** |
| B | **Email** |
| C | **Action** |
| D | **Status** |

## Hoja 3: `Calendar Events`
(Pendiente configurar columnas según necesidad de la app)

## Hoja 4: `Menu`
(Pendiente configurar columnas según necesidad de la app)

---

### Configuración del Script:
1. Pega el código de `apps-script.js`.
2. **Implementar > Nueva implementación**.
3. Tipo: **Aplicación Web**.
4. Ejecutar como: **Yo**.
5. Acceso: **Cualquier persona de [Tu Organización]**.
6. Copia la URL y ponla en el archivo `.env.local`.