import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("cliente");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/auth/register", {
        name,
        email,
        password: senha,
        role,
      });
      alert("Cadastro realizado com sucesso!");
    } catch (err) {
      alert("Erro no cadastro: " + err.response?.data?.error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Criar Conta</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={styles.input}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <select style={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="empresa">Empresa</option>
          </select>
          <button style={styles.button} type="submit">Cadastrar</button>
        </form>
        <p style={styles.registerText}>
          Já tem conta? <Link to="/" style={styles.link}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff9800, #ff5722)",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#ff5722",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    background: "#ff5722",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  registerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#ff5722",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
