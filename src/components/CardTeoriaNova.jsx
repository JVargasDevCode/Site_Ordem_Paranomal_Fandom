import { useState } from "react";
import { votarTeoria, adicionarComentario } from "../services/TeoriasService";

function CardTeoriaNova({ id, titulo, autor, conteudo, fezSentido: fezSentidoInicial, naoFezSentido: naoFezSentidoInicial, comentarios: comentariosIniciais, onAtualizar }) {
  const [expandido, setExpandido] = useState(false);
  const [fezSentido, setFezSentido] = useState(fezSentidoInicial || 0);
  const [naoFezSentido, setNaoFezSentido] = useState(naoFezSentidoInicial || 0);
  const [comentarios, setComentarios] = useState(comentariosIniciais || []);
  const [novoComentario, setNovoComentario] = useState("");

  const handleVoto = (tipo) => {
    votarTeoria(id, tipo);
    if (tipo === "sim") {
      setFezSentido(fezSentido + 1);
    } else {
      setNaoFezSentido(naoFezSentido + 1);
    }
    if (onAtualizar) onAtualizar();
  };

  const handleAdicionarComentario = () => {
    if (novoComentario.trim()) {
      adicionarComentario(id, { texto: novoComentario, autor: "Você" });
      setComentarios([...comentarios, { id: Date.now(), texto: novoComentario, autor: "Você" }]);
      setNovoComentario("");
    }
  };

  return (
    <div style={{ background: "#111", padding: "20px", borderRadius: "8px", color: "#fff", marginBottom: "20px", borderLeft: "4px solid #ef4444" }}>
      <h2 style={{ margin: "0 0 10px 0" }}>{titulo}</h2>

      <p style={{ color: "#aaa", margin: "5px 0" }}>
        <strong>Por:</strong> {autor}
      </p>

      {expandido && <p style={{ marginTop: "15px", whiteSpace: "pre-line" }}>{conteudo}</p>}

      <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>
        <button
          onClick={() => setExpandido(!expandido)}
          style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" }}
        >
          {expandido ? "Ocultar" : "Ler Completo"}
        </button>

        <button
          onClick={() => handleVoto("sim")}
          style={{ background: "#22c55e", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" }}
        >
          ✅ Faz Sentido ({fezSentido})
        </button>

        <button
          onClick={() => handleVoto("nao")}
          style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" }}
        >
          ❌ Não Faz ({naoFezSentido})
        </button>
      </div>

      {expandido && (
        <div style={{ marginTop: "20px", borderTop: "1px solid #333", paddingTop: "15px" }}>
          <h4>💬 Comentários ({comentarios.length})</h4>
          {comentarios.map((coment) => (
            <div key={coment.id} style={{ background: "#222", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}>
              <strong>{coment.autor}:</strong> {coment.texto}
            </div>
          ))}

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <input
              type="text"
              placeholder="Comente aqui..."
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdicionarComentario()}
              style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "none" }}
            />
            <button
              onClick={handleAdicionarComentario}
              style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardTeoriaNova;
