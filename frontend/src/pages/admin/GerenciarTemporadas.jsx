import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/AdminService.js";

const emptyForm = { nome: "", slug: "", ano: "", tema: "ordem", descricao: "", capa: "" };

function getSeasons(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.temporadas)) return response.temporadas;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para temporadas.");
}

export default function GerenciarTemporadas() {
  const [seasons, setSeasons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadSeasons = useCallback(async () => {
    setIsLoading(true);
    try {
      setSeasons(getSeasons(await AdminService.listarTemporadas()));
    } catch (error) {
      console.error("Não foi possível carregar temporadas no painel.", error);
      setErrorMessage(error.message || "Não foi possível consultar as temporadas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSeasons();
  }, [loadSeasons]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const beginEdit = (season) => {
    setEditingId(season.id);
    setForm({
      nome: season.nome ?? "",
      slug: season.slug ?? "",
      ano: season.ano ?? "",
      tema: season.tema ?? "ordem",
      descricao: season.descricao ?? "",
      capa: season.capa ?? season.imagem ?? "",
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
      slug: form.slug.trim(),
      ano: form.ano ? Number(form.ano) : null,
      tema: form.tema,
      descricao: form.descricao.trim(),
      capa: form.capa.trim(),
    };

    try {
      if (editingId !== null) await AdminService.atualizarTemporada(editingId, data);
      else await AdminService.criarTemporada(data);
      setSuccessMessage(editingId !== null ? "Temporada atualizada." : "Temporada adicionada ao arquivo.");
      resetForm();
      await loadSeasons();
    } catch (error) {
      console.error("Não foi possível salvar a temporada.", error);
      setErrorMessage(error.message || "Não foi possível salvar este registro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (season) => {
    if (!window.confirm(`Remover a temporada ${season.nome ?? "selecionada"}?`)) return;
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await AdminService.removerTemporada(season.id);
      setSeasons((current) => current.filter((entry) => entry.id !== season.id));
      if (editingId === season.id) resetForm();
      setSuccessMessage("Temporada removida do arquivo.");
    } catch (error) {
      console.error("Não foi possível remover a temporada.", error);
      setErrorMessage(error.message || "Não foi possível remover este registro.");
    }
  };

  return (
    <div className="admin-page">
      <Link className="archive-action-link" to="/admin">← Painel de autoridade</Link>
      <header className="admin-header">
        <p className="archive-label">Administração // Arquivo cronológico</p>
        <h1>Gerenciar temporadas</h1>
        <p>Cadastre temporadas e aplique a identidade visual adequada a cada arquivo.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {successMessage && <p className="admin-success" role="status">{successMessage}</p>}
      <form className="admin-editor" onSubmit={handleSubmit}>
        <h2>{editingId !== null ? "Editar temporada" : "Nova temporada"}</h2>
        <div className="admin-form-grid">
          <label>Nome<input maxLength={120} name="nome" onChange={handleChange} required value={form.nome} /></label>
          <label>Slug<input maxLength={120} name="slug" onChange={handleChange} required value={form.slug} /></label>
          <label>Ano<input max={2100} min={1900} name="ano" onChange={handleChange} type="number" value={form.ano} /></label>
          <label>Tema
            <select name="tema" onChange={handleChange} value={form.tema}>
              <option value="ordem">Padrão da Ordem</option>
              <option value="segredo-floresta">O Segredo na Floresta</option>
              <option value="hexatombe">Hexatombe</option>
              <option value="vigilia">A Vigília</option>
              <option value="calamidade">Calamidade</option>
              <option value="segredo-ilha">O Segredo na Ilha</option>
              <option value="desconjuracao">Desconjuração</option>
              <option value="sinais-outro-lado">Sinais do Outro Lado</option>
              <option value="natal-macabro">Natal Macabro</option>
            </select>
          </label>
          <label className="admin-form-grid__wide">Capa (URL)<input maxLength={1000} name="capa" onChange={handleChange} type="url" value={form.capa} /></label>
          <label className="admin-form-grid__wide">Descrição<textarea maxLength={3000} name="descricao" onChange={handleChange} rows={4} value={form.descricao} /></label>
        </div>
        <div className="admin-form-actions">
          {editingId !== null && <button className="archive-secondary-button" onClick={resetForm} type="button">Cancelar edição</button>}
          <button className="archive-primary-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Salvando..." : editingId !== null ? "Atualizar temporada" : "Adicionar temporada"}
          </button>
        </div>
      </form>
      <section className="admin-list-section">
        <h2>Temporadas cadastradas</h2>
        {isLoading ? <p className="archive-loading" role="status">Consultando temporadas...</p> : seasons.length ? (
          <div className="admin-record-list">
            {seasons.map((season) => (
              <article className="admin-record" key={season.id}>
                <div className="admin-record__identity">
                  <h3>{season.nome}</h3>
                  <p>{season.ano ?? "Ano não informado"} · Tema: {season.tema ?? "ordem"}</p>
                  <span className="admin-record__id">/{season.slug ?? season.id}</span>
                </div>
                <div className="admin-record__actions">
                  <button className="archive-secondary-button" onClick={() => beginEdit(season)} type="button">Editar</button>
                  <button className="admin-delete-button" onClick={() => handleDelete(season)} type="button">Remover</button>
                </div>
              </article>
            ))}
          </div>
        ) : <p className="archive-empty">Nenhuma temporada cadastrada.</p>}
      </section>
    </div>
  );
}
