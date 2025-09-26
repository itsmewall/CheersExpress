const dbEmpresas = require("../models/Empresas");
const dbProdutos = require("../models/Produtos");

exports.listProdutos = (req, res) => {
  const { subdominio } = req.params;
  dbEmpresas.get("SELECT id FROM empresas WHERE subdominio = ?", [subdominio], (err, emp) => {
    if (!emp) return res.status(404).json({ error: "Empresa não encontrada" });
    dbProdutos.all("SELECT * FROM produtos WHERE empresa_id = ? ORDER BY id DESC", [emp.id], (err2, rows) => {
      if (err2) return res.status(500).json({ error: "Erro ao listar" });
      res.json(rows || []);
    });
  });
};

exports.updateProduto = (req, res) => {
  const { subdominio, id } = req.params;
  const { nome, preco, descricao } = req.body;
  dbEmpresas.get("SELECT id FROM empresas WHERE subdominio = ?", [subdominio], (err, emp) => {
    if (!emp) return res.status(404).json({ error: "Empresa não encontrada" });
    dbProdutos.run(
      "UPDATE produtos SET nome=?, preco=?, descricao=? WHERE id=? AND empresa_id=?",
      [nome, preco, descricao, id, emp.id],
      function(err2){
        if (err2) return res.status(500).json({ error: "Erro ao atualizar" });
        res.json({ updated: this.changes > 0 });
      }
    );
  });
};

exports.deleteProduto = (req, res) => {
  const { subdominio, id } = req.params;
  dbEmpresas.get("SELECT id FROM empresas WHERE subdominio = ?", [subdominio], (err, emp) => {
    if (!emp) return res.status(404).json({ error: "Empresa não encontrada" });
    dbProdutos.run("DELETE FROM produtos WHERE id=? AND empresa_id=?", [id, emp.id], function(err2){
      if (err2) return res.status(500).json({ error: "Erro ao remover" });
      res.json({ deleted: this.changes > 0 });
    });
  });
};