import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardTemporada from "../components/CardTemporada.jsx";
import TemporadaService from "../services/TemporadaService.js";

const featuredSeasons = [
  {
    id: "segredo-na-floresta",
    nome: "O Segredo na Floresta",
    tema: "segredo-floresta",
    descricao: "Uma investigação que começa no interior e conduz a Ordem por rastros antigos, desaparecimentos e sinais de algo além da realidade.",
  },
  {
    id: "hexatombe",
    nome: "Hexatombe",
    tema: "hexatombe",
    descricao: "Um arquivo marcado por pactos, símbolos e pelo preço que acompanha cada escolha.",
  },
  {
    id: "a-vigilia",
    nome: "A Vigília",
    tema: "vigilia",
    descricao: "Registros de uma temporada em que pistas, observação e persistência podem revelar recompensas especiais.",
  },
  {
    id: "calamidade",
    nome: "Calamidade",
    tema: "calamidade",
    descricao: "Um caso de proporções extraordinárias, reunindo agentes, forças e consequências em escala inédita.",
  },
];

const vigilDeadline = new Date(2026, 10, 15, 0, 0, 0);

function isVigilEventActive() {
  return new Date() < vigilDeadline;
}

function getSeasonList(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.temporadas)) return response.temporadas;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  return null;
}

export default function Home() {
  const [seasons, setSeasons] = useState(featuredSeasons);
  const [seasonError, setSeasonError] = useState("");

  useEffect(() => {
    let active = true;

    TemporadaService.listar({ destaque: true })
      .then((response) => {
        const result = getSeasonList(response);
        if (!result) {
          throw new Error("O serviço retornou um formato inesperado para a lista de temporadas.");
        }
        if (active) {
          setSeasons(result.length ? result : featuredSeasons);
        }
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar as temporadas em destaque.", error);
          setSeasonError("Não foi possível atualizar as temporadas. Exibindo os arquivos em destaque disponíveis.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-eyebrow">Ordem Paranormal // Arquivo comunitário</p>
          <h1>O inexplicável<br /><span>deixa rastros.</span></h1>
          <p className="home-hero__description">
            Dossiês, temporadas e registros de agentes reunidos em um arquivo para quem
            continua investigando o Outro Lado.
          </p>
          <div className="home-hero__actions">
            <Link className="home-button home-button--primary" to="/temporadas">Explorar temporadas</Link>
            <Link className="home-button home-button--secondary" to="/personagens">Consultar dossiês</Link>
          </div>
          <p className="home-hero__classification">Arquivo público // Conteúdo comunitário</p>
        </div>
        <div aria-hidden="true" className="home-hero__seal">
          <span>OP</span>
          <i />
          <small>CONTENHA<br />O MEDO</small>
        </div>
        <span aria-hidden="true" className="home-hero__index">ARQ. 001 / ACESSO AUTORIZADO</span>
      </section>

      {isVigilEventActive() && (
        <section className="vigil-event" aria-labelledby="vigil-event-title">
          <div className="vigil-event__signal" aria-hidden="true">!</div>
          <div className="vigil-event__content">
            <p className="home-eyebrow">Comunicado de campo // Evento especial</p>
            <h2 id="vigil-event-title">A Vigília: há algo entre os registros.</h2>
            <p>
              Explore os arquivos da temporada e procure pistas visuais. As molduras
              especiais e os itens descobertos aparecem no perfil quando disponibilizados
              pelos serviços do sistema.
            </p>
            <Link className="home-button home-button--vigil" to="/temporadas/a-vigilia">
              Abrir arquivo da Vigília
            </Link>
          </div>
          <p className="vigil-event__deadline">Evento até 14/11/2026</p>
        </section>
      )}

      <section className="home-section" aria-labelledby="featured-seasons-title">
        <div className="home-section__heading">
          <div>
            <p className="home-eyebrow">Registros selecionados</p>
            <h2 id="featured-seasons-title">Temporadas em destaque</h2>
          </div>
          <Link className="home-text-link" to="/temporadas">Ver todas as temporadas <span>→</span></Link>
        </div>
        {seasonError && <p className="home-inline-error" role="status">{seasonError}</p>}
        <div className="home-season-grid">
          {seasons.map((season) => (
            <CardTemporada key={season.id ?? season.slug ?? season.nome} temporada={season} />
          ))}
        </div>
      </section>

      <section className="home-briefing" aria-labelledby="briefing-title">
        <div>
          <p className="home-eyebrow">Protocolo de investigação</p>
          <h2 id="briefing-title">Todo registro começa com uma pergunta.</h2>
        </div>
        <p>
          Consulte os arquivos, compartilhe interpretações e ajude a comunidade a montar
          as peças. Este é um projeto de fãs, independente e não oficial.
        </p>
        <Link className="home-text-link" to="/comunidade">Acessar comunidade <span>→</span></Link>
      </section>
    </div>
  );
}
