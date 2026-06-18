function CardTemporada({ capa, nome, ano, descricao, playlist }) {
  const abrirPlaylist = () => {
    if (playlist) {
      window.open(playlist, "_blank");
    }
  };

  return (
    <div className="card-temporada">

      <img
        src={capa}
        alt={nome}
        className="temporada-img"
      />

      <div className="content">
        <h2>{nome}</h2>
        <p className="ano">{ano}</p>
        <p className="desc">{descricao}</p>
        <div className="actions">
          <button onClick={abrirPlaylist}>Ver temporada completa</button>
        </div>
      </div>

    </div>
  );
}

export default CardTemporada;