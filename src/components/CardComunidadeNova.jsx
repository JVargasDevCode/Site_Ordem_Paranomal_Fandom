import { useState } from "react";
import { curtirPost } from "../services/ComunidadeService";

function CardComunidade({
  id,
  imagem,
  autor,
  rede,
  tipo,
  descricao,
  curtidas: curtasIniciais,
  nomeAutor,
  onAtualizar
}) {
  const [curtidas, setCurtidas] = useState(curtasIniciais || 0);

  const handleCurtir = () => {
    curtirPost(id);
    setCurtidas(curtidas + 1);
    if (onAtualizar) onAtualizar();
  };

  return (
    <div style={{ background: "#111", padding: "15px", borderRadius: "8px", color: "#fff", marginBottom: "20px" }}>
      <img
        src={imagem}
        alt={tipo}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
      />

      <h3>{nomeAutor}</h3>

      <p>
        <strong>@{rede}:</strong> {autor}
      </p>

      <p>
        <strong>Tipo:</strong> {tipo}
      </p>

      <p>{descricao}</p>

      <button onClick={handleCurtir} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" }}>
        ❤️ {curtidas} Curtidas
      </button>
    </div>
  );
}

export default CardComunidade;
