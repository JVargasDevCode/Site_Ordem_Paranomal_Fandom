import { useEffect, useState } from "react";
import CreditoService from "../../services/CreditoService.js";

function getCredits(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.creditos)) return response.creditos;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para os créditos.");
}

function groupCredits(credits) {
  return credits.reduce((groups, credit) => {
    const category = credit.categoria ?? credit.grupo ?? "Colaboradores";
    groups.set(category, [...(groups.get(category) ?? []), credit]);
    return groups;
  }, new Map());
}

export default function Creditos() {
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    CreditoService.listar()
      .then((response) => {
        const result = getCredits(response);
        if (active) setCredits(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar os créditos.", error);
          setErrorMessage(error.message || "Não foi possível consultar os créditos.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const groups = groupCredits(credits);

  return (
    <div className="archive-list-page credits-page">
      <header className="archive-list-header">
        <p className="archive-label">Registro de contribuições // Comunidade</p>
        <h1>Créditos</h1>
        <p>Este arquivo reconhece as pessoas que colaboram com o projeto comunitário.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {isLoading ? (
        <p className="archive-loading" role="status">Reunindo registros...</p>
      ) : groups.size ? (
        <div className="credits-groups">
          {[...groups.entries()].map(([category, entries]) => (
            <section className="credits-group" key={category}>
              <p className="archive-label">Registro de equipe</p>
              <h2>{category}</h2>
              <ul>
                {entries.map((credit, index) => {
                  const name = credit.nome ?? credit.name ?? credit.titulo ?? "Colaborador";
                  const role = credit.funcao ?? credit.papel ?? credit.descricao;
                  return (
                    <li key={credit.id ?? `${name}-${index}`}>
                      <span>{name}</span>
                      {role && <small>{role}</small>}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p className="archive-empty">Os créditos ainda não foram publicados.</p>
      )}
      <p className="credits-disclaimer">Projeto de fãs independente e não oficial.</p>
    </div>
  );
}
