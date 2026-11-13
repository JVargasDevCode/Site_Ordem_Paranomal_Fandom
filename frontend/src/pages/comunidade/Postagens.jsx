import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BotaoCurtir from "../../components/BotaoCurtir.jsx";
import CardComunidade from "../../components/CardComunidade.jsx";
import PostagemService from "../../services/PostagemService.js";

function getPosts(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.postagens)) return response.postagens;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para as publicações.");
}

export default function Postagens() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    PostagemService.listar({ ordenar: "recentes" })
      .then((response) => {
        const result = getPosts(response);
        if (active) setPosts(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar as publicações.", error);
          setErrorMessage(error.message || "Não foi possível carregar o mural.");
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
      <header className="archive-list-header archive-list-header--with-action">
        <div>
          <p className="archive-label">Mural de campo // Comunidade</p>
          <h1>Publicações</h1>
          <p>Registros compartilhados por agentes e investigadores da comunidade.</p>
        </div>
        <Link className="archive-primary-button" to="/comunidade/criar">Nova publicação</Link>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {isLoading ? (
        <p className="archive-loading" role="status">Carregando o mural...</p>
      ) : posts.length ? (
        <div className="community-post-list">
          {posts.map((post) => (
            <article className="community-post-row" key={post.id ?? post.slug}>
              <CardComunidade postagem={post} />
              <div className="community-post-row__actions">
                <BotaoCurtir
                  curtido={post.curtido ?? post.usuarioCurtiu}
                  curtidas={post.curtidas ?? post.totalCurtidas ?? 0}
                  itemId={post.id}
                  tipo="postagens"
                />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="archive-empty">O mural ainda não tem publicações. Você pode iniciar a conversa.</p>
      )}
    </div>
  );
}
