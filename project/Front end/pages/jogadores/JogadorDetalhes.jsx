import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JogadorService from "../../services/JogadorService.js";

function getPlayer(response) {
  const player = response?.jogador ?? response?.data?.jogador ?? response?.data ?? response;
  if (!player || typeof player !== "object" || Array.isArray(player)) {
    throw new Error("O serviço retornou um formato inesperado para o perfil.");
  }
  return player;
}

export default function JogadorDetalhes() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setErrorMessage("");
    JogadorService.obterPorId(id)
      .then((response) => {
        const result = getPlayer(response);
        if (active) setPlayer(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar o perfil do jogador.", error);
          setErrorMessage(error.message || "Não foi possível acessar este perfil.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (isLoading) return <p className="archive-loading" role="status">Consultando perfil...</p>;
  if (errorMessage) {
    return (
      <section className="archive-error-panel" role="alert">
        <p className="archive-label">Falha na consulta // Equipe</p>
        <h1>Perfil indisponível</h1>
        <p>{errorMessage}</p>
        <Link className="archive-action-link" to="/jogadores">Voltar à equipe</Link>
      </section>
    );
  }

  const name = player.nome ?? player.name ?? "Agente";
  const portrait = player.avatarUrl ?? player.foto ?? player.imagem;
  const credits = Array.isArray(player.creditos) ? player.creditos : [];
  const roles = Array.isArray(player.funcoes) ? player.funcoes : [];

  return (
    <article className="player-profile">
      <Link className="archive-action-link" to="/jogadores">← Voltar à equipe</Link>
      <header className="player-profile__header">
        {portrait ? (
          <img alt={`Retrato de ${name}`} src={portrait} />
        ) : (
          <div aria-hidden="true" className="player-profile__placeholder">{name.charAt(0)}</div>
        )}
        <div>
          <p className="archive-label">Equipe de apoio da Ordem</p>
          <h1>{name}</h1>
          {(player.funcao ?? player.papel) && <p className="player-profile__role">{player.funcao ?? player.papel}</p>}
          {(player.biografia ?? player.descricao) && <p>{player.biografia ?? player.descricao}</p>}
        </div>
      </header>
      {roles.length > 0 && (
        <section className="dossier-section">
          <p className="archive-label">Atribuições registradas</p>
          <h2>Funções</h2>
          <div className="archive-chip-list">{roles.map((role) => <span key={role}>{role}</span>)}</div>
        </section>
      )}
      <section className="dossier-section">
        <p className="archive-label">Participações</p>
        <h2>Créditos e trabalhos</h2>
        {credits.length ? (
          <ul className="dossier-list">
            {credits.map((credit, index) => (
              <li key={credit.id ?? `${credit.titulo ?? credit.nome}-${index}`}>
                {typeof credit === "string" ? credit : credit.titulo ?? credit.nome ?? credit.descricao}
              </li>
            ))}
          </ul>
        ) : (
          <p>As participações serão exibidas quando disponíveis no serviço de dados.</p>
        )}
      </section>
    </article>
  );
}
