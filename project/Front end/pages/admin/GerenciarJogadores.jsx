import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/AdminService.js";

const emptyForm = { nome: "", funcao: "", descricao: "" };

function getPlayers(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.jogadores)) return response.jogadores;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para jogadores.");
}

export default function GerenciarJogadores() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadPlayers = useCallback(async () => {
    setIsLoading(true);
    try {
      setPlayers(getPlayers(await AdminService.listarJogadores()));
    } catch (error) {
      console.error("Não foi possível carregar jogadores no painel.", error);
      setErrorMessage(error.message || "Não foi possível consultar a equipe.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const beginEdit = (player) => {
    setEditingId(player.id);
    setForm({
      nome: player.nome ?? "",
      funcao: player.funcao ?? player.papel ?? "",
      descricao: player.descricao ?? player.biografia ?? "",
    });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    const data = {
      nome: form.nome.trim(),
      funcao: form.funcao.trim(),
      descricao: form.descricao.trim(),
    };

    try {
      if (editingId !== null) await AdminService.atualizarJogador(editingId, data);
      else await AdminService.criarJogador(data);
      setSuccessMessage(editingId !== null ? "Perfil atualizado." : "Perfil adicionado à equipe.");
      resetForm();
      await loadPlayers();
    } catch (error) {
      console.error("Não foi possível salvar o perfil do jogador.", error);
      setErrorMessage(error.message || "Não foi possível salvar este perfil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (player) => {
    if (!window.confirm(`Remover ${player.nome ?? "este perfil"} da equipe?`)) return;
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await AdminService.removerJogador(player.id);
      setPlayers((current) => current.filter((entry) => entry.id !== player.id));
      if (editingId === player.id) resetForm();
      setSuccessMessage("Perfil removido da equipe.");
    } catch (error) {
      console.error("Não foi possível remover o perfil do jogador.", error);
      setErrorMessage(error.message || "Não foi possível remover este perfil.");
    }
  };

  return (
    <div className="admin-page">
      <Link className="archive-action-link" to="/admin">← Painel de autoridade</Link>
      <header className="admin-header">
        <p className="archive-label">Administração // Equipe de apoio</p>
        <h1>Gerenciar jogadores</h1>
        <p>Atualize os perfis de players e equipe de apoio cadastrados no arquivo.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {successMessage && <p className="admin-success" role="status">{successMessage}</p>}
      <form className="admin-editor" onSubmit={handleSubmit}>
        <h2>{editingId !== null ? "Editar perfil" : "Adicionar perfil"}</h2>
        <div className="admin-form-grid">
          <label>Nome<input maxLength={100} onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))} required value={form.nome} /></label>
          <label>Função<input maxLength={100} onChange={(event) => setForm((current) => ({ ...current, funcao: event.target.value }))} value={form.funcao} /></label>
          <label className="admin-form-grid__wide">Biografia / créditos<textarea maxLength={5000} onChange={(event) => setForm((current) => ({ ...current, descricao: event.target.value }))} rows={5} value={form.descricao} /></label>
        </div>
        <div className="admin-form-actions">
          {editingId !== null && <button className="archive-secondary-button" onClick={resetForm} type="button">Cancelar edição</button>}
          <button className="archive-primary-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Salvando..." : editingId !== null ? "Atualizar perfil" : "Adicionar à equipe"}
          </button>
        </div>
      </form>
      <section className="admin-list-section">
        <h2>Equipe cadastrada</h2>
        {isLoading ? <p className="archive-loading" role="status">Consultando equipe...</p> : players.length ? (
          <div className="admin-record-list">
            {players.map((player) => (
              <article className="admin-record" key={player.id}>
                <div className="admin-record__identity">
                  <h3>{player.nome ?? "Agente"}</h3>
                  <p>{player.funcao ?? player.papel ?? "Função não informada"}</p>
                </div>
                <div className="admin-record__actions">
                  <button className="archive-secondary-button" onClick={() => beginEdit(player)} type="button">Editar</button>
                  <button className="admin-delete-button" onClick={() => handleDelete(player)} type="button">Remover</button>
                </div>
              </article>
            ))}
          </div>
        ) : <p className="archive-empty">Nenhum perfil cadastrado.</p>}
      </section>
    </div>
  );
}
