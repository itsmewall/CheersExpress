const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./cheersexpress.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empresa_id INTEGER,
      nome TEXT,
      preco REAL,
      descricao TEXT,
      FOREIGN KEY (empresa_id) REFERENCES empresas(id)
    )
  `);
});

module.exports = db;