-- SQLite schema for table 'ventas'
DROP TABLE IF EXISTS ventas;
CREATE TABLE ventas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha TEXT NOT NULL, -- stored as YYYY-MM-DD
  producto TEXT NOT NULL,
  cantidad REAL NOT NULL,
  precio_unitario REAL NOT NULL,
  total REAL NOT NULL,
  created_at DATETIME DEFAULT (datetime('now','localtime'))
);
-- Index for faster queries by fecha/producto
CREATE INDEX idx_ventas_fecha ON ventas (fecha);
CREATE INDEX idx_ventas_producto ON ventas (producto);