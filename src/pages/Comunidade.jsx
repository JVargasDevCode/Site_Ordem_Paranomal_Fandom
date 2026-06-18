import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obterPosts, curtirPost } from "../services/ComunidadeService";
import { verificarLogado } from "../services/AuthService";
import { obterUsuarioPorId } from "../services/UsuarioService";

function Comunidade() {
  const [posts, setPosts] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = verificarLogado();
    if (user) {
      setUsuario(user);
    }
    setPosts(obterPosts());
  }, []);

  const handleCurtir = (postId) => {
    if (!usuario) {
      alert("Faça login para curtir");
      return;
    }
    curtirPost(postId, usuario.id);
    setPosts(obterPosts());
  };

  return (
    <div className="page-section comunidade-page">
      <div className="section-header">
        <h1>🎨 Comunidade - Cosplays e Fanarts</h1>

        {usuario ? (
          <button
            className="primary-button"
            onClick={() => navigate("/postagens")}
          >
            📤 Postar Cosplay/Fanart
          </button>
        ) : (
          <p className="notice-message">
            ⚠️ <a href="#" onClick={() => navigate("/login")}>Faça login</a> para postar
          </p>
        )}
      </div>

      <h2>📌 Postagens da Comunidade</h2>

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma postagem ainda. Seja o primeiro!</p>
        </div>
      ) : (
        <div className="section-cards-grid comunidade-grid">
          {posts.map((post) => {
            const autorPost = obterUsuarioPorId(post.usuarioId);
            const jaFezLike = usuario && post.usuariosCurtiram?.includes(usuario.id);

            return (
              <article className="section-card comunidade-card" key={post.id}>
                <div className="section-card-media">
                  {post.imagem && post.imagem.startsWith("data:video") ? (
                    <video src={post.imagem} controls />
                  ) : post.imagem && post.imagem.startsWith("data:image") ? (
                    <img src={post.imagem} alt={post.tipo} />
                  ) : (
                    <div className="media-placeholder">📷 Imagem/Vídeo</div>
                  )}
                </div>

                <div className="section-card-content">
                  <div>
                    <h2>{post.nomeAutor || (autorPost && autorPost.nome) || "Autor"}</h2>
                    <p className="card-meta">
                      <strong>@{post.rede}:</strong> {post.autor}
                    </p>
                    <p className="card-meta">Tipo: {post.tipo}</p>
                    <p className="card-meta">Postado em: {post.data}</p>
                    <p className="card-text">{post.descricao}</p>
                  </div>

                  <div className="section-card-actions">
                    <button
                      className={jaFezLike ? "danger-button disabled-button" : "secondary-button"}
                      onClick={() => handleCurtir(post.id)}
                      disabled={jaFezLike}
                    >
                      ❤️ {post.curtidas || 0} Curtidas
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Comunidade;