import { Link } from "react-router-dom";

function normalizeTheme(value) {
  if (typeof value !== "string") return undefined;
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (normalized.includes("floresta")) return "segredo-floresta";
  if (normalized.includes("hexatombe")) return "hexatombe";
  if (normalized.includes("vigilia")) return "vigilia";
  if (normalized.includes("calamidade")) return "calamidade";
  if (normalized.includes("ilha")) return "segredo-ilha";
  return normalized || undefined;
}

export default function CardTemporada({ temporada, id, nome, ano, descricao, capa, tema, slug }) {
  const item = temporada ?? {};
  const seasonId = id ?? item.id ?? slug ?? item.slug;
  const seasonName = nome ?? item.nome ?? "Temporada sem título";
  const seasonYear = ano ?? item.ano;
  const summary = descricao ?? item.descricao ?? "";
  const cover = capa ?? item.capa ?? item.imagem;
  const theme = normalizeTheme(tema ?? item.tema ?? item.slug ?? seasonName);

  return (
    <article className="content-card season-card" data-theme={theme}>
      {cover ? (
        <img alt={`Capa de ${seasonName}`} className="content-card__image" loading="lazy" src={cover} />
      ) : (
        <div aria-hidden="true" className="content-card__placeholder">Arquivo de temporada</div>
      )}
      <div className="content-card__body">
        <p className="archive-label">Arquivo de temporada{seasonYear ? ` // ${seasonYear}` : ""}</p>
        <h2 className="content-card__title">{seasonName}</h2>
        <p className="content-card__summary">{summary}</p>
        {seasonId && (
          <Link className="content-card__link" to={`/temporadas/${encodeURIComponent(seasonId)}`}>Explorar temporada</Link>
        )}
      </div>
    </article>
  );
}
