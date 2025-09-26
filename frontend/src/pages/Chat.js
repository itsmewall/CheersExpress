import React, { useState } from "react";

export default function Chat() {
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");

  const enviarMensagem = (e) => {
    e.preventDefault();
    setMensagens([...mensagens, texto]);
    setTexto("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat com Garçom/Cozinha</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflowY: "auto" }}>
        {mensagens.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <form onSubmit={enviarMensagem}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite sua mensagem"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}