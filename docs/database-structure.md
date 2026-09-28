# Estructura de la Base de Datos (Google Sheets)

Tu hoja de cálculo debe tener las siguientes 3 pestañas con los encabezados exactos.

## Hoja 1: `USUARIOS`

| Columna | Nombre | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| A | **Nombre** | Nombre completo | `Juan Pérez` |
| B | **Correo** | Correo institucional | `jperez@banescoseguros.com` |
| C | **Rol** | Permisos en la app | `Administrador` o `Usuario` |
| D | **Fecha Nacimiento**| Cumpleaños | `15/08/1985` |
| E | **Cargo** | Puesto laboral | `Asesor Integral` |
| F | **Cédula** | Contraseña de acceso | `12345678` |

---

## Hoja 2: `HISTORIAL`

Auditoría de accesos. Crea solo los encabezados.

| Columna | Nombre |
| :--- | :--- |
| A | **Timestamp** |
| B | **Correo** |
| C | **Acción** |
| D | **Estatus** |
| E | **Detalles** |

---

## Hoja 3: `CARGOS`

Lista de cargos válidos en la organización.

| Columna | Nombre |
| :--- | :--- |
| A | **Nombre del Cargo** |

---

### Configuración:
1. Crea la hoja con estas 3 pestañas.
2. Copia el código de `docs/apps-script.js` en **Extensiones > Apps Script**.
3. Reemplaza `SPREADSHEET_ID` por el ID de tu hoja.
4. **Implementar > Nueva implementación > Aplicación Web**.
5. Ejecutar como: **Tú**. Acceso: **Cualquier persona**.
6. Pega la URL generada en `src/context/auth-context.tsx`.
