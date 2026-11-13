import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoritoService from "../../services/FavoritoService.js";

function getFavorites(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.favoritos)) return response.favoritos;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para os favoritos.");
}

function getFavoriteLink(favorite) {
  const type = String(favorite.tipo ?? favorite.type ?? "").toLowerCase();
  const id = favorite.itemId ?? favorite.referenciaId ?? favorite.item?.id ?? favorite.id;
  if (id === undefined || id === null) return "";
  const encodedId = encodeURIComponent(id);

  if (type.includes("personagem")) return `/personagens/${encodedId}`;
  if (type.includes("temporada")) return `/temporadas/${encodedId}`;
  if (type.includes("teoria")) return `/teorias/${encodedId}`;
  if (type.includes("produto")) return `/produtos/${encodedId}`;
  if (type.includes("post") || type.includes("publicacao")) return `/comunidade/postagens/${encodedId}`;
  if (type.includes("jogador")) return `/jogadores/${encodedId}`;
  return "";
}

export default function Favoritos() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    let active = true;
    FavoritoService.listar()
      .then((response) => {
        const result = getFavorites(response);
        if (active) setFavorites(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar os favoritos.", error);
          setErrorMessage(error.message || "Não foi possível carregar seus favoritos.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleRemove = async (favorite) => {
    const type = favorite.tipo ?? favorite.type;
    const id = favorite.itemId ?? favorite.referenciaId ?? favorite.item?.id ?? favorite.id;
    if (!type || id === undefined || id === null || removingId !== null) return;

    setRemovingId(favorite.id ?? id);
    setErrorMessage("");
    try {
      await FavoritoService.remover(type, id);
      setFavorites((current) => current.filter((entry) => entry !== favorite));
    } catch (error) {
      console.error("Não foi possível remover o favorito.", error);
      setErrorMessage(error.message || "Não foi possível remover este favorito.");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="archive-list-page">
      <Link className="archive-action-link" to="/perfil">← Voltar ao perfil</Link>
      <header className="archive-list-header">
        <p className="archive-label">Arquivo pessoal // Itens salvos</p>
        <h1>Favoritos</h1>
        <p>Registros que você marcou para consultar novamente.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {isLoading ? (
        <p className="archive-loading" role="status">Consultando itens salvos...</p>
      ) : favorites.length ? (
        <div className="favorites-list">
          {favorites.map((favorite, index) => {
            const item = favorite.item ?? favorite.referencia ?? {};
            const title = favorite.titulo ?? item.titulo ?? item.nome ?? favorite.nome ?? "Registro favorito";
            const link = getFavoriteLink(favorite);
            const key = favorite.id ?? `${favorite.tipo ?? favorite.type}-${favorite.itemId ?? index}`;
            const favoriteId = favorite.id ?? favorite.itemId ?? favorite.referenciaId;
            return (
              <article className="favorite-row" key={key}>
                <div>
                  <p className="archive-label">{favorite.tipo ?? favorite.type ?? "Registro"}</p>
                  <h2>{title}</h2>
                  {favorite.descricao && <p>{favorite.descricao}</p>}
                </div>
                <div className="favorite-row__actions">
                  {link ? (
                    <Link className="archive-secondary-button" to={link}>Abrir registro</Link>
                  ) : (
                    <span className="favorite-row__unavailable">Link indisponível</span>
                  )}
                  <button
                    className="favorite-remove-button"
                    disabled={removingId !== null}
                    onClick={() => handleRemove(favorite)}
                    type="button"
                  >
                    {removingId === favoriteId ? "Removendo..." : "Remover"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="archive-empty">Você ainda não salvou nenhum registro.</p>
      )}
    </div>
  );
}
