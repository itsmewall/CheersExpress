const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/User");

const SECRET = "supersecreto"; // depois coloca no .env

// Cadastro
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = bcrypt.hashSync(password, 8);

  const stmt = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
  stmt.run(name, email, hash, role, function (err) {
    if (err) return res.status(400).json({ error: "Email já cadastrado" });
    res.json({ message: "Usuário cadastrado com sucesso" });
  });
};

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user) return res.status(400).json({ error: "Usuário não encontrado" });

    const senhaValida = bcrypt.compareSync(password, user.password);
    if (!senhaValida) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "2h" });

    res.json({ message: "Login bem sucedido", token, user: { id: user.id, name: user.name, role: user.role } });
  });
};