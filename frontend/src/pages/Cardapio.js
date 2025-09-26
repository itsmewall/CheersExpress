import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

export default function Cardapio() {
  const { theme } = useContext(ThemeContext);
  const [itens, setItens] = useState([]);
  const [empresa, setEmpresa] = useState("");

  useEffect(() => {
    const subdominio = getSubdomain();
    axios.get(`http://localhost:4000/empresas/${subdominio}/cardapio`)
      .then(res => {
        setItens(res.data.produtos);
        setEmpresa(res.data.empresa);
      })
      .catch(() => alert("Erro ao carregar cardápio"));
  }, []);

  return (
    <div style={{ background: theme.backgroundColor, minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>
        Cardápio – {empresa}
      </h2>
      <ul>
        {itens.map(item => (
          <li key={item.id} style={{ marginBottom: "15px", fontFamily: theme.fontFamily }}>
            <strong style={{ color: theme.textColor }}>{item.nome}</strong> – R${item.preco}
            <p style={{ color: theme.secondaryColor }}>{item.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getSubdomain() {
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length > 2) {
    return parts[0];
  }
  return "maclaren";
}