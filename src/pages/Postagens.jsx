import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verificarLogado } from "../services/AuthService";
import { salvarPost } from "../services/ComunidadeService";
import { salvarTeoria } from "../services/TeoriasService";

function Postagens() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [tipoPost, setTipoPost] = useState(null); // "comunidade" ou "teoria"
  const [formulario, setFormulario] = useState({
    nomeAutor: "",
    rede: "Instagram",
    autor: "",
    tipo: "Fanart",
    descricao: "",
    imagem: "",
    titulo: "",
    conteudo: ""
  });

  useEffect(() => {
    const usuarioLogado = verificarLogado();
    if (!usuarioLogado) {
      navigate("/login");
    } else if (!usuarioLogado.ativo) {
      alert("Sua conta está inativa. Não pode postar no momento.");
      navigate("/perfil");
    } else {
      setUsuario(usuarioLogado);
      setFormulario((prev) => ({ ...prev, nomeAutor: usuarioLogado.nome }));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormulario({ ...formulario, imagem: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostarComunidade = (e) => {
    e.preventDefault();

    if (!usuario || !formulario.autor || !formulario.imagem) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    salvarPost(
      {
        nomeAutor: usuario.nome,
        rede: formulario.rede,
        autor: formulario.autor,
        tipo: formulario.tipo,
        descricao: formulario.descricao,
        imagem: formulario.imagem
      },
      usuario.id
    );

    alert("Post criado com sucesso!");
    navigate("/comunidade");
  };

  const handlePostarTeoria = (e) => {
    e.preventDefault();

    if (!formulario.titulo || !formulario.conteudo) {
      alert("Preencha título e conteúdo");
      return;
    }

    salvarTeoria(
      {
        titulo: formulario.titulo,
        autor: usuario.nome,
        conteudo: formulario.conteudo
      },
      usuario.id
    );

    alert("Teoria postada com sucesso!");
    navigate("/teorias");
  };

  if (!usuario) return <p style={{ color: "#fff", textAlign: "center" }}>Carregando...</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto", color: "#fff" }}>
      <h1>📤 Criar Postagem</h1>

      {tipoPost === null ? (
        <div style={{ background: "#111", padding: "30px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2>Escolha o tipo de postagem:</h2>

          <button
            onClick={() => setTipoPost("comunidade")}
            style={{
              padding: "20px",
              background: "#8b5cf6",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold"
            }}
          >
            🎨 Cosplay ou Fanart
          </button>

          <button
            onClick={() => setTipoPost("teoria")}
            style={{
              padding: "20px",
              background: "#ec4899",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold"
            }}
          >
            🔮 Teoria Paranormal
          </button>

          <button
            onClick={() => navigate("/perfil")}
            style={{
              padding: "12px",
              background: "#666",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            ❌ Voltar
          </button>
        </div>
      ) : tipoPost === "comunidade" ? (
        <div style={{ background: "#111", padding: "30px", borderRadius: "8px" }}>
          <h2>Postar Cosplay ou Fanart</h2>

          <form onSubmit={handlePostarComunidade} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <p style={{ color: "#aaa" }}>Publicando como: <strong>{usuario.nome}</strong></p>

            <select
              name="rede"
              value={formulario.rede}
              onChange={handleInputChange}
              style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
            >
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="Twitter">Twitter</option>
            </select>

            <input
              type="text"
              name="autor"
              placeholder="Seu @ (sem arroba)"
              value={formulario.autor}
              onChange={handleInputChange}
              required
              style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
            />

            <select
              name="tipo"
              value={formulario.tipo}
              onChange={handleInputChange}
              style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "14px" }}
            >
              <option value="Fanart">Fanart</option>
              <option value="Cosplay">Cosplay</option>
              <option value="Fan Fiction">Fan Fiction</option>
            </select>

            <textarea
              name="descricao"
              placeholder="Descrição do seu trabalho"
              value={formulario.descricao}
              onChange={handleInputChange}
              style={{ padding: "12px", borderRadius: "4px", border: "none", minHeight: "80px", fontSize: "14px" }}
            />

            <div style={{ padding: "12px", background: "#222", borderRadius: "4px" }}>
              <label style={{ cursor: "pointer" }}>
                📷 Escolher Imagem/Vídeo
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
              {formulario.imagem && <p style={{ color: "#ef4444", marginTop: "10px" }}>✅ Arquivo selecionado</p>}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: "#22c55e",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ✅ Postar
              </button>
              <button
                type="button"
                onClick={() => setTipoPost(null)}
                style={{
                  flex: 1,
                  background: "#666",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ background: "#111", padding: "30px", borderRadius: "8px" }}>
          <h2>Postar Teoria Paranormal</h2>

          <form onSubmit={handlePostarTeoria} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="text"
              name="titulo"
              placeholder="Título da teoria"
              value={formulario.titulo}
              onChange={handleInputChange}
              required
              style={{ padding: "12px", borderRadius: "4px", border: "none", fontSize: "16px", fontWeight: "bold" }}
            />

            <textarea
              name="conteudo"
              placeholder="Escreva sua teoria completa aqui..."
              value={formulario.conteudo}
              onChange={handleInputChange}
              required
              style={{ padding: "12px", borderRadius: "4px", border: "none", minHeight: "200px", fontSize: "14px", fontFamily: "Arial" }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: "#22c55e",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ✅ Postar
              </button>
              <button
                type="button"
                onClick={() => setTipoPost(null)}
                style={{
                  flex: 1,
                  background: "#666",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Postagens;
