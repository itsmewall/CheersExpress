const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./cheersexpress.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT CHECK(role IN ('cliente','empresa')) NOT NULL
    )
  `);
});

module.exports = db;