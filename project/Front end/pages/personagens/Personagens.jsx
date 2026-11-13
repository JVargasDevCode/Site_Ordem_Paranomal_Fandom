import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardPersonagem from "../../components/CardPersonagem.jsx";
import PersonagemService from "../../services/PersonagemService.js";

function getCharacters(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.personagens)) return response.personagens;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para os dossiês.");
}

export default function Personagens() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    PersonagemService.listar()
      .then((response) => {
        const result = getCharacters(response);
        if (active) setCharacters(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar os dossiês.", error);
          setErrorMessage(error.message || "Não foi possível carregar os dossiês de personagens.");
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
      <header className="archive-list-header">
        <p className="archive-label">Arquivo de campo // Acesso público</p>
        <h1>Dossiês de personagens</h1>
        <p>Consulte os agentes, suas trajetórias e os registros associados a cada temporada.</p>
        <Link className="archive-action-link" to="/personagens/busca">Busca avançada <span>→</span></Link>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {isLoading ? (
        <p className="archive-loading" role="status">Consultando arquivos...</p>
      ) : characters.length ? (
        <div className="archive-card-grid">
          {characters.map((character) => (
            <CardPersonagem key={character.id ?? character.slug ?? character.nome} personagem={character} />
          ))}
        </div>
      ) : (
        <p className="archive-empty">Nenhum dossiê está disponível no momento.</p>
      )}
    </div>
  );
}
