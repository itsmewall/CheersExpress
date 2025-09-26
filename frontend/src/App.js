import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Cardapio from "./pages/Cardapio";
import Pedido from "./pages/Pedido";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Cliente */}
        <Route path="/cardapio" element={<PrivateRoute><Cardapio /></PrivateRoute>} />
        <Route path="/pedido" element={<PrivateRoute><Pedido /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />

        {/* Empresa */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;