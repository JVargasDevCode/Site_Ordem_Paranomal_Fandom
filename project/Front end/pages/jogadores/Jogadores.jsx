import { useEffect, useState } from "react";
import CardJogador from "../../components/CardJogador.jsx";
import JogadorService from "../../services/JogadorService.js";

function getPlayers(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.jogadores)) return response.jogadores;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para a equipe.");
}

export default function Jogadores() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    JogadorService.listar()
      .then((response) => {
        const result = getPlayers(response);
        if (active) setPlayers(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar os perfis de jogadores.", error);
          setErrorMessage(error.message || "Não foi possível carregar a equipe de apoio.");
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
        <p className="archive-label">Equipe de apoio // Arquivo comunitário</p>
        <h1>Players e equipe</h1>
        <p>Conheça as pessoas por trás das mesas, dos personagens e dos registros de Ordem Paranormal.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {isLoading ? (
        <p className="archive-loading" role="status">Carregando equipe...</p>
      ) : players.length ? (
        <div className="archive-card-grid">
          {players.map((player) => (
            <CardJogador key={player.id ?? player.slug ?? player.nome} jogador={player} />
          ))}
        </div>
      ) : (
        <p className="archive-empty">Os perfis de apoio ainda não foram publicados.</p>
      )}
    </div>
  );
}
