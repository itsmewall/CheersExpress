import React from "react";

export default function Cardapio() {
  const itens = [
    { id: 1, nome: "Pizza Margherita", preco: 40 },
    { id: 2, nome: "Hambúrguer Artesanal", preco: 30 },
    { id: 3, nome: "Chopp 500ml", preco: 12 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cardápio</h2>
      <ul>
        {itens.map(item => (
          <li key={item.id}>
            {item.nome} - R${item.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}