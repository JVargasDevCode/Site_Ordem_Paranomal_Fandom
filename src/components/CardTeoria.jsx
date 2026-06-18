function CardComunidade({
  imagem,
  autor,
  tipo,
  descricao,
  curtidas
}) {
  return (
    <div className="card-comunidade">

      <img
        src={imagem}
        alt={tipo}
        className="comunidade-img"
      />

      <h3>{autor}</h3>

      <p>
        <strong>Tipo:</strong> {tipo}
      </p>

      <p>{descricao}</p>

      <p>❤️ {curtidas}</p>

      <button>Ver Mais</button>

    </div>
  );
}

export default CardComunidade;