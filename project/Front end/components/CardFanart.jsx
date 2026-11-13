function safeExternalUrl(value) {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value, window.location.origin);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

export default function CardFanart({ fanart, titulo, autor, imagem, descricao, link }) {
  const item = fanart ?? {};
  const title = titulo ?? item.titulo ?? "Fanart sem título";
  const artist = autor?.nome ?? autor ?? item.autor?.nome ?? item.artista ?? "Artista da comunidade";
  const imageUrl = imagem ?? item.imagem ?? item.urlImagem;
  const description = descricao ?? item.descricao ?? "";
  const destination = safeExternalUrl(link ?? item.link ?? item.urlOriginal);

  return (
    <article className="content-card fanart-card">
      {imageUrl ? (
        <img alt={title} className="content-card__image" loading="lazy" src={imageUrl} />
      ) : (
        <div aria-hidden="true" className="content-card__placeholder">Arte arquivada</div>
      )}
      <div className="content-card__body">
        <p className="archive-label">Acervo de fanart</p>
        <h2 className="content-card__title">{title}</h2>
        <p className="content-card__meta">Por {artist}</p>
        {description && <p className="content-card__summary">{description}</p>}
        {destination && (
          <a className="content-card__link" href={destination} rel="noreferrer" target="_blank">
            Ver publicação original
          </a>
        )}
      </div>
    </article>
  );
}
