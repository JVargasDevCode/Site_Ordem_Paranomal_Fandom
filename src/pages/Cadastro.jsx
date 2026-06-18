import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../services/AuthService";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();
    setErro("");

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("Senhas não correspondem");
      return;
    }

    if (senha.length < 6) {
      setErro("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    const resultado = registrarUsuario(nome, email, senha);

    if (resultado.sucesso) {
      alert("Conta criada com sucesso! Faça o login.");
      navigate("/login");
    } else {
      setErro(resultado.mensagem);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>Ingressar na Ordem</h1>

      {erro && (
        <div style={{ background: "#ef4444", padding: "15px", borderRadius: "8px", marginBottom: "20px", color: "#fff" }}>
          {erro}
        </div>
      )}

      <form onSubmit={handleCadastro} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
        />

        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Criar Conta
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px", color: "#aaa" }}>
        Já tem conta? <Link to="/login" style={{ color: "#ef4444", textDecoration: "none" }}>Faça login</Link>
      </p>
    </div>
  );
}

export default Cadastro;