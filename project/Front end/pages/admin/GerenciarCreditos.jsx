import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/AdminService.js";
import CreditoService from "../../services/CreditoService.js";

function getCredits(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.creditos)) return response.creditos;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para os créditos.");
}

const sampleEntry = {
  nome: "",
  funcao: "",
  categoria: "Equipe",
  link: "",
};

export default function GerenciarCreditos() {
  const [credits, setCredits] = useState([]);
  const [jsonText, setJsonText] = useState("[]");
  const [form, setForm] = useState(sampleEntry);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadCredits = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const result = getCredits(await CreditoService.listar());
      setCredits(result);
      setJsonText(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Não foi possível carregar os créditos para administração.", error);
      setErrorMessage(error.message || "Não foi possível consultar os créditos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCredits();
  }, [loadCredits]);

  const addEntry = (event) => {
    event.preventDefault();
    const name = form.nome.trim();
    if (!name) return;
    const entry = {
      ...form,
      nome: name,
      funcao: form.funcao.trim(),
      link: form.link.trim(),
      id: globalThis.crypto?.randomUUID?.() ?? `credit-${Date.now()}`,
    };
    const next = [...credits, entry];
    setCredits(next);
    setJsonText(JSON.stringify(next, null, 2));
    setForm(sampleEntry);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const removeEntry = (entry) => {
    const next = credits.filter((credit) => credit !== entry);
    setCredits(next);
    setJsonText(JSON.stringify(next, null, 2));
  };

  const handleJsonChange = (event) => {
    const nextText = event.target.value;
    setJsonText(nextText);
    try {
      const parsed = JSON.parse(nextText);
      if (!Array.isArray(parsed)) {
        setErrorMessage("O conteúdo dos créditos precisa ser um array JSON.");
        return;
      }
      setCredits(parsed);
      setErrorMessage("");
    } catch {
      setErrorMessage("JSON inválido. Corrija a estrutura antes de salvar.");
    }
  };

  const handleSave = async () => {
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) throw new Error("O conteúdo deve ser um array JSON.");
    } catch (error) {
      setErrorMessage(error.message || "Corrija o JSON antes de salvar.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await AdminService.atualizarCreditos({ creditos: parsed });
      const updatedCredits = response?.creditos ?? response?.data?.creditos;
      if (Array.isArray(updatedCredits)) {
        setCredits(updatedCredits);
        setJsonText(JSON.stringify(updatedCredits, null, 2));
      }
      setSuccessMessage("Créditos atualizados.");
    } catch (error) {
      console.error("Não foi possível atualizar os créditos.", error);
      setErrorMessage(error.message || "Não foi possível salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <Link className="archive-action-link" to="/admin">← Painel de autoridade</Link>
      <header className="admin-header">
        <p className="archive-label">Administração // Reconhecimento</p>
        <h1>Gerenciar créditos</h1>
        <p>Atualize os colaboradores e suas contribuições exibidas na página pública de créditos.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {successMessage && <p className="admin-success" role="status">{successMessage}</p>}
      {isLoading ? <p className="archive-loading" role="status">Consultando créditos...</p> : (
        <>
          <form className="admin-editor" onSubmit={addEntry}>
            <h2>Adicionar colaborador</h2>
            <div className="admin-form-grid">
              <label>Nome<input maxLength={120} onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))} required value={form.nome} /></label>
              <label>Função<input maxLength={140} onChange={(event) => setForm((current) => ({ ...current, funcao: event.target.value }))} value={form.funcao} /></label>
              <label>Categoria<input maxLength={100} onChange={(event) => setForm((current) => ({ ...current, categoria: event.target.value }))} value={form.categoria} /></label>
              <label>Link (opcional)<input maxLength={1000} onChange={(event) => setForm((current) => ({ ...current, link: event.target.value }))} type="url" value={form.link} /></label>
            </div>
            <button className="archive-secondary-button" type="submit">Adicionar à lista</button>
          </form>

          <section className="admin-list-section">
            <h2>Colaboradores cadastrados</h2>
            {credits.length ? (
              <div className="admin-record-list">
                {credits.map((credit, index) => (
                  <article className="admin-record" key={credit.id ?? `${credit.nome}-${index}`}>
                    <div className="admin-record__identity">
                      <h3>{credit.nome ?? credit.name ?? "Colaborador"}</h3>
                      <p>{credit.funcao ?? credit.papel ?? "Função não informada"} · {credit.categoria ?? "Colaboradores"}</p>
                    </div>
                    <button className="admin-delete-button" onClick={() => removeEntry(credit)} type="button">Remover da lista</button>
                  </article>
                ))}
              </div>
            ) : <p className="archive-empty">Nenhum crédito cadastrado.</p>}
          </section>

          <section className="admin-editor">
            <h2>Revisão dos dados</h2>
            <p className="admin-editor__hint">Formato aceito pelo serviço: array JSON de créditos.</p>
            <label className="sr-only" htmlFor="credits-json">Dados dos créditos em JSON</label>
            <textarea
              className="admin-json-editor"
              id="credits-json"
              onChange={handleJsonChange}
              rows={12}
              spellCheck="false"
              value={jsonText}
            />
            <div className="admin-form-actions">
              <button className="archive-primary-button" disabled={isSaving} onClick={handleSave} type="button">
                {isSaving ? "Salvando..." : "Salvar créditos"}
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
