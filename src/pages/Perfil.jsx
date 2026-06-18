import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verificarLogado, atualizarUsuario, fazerLogout } from "../services/AuthService";

function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    const usuarioLogado = verificarLogado();
    if (!usuarioLogado) {
      navigate("/login");
    } else {
      setUsuario(usuarioLogado);
      setNome(usuarioLogado.nome);
      setFoto(usuarioLogado.foto);
    }
  }, [navigate]);

  const handleSalvarPerfil = () => {
    if (!nome) {
      alert("Nome não pode estar vazio");
      return;
    }

    const atualizacoes = { id: usuario.id, nome, foto };

    if (novaSenha) {
      if (senhaAtual !== usuario.senha) {
        alert("Senha atual incorreta");
        return;
      }
      if (novaSenha !== confirmarSenha) {
        alert("Novas senhas não correspondem");
        return;
      }
      atualizacoes.senha = novaSenha;
    }

    const usuarioAtualizado = atualizarUsuario(atualizacoes);
    setUsuario(usuarioAtualizado);
    setEditando(false);
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    alert("Perfil atualizado com sucesso!");
  };

  const handleMudarFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    fazerLogout();
    alert("Deslogado com sucesso!");
    navigate("/");
  };

  if (!usuario) return <p style={{ color: "#fff", textAlign: "center" }}>Carregando...</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", color: "#fff" }}>
      <h1>👤 Meu Perfil</h1>

      <div style={{ background: "#111", padding: "30px", borderRadius: "8px" }}>
        {!editando ? (
          <>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={usuario.foto}
                alt={usuario.nome}
                style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "15px" }}
              />
              <h2>{usuario.nome}</h2>
              <p style={{ color: "#aaa" }}>{usuario.email}</p>
              <p style={{ color: "#ef4444" }}>✅ Conta Ativa</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => setEditando(true)}
                style={{ background: "#ef4444", color: "#fff", border: "none", padding: "12px", borderRadius: "4px", cursor: "pointer" }}
              >
                ✏️ Editar Perfil
              </button>

              <button
                onClick={() => navigate("/postagens")}
                style={{ background: "#22c55e", color: "#fff", border: "none", padding: "12px", borderRadius: "4px", cursor: "pointer" }}
              >
                📤 Minhas Postagens
              </button>

              <button
                onClick={() => navigate("/comunidade")}
                style={{ background: "#8b5cf6", color: "#fff", border: "none", padding: "12px", borderRadius: "4px", cursor: "pointer" }}
              >
                🎨 Ver Comunidade
              </button>

              <button
                onClick={() => navigate("/teorias")}
                style={{ background: "#ec4899", color: "#fff", border: "none", padding: "12px", borderRadius: "4px", cursor: "pointer" }}
              >
                🔮 Ver Teorias
              </button>

              <button
                onClick={handleLogout}
                style={{ background: "#ef4444", color: "#fff", border: "none", padding: "12px", borderRadius: "4px", cursor: "pointer" }}
              >
                🚪 Deslogar
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ textAlign: "center" }}>
              <img
                src={foto}
                alt="preview"
                style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "15px" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleMudarFoto}
                style={{ display: "block", margin: "0 auto" }}
              />
            </div>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
            />

            <h3 style={{ marginTop: "20px" }}>Alterar Senha (Opcional)</h3>

            <input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              placeholder="Senha Atual"
              style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
            />

            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Nova Senha"
              style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
            />

            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirmar Nova Senha"
              style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleSalvarPerfil}
                style={{ flex: 1, background: "#22c55e", color: "#fff", border: "none", padding: "12px", borderRadius: "4px", cursor: "pointer" }}
              >
                💾 Salvar
              </button>
              <button
                onClick={() => {
                  setEditando(false);
                  setNome(usuario.nome);
                  setFoto(usuario.foto);
                  setSenhaAtual("");
                  setNovaSenha("");
                  setConfirmarSenha("");
                }}
                style={{ flex: 1, background: "#666", color: "#fff", border: "none", padding: "12px", borderRadius: "4px", cursor: "pointer" }}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;