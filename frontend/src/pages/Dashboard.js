import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [empresa, setEmpresa] = useState({ nome: "", subdominio: "" });
  const [produto, setProduto] = useState({ nome: "", preco: "", descricao: "" });
  const [produtos, setProdutos] = useState([]);

  // Carregar produtos da empresa
  useEffect(() => {
    if (empresa.subdominio) {
      axios.get(`http://localhost:4000/empresas/${empresa.subdominio}/produtos`)
        .then(res => setProdutos(res.data))
        .catch(() => setProdutos([]));
    }
  }, [empresa.subdominio]);

  // Criar empresa
  const handleEmpresa = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/empresas/register", empresa);
      alert("Empresa criada!");
    } catch (err) {
      alert("Erro ao criar empresa: " + err.response?.data?.error);
    }
  };

  // Adicionar produto
  const handleProduto = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/empresas/${empresa.subdominio}/produtos`, produto);
      alert("Produto adicionado!");
      setProduto({ nome: "", preco: "", descricao: "" });
      const res = await axios.get(`http://localhost:4000/empresas/${empresa.subdominio}/produtos`);
      setProdutos(res.data);
    } catch (err) {
      alert("Erro ao adicionar produto");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard da Empresa</h2>

      {/* Cadastro Empresa */}
      <form onSubmit={handleEmpresa}>
        <h3>Cadastrar Empresa</h3>
        <input
          type="text"
          placeholder="Nome"
          value={empresa.nome}
          onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Subdomínio"
          value={empresa.subdominio}
          onChange={(e) => setEmpresa({ ...empresa, subdominio: e.target.value })}
        /><br />
        <button type="submit">Criar</button>
      </form>

      {/* Cadastro Produto */}
      {empresa.subdominio && (
        <form onSubmit={handleProduto} style={{ marginTop: "20px" }}>
          <h3>Adicionar Produto</h3>
          <input
            type="text"
            placeholder="Nome do produto"
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
          /><br />
          <input
            type="number"
            placeholder="Preço"
            value={produto.preco}
            onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
          /><br />
          <textarea
            placeholder="Descrição"
            value={produto.descricao}
            onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
          /><br />
          <button type="submit">Salvar Produto</button>
        </form>
      )}

      {/* Lista de produtos */}
      {produtos.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Produtos Cadastrados</h3>
          <ul>
            {produtos.map((p) => (
              <li key={p.id}>
                {p.nome} - R${p.preco} | {p.descricao}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
