import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PersonagemService from "../../services/PersonagemService.js";

function getCharacter(response) {
  const character = response?.personagem ?? response?.data?.personagem ?? response?.data ?? response;
  if (!character || typeof character !== "object" || Array.isArray(character)) {
    throw new Error("O serviço retornou um formato inesperado para o dossiê.");
  }
  return character;
}

function Field({ label, value }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="dossier-field">
      <dt>{label}</dt>
      <dd>{typeof value === "object" ? value.nome ?? value.name ?? JSON.stringify(value) : value}</dd>
    </div>
  );
}

function RecordList({ title, items, fallback }) {
  const values = Array.isArray(items) ? items : [];
  return (
    <section className="dossier-section">
      <p className="archive-label">Registro complementar</p>
      <h2>{title}</h2>
      {values.length ? (
        <ul className="dossier-list">
          {values.map((item, index) => {
            const text = typeof item === "string" ? item : item.nome ?? item.titulo ?? item.descricao ?? item.name;
            return <li key={item.id ?? `${text}-${index}`}>{text}</li>;
          })}
        </ul>
      ) : (
        <p>{fallback}</p>
      )}
    </section>
  );
}

export default function PersonagemDetalhes() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setErrorMessage("");
    setCharacter(null);
    PersonagemService.obterPorId(id)
      .then((response) => {
        const result = getCharacter(response);
        if (active) setCharacter(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar o dossiê do personagem.", error);
          setErrorMessage(error.message || "Não foi possível acessar este dossiê.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (isLoading) return <p className="archive-loading" role="status">Consultando dossiê...</p>;
  if (errorMessage) {
    return (
      <section className="archive-error-panel" role="alert">
        <p className="archive-label">Falha na consulta // Dossiê</p>
        <h1>Registro indisponível</h1>
        <p>{errorMessage}</p>
        <Link className="archive-action-link" to="/personagens">Voltar aos personagens</Link>
      </section>
    );
  }

  const history = character.historico ?? character.lore ?? character.biografia;
  const relationships = character.relacoes ?? character.relacionamentos;
  const items = character.itens ?? character.equipamentos;
  const image = character.imagem ?? character.foto ?? character.avatarUrl;
  const name = character.nome ?? character.name ?? "Personagem";

  return (
    <article className="character-dossier">
      <Link className="archive-action-link" to="/personagens">← Voltar aos dossiês</Link>
      <header className="dossier-header">
        {image ? (
          <img alt={`Retrato de ${name}`} className="dossier-header__portrait" src={image} />
        ) : (
          <div aria-hidden="true" className="dossier-header__portrait dossier-header__portrait--empty">ARQUIVO</div>
        )}
        <div className="dossier-header__content">
          <p className="archive-label">Dossiê de campo // Ordem Paranormal</p>
          <h1>{name}</h1>
          {character.apelido && <p className="dossier-header__alias">“{character.apelido}”</p>}
          <dl className="dossier-facts">
            <Field label="Classe" value={character.classe} />
            <Field label="Origem" value={character.origem} />
            <Field label="NEX" value={character.nex !== undefined ? `${character.nex}%` : undefined} />
            <Field label="Temporada" value={character.temporada} />
            <Field label="Jogador" value={character.jogador ?? character.interprete} />
            <Field label="Situação" value={character.status ?? character.situacao} />
          </dl>
        </div>
      </header>

      <section className="dossier-section">
        <p className="archive-label">Histórico registrado</p>
        <h2>Histórico e contexto</h2>
        <p>{history || "O histórico detalhado deste personagem ainda não foi disponibilizado no serviço de dados."}</p>
      </section>
      <div className="dossier-section-grid">
        <RecordList
          fallback="Nenhuma relação foi registrada neste dossiê."
          items={relationships}
          title="Relações"
        />
        <RecordList
          fallback="Nenhum item foi registrado neste dossiê."
          items={items}
          title="Itens e equipamentos"
        />
      </div>
      {character.habilidades && (
        <RecordList
          fallback="Nenhuma habilidade registrada."
          items={character.habilidades}
          title="Habilidades registradas"
        />
      )}
    </article>
  );
}
