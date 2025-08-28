# Prueba PBI - Proyecto Final
**Entrega:** Proyecto completo para prueba técnica (backend + frontend + scripts SQL + Power BI helpers)

**Autor:** Ing. David Sulim Garcia Casimbe

---

## Contenido del repositorio
- `server.js` - Backend en Node.js + Express para recibir archivos y exponer API.
- `package.json` - Dependencias.
- `schema.sql` - Script SQL para crear la tabla `ventas` (SQLite).
- `ventas.db` - (no incluida por defecto) archivo SQLite generado al correr el servidor.
- `uploads/` - Carpeta temporal para archivos subidos.
- `frontend/index.html` - Interfaz Vue 3 (CDN) con formulario de carga y vista de datos.
- `frontend/` - carpeta con la interfaz (usa Tailwind CDN).
- `Ventas.csv` - Archivo provisto con datos de ejemplo (copia del entregado).
- `PowerBI/` - Scripts y guía para crear el reporte en Power BI Desktop.
- `Prueba_PBI_Proyecto_Final.zip` - Archivo ZIP final (este archivo que estás descargando).

---

## Cómo ejecutar (local)
1. Tener Node.js (>=16).
2. En la carpeta raíz del proyecto:
   ```bash
   npm install
   node server.js
   ```
   El servidor correrá en `http://localhost:3000`.

3. Abrir `frontend/index.html` en el navegador (puede servirlo con `Live Server` o abrir directamente el archivo).
   - Subir el archivo `Ventas.csv` o un `.xlsx` con las columnas: `Fecha, Producto, Cantidad, Precio Unitario, Total`.
   - Tras la carga, los datos se guardarán en `ventas.db` (SQLite) y se mostrarán en la tabla de la interfaz.

---

## Estructura de la base de datos (schema.sql)
La tabla principal es `ventas` con columnas:
- `id` INTEGER PRIMARY KEY
- `fecha` TEXT (YYYY-MM-DD)
- `producto` TEXT
- `cantidad` REAL
- `precio_unitario` REAL
- `total` REAL
- `created_at` DATETIME

---

## API
- `POST /api/ventas/upload` -> Espera un form-data con campo `file` (csv/xlsx/xls). Inserta registros válidos.
- `GET /api/ventas` -> Retorna todos los registros en JSON.

---

## Power BI - instrucciones y script (PowerBI/README.md)
Dentro de la carpeta `PowerBI` se incluye un script Power Query (M) y pasos para conectar Power BI a la API creada y generar las visualizaciones requeridas: Ventas por Mes, Ventas por Producto, Evolución de Ventas, Comparativo de Cantidad Vendida por Producto, Precio promedio por producto.

**Nota importante:** No es posible generar un archivo `.pbix` desde este entorno. En su lugar incluí:
- `PowerBI/PowerQuery_M.txt` -> código M para pegar en Power Query (Get Data -> Blank Query -> Advanced Editor).
- Guía paso a paso para crear las visualizaciones y modelo estrella.

---

## Listo para GitHub
Incluí un `.gitignore` (node_modules, ventas.db, uploads) y un README para que puedas subir directamente.

---

## Observaciones y limitaciones
- Se creó el backend en Node.js por portabilidad. Si prefieres Laravel (PHP) lo puedo convertir, pero eso llevaría trabajo adicional.
- No pude generar un archivo `.pbix` en este entorno; sin embargo, la carpeta `PowerBI` contiene todo lo necesario para construir el reporte localmente en Power BI Desktop.
- El frontend incluye la leyenda solicitada: **"Elaborado por Ing. David Sulim Garcia Casimbe"** visible en la interfaz.