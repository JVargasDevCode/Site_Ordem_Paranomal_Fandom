import { Link } from "react-router-dom";

export default function CardTeoria({ teoria, id, titulo, autor, resumo, curtidas, avaliacoes }) {
  const item = teoria ?? {};
  const theoryId = id ?? item.id;
  const title = titulo ?? item.titulo ?? "Teoria sem título";
  const authorName = autor?.nome ?? autor ?? item.usuario?.nome ?? item.autor?.nome ?? "Agente";
  const description = resumo ?? item.resumo ?? item.conteudo ?? "";
  const likes = curtidas ?? item.curtidas ?? item.avaliacoes?.concordo ?? avaliacoes?.concordo;

  return (
    <article className="content-card theory-card">
      <div className="content-card__body">
        <p className="archive-label">Hipótese em investigação</p>
        <h2 className="content-card__title">{title}</h2>
        <p className="content-card__summary">{description}</p>
        <div className="content-card__meta">
          <span>Proposto por {authorName}</span>
          {likes !== undefined && <span>{likes} apoio(s)</span>}
        </div>
        {theoryId && (
          <Link className="content-card__link" to={`/teorias/${encodeURIComponent(theoryId)}`}>Analisar teoria</Link>
        )}
      </div>
    </article>
  );
}
