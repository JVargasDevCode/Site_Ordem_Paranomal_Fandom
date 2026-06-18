import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obterTeorias, votarTeoria, adicionarComentario } from "../services/TeoriasService";
import { verificarLogado } from "../services/AuthService";
import { obterUsuarioPorId } from "../services/UsuarioService";

function Teorias() {
  const [teorias, setTeorias] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [expandidas, setExpandidas] = useState({});
  const [comentarios, setComentarios] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = verificarLogado();
    if (user) {
      setUsuario(user);
    }
    setTeorias(obterTeorias());
  }, []);

  const handleVoto = (teoriaId, voto) => {
    if (!usuario) {
      alert("Faça login para votar");
      return;
    }

    const resultado = votarTeoria(teoriaId, voto, usuario.id);
    if (resultado.sucesso === false) {
      alert(resultado.mensagem);
    } else {
      setTeorias(obterTeorias());
    }
  };

  const handleAdicionarComentario = (teoriaId) => {
    if (!usuario) {
      alert("Faça login para comentar");
      return;
    }

    const texto = comentarios[teoriaId];
    if (!texto || !texto.trim()) {
      alert("Escreva um comentário");
      return;
    }

    adicionarComentario(teoriaId, { texto }, usuario.id);
    setTeorias(obterTeorias());
    setComentarios({ ...comentarios, [teoriaId]: "" });
  };

  const toggleExpandida = (teoriaId) => {
    setExpandidas({
      ...expandidas,
      [teoriaId]: !expandidas[teoriaId]
    });
  };

  return (
    <div className="page-section teoria-page">
      <div className="section-header">
        <h1>🔮 Teorias Paranormais</h1>

        {usuario ? (
          <button className="primary-button" onClick={() => navigate("/postagens")}>📤 Postar Teoria</button>
        ) : (
          <p className="notice-message">
            ⚠️ <a href="#" onClick={() => navigate("/login")}>Faça login</a> para postar
          </p>
        )}
      </div>

      <h2>📚 Teorias da Comunidade</h2>

      {teorias.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma teoria postada ainda. Compartilhe suas ideias!</p>
        </div>
      ) : (
        <div className="section-cards-grid teoria-grid">
          {teorias.map((teoria) => {
            const jaVotou = usuario && teoria.votantes?.includes(usuario.id);
            const isExpanded = expandidas[teoria.id];

            return (
              <article className="section-card teoria-card" key={teoria.id}>
                <div className="section-card-content">
                  <div>
                    <h2>{teoria.titulo}</h2>
                    <p className="card-meta">
                      <strong>Por:</strong> {teoria.autor} • <span>{teoria.data}</span>
                    </p>

                    <div className={isExpanded ? "card-body expanded" : "card-body"}>
                      <p>{teoria.conteudo}</p>
                    </div>
                  </div>

                  <div className="section-card-actions">
                    <button className="secondary-button" onClick={() => toggleExpandida(teoria.id)}>
                      {isExpanded ? "Ocultar" : "Ler Completo"}
                    </button>

                    <button
                      className={jaVotou ? "disabled-button" : "secondary-button"}
                      onClick={() => handleVoto(teoria.id, "sim")}
                      disabled={jaVotou}
                    >
                      ✅ Faz Sentido ({teoria.fezSentido || 0})
                    </button>

                    <button
                      className={jaVotou ? "disabled-button" : "danger-button"}
                      onClick={() => handleVoto(teoria.id, "nao")}
                      disabled={jaVotou}
                    >
                      ❌ Não Faz ({teoria.naoFezSentido || 0})
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="comment-section">
                      <h4>💬 Comentários ({(teoria.comentarios || []).length})</h4>

                      {(teoria.comentarios || []).map((coment) => (
                        <div className="comment-card" key={coment.id}>
                          <strong>{coment.id === usuario?.id ? "Você" : obterUsuarioPorId(coment.usuarioId)?.nome || "Anônimo"}:</strong> {coment.texto}
                          <p>{coment.data}</p>
                        </div>
                      ))}

                      {usuario && (
                        <div className="comment-form">
                          <input
                            type="text"
                            placeholder="Seu comentário..."
                            value={comentarios[teoria.id] || ""}
                            onChange={(e) => setComentarios({ ...comentarios, [teoria.id]: e.target.value })}
                          />
                          <button className="primary-button" onClick={() => handleAdicionarComentario(teoria.id)}>
                            Enviar
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Teorias;