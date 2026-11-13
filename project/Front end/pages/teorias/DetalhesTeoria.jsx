import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BotaoCurtir from "../../components/BotaoCurtir.jsx";
import Comentarios from "../../components/Comentarios.jsx";
import TeoriasService from "../../services/TeoriasService.js";
import { useAuth } from "../../hooks/useAuth.js";

function getTheory(response) {
  const theory = response?.teoria ?? response?.data?.teoria ?? response?.data ?? response;
  if (!theory || typeof theory !== "object" || Array.isArray(theory)) {
    throw new Error("O serviço retornou um formato inesperado para a teoria.");
  }
  return theory;
}

export default function DetalhesTeoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [theory, setTheory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [voteMessage, setVoteMessage] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setErrorMessage("");
    setTheory(null);
    TeoriasService.obterPorId(id)
      .then((response) => {
        const result = getTheory(response);
        if (active) setTheory(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar a teoria.", error);
          setErrorMessage(error.message || "Não foi possível acessar esta hipótese.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleVote = async (vote) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isVoting) return;

    setIsVoting(true);
    setVoteMessage("");
    try {
      const response = await TeoriasService.avaliar(theory.id ?? id, vote);
      const updatedTheory = response?.teoria ?? response?.data?.teoria;
      if (updatedTheory) setTheory(updatedTheory);
      else if (response && typeof response === "object") {
        setTheory((current) => ({ ...current, ...response }));
      }
      setVoteMessage(vote === "sim" ? "Seu apoio foi registrado." : "Sua avaliação foi registrada.");
    } catch (error) {
      console.error("Não foi possível registrar a avaliação.", error);
      setVoteMessage(error.message || "Não foi possível registrar sua avaliação.");
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) return <p className="archive-loading" role="status">Consultando hipótese...</p>;
  if (errorMessage) {
    return (
      <section className="archive-error-panel" role="alert">
        <p className="archive-label">Falha na consulta // Teorias</p>
        <h1>Hipótese indisponível</h1>
        <p>{errorMessage}</p>
        <Link className="archive-action-link" to="/teorias">Voltar às teorias</Link>
      </section>
    );
  }

  const author = theory.usuario ?? theory.autor ?? {};
  const evaluations = theory.avaliacoes ?? {};
  const comments = theory.comentarios;

  return (
    <article className="community-detail theory-detail">
      <Link className="archive-action-link" to="/teorias">← Voltar ao arquivo de teorias</Link>
      <header className="community-detail__header">
        <p className="archive-label">Hipótese em investigação{theory.temporada ? ` // ${theory.temporada}` : ""}</p>
        <h1>{theory.titulo ?? "Teoria sem título"}</h1>
        <div className="community-detail__meta">
          <span>Proposta por {author.nome ?? author.name ?? "Agente"}</span>
          <span>Interpretação comunitária, não oficial</span>
        </div>
      </header>
      {theory.resumo && <p className="theory-detail__summary">{theory.resumo}</p>}
      <div className="community-detail__content">
        <p>{theory.conteudo ?? theory.texto ?? theory.content}</p>
      </div>
      <section aria-labelledby="theory-evaluation-heading" className="theory-evaluation">
        <div>
          <p className="archive-label">Discussão de hipótese</p>
          <h2 id="theory-evaluation-heading">Como você avalia estes indícios?</h2>
        </div>
        <div className="theory-evaluation__actions">
          <button disabled={isVoting} onClick={() => handleVote("sim")} type="button">
            Faz sentido <span>{evaluations.concordo ?? theory.fezSentido ?? 0}</span>
          </button>
          <button disabled={isVoting} onClick={() => handleVote("nao")} type="button">
            Não me convence <span>{evaluations.discordo ?? theory.naoFezSentido ?? 0}</span>
          </button>
        </div>
        {voteMessage && <p className="theory-evaluation__message" role="status">{voteMessage}</p>}
      </section>
      <BotaoCurtir
        curtido={theory.curtido ?? theory.usuarioCurtiu}
        curtidas={theory.curtidas ?? 0}
        itemId={theory.id ?? id}
        tipo="teorias"
      />
      <Comentarios tipo="teorias" itemId={theory.id ?? id} comentarios={comments} />
    </article>
  );
}
