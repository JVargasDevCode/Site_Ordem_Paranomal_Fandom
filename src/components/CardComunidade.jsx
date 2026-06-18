function CardTeoria({ titulo, autor, resumo, curtidas }) {
  return (
    <div className="card-teoria">
      <h2>{titulo}</h2>

      <p>
        <strong>Autor:</strong> {autor}
      </p>

      <p>{resumo}</p>

      <p>❤️ {curtidas} curtidas</p>

      <button>Ler Teoria</button>
    </div>
  );
}

export default CardTeoria;