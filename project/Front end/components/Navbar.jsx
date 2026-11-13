import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const navigationItems = [
  { to: "/temporadas", label: "Temporadas" },
  { to: "/personagens", label: "Personagens" },
  { to: "/jogadores", label: "Jogadores" },
  { to: "/comunidade", label: "Comunidade" },
  { to: "/teorias", label: "Teorias" },
  { to: "/produtos", label: "Produtos" },
  { to: "/creditos", label: "Créditos" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const role = String(user?.role ?? user?.perfil ?? user?.tipo ?? "").toUpperCase();
  const isAdmin = user?.isAdmin === true || ["ADMIN", "ADM", "AUTORIDADE"].includes(role);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Não foi possível encerrar a sessão.", error);
    }
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="brand" to="/" aria-label="Ordem Paranormal, início">
          <span className="brand__seal" aria-hidden="true">OP</span>
          <span className="brand__text">
            Ordem Paranormal
            <small>Arquivo da comunidade</small>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <NavLink className="site-nav__link" key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink className="site-nav__link" to="/perfil">Perfil</NavLink>
              {isAdmin && <NavLink className="site-nav__link" to="/admin">Admin</NavLink>}
              <button className="site-nav__button" onClick={handleLogout} type="button">Sair</button>
            </>
          ) : (
            <NavLink className="site-nav__link site-nav__link--accent" to="/login">
              Acessar
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
