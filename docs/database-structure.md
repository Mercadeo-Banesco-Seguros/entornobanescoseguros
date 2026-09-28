# Estructura de la Base de Datos (Google Sheets)

Para que el portal funcione correctamente, tu hoja de cálculo debe tener las siguientes pestañas y columnas exactas.

## Hoja 1: `USUARIOS`

| Columna | Nombre | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| A | **Nombre** | Nombre completo del colaborador | `Juan Pérez` |
| B | **Correo** | Correo institucional (obligatorio) | `jperez@banescoseguros.com` |
| C | **Rol** | Rol en el sistema | `Asesor` |
| D | **Fecha Nacimiento** | Fecha para el calendario | `15/08/1985` |
| E | **Cédula** | Se usará como contraseña de acceso | `12345678` |

---

## Hoja 2: `HISTORIAL`

Esta hoja se usa para la auditoría de accesos. Solo crea los encabezados, el script se encarga de llenarla.

| Columna | Nombre |
| :--- | :--- |
| A | **Timestamp** |
| B | **Correo** |
| C | **Cédula Intentada** |
| D | **Estatus** |
| E | **Datos Retornados** |

---

### Pasos para configurar:
1. Crea una nueva Google Sheet.
2. Nombra las pestañas como `USUARIOS` e `HISTORIAL` (en mayúsculas).
3. Copia el código de `docs/apps-script.js` en **Extensiones > Apps Script**.
4. Sustituye `TU_ID_DE_HOJA_DE_CALCULO_AQUI` por el ID que aparece en la URL de tu hoja.
5. Haz clic en **Implementar > Nueva implementación**.
6. Tipo: **Aplicación Web**.
7. Ejecutar como: **Tú**.
8. Quién tiene acceso: **Cualquier persona**.
9. Copia la **URL de la aplicación web** y pégala en `src/context/auth-context.tsx`.
