const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./cheersexpress.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS empresas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      subdominio TEXT UNIQUE NOT NULL
    )
  `);
});

module.exports = db;