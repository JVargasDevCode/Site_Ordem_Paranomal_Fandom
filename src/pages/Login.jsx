import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fazerLogin } from "../services/AuthService";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha email e senha");
      return;
    }

    const resultado = fazerLogin(email, senha);

    if (resultado.sucesso) {
      alert(`Bem-vindo ${resultado.usuario.nome}!`);
      navigate("/perfil");
    } else {
      setErro(resultado.mensagem);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>Login - Ordem Paranormal</h1>

      {erro && (
        <div style={{ background: "#ef4444", padding: "15px", borderRadius: "8px", marginBottom: "20px", color: "#fff" }}>
          {erro}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
          Entrar
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px", color: "#aaa" }}>
        Não tem conta? <Link to="/cadastro" style={{ color: "#ef4444", textDecoration: "none" }}>Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Login;