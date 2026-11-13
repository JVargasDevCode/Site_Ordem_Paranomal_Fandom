import { Link } from "react-router-dom";

export default function CardComunidade({ postagem, id, titulo, autor, resumo, data, imagem }) {
  const item = postagem ?? {};
  const postId = id ?? item.id;
  const title = titulo ?? item.titulo ?? "Registro da comunidade";
  const authorName = autor?.nome ?? autor ?? item.usuario?.nome ?? item.autor?.nome ?? "Agente";
  const description = resumo ?? item.resumo ?? item.conteudo ?? "";
  const cover = imagem ?? item.imagem;

  return (
    <article className="content-card community-card">
      {cover && <img alt="" className="content-card__image" loading="lazy" src={cover} />}
      <div className="content-card__body">
        <p className="archive-label">Registro da comunidade</p>
        <h2 className="content-card__title">{title}</h2>
        <p className="content-card__summary">{description}</p>
        <div className="content-card__meta">
          <span>Por {authorName}</span>
          {(data ?? item.criadoEm ?? item.data) && (
            <time>{data ?? item.criadoEm ?? item.data}</time>
          )}
        </div>
        {postId && <Link className="content-card__link" to={`/comunidade/postagens/${encodeURIComponent(postId)}`}>Abrir publicação</Link>}
      </div>
    </article>
  );
}
