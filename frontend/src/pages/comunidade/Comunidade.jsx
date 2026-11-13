import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComunidadeService from "../../services/ComunidadeService.js";

function getSummary(response) {
  const summary = response?.resumo ?? response?.data?.resumo ?? response?.data ?? response;
  if (!summary || typeof summary !== "object" || Array.isArray(summary)) {
    throw new Error("O serviço retornou um formato inesperado para o resumo.");
  }
  return summary;
}

export default function Comunidade() {
  const [summary, setSummary] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    ComunidadeService.obterResumo()
      .then((response) => {
        const result = getSummary(response);
        if (active) setSummary(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar o resumo da comunidade.", error);
          setErrorMessage(error.message || "O resumo da comunidade não pôde ser atualizado.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const stats = [
    { label: "Agentes", value: summary?.totalUsuarios ?? summary?.totalMembros },
    { label: "Publicações", value: summary?.totalPostagens ?? summary?.totalPublicacoes },
    { label: "Teorias", value: summary?.totalTeorias },
  ].filter((stat) => stat.value !== undefined && stat.value !== null);

  return (
    <div className="archive-list-page community-page">
      <header className="archive-list-header">
        <p className="archive-label">Rede de agentes // Arquivo comunitário</p>
        <h1>Comunidade</h1>
        <p>Compartilhe descobertas, converse sobre os casos e compare suas hipóteses com outros investigadores.</p>
      </header>
      {errorMessage && <p className="archive-error" role="status">{errorMessage}</p>}
      {stats.length > 0 && (
        <section className="community-stats" aria-label="Resumo da comunidade">
          {stats.map((stat) => (
            <div className="community-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>
      )}
      <div className="community-hub-grid">
        <Link className="community-hub-card" to="/comunidade/postagens">
          <span className="archive-label">Registros públicos</span>
          <h2>Publicações</h2>
          <p>Relatos, perguntas e conversas abertas pela comunidade.</p>
          <span className="community-hub-card__link">Consultar mural →</span>
        </Link>
        <Link className="community-hub-card" to="/teorias">
          <span className="archive-label">Hipóteses em análise</span>
          <h2>Teorias</h2>
          <p>Ideias e interpretações para discutir com outros agentes.</p>
          <span className="community-hub-card__link">Abrir arquivo →</span>
        </Link>
      </div>
      <div className="community-actions">
        <Link className="archive-primary-button" to="/comunidade/criar">Criar publicação</Link>
        <Link className="archive-secondary-button" to="/teorias/criar">Propor uma teoria</Link>
      </div>
    </div>
  );
}
