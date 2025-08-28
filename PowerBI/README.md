Power BI - Guía rápida
1. Abrir Power BI Desktop.
2. Obtener datos -> Blank Query.
3. Ir a 'Advanced Editor' y pegar el contenido de PowerQuery_M.txt.
4. Cargar la consulta. Esto traerá la tabla de ventas desde la API.
5. En Power Query, use 'Unpivot Other Columns' si necesita crear dimensiones desde columnas adicionales.
6. Crear tablas de dimensiones (DimProducto, DimFecha) y la tabla de hechos FctVentas:
   - DimProducto: tabla de productos únicos con key numérica.
   - DimFecha: calendario con Year, Month, Day, Quarter.
   - FctVentas: usar la tabla importada, agregar claves numéricas que referencien DimProducto y DimFecha.
7. Relaciones: DimFecha(1) -> FctVentas(*), DimProducto(1) -> FctVentas(*).
8. Visualizaciones requeridas:
   - Ventas Totales por Mes: Column chart (X: Month, Y: Sum Total).
   - Ventas por Producto: Bar/Pie (Product vs Sum Total).
   - Evolución de Ventas: Line (Date vs cumulative Total).
   - Comparativo Cantidad por Producto: Clustered Bar (Product vs Sum Cantidad).
   - Precio promedio por producto: Table or Column (Product vs Average Precio Unitario).