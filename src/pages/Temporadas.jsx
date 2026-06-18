import CardTemporada from "../components/CardTemporada";
import temporadasData from "../data/temporada";
function Temporadas() {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>Temporadas</h1>
      <p style={{ textAlign: "center", marginBottom: "40px" }}>
        Assista aos episódios completos e acompanhe a jornada paranormal.
      </p>

      <div className="temporadas-grid">
        {temporadasData.map((temporada) => (
          <CardTemporada
            key={temporada.id}
            capa={temporada.capa}
            nome={temporada.nome}
            ano={temporada.ano}
            descricao={temporada.descricao}
            playlist={temporada.playlist}
          />
        ))}
      </div>
    </div>
  );
}

export default Temporadas;