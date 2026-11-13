import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function normalizeRole(value) {
  return typeof value === "string" ? value.trim().toUpperCase() : "";
}

function AccessDenied() {
  return (
    <section className="access-denied" role="alert">
      <p className="archive-label">Acesso negado // Nível insuficiente</p>
      <h1>Autorização necessária</h1>
      <p>Seu perfil não tem permissão para consultar este setor do arquivo.</p>
      <Link to="/">Voltar ao arquivo central</Link>
    </section>
  );
}

export default function ProtecaoRota({
  children,
  allowedRoles,
  requireAdmin = false,
  redirectTo = "/login",
  unauthorizedTo,
}) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="auth-loading" role="status">Verificando credenciais...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  const role = normalizeRole(user.role ?? user.perfil ?? user.tipo);
  const isAdmin = user.isAdmin === true || ["ADMIN", "ADM", "AUTORIDADE"].includes(role);
  const normalizedAllowedRoles = allowedRoles?.map(normalizeRole);

  if ((requireAdmin && !isAdmin) || (normalizedAllowedRoles && !normalizedAllowedRoles.includes(role))) {
    return unauthorizedTo
      ? <Navigate to={unauthorizedTo} replace />
      : <AccessDenied />;
  }

  return children ?? <Outlet />;
}
