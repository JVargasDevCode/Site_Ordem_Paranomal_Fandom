import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BotaoCurtir from "../../components/BotaoCurtir.jsx";
import Comentarios from "../../components/Comentarios.jsx";
import PostagemService from "../../services/PostagemService.js";

function getPost(response) {
  const post = response?.postagem ?? response?.data?.postagem ?? response?.data ?? response;
  if (!post || typeof post !== "object" || Array.isArray(post)) {
    throw new Error("O serviço retornou um formato inesperado para a publicação.");
  }
  return post;
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(date);
}

export default function DetalhesPostagem() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setErrorMessage("");
    setPost(null);
    PostagemService.obterPorId(id)
      .then((response) => {
        const result = getPost(response);
        if (active) setPost(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar a publicação.", error);
          setErrorMessage(error.message || "Não foi possível acessar este registro.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (isLoading) return <p className="archive-loading" role="status">Consultando publicação...</p>;
  if (errorMessage) {
    return (
      <section className="archive-error-panel" role="alert">
        <p className="archive-label">Falha na consulta // Mural</p>
        <h1>Publicação indisponível</h1>
        <p>{errorMessage}</p>
        <Link className="archive-action-link" to="/comunidade/postagens">Voltar ao mural</Link>
      </section>
    );
  }

  const author = post.usuario ?? post.autor ?? {};
  const postType = post.categoria ?? post.tipo ?? "Registro comunitário";

  return (
    <article className="community-detail">
      <Link className="archive-action-link" to="/comunidade/postagens">← Voltar ao mural</Link>
      <header className="community-detail__header">
        <p className="archive-label">{postType} // Registro comunitário</p>
        <h1>{post.titulo ?? "Publicação"}</h1>
        <div className="community-detail__meta">
          <span>Por {author.nome ?? author.name ?? "Agente"}</span>
          <time>{formatDate(post.criadoEm ?? post.data ?? post.createdAt)}</time>
        </div>
      </header>
      {post.imagem && <img alt="" className="community-detail__image" src={post.imagem} />}
      <div className="community-detail__content">
        <p>{post.conteudo ?? post.texto ?? post.content}</p>
      </div>
      <div className="community-detail__actions">
        <BotaoCurtir
          curtido={post.curtido ?? post.usuarioCurtiu}
          curtidas={post.curtidas ?? post.totalCurtidas ?? 0}
          itemId={post.id ?? id}
          tipo="postagens"
        />
      </div>
      <Comentarios tipo="postagens" itemId={post.id ?? id} comentarios={post.comentarios} />
    </article>
  );
}
