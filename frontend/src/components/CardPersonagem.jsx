import { Link } from "react-router-dom";

export default function CardPersonagem({ personagem, id, nome, imagem, classe, nex, temporada }) {
  const item = personagem ?? {};
  const characterId = id ?? item.id;
  const characterName = nome ?? item.nome ?? "Personagem sem identificação";
  const portrait = imagem ?? item.imagem ?? item.foto;
  const characterClass = classe ?? item.classe;
  const characterNex = nex ?? item.nex;
  const season = temporada ?? item.temporada?.nome ?? item.temporada;

  return (
    <article className="content-card character-card">
      {portrait ? (
        <img alt={`Retrato de ${characterName}`} className="content-card__image" loading="lazy" src={portrait} />
      ) : (
        <div aria-hidden="true" className="content-card__placeholder">Dossiê confidencial</div>
      )}
      <div className="content-card__body">
        <p className="archive-label">Dossiê de personagem</p>
        <h2 className="content-card__title">{characterName}</h2>
        <div className="content-card__tags">
          {characterClass && <span>{characterClass}</span>}
          {characterNex !== undefined && characterNex !== null && <span>NEX {characterNex}%</span>}
          {season && <span>{season}</span>}
        </div>
        {characterId && (
          <Link className="content-card__link" to={`/personagens/${encodeURIComponent(characterId)}`}>Acessar dossiê</Link>
        )}
      </div>
    </article>
  );
}
