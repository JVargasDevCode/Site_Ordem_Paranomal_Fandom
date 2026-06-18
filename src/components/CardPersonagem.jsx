function CardPersonagem(props) {
  return (
    <div className="card-personagem">
      <img
        src={props.imagem}
        alt={props.nome}
        className="personagem-img"
      />
      
      
      {/* Removi o botão duplicado daqui para o controle ficar só na página principal */}
    </div>
  );
}

export default CardPersonagem;