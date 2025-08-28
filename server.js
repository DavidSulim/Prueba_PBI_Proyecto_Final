/*
  Simple Express backend to:
  - Accept uploads (Excel .xlsx/.xls or CSV) at POST /api/ventas/upload
  - Parse file and insert rows into SQLite 'ventas' table
  - Expose GET /api/ventas to return JSON of ventas
  - SQLite DB file: ventas.db
*/
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const xlsx = require('xlsx');

const app = express();
app.use(cors());
app.use(express.json());

const UPLOADS_FOLDER = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_FOLDER)) fs.mkdirSync(UPLOADS_FOLDER);

const upload = multer({
  dest: UPLOADS_FOLDER,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

// Initialize SQLite DB
const DB_FILE = path.join(__dirname, 'ventas.db');
const db = new sqlite3.Database(DB_FILE);
const initSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.serialize(() => {
  db.exec(initSQL, (err) => {
    if (err) console.error('DB init error:', err);
  });
});

// Helper: validate headers
function validateHeaders(headers) {
  const required = ['Fecha','Producto','Cantidad','Precio Unitario','Total'];
  // Normalize headers: trim
  const hNorm = headers.map(h => h.toString().trim());
  return required.every(r => hNorm.includes(r));
}

function parseDate(value) {
  // attempt to parse many formats; store as ISO string (yyyy-mm-dd)
  const d = new Date(value);
  if (!isNaN(d.getTime())) {
    return d.toISOString().slice(0,10);
  }
  return null;
}

app.post('/api/ventas/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const allowed = ['.csv','.xlsx','.xls'];
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Invalid file type. Use .csv, .xlsx or .xls' });
    }

let records = [];
if (ext === '.csv') {
  const content = fs.readFileSync(req.file.path);
  await new Promise((resolve, reject) => {
    parse(content, { columns: true, trim: true }, (err, data) => {
      if (err) return reject(err);
      records = data;
      resolve();
    });
  });
} else {
  // parse excel using xlsx
  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  records = xlsx.utils.sheet_to_json(sheet, { defval: null });
}


    if (records.length === 0) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'File contains no rows' });
    }

    // validate headers
    const headers = Object.keys(records[0]);
    if (!validateHeaders(headers)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Invalid headers. Required: Fecha, Producto, Cantidad, Precio Unitario, Total' });
    }

    const insertStmt = db.prepare(`INSERT INTO ventas (fecha, producto, cantidad, precio_unitario, total) VALUES (?, ?, ?, ?, ?)`);

    let inserted = 0;
    for (const row of records) {
      try {
        const fechaRaw = row['Fecha'];
        const fecha = parseDate(fechaRaw);
        const producto = (row['Producto'] || '').toString().trim();
        const cantidad = Number(row['Cantidad']);
        const precio = Number(row['Precio Unitario']);
        const total = Number(row['Total']);

        if (!fecha) continue;
        if (isNaN(cantidad) || isNaN(precio) || isNaN(total)) continue;

        insertStmt.run(fecha, producto, cantidad, precio, total);
        inserted++;
      } catch (e) {
        // skip bad row
        continue;
      }
    }
    insertStmt.finalize();
    fs.unlinkSync(req.file.path);
    return res.json({ message: 'Upload processed', inserted });
  } catch (err) {
    console.error(err);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.get('/api/ventas', (req, res) => {
  db.all('SELECT * FROM ventas ORDER BY fecha ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
});

// simple health
app.get('/', (req, res) => res.send('Prueba PBI Backend - OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on', PORT));