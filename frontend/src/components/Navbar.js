import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ margin: "0 10px", color: "white" }}>Login</Link>
      <Link to="/cardapio" style={{ margin: "0 10px", color: "white" }}>Cardápio</Link>
      <Link to="/pedido" style={{ margin: "0 10px", color: "white" }}>Pedido</Link>
      <Link to="/chat" style={{ margin: "0 10px", color: "white" }}>Chat</Link>
      <Link to="/dashboard" style={{ margin: "0 10px", color: "white" }}>Dashboard</Link>
    </nav>
  );
}