import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Field, Input, Textarea, Button } from "../components/UI";

export default function Dashboard(){
  const [empresa, setEmpresa] = useState({ nome: "", subdominio: "" });
  const [produto, setProduto] = useState({ nome: "", preco: "", descricao: "" });
  const [produtos, setProdutos] = useState([]);
  const [previewSub, setPreviewSub] = useState(""); // para pré-visualizar cardápio público

  const canProducts = Boolean(empresa.subdominio);

  async function criarEmpresa(e){
    e.preventDefault();
    if(!empresa.nome || !empresa.subdominio) return alert("Preencha nome e subdomínio.");
    try{
      await axios.post("http://localhost:4000/empresas/register", empresa);
      alert("Empresa criada.");
      setPreviewSub(empresa.subdominio);
      await carregarProdutos(empresa.subdominio);
    }catch(err){
      alert(err.response?.data?.error || "Erro ao criar empresa.");
    }
  }

  async function carregarProdutos(sub){
    try{
      const res = await axios.get(`http://localhost:4000/empresas/${sub}/produtos`);
      setProdutos(res.data);
    }catch{
      setProdutos([]);
    }
  }

  async function adicionarProduto(e){
    e.preventDefault();
    if(!canProducts) return alert("Defina o subdomínio da empresa primeiro.");
    try{
      await axios.post(`http://localhost:4000/empresas/${empresa.subdominio}/produtos`, {
        ...produto, preco: Number(produto.preco || 0)
      });
      setProduto({ nome: "", preco: "", descricao: "" });
      await carregarProdutos(empresa.subdominio);
    }catch(err){
      alert(err.response?.data?.error || "Erro ao adicionar produto.");
    }
  }

  async function removerProduto(id){
    try{
      await axios.delete(`http://localhost:4000/empresas/${empresa.subdominio}/produtos/${id}`);
      await carregarProdutos(empresa.subdominio);
    }catch{
      alert("Erro ao remover produto.");
    }
  }

  // Pré-visualização manual (caso queira ver outra empresa)
  async function carregarPreview(){
    if(!previewSub) return;
    await carregarProdutos(previewSub);
  }

  useEffect(() => {
    if(empresa.subdominio) carregarProdutos(empresa.subdominio);
  }, [empresa.subdominio]);

  return (
    <div className="container stack" style={{ padding: 24 }}>
      <h1 style={{ fontSize: "var(--h1)", margin: "6px 0 12px" }}>Dashboard da Empresa</h1>

      <Card title="Perfil da Empresa">
        <form className="stack" onSubmit={criarEmpresa}>
          <div className="row">
            <div style={{ flex: 1 }}>
              <Field label="Nome da empresa">
                <Input value={empresa.nome} onChange={e=>setEmpresa({...empresa, nome: e.target.value})} placeholder="Ex: McLaren Bar" />
              </Field>
            </div>
            <div style={{ width: 280 }}>
              <Field label="Subdomínio">
                <Input value={empresa.subdominio} onChange={e=>setEmpresa({...empresa, subdominio: e.target.value})} placeholder="ex: mclaren" />
              </Field>
            </div>
          </div>
          <div className="spread">
            <div style={{ color: "var(--ink-soft)", fontSize: 14 }}>
              Link público (quando configurar DNS): <b>{empresa.subdominio || "seu-sub"}.cheersexpress.com</b>
            </div>
            <Button type="submit">Salvar Empresa</Button>
          </div>
        </form>
      </Card>

      <Card title="Cardápio — Gerenciar Produtos">
        <form className="row" onSubmit={adicionarProduto}>
          <div style={{ flex: 2 }}>
            <Field label="Nome do produto">
              <Input value={produto.nome} onChange={e=>setProduto({...produto, nome: e.target.value})} placeholder="Ex: Chopp 500ml" />
            </Field>
          </div>
          <div style={{ width: 160 }}>
            <Field label="Preço (R$)">
              <Input type="number" step="0.01" value={produto.preco} onChange={e=>setProduto({...produto, preco: e.target.value})} placeholder="12.00" />
            </Field>
          </div>
          <div style={{ flex: 3 }}>
            <Field label="Descrição">
              <Textarea value={produto.descricao} onChange={e=>setProduto({...produto, descricao: e.target.value})} placeholder="Breve descrição do item" />
            </Field>
          </div>
          <div style={{ alignSelf: "end" }}>
            <Button type="submit" disabled={!canProducts}>Adicionar</Button>
          </div>
        </form>

        <div className="stack" style={{ marginTop: 16 }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>ID</th>
                <th>Nome</th>
                <th style={{ width: 120 }}>Preço</th>
                <th>Descrição</th>
                <th style={{ width: 120 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>R$ {Number(p.preco).toFixed(2)}</td>
                  <td>{p.descricao}</td>
                  <td>
                    <div className="row">
                      {/* Edição pode ser feita inline futuramente */}
                      <Button variant="danger" onClick={()=>removerProduto(p.id)}>Remover</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {produtos.length === 0 && (
                <tr><td colSpan="5" style={{ color: "var(--ink-soft)" }}>Nenhum produto cadastrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Pré-visualização pública (somente leitura)">
        <div className="row" style={{ marginBottom: 12 }}>
          <Input style={{ width: 260 }} value={previewSub} onChange={e=>setPreviewSub(e.target.value)} placeholder="subdomínio para pré-visualizar (ex: mclaren)" />
          <Button onClick={carregarPreview}>Carregar</Button>
        </div>
        <div className="grid">
          {produtos.map(p => (
            <div key={p.id} className="product">
              <h4>{p.nome}</h4>
              <p>{p.descricao}</p>
              <div className="price">R$ {Number(p.preco).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}