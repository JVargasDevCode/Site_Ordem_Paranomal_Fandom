import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await login(form);
      const destination = location.state?.from?.pathname ?? "/perfil";
      navigate(destination, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Não foi possível validar suas credenciais.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <p className="auth-eyebrow">Acesso de agente // Nível 01</p>
        <h1>Retomar investigação</h1>
        <p className="auth-intro">Entre para consultar seu perfil e continuar seus registros na comunidade.</p>
        {errorMessage && <p className="auth-message auth-message--error" role="alert">{errorMessage}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">E-mail</label>
          <input
            autoComplete="email"
            id="login-email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={form.email}
          />
          <label htmlFor="login-password">Senha</label>
          <input
            autoComplete="current-password"
            id="login-password"
            name="senha"
            onChange={handleChange}
            required
            type="password"
            value={form.senha}
          />
          <div className="auth-form__aside">
            <Link to="/recuperar-senha">Esqueci minha senha</Link>
          </div>
          <button className="auth-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Validando..." : "Acessar arquivo"}
          </button>
        </form>
        <p className="auth-switch">Ainda não tem cadastro? <Link to="/cadastro">Solicitar acesso</Link></p>
      </div>
      <aside className="auth-aside">
        <span aria-hidden="true" className="auth-aside__sigil">OP</span>
        <p className="auth-eyebrow">Aviso de segurança</p>
        <h2>O conhecimento tem um preço.</h2>
        <p>Use apenas uma conta sua. Este arquivo comunitário não solicita informações de acesso a sistemas oficiais.</p>
        <span className="auth-aside__code">REGISTRO // 001-A</span>
      </aside>
    </section>
  );
}
