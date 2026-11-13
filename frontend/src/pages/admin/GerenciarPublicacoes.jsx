import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/AdminService.js";

function getPublications(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.publicacoes)) return response.publicacoes;
  if (Array.isArray(response?.postagens)) return response.postagens;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para publicações.");
}

export default function GerenciarPublicacoes() {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadPublications = useCallback(async () => {
    setIsLoading(true);
    try {
      setPublications(getPublications(await AdminService.listarPublicacoes()));
    } catch (error) {
      console.error("Não foi possível carregar publicações para moderação.", error);
      setErrorMessage(error.message || "Não foi possível consultar as publicações.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPublications();
  }, [loadPublications]);

  const moderate = async (publication, status) => {
    setBusyId(publication.id);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await AdminService.moderarPublicacao(publication.id, { status });
      const updated = response?.publicacao ?? response?.postagem ?? response?.data?.publicacao;
      if (updated) setPublications((current) => current.map((item) => item.id === publication.id ? updated : item));
      else setPublications((current) => current.map((item) => item.id === publication.id ? { ...item, status } : item));
      setSuccessMessage(`Status da publicação atualizado para ${status.toLowerCase()}.`);
    } catch (error) {
      console.error("Não foi possível moderar a publicação.", error);
      setErrorMessage(error.message || "Não foi possível atualizar o status.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (publication) => {
    if (!window.confirm(`Remover a publicação “${publication.titulo ?? "sem título"}”?`)) return;
    setBusyId(publication.id);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await AdminService.removerPublicacao(publication.id);
      setPublications((current) => current.filter((item) => item.id !== publication.id));
      setSuccessMessage("Publicação removida do mural.");
    } catch (error) {
      console.error("Não foi possível remover a publicação.", error);
      setErrorMessage(error.message || "Não foi possível remover a publicação.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-page">
      <Link className="archive-action-link" to="/admin">← Painel de autoridade</Link>
      <header className="admin-header">
        <p className="archive-label">Administração // Mural comunitário</p>
        <h1>Gerenciar publicações</h1>
        <p>Revise os registros do mural, atualize seu estado de publicação ou remova conteúdo inadequado.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {successMessage && <p className="admin-success" role="status">{successMessage}</p>}
      {isLoading ? <p className="archive-loading" role="status">Consultando mural...</p> : publications.length ? (
        <div className="admin-record-list">
          {publications.map((publication) => (
            <article className="admin-record admin-record--stacked" key={publication.id}>
              <div className="admin-record__identity">
                <p className="archive-label">{publication.categoria ?? publication.tipo ?? "Publicação"} · {publication.status ?? "PUBLICADA"}</p>
                <h2>{publication.titulo ?? "Publicação sem título"}</h2>
                <p>{publication.conteudo ?? publication.resumo ?? "Sem conteúdo disponível."}</p>
                <span className="admin-record__id">Autor: {publication.usuario?.nome ?? publication.autor?.nome ?? "Agente"}</span>
              </div>
              <div className="admin-record__actions">
                <button className="archive-secondary-button" disabled={busyId !== null} onClick={() => moderate(publication, "PUBLICADA")} type="button">Manter publicada</button>
                <button className="archive-secondary-button" disabled={busyId !== null} onClick={() => moderate(publication, "OCULTA")} type="button">Ocultar</button>
                <button className="admin-delete-button" disabled={busyId !== null} onClick={() => remove(publication)} type="button">
                  {busyId === publication.id ? "Processando..." : "Remover"}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : <p className="archive-empty">Nenhuma publicação para moderar.</p>}
    </div>
  );
}
