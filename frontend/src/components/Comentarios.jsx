import { useCallback, useEffect, useState } from "react";
import ComentarioService from "../services/ComentarioService.js";
import { useAuth } from "../hooks/useAuth.js";

function getCommentList(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.comentarios)) return response.comentarios;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

function getFrame(user) {
  const frame = user?.molduraEspecial ?? user?.avatarFrame ?? user?.moldura;
  if (!frame || frame.desbloqueada === false || frame.unlocked === false) return null;
  return frame;
}

function Avatar({ user }) {
  const frame = getFrame(user);
  const frameName = typeof frame === "string" ? frame : frame?.nome ?? frame?.name ?? "";
  const isVigiliaFrame = Boolean(frame) && /vig[ií]lia/i.test(
    `${frameName} ${frame?.temporada ?? frame?.theme ?? frame?.slug ?? ""}`,
  );
  const avatarUrl = user?.avatarUrl ?? user?.foto ?? user?.imagem;
  const displayName = user?.nome ?? user?.name ?? "Agente";

  return (
    <span
      className={`comment-avatar${isVigiliaFrame ? " comment-avatar--vigilia" : ""}`}
      aria-label={isVigiliaFrame ? `Avatar de ${displayName} com moldura especial de A Vigília` : undefined}
      title={isVigiliaFrame ? `Moldura especial: ${frameName || "A Vigília"}` : undefined}
    >
      {avatarUrl ? (
        <img alt="" className="comment-avatar__image" loading="lazy" src={avatarUrl} />
      ) : (
        <span aria-hidden="true">{displayName.trim().charAt(0).toUpperCase() || "?"}</span>
      )}
      {isVigiliaFrame && <span aria-hidden="true" className="comment-avatar__frame" />}
    </span>
  );
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
}

export default function Comentarios({
  tipo = "postagens",
  itemId,
  comentarios: initialComments,
  onCommentAdded,
}) {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments ?? []);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(initialComments === undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadComments = useCallback(async () => {
    if (!itemId) {
      setComments(initialComments ?? []);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const result = await ComentarioService.listar(tipo, itemId);
      setComments(getCommentList(result));
    } catch (error) {
      console.error("Não foi possível carregar os comentários.", error);
      setErrorMessage(error.message || "Não foi possível carregar os comentários.");
    } finally {
      setIsLoading(false);
    }
  }, [initialComments, itemId, tipo]);

  useEffect(() => {
    if (initialComments !== undefined) {
      setComments(initialComments);
      setIsLoading(false);
      return;
    }
    loadComments();
  }, [initialComments, loadComments]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const texto = commentText.trim();
    if (!itemId || !texto || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const response = await ComentarioService.criar(tipo, itemId, { texto });
      const createdComment = response?.comentario ?? response?.data ?? response;
      if (createdComment && typeof createdComment === "object") {
        const enrichedComment = {
          ...createdComment,
          usuario: createdComment.usuario ?? user,
        };
        setComments((current) => [...current, enrichedComment]);
        onCommentAdded?.(enrichedComment);
      } else {
        await loadComments();
      }
      setCommentText("");
    } catch (error) {
      console.error("Não foi possível publicar o comentário.", error);
      setErrorMessage(error.message || "Não foi possível publicar o comentário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="comments-heading" className="comments">
      <div className="comments__heading">
        <div>
          <p className="archive-label">Registro de campo</p>
          <h2 id="comments-heading">Comentários <span>{comments.length}</span></h2>
        </div>
      </div>

      {errorMessage && <p className="comments__error" role="alert">{errorMessage}</p>}

      {user ? (
        <form className="comments__form" onSubmit={handleSubmit}>
          <Avatar user={user} />
          <label className="sr-only" htmlFor={`comment-${tipo}-${itemId}`}>Escreva um comentário</label>
          <textarea
            id={`comment-${tipo}-${itemId}`}
            maxLength={2000}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Deixe seu registro..."
            required
            value={commentText}
          />
          <button disabled={isSubmitting || !commentText.trim() || !itemId} type="submit">
            {isSubmitting ? "Enviando..." : "Comentar"}
          </button>
        </form>
      ) : (
        <p className="comments__signin">Entre na sua conta para participar da investigação.</p>
      )}

      {isLoading ? (
        <p className="comments__empty" role="status">Carregando registros...</p>
      ) : comments.length ? (
        <ul className="comments__list">
          {comments.map((comment, index) => {
            const author = comment.usuario ?? comment.autor ?? {};
            const commentId = comment.id ?? `${comment.criadoEm ?? "registro"}-${index}`;
            return (
              <li className="comment-entry" key={commentId}>
                <Avatar user={author} />
                <div className="comment-entry__body">
                  <div className="comment-entry__meta">
                    <strong>{author.nome ?? author.name ?? "Agente da Ordem"}</strong>
                    <time>{formatDate(comment.criadoEm ?? comment.data ?? comment.createdAt)}</time>
                  </div>
                  <p>{comment.texto ?? comment.conteudo ?? comment.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="comments__empty">Nenhum registro por aqui. Seja o primeiro a comentar.</p>
      )}
    </section>
  );
}
