# Estructura de la Base de Datos (Google Sheets)

Tu hoja de cálculo debe tener las siguientes 3 pestañas con los encabezados exactos.

## Hoja 1: `USUARIOS`

| Columna | Nombre | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| A | **Nombre** | Nombre completo | `Juan Pérez` |
| B | **Correo** | Correo institucional | `jperez@banescoseguros.com` |
| C | **Rol** | Administrador o Usuario | `Administrador` |
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

### Configuración Crítica para Organizaciones:
1. En el editor de Apps Script, ve a **Implementar > Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Ejecutar como: **Yo**.
4. Quién tiene acceso: **Cualquier persona de [Tu Organización]**.
5. **IMPORTANTE**: Para que el portal pueda conectar, el usuario debe haber iniciado sesión en su cuenta de Google del trabajo en el mismo navegador antes de entrar a la aplicación.
