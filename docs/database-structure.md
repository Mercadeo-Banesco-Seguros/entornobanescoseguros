# Estructura de la Base de Datos (Google Sheets)

Tu hoja de cálculo debe tener las siguientes 3 pestañas con los encabezados exactos.

## Hoja 1: `USUARIOS` (Solo 5 columnas)

| Columna | Nombre | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| A | **Nombre** | Nombre completo del colaborador | `Juan Pérez` |
| B | **Correo** | Correo institucional (@banescoseguros.com) | `jperez@banescoseguros.com` |
| C | **Rol** | Administrador o Usuario | `Administrador` |
| D | **Cargo** | Puesto laboral | `Asesor Integral` |
| E | **Cédula** | Se usa como contraseña de acceso | `12345678` |

---

## Hoja 2: `HISTORIAL`

| Columna | Nombre |
| :--- | :--- |
| A | **Timestamp** |
| B | **Correo** |
| C | **Acción** |
| D | **Estatus** |
| E | **Detalles** |

---

## Hoja 3: `CARGOS`

| Columna | Nombre |
| :--- | :--- |
| A | **Nombre del Cargo** |

---

### Configuración de Implementación (IMPORTANTE):
1. En el editor de Apps Script, ve a **Implementar > Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Ejecutar como: **Yo**.
4. Quién tiene acceso: **Cualquier persona de [Tu Organización]**.
5. **PASO CRÍTICO**: Una vez implementado, abre la URL del script en tu navegador. Si ves el mensaje "El script está ACTIVO", la sesión de Google ha quedado vinculada y la app ya podrá comunicarse con la hoja.
