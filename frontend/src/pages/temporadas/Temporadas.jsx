import { useEffect, useState } from "react";
import CardTemporada from "../../components/CardTemporada.jsx";
import TemporadaService from "../../services/TemporadaService.js";

const seasonArchive = [
  {
    id: "iniciacao",
    nome: "Iniciação",
    tema: "ordem",
    descricao: "O começo dos registros da Ordem e o primeiro contato com investigações paranormais.",
  },
  {
    id: "segredo-na-floresta",
    nome: "O Segredo na Floresta",
    tema: "segredo-floresta",
    descricao: "Uma missão no interior transforma um desaparecimento em uma investigação sobre forças antigas.",
  },
  {
    id: "desconjuracao",
    nome: "Desconjuração",
    tema: "desconjuracao",
    descricao: "Novos agentes, rituais e ameaças expandem o alcance dos arquivos da Ordem.",
  },
  {
    id: "segredo-na-ilha",
    nome: "O Segredo na Ilha",
    tema: "segredo-ilha",
    descricao: "Um caso isolado em uma ilha reúne pistas, suspeitas e acontecimentos fora do comum.",
  },
  {
    id: "sinais-do-outro-lado",
    nome: "Sinais do Outro Lado",
    tema: "sinais-outro-lado",
    descricao: "Os registros acompanham uma nova equipe diante de sinais e manifestações paranormais.",
  },
  {
    id: "calamidade",
    nome: "Calamidade",
    tema: "calamidade",
    descricao: "Um conflito de grandes proporções leva a Ordem a confrontar consequências acumuladas.",
  },
  {
    id: "natal-macabro",
    nome: "Natal Macabro",
    tema: "natal-macabro",
    descricao: "Um arquivo especial de fim de ano, com atmosfera sombria e ocorrências incomuns.",
  },
  {
    id: "hexatombe",
    nome: "Hexatombe",
    tema: "hexatombe",
    descricao: "Pactos, símbolos e decisões de alto custo atravessam este conjunto de registros.",
  },
  {
    id: "a-vigilia",
    nome: "A Vigília",
    tema: "vigilia",
    descricao: "Uma temporada de investigação com pistas especiais e molduras de avatar exibidas pelos dados do usuário.",
  },
];

function getSeasonList(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.temporadas)) return response.temporadas;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  return null;
}

export default function Temporadas() {
  const [seasons, setSeasons] = useState(seasonArchive);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    TemporadaService.listar()
      .then((response) => {
        const result = getSeasonList(response);
        if (!result) {
          throw new Error("O serviço retornou um formato inesperado para a lista de temporadas.");
        }
        if (active) setSeasons(result.length ? result : seasonArchive);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível atualizar o arquivo de temporadas.", error);
          setErrorMessage("Não foi possível sincronizar os dados. Exibimos os registros de referência disponíveis.");
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
    <div className="seasons-page">
      <header className="seasons-header">
        <p className="archive-label">Arquivo cronológico // Acesso público</p>
        <h1>Temporadas</h1>
        <p>Investigações, agentes e ocorrências registrados ao longo das temporadas de Ordem Paranormal.</p>
      </header>
      {isLoading && <p className="seasons-status" role="status">Sincronizando arquivos...</p>}
      {errorMessage && <p className="seasons-warning" role="status">{errorMessage}</p>}
      <div className="seasons-grid">
        {seasons.map((season) => (
          <CardTemporada key={season.id ?? season.slug ?? season.nome} temporada={season} />
        ))}
      </div>
    </div>
  );
}
