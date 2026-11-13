import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardTeoria from "../../components/CardTeoria.jsx";
import TeoriasService from "../../services/TeoriasService.js";

function getTheories(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.teorias)) return response.teorias;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para as teorias.");
}

export default function Teorias() {
  const [theories, setTheories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    TeoriasService.listar({ ordenar: "recentes" })
      .then((response) => {
        const result = getTheories(response);
        if (active) setTheories(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar as teorias.", error);
          setErrorMessage(error.message || "Não foi possível consultar o arquivo de teorias.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="archive-list-page">
      <header className="archive-list-header archive-list-header--with-action">
        <div>
          <p className="archive-label">Hipóteses em investigação // Comunidade</p>
          <h1>Arquivo de teorias</h1>
          <p>Interpretações e hipóteses comunitárias sobre os registros. Teorias são especulativas e não representam confirmação oficial.</p>
        </div>
        <Link className="archive-primary-button" to="/teorias/criar">Propor teoria</Link>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {isLoading ? (
        <p className="archive-loading" role="status">Reunindo hipóteses...</p>
      ) : theories.length ? (
        <div className="archive-card-grid">
          {theories.map((theory) => (
            <CardTeoria key={theory.id ?? theory.slug ?? theory.titulo} teoria={theory} />
          ))}
        </div>
      ) : (
        <p className="archive-empty">Ainda não há teorias publicadas. Inicie uma nova hipótese.</p>
      )}
    </div>
  );
}
