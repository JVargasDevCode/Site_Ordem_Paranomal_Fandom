import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TemporadaService from "../../services/TemporadaService.js";

const seasonArchive = [
  {
    id: "iniciacao",
    nome: "Iniciação",
    tema: "ordem",
    classification: "Registro inicial",
    summary: "O ponto de partida dos arquivos da Ordem: um grupo de agentes começa a investigar ocorrências que desafiam explicações comuns.",
    investigation: "Os primeiros registros apresentam o trabalho de campo da Ordem e estabelecem a relação entre medo, investigação e manifestações paranormais. O conteúdo desta página é uma síntese editorial para navegação; consulte os episódios oficiais para a narrativa completa.",
    tags: ["Primeiros casos", "Agentes", "Investigação"],
  },
  {
    id: "segredo-na-floresta",
    nome: "O Segredo na Floresta",
    tema: "segredo-floresta",
    classification: "Operação // Interior",
    summary: "Uma missão de busca se transforma em uma investigação de campo em um local marcado por desaparecimentos e sinais de presença paranormal.",
    investigation: "Os dossiês desta temporada acompanham uma equipe que precisa interpretar pistas, registrar testemunhos e compreender os riscos de uma região isolada. A ambientação de mata e o avanço gradual da investigação dão a este arquivo sua identidade própria.",
    tags: ["Mata", "Busca", "Operação de campo"],
  },
  {
    id: "desconjuracao",
    nome: "Desconjuração",
    tema: "desconjuracao",
    classification: "Registro // Conjurado",
    summary: "Novas frentes de investigação aproximam a Ordem de rituais e ameaças com alcance crescente.",
    investigation: "A temporada amplia o escopo dos registros e coloca os agentes diante de pistas que exigem coordenação, cautela e leitura de símbolos. O arquivo abaixo é uma apresentação de contexto, sem substituir a obra original.",
    tags: ["Rituais", "Símbolos", "Novas equipes"],
  },
  {
    id: "segredo-na-ilha",
    nome: "O Segredo na Ilha",
    tema: "segredo-ilha",
    classification: "Operação // Área isolada",
    summary: "Um grupo chega a uma ilha para investigar um caso cuja tranquilidade aparente esconde inconsistências.",
    investigation: "O isolamento do local transforma cada conversa e descoberta em parte do quadro investigativo. Os agentes precisam cruzar versões e observar o ambiente para determinar o que ocorreu.",
    tags: ["Ilha", "Testemunhos", "Isolamento"],
  },
  {
    id: "sinais-do-outro-lado",
    nome: "Sinais do Outro Lado",
    tema: "sinais-outro-lado",
    classification: "Registro // Sinais anômalos",
    summary: "Uma nova equipe segue manifestações e evidências que apontam para interferências do Outro Lado.",
    investigation: "Os registros desta temporada destacam o trabalho de uma equipe diante de ocorrências que se manifestam como sinais. A análise depende de reunir os indícios sem perder de vista os efeitos humanos de cada caso.",
    tags: ["Sinais", "Equipe", "Anomalias"],
  },
  {
    id: "calamidade",
    nome: "Calamidade",
    tema: "calamidade",
    classification: "Alerta // Nível crítico",
    summary: "Uma crise de grandes proporções reúne linhas narrativas e coloca a Ordem diante de consequências extraordinárias.",
    investigation: "O arquivo de Calamidade representa uma escalada de riscos e o encontro de diferentes agentes e ameaças. Esta ficha oferece contexto editorial sem antecipar detalhes específicos da trama.",
    tags: ["Crise", "Confronto", "Consequências"],
  },
  {
    id: "natal-macabro",
    nome: "Natal Macabro",
    tema: "natal-macabro",
    classification: "Arquivo especial // Sazonal",
    summary: "Um caso especial com ambientação de fim de ano e ocorrências de natureza inquietante.",
    investigation: "Este registro sazonal combina a atmosfera festiva com o suspense de uma investigação paranormal. Consulte os episódios para acompanhar os detalhes do caso.",
    tags: ["Especial", "Suspense", "Investigação"],
  },
  {
    id: "hexatombe",
    nome: "Hexatombe",
    tema: "hexatombe",
    classification: "Registro // Sigilo vermelho",
    summary: "Uma temporada atravessada por pactos, símbolos e escolhas que cobram um preço.",
    investigation: "Este arquivo apresenta os elementos de investigação e os temas de risco associados à temporada, sem substituir a experiência da obra. Os registros oficiais da comunidade poderão acrescentar dados, episódios e ligações entre casos.",
    tags: ["Pactos", "Símbolos", "Risco"],
  },
  {
    id: "a-vigilia",
    nome: "A Vigília",
    tema: "vigilia",
    classification: "Comunicado // Vigília ativa",
    summary: "Uma investigação sobre atenção aos detalhes: pistas e itens especiais podem ser apresentados no arquivo conforme os dados do usuário.",
    investigation: "Procure pelos indicadores visuais preparados para esta temporada. O front-end exibe itens descobertos e molduras especiais quando esses dados chegam pelos serviços; não determina nem concede recompensas por conta própria.",
    tags: ["Pistas", "Itens especiais", "Molduras de avatar"],
  },
];

function normalizeSlug(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getSeasonFromResponse(response) {
  const season = response?.temporada ?? response?.data?.temporada ?? response?.data ?? response;
  if (!season || typeof season !== "object" || Array.isArray(season)) {
    throw new Error("O serviço retornou um formato inesperado para o dossiê da temporada.");
  }
  return season;
}

function getSeasonTheme(season) {
  const identity = normalizeSlug(season?.tema ?? season?.slug ?? season?.nome ?? "");
  if (identity.includes("floresta")) return "segredo-floresta";
  if (identity.includes("hexatombe")) return "hexatombe";
  if (identity.includes("vigilia")) return "vigilia";
  if (identity.includes("calamidade")) return "calamidade";
  if (identity.includes("ilha")) return "segredo-ilha";
  if (identity.includes("sinais")) return "sinais-outro-lado";
  if (identity.includes("natal")) return "natal-macabro";
  if (identity.includes("desconjuracao")) return "desconjuracao";
  return "ordem";
}

export default function TemporadaDetalhes() {
  const { id } = useParams();
  const [season, setSeason] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const slug = normalizeSlug(id);
  const referenceSeason = useMemo(
    () => seasonArchive.find((item) => normalizeSlug(item.id) === slug || normalizeSlug(item.nome) === slug),
    [slug],
  );

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setErrorMessage("");
    setSeason(null);

    TemporadaService.obterPorId(id)
      .then((response) => {
        const result = getSeasonFromResponse(response);
        if (active && result && typeof result === "object") setSeason(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar os detalhes da temporada.", error);
          setErrorMessage("Não foi possível sincronizar os dados do serviço. Exibimos o resumo de referência quando disponível.");
          setSeason(null);
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const details = season ?? referenceSeason;
  const theme = getSeasonTheme(details);
  const title = details?.nome ?? details?.titulo ?? "Registro não localizado";
  const summary = details?.summary ?? details?.descricao ?? "Não há informações de referência para este registro.";
  const investigation = details?.investigation ?? details?.historico ?? details?.lore;
  const tags = Array.isArray(details?.tags) ? details.tags : [];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  return (
    <article className="season-detail" data-theme={theme}>
      <Link className="season-detail__back" to="/temporadas">← Voltar ao arquivo de temporadas</Link>
      {isLoading && <p className="seasons-status" role="status">Consultando dossiê...</p>}
      {errorMessage && <p className="seasons-warning" role="status">{errorMessage}</p>}
      <header className="season-detail__header">
        <p className="archive-label">{details?.classification ?? "Arquivo de temporada"} // Ordem Paranormal</p>
        <h1>{title}</h1>
        <p>{summary}</p>
        <div className="season-detail__tags">
          {tags.map((tag) => <span key={tag}>{tag}</span>)}
          {details?.ano && <span>{details.ano}</span>}
        </div>
      </header>
      <section className="season-detail__section">
        <p className="archive-label">Relatório de contexto</p>
        <h2>Sobre este arquivo</h2>
        <p>{investigation ?? "Os registros desta temporada serão exibidos aqui quando disponibilizados pelo serviço de dados."}</p>
      </section>
      {slug === "a-vigilia" && (
        <section className="season-vigil" aria-labelledby="season-vigil-title">
          <p className="archive-label">Protocolo especial // A Vigília</p>
          <h2 id="season-vigil-title">Pistas e itens ocultos</h2>
          <p>
            Elementos especiais desta temporada são apresentados de acordo com os dados
            recebidos. Molduras desbloqueadas aparecem no perfil e junto aos comentários do agente.
          </p>
          <div className="season-vigil__indicators">
            <span>Indicadores de pista</span>
            <span>Itens do arquivo</span>
            <span>Moldura de avatar</span>
          </div>
        </section>
      )}
    </article>
  );
}
