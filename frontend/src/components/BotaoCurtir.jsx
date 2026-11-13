import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurtidaService from "../services/CurtidaService.js";
import { useAuth } from "../hooks/useAuth.js";

function readLikeStatus(response) {
  if (typeof response?.curtido === "boolean") return response.curtido;
  if (typeof response?.liked === "boolean") return response.liked;
  if (typeof response?.usuarioCurtiu === "boolean") return response.usuarioCurtiu;
  return null;
}

export default function BotaoCurtir({
  tipo = "postagens",
  itemId,
  curtidas = 0,
  curtido,
  onChange,
  className = "",
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(Boolean(curtido));
  const [likeCount, setLikeCount] = useState(Number(curtidas) || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLikeCount(Number(curtidas) || 0);
  }, [curtidas]);

  useEffect(() => {
    if (typeof curtido === "boolean") {
      setIsLiked(curtido);
      return;
    }

    if (!itemId) return undefined;
    let active = true;

    CurtidaService.obterStatus(tipo, itemId)
      .then((response) => {
        const status = readLikeStatus(response);
        if (active && status !== null) setIsLiked(status);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível consultar o estado da curtida.", error);
          setErrorMessage("Não foi possível carregar o estado da curtida.");
        }
      });

    return () => {
      active = false;
    };
  }, [curtido, itemId, tipo]);

  const handleClick = async () => {
    if (!itemId || isLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = isLiked
        ? await CurtidaService.descurtir(tipo, itemId)
        : await CurtidaService.curtir(tipo, itemId);
      const nextLiked = readLikeStatus(response) ?? !isLiked;
      const responseCount = Number(response?.curtidas ?? response?.count);
      const nextCount = Number.isFinite(responseCount)
        ? responseCount
        : Math.max(0, likeCount + (nextLiked ? 1 : -1));

      setIsLiked(nextLiked);
      setLikeCount(nextCount);
      onChange?.({ curtido: nextLiked, curtidas: nextCount });
    } catch (error) {
      console.error("Não foi possível atualizar a curtida.", error);
      setErrorMessage(error.message || "Não foi possível atualizar a curtida.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span className="like-control">
      <button
        aria-label={isLiked ? `Remover curtida. ${likeCount} curtidas` : `Curtir. ${likeCount} curtidas`}
        aria-pressed={isLiked}
        className={`like-button${isLiked ? " like-button--active" : ""} ${className}`.trim()}
        disabled={isLoading || !itemId}
        onClick={handleClick}
        type="button"
      >
        <span aria-hidden="true">{isLiked ? "♥" : "♡"}</span>
        <span>{likeCount}</span>
      </button>
      {errorMessage && <span className="like-control__error" role="status">{errorMessage}</span>}
    </span>
  );
}
