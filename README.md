# 📊 Prueba PBI - Proyecto Final

🚀 Proyecto de prueba técnica que integra **backend en Node.js + Express**, una **base de datos SQLite**, un **frontend con Vue 3 y TailwindCSS**, y soporte para generar reportes en **Power BI**.

---

## 📂 Contenido del proyecto

- ⚙️ **Backend (Node.js + Express)**  
  - `server.js` → Servidor principal con endpoints de carga y consulta de ventas.  
  - `schema.sql` → Script SQL para la creación de la tabla `ventas`.  
  - `ventas.db` → Base de datos SQLite (se genera al correr el servidor).  

- 💻 **Frontend (Vue 3 + Tailwind)**  
  - `frontend/index.html` → Interfaz web para cargar archivos y visualizar ventas.  

- 📑 **Datos de prueba**  
  - `Ventas.csv` → Archivo de ventas para pruebas iniciales.  

- 📈 **Power BI**  
  - `PowerQuery_M.txt` → Script M para consumir la API en Power BI.  
  - `README.md` → Guía paso a paso para crear el modelo y visualizaciones.  

- 📝 **Documentación**  
  - `README.md` → Este archivo con instrucciones y detalles del proyecto.  
  - `.gitignore` → Configuración lista para repositorio en GitHub.  

---

## ⚙️ Instalación y ejecución

1. Clonar este repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   cd Prueba_PBI_Proyecto_Final

2. Instalar dependencias: 
   - npm install

3. Ejecutar el servidor: 
   - node server.js

Servidor disponible en: http://localhost:3000

4. Abrir la interfaz:

   - Ir a la carpeta frontend.

   - Abrir index.html en el navegador (se recomienda usar VS  Code con la extensión Live Server).

📡 Endpoints disponibles

      POST /api/ventas/upload
      Sube un archivo .csv o .xlsx con las columnas:

      Fecha, Producto, Cantidad, Precio Unitario, Total


      GET /api/ventas
      Devuelve todas las ventas almacenadas en formato JSON.
📊 Power BI

Abrir Power BI Desktop.

Ir a Obtener datos → Consulta en blanco → Editor avanzado.

Pegar el contenido de PowerQuery_M.txt.

Conectar y cargar datos desde la API (http://localhost:3000/api/ventas).

Crear el modelo estrella y las visualizaciones:

📅 Ventas por Mes

📦 Ventas por Producto

📈 Evolución de Ventas

⚖️ Comparativo de Cantidad por Producto

💲 Precio promedio por Producto

🎨 Interfaz

La interfaz web incluye:

📤 Carga de archivos (.csv, .xlsx, .xls)

📋 Visualización de ventas en tabla

🔄 Botón para refrescar datos

✨ Diseño con TailwindCSS

Elaborado por Ing. David Sulim Garcia Casimbe