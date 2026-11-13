import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/AdminService.js";

const emptyForm = { nome: "", classe: "", origem: "", nex: "", historico: "" };

function getCharacters(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.personagens)) return response.personagens;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para os personagens.");
}

export default function GerenciarPersonagens() {
  const [characters, setCharacters] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadCharacters = useCallback(async () => {
    setIsLoading(true);
    try {
      setCharacters(getCharacters(await AdminService.listarPersonagens()));
    } catch (error) {
      console.error("Não foi possível carregar personagens no painel.", error);
      setErrorMessage(error.message || "Não foi possível consultar os personagens.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const beginEdit = (character) => {
    setEditingId(character.id);
    setForm({
      nome: character.nome ?? "",
      classe: character.classe ?? "",
      origem: character.origem ?? "",
      nex: character.nex ?? "",
      historico: character.historico ?? character.lore ?? "",
    });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    const data = {
      nome: form.nome.trim(),
      classe: form.classe.trim(),
      origem: form.origem.trim(),
      nex: form.nex === "" ? null : Number(form.nex),
      historico: form.historico.trim(),
    };

    try {
      if (editingId !== null) await AdminService.atualizarPersonagem(editingId, data);
      else await AdminService.criarPersonagem(data);
      setSuccessMessage(editingId !== null ? "Dossiê atualizado." : "Personagem adicionado ao arquivo.");
      resetForm();
      await loadCharacters();
    } catch (error) {
      console.error("Não foi possível salvar o personagem.", error);
      setErrorMessage(error.message || "Não foi possível salvar este dossiê.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (character) => {
    if (!window.confirm(`Remover o dossiê de ${character.nome ?? "este personagem"}?`)) return;
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await AdminService.removerPersonagem(character.id);
      setCharacters((current) => current.filter((entry) => entry.id !== character.id));
      if (editingId === character.id) resetForm();
      setSuccessMessage("Dossiê removido.");
    } catch (error) {
      console.error("Não foi possível remover o personagem.", error);
      setErrorMessage(error.message || "Não foi possível remover este dossiê.");
    }
  };

  return (
    <div className="admin-page">
      <Link className="archive-action-link" to="/admin">← Painel de autoridade</Link>
      <header className="admin-header">
        <p className="archive-label">Administração // Dossiês</p>
        <h1>Gerenciar personagens</h1>
        <p>Crie e atualize registros de personagem. O histórico deve respeitar as informações publicadas oficialmente.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {successMessage && <p className="admin-success" role="status">{successMessage}</p>}
      <form className="admin-editor" onSubmit={handleSubmit}>
        <h2>{editingId !== null ? "Editar dossiê" : "Novo dossiê"}</h2>
        <div className="admin-form-grid">
          <label>Nome<input maxLength={100} name="nome" onChange={handleChange} required value={form.nome} /></label>
          <label>Classe<input maxLength={80} name="classe" onChange={handleChange} value={form.classe} /></label>
          <label>Origem<input maxLength={100} name="origem" onChange={handleChange} value={form.origem} /></label>
          <label>NEX (%)<input max={100} min={0} name="nex" onChange={handleChange} type="number" value={form.nex} /></label>
          <label className="admin-form-grid__wide">Histórico / Lore<textarea maxLength={12000} name="historico" onChange={handleChange} rows={5} value={form.historico} /></label>
        </div>
        <div className="admin-form-actions">
          {editingId !== null && <button className="archive-secondary-button" onClick={resetForm} type="button">Cancelar edição</button>}
          <button className="archive-primary-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Salvando..." : editingId !== null ? "Atualizar dossiê" : "Adicionar personagem"}
          </button>
        </div>
      </form>
      <section className="admin-list-section">
        <h2>Registros cadastrados</h2>
        {isLoading ? <p className="archive-loading" role="status">Consultando dossiês...</p> : characters.length ? (
          <div className="admin-record-list">
            {characters.map((character) => (
              <article className="admin-record" key={character.id}>
                <div className="admin-record__identity">
                  <h3>{character.nome ?? "Personagem"}</h3>
                  <p>{[character.classe, character.origem, character.nex !== undefined ? `NEX ${character.nex}%` : null].filter(Boolean).join(" · ")}</p>
                </div>
                <div className="admin-record__actions">
                  <button className="archive-secondary-button" onClick={() => beginEdit(character)} type="button">Editar</button>
                  <button className="admin-delete-button" onClick={() => handleDelete(character)} type="button">Remover</button>
                </div>
              </article>
            ))}
          </div>
        ) : <p className="archive-empty">Nenhum personagem cadastrado.</p>}
      </section>
    </div>
  );
}
