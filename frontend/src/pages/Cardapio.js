import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSubdomain } from "../utils/subdomain";

export default function Cardapio(){
  const [empresa, setEmpresa] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const sub = getSubdomain();
    axios.get(`http://localhost:4000/empresas/${sub}/cardapio`)
      .then(res => {
        setEmpresa(res.data.empresa);
        setProdutos(res.data.produtos || []);
      })
      .catch(() => {
        setEmpresa("");
        setProdutos([]);
      });
  }, []);

  return (
    <div className="container stack" style={{ padding: 24 }}>
      <div className="spread">
        <h1 style={{ fontSize: "var(--h1)" }}>{empresa ? `Cardápio — ${empresa}` : "Cardápio"}</h1>
      </div>

      <div className="grid">
        {produtos.map(p => (
          <div key={p.id} className="product">
            <h4>{p.nome}</h4>
            <p>{p.descricao}</p>
            <div className="price">R$ {Number(p.preco).toFixed(2)}</div>
          </div>
        ))}
        {produtos.length === 0 && (
          <div className="card"><div className="card-body">Nenhum item disponível no momento.</div></div>
        )}
      </div>
    </div>
  );
}