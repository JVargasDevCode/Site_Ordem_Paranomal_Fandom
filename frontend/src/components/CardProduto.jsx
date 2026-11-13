import { Link } from "react-router-dom";

function safeExternalUrl(value) {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value, window.location.origin);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function formatPrice(value, currency = "BRL") {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(amount);
}

export default function CardProduto({ produto, id, nome, titulo, imagem, descricao, preco, link }) {
  const item = produto ?? {};
  const productId = id ?? item.id;
  const name = nome ?? titulo ?? item.nome ?? item.titulo ?? "Item do acervo";
  const imageUrl = imagem ?? item.imagem ?? item.foto;
  const summary = descricao ?? item.descricao ?? "";
  const price = preco ?? item.preco;
  const destination = safeExternalUrl(link ?? item.url ?? item.link);

  return (
    <article className="content-card product-card">
      {imageUrl && <img alt={name} className="content-card__image" loading="lazy" src={imageUrl} />}
      <div className="content-card__body">
        <p className="archive-label">Acervo de produtos</p>
        <h2 className="content-card__title">{name}</h2>
        {summary && <p className="content-card__summary">{summary}</p>}
        {price !== undefined && price !== null && (
          <p className="product-card__price">{formatPrice(price, item.moeda ?? "BRL")}</p>
        )}
        {destination ? (
          <a className="content-card__link" href={destination} rel="noreferrer" target="_blank">Consultar produto</a>
        ) : productId ? (
          <Link className="content-card__link" to={`/produtos/${encodeURIComponent(productId)}`}>Consultar produto</Link>
        ) : null}
      </div>
    </article>
  );
}
