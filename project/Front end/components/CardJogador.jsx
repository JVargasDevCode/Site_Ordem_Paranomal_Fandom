import { Link } from "react-router-dom";

export default function CardJogador({ jogador, id, nome, foto, avatar, funcao, papel, descricao }) {
  const item = jogador ?? {};
  const playerId = id ?? item.id;
  const playerName = nome ?? item.nome ?? "Agente";
  const portrait = foto ?? avatar ?? item.avatarUrl ?? item.foto;
  const position = funcao ?? papel ?? item.funcao ?? item.papel;
  const bio = descricao ?? item.descricao ?? item.biografia ?? "";

  return (
    <article className="content-card player-card">
      {portrait ? (
        <img alt={`Retrato de ${playerName}`} className="content-card__image" loading="lazy" src={portrait} />
      ) : (
        <div aria-hidden="true" className="content-card__placeholder">{playerName.charAt(0)}</div>
      )}
      <div className="content-card__body">
        <p className="archive-label">Equipe de apoio da Ordem</p>
        <h2 className="content-card__title">{playerName}</h2>
        {position && <p className="content-card__meta">{position}</p>}
        {bio && <p className="content-card__summary">{bio}</p>}
        {playerId && <Link className="content-card__link" to={`/jogadores/${encodeURIComponent(playerId)}`}>Ver perfil</Link>}
      </div>
    </article>
  );
}
