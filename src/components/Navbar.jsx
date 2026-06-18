import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verificarLogado, fazerLogout } from "../services/AuthService";

function Navbar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(verificarLogado());

  useEffect(() => {
    const atualizar = () => setUsuario(verificarLogado());
    window.addEventListener("authChange", atualizar);
    return () => window.removeEventListener("authChange", atualizar);
  }, []);

  const handleLogout = () => {
    fazerLogout();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/teorias">Teorias</Link>
      <Link to="/comunidade">Comunidade</Link>
      <Link to="/personagens">Personagens</Link>
      <Link to="/temporadas">Temporadas</Link>
      <Link to="/produtos">Produtos</Link>
      {usuario ? (
        <>
          <Link to="/perfil">Perfil</Link>
          <Link to="/postagens">Postagens</Link>
          <button onClick={handleLogout} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>
            Sair
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/cadastro">Cadastro</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;