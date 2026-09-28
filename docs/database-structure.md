# Estructura de la Base de Datos (Google Sheets)

Tu hoja de cálculo debe tener las siguientes 3 pestañas con los encabezados exactos.

## Hoja 1: `USUARIOS`

| Columna | Nombre | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| A | **Nombre** | Nombre completo | `Juan Pérez` |
| B | **Correo** | Correo institucional | `jperez@banescoseguros.com` |
| C | **Rol** | Permisos (Case sensitive) | `Administrador` o `Usuario` |
| D | **Cargo** | Puesto laboral | `Asesor Integral` |
| E | **Cédula** | Contraseña de acceso | `12345678` |

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

### Configuración Crítica para evitar errores de conexión:
1. En el editor de Apps Script, ve a **Implementar > Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Ejecutar como: **Yo** (tu usuario de Banesco Seguros).
4. Quién tiene acceso: **Cualquier persona** (Esto permite que la web app reciba los datos del login).
5. Copia la **URL de la aplicación web** y pégala en `src/context/auth-context.tsx`.