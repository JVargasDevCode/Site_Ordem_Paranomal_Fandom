import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/AdminService.js";

function getTheories(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.teorias)) return response.teorias;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para teorias.");
}

export default function GerenciarTeorias() {
  const [theories, setTheories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadTheories = useCallback(async () => {
    setIsLoading(true);
    try {
      setTheories(getTheories(await AdminService.listarTeorias()));
    } catch (error) {
      console.error("Não foi possível carregar teorias para moderação.", error);
      setErrorMessage(error.message || "Não foi possível consultar as teorias.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTheories();
  }, [loadTheories]);

  const moderate = async (theory, status) => {
    setBusyId(theory.id);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await AdminService.moderarTeoria(theory.id, { status });
      const updated = response?.teoria ?? response?.data?.teoria;
      if (updated) setTheories((current) => current.map((item) => item.id === theory.id ? updated : item));
      else setTheories((current) => current.map((item) => item.id === theory.id ? { ...item, status } : item));
      setSuccessMessage(`Status da teoria atualizado para ${status.toLowerCase()}.`);
    } catch (error) {
      console.error("Não foi possível moderar a teoria.", error);
      setErrorMessage(error.message || "Não foi possível atualizar o status.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (theory) => {
    if (!window.confirm(`Remover a teoria “${theory.titulo ?? "sem título"}”?`)) return;
    setBusyId(theory.id);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await AdminService.removerTeoria(theory.id);
      setTheories((current) => current.filter((item) => item.id !== theory.id));
      setSuccessMessage("Teoria removida do arquivo.");
    } catch (error) {
      console.error("Não foi possível remover a teoria.", error);
      setErrorMessage(error.message || "Não foi possível remover a teoria.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-page">
      <Link className="archive-action-link" to="/admin">← Painel de autoridade</Link>
      <header className="admin-header">
        <p className="archive-label">Administração // Moderação</p>
        <h1>Gerenciar teorias</h1>
        <p>Revise o conteúdo comunitário e atualize o status de moderação de cada hipótese.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {successMessage && <p className="admin-success" role="status">{successMessage}</p>}
      {isLoading ? <p className="archive-loading" role="status">Consultando hipóteses...</p> : theories.length ? (
        <div className="admin-record-list">
          {theories.map((theory) => (
            <article className="admin-record admin-record--stacked" key={theory.id}>
              <div className="admin-record__identity">
                <p className="archive-label">{theory.temporada ?? "Teoria comunitária"} · {theory.status ?? "PENDENTE"}</p>
                <h2>{theory.titulo ?? "Teoria sem título"}</h2>
                <p>{theory.resumo ?? theory.conteudo ?? "Sem resumo disponível."}</p>
              </div>
              <div className="admin-record__actions">
                <button className="archive-secondary-button" disabled={busyId !== null} onClick={() => moderate(theory, "APROVADA")} type="button">Aprovar</button>
                <button className="archive-secondary-button" disabled={busyId !== null} onClick={() => moderate(theory, "REJEITADA")} type="button">Rejeitar</button>
                <button className="admin-delete-button" disabled={busyId !== null} onClick={() => remove(theory)} type="button">
                  {busyId === theory.id ? "Processando..." : "Remover"}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : <p className="archive-empty">Nenhuma teoria para moderar.</p>}
    </div>
  );
}
