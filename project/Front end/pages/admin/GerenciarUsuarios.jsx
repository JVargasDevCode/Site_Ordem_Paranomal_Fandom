import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/AdminService.js";

function getUsers(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.usuarios)) return response.usuarios;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para os usuários.");
}

export default function GerenciarUsuarios() {
  const [users, setUsers] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const result = getUsers(await AdminService.listarUsuarios());
      setUsers(result);
      setDrafts(Object.fromEntries(result.map((user) => [
        user.id,
        { papel: user.role ?? user.papel ?? "USUARIO", status: user.status ?? "ATIVO" },
      ])));
    } catch (error) {
      console.error("Não foi possível carregar usuários para administração.", error);
      setErrorMessage(error.message || "Não foi possível consultar os usuários.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDraftChange = (id, field, value) => {
    setDrafts((current) => ({ ...current, [id]: { ...current[id], [field]: value } }));
  };

  const handleSave = async (user) => {
    const data = drafts[user.id];
    if (!data || savingId !== null) return;
    setSavingId(user.id);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await AdminService.atualizarUsuario(user.id, data);
      setSuccessMessage(`Permissões de ${user.nome ?? user.email} atualizadas.`);
      await loadUsers();
    } catch (error) {
      console.error("Não foi possível atualizar as permissões do usuário.", error);
      setErrorMessage(error.message || "Não foi possível salvar as alterações.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="admin-page">
      <Link className="archive-action-link" to="/admin">← Painel de autoridade</Link>
      <header className="admin-header">
        <p className="archive-label">Administração // Agentes</p>
        <h1>Gerenciar usuários</h1>
        <p>Revise papéis e estados de acesso. Conceda privilégios somente a agentes autorizados.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {successMessage && <p className="admin-success" role="status">{successMessage}</p>}
      {isLoading ? <p className="archive-loading" role="status">Consultando usuários...</p> : users.length ? (
        <div className="admin-record-list">
          {users.map((user) => (
            <article className="admin-record" key={user.id}>
              <div className="admin-record__identity">
                <h2>{user.nome ?? user.name ?? "Agente"}</h2>
                <p>{user.email ?? "E-mail não informado"}</p>
                <span className="admin-record__id">ID: {user.id}</span>
              </div>
              <div className="admin-record__controls">
                <label>
                  Papel
                  <select
                    onChange={(event) => handleDraftChange(user.id, "papel", event.target.value)}
                    value={drafts[user.id]?.papel ?? "USUARIO"}
                  >
                    <option value="USUARIO">Agente</option>
                    <option value="MODERADOR">Moderador</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </label>
                <label>
                  Situação
                  <select
                    onChange={(event) => handleDraftChange(user.id, "status", event.target.value)}
                    value={drafts[user.id]?.status ?? "ATIVO"}
                  >
                    <option value="ATIVO">Ativo</option>
                    <option value="PENDENTE">Pendente</option>
                    <option value="SUSPENSO">Suspenso</option>
                    <option value="INATIVO">Inativo</option>
                  </select>
                </label>
                <button
                  className="archive-primary-button"
                  disabled={savingId !== null}
                  onClick={() => handleSave(user)}
                  type="button"
                >
                  {savingId === user.id ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : <p className="archive-empty">Nenhum usuário foi encontrado.</p>}
    </div>
  );
}
