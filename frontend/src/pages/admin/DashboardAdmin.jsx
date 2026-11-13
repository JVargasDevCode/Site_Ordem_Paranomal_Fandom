import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../services/AdminService.js";

const adminSections = [
  { path: "usuarios", title: "Usuários", description: "Gerencie papéis e situação dos agentes.", countKey: "usuarios" },
  { path: "personagens", title: "Personagens", description: "Mantenha dossiês e registros de personagens.", countKey: "personagens" },
  { path: "jogadores", title: "Jogadores", description: "Gerencie players e equipe de apoio.", countKey: "jogadores" },
  { path: "temporadas", title: "Temporadas", description: "Atualize o arquivo e a identidade das temporadas.", countKey: "temporadas" },
  { path: "teorias", title: "Teorias", description: "Modere hipóteses da comunidade.", countKey: "teorias" },
  { path: "publicacoes", title: "Publicações", description: "Revise registros publicados no mural.", countKey: "publicacoes" },
  { path: "creditos", title: "Créditos", description: "Atualize o reconhecimento de colaboradores.", countKey: "creditos" },
];

function getDashboard(response) {
  const dashboard = response?.dashboard ?? response?.data?.dashboard ?? response?.data ?? response;
  if (!dashboard || typeof dashboard !== "object" || Array.isArray(dashboard)) {
    throw new Error("O serviço retornou um formato inesperado para o painel.");
  }
  return dashboard;
}

function countFor(dashboard, key) {
  const direct = dashboard[key] ?? dashboard[`total${key.charAt(0).toUpperCase()}${key.slice(1)}`];
  if (typeof direct === "number" || typeof direct === "string") return direct;
  if (Array.isArray(direct)) return direct.length;
  return "—";
}

export default function DashboardAdmin() {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    AdminService.obterDashboard()
      .then((response) => {
        const result = getDashboard(response);
        if (active) setDashboard(result);
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar o painel administrativo.", error);
          setErrorMessage(error.message || "Não foi possível atualizar os indicadores.");
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
    <div className="admin-page">
      <header className="admin-header">
        <p className="archive-label">Ordem Paranormal // Nível de autoridade</p>
        <h1>Painel de autoridade</h1>
        <p>Área de administração do arquivo comunitário. Ações são encaminhadas aos serviços autorizados.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      {isLoading && <p className="archive-loading" role="status">Sincronizando indicadores...</p>}
      <div className="admin-module-grid">
        {adminSections.map((section) => (
          <Link className="admin-module-card" key={section.path} to={`/admin/${section.path}`}>
            <p className="archive-label">Setor administrativo</p>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <span className="admin-module-card__count">
              {dashboard ? countFor(dashboard, section.countKey) : "—"}
            </span>
            <span className="admin-module-card__link">Abrir setor →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
