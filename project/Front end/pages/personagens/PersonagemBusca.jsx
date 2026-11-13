import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CardPersonagem from "../../components/CardPersonagem.jsx";
import PersonagemService from "../../services/PersonagemService.js";

function getCharacters(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.personagens)) return response.personagens;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para a busca.");
}

export default function PersonagemBusca() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("q") ?? "");
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const query = searchParams.get("q")?.trim() ?? "";

  useEffect(() => {
    setTerm(query);
    if (!query) {
      setCharacters([]);
      setHasSearched(false);
      setIsLoading(false);
      setErrorMessage("");
      return undefined;
    }

    let active = true;
    setIsLoading(true);
    setErrorMessage("");
    PersonagemService.buscar(query)
      .then((response) => {
        const result = getCharacters(response);
        if (active) {
          setCharacters(result);
          setHasSearched(true);
        }
      })
      .catch((error) => {
        if (active) {
          console.error("A busca de personagens falhou.", error);
          setErrorMessage(error.message || "Não foi possível concluir a busca.");
          setHasSearched(true);
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedTerm = term.trim();
    setSearchParams(normalizedTerm ? { q: normalizedTerm } : {});
  };

  return (
    <div className="archive-list-page">
      <header className="archive-list-header">
        <p className="archive-label">Consulta de arquivos // Busca</p>
        <h1>Localizar personagem</h1>
        <p>Pesquise por nome ou pelos termos disponíveis nos registros.</p>
      </header>
      <form className="archive-search-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="character-search">Termo da busca</label>
        <input
          id="character-search"
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Nome ou palavra-chave"
          value={term}
        />
        <button type="submit">Pesquisar</button>
      </form>
      <Link className="archive-action-link" to="/personagens">← Todos os dossiês</Link>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {isLoading && <p className="archive-loading" role="status">Analisando arquivos...</p>}
      {!isLoading && hasSearched && !errorMessage && characters.length === 0 && (
        <p className="archive-empty">Nenhum registro corresponde a esta busca.</p>
      )}
      {!isLoading && characters.length > 0 && (
        <div className="archive-card-grid">
          {characters.map((character) => (
            <CardPersonagem key={character.id ?? character.slug ?? character.nome} personagem={character} />
          ))}
        </div>
      )}
    </div>
  );
}
