const dbEmpresas = require("../models/Empresas");
const dbProdutos = require("../models/Produtos");

exports.registerEmpresa = (req, res) => {
  const { nome, subdominio } = req.body;
  dbEmpresas.run(
    "INSERT INTO empresas (nome, subdominio) VALUES (?, ?)",
    [nome, subdominio],
    function (err) {
      if (err) return res.status(400).json({ error: "Subdomínio já usado" });
      res.json({ message: "Empresa cadastrada", id: this.lastID });
    }
  );
};

exports.addProduto = (req, res) => {
  const { subdominio } = req.params;
  const { nome, preco, descricao } = req.body;

  dbEmpresas.get(
    "SELECT id FROM empresas WHERE subdominio = ?",
    [subdominio],
    (err, empresa) => {
      if (!empresa) return res.status(404).json({ error: "Empresa não encontrada" });

      dbProdutos.run(
        "INSERT INTO produtos (empresa_id, nome, preco, descricao) VALUES (?, ?, ?, ?)",
        [empresa.id, nome, preco, descricao],
        function (err) {
          if (err) return res.status(400).json({ error: "Erro ao adicionar produto" });
          res.json({ message: "Produto adicionado", id: this.lastID });
        }
      );
    }
  );
};

exports.getCardapio = (req, res) => {
  const { subdominio } = req.params;

  dbEmpresas.get(
    "SELECT * FROM empresas WHERE subdominio = ?",
    [subdominio],
    (err, empresa) => {
      if (!empresa) return res.status(404).json({ error: "Empresa não encontrada" });

      dbProdutos.all(
        "SELECT * FROM produtos WHERE empresa_id = ?",
        [empresa.id],
        (err, produtos) => {
          if (err) return res.status(500).json({ error: "Erro ao buscar cardápio" });
          res.json({ empresa: empresa.nome, produtos });
        }
      );
    }
  );
};