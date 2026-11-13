import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService.js";

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmarSenha: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (form.senha !== form.confirmarSenha) {
      setErrorMessage("As senhas informadas não correspondem.");
      return;
    }

    setIsSubmitting(true);
    try {
      await AuthService.cadastrar({
        nome: form.nome.trim(),
        email: form.email.trim(),
        senha: form.senha,
      });
      navigate(`/verificar-email?email=${encodeURIComponent(form.email.trim())}`, {
        replace: true,
        state: { cadastroEnviado: true },
      });
    } catch (error) {
      setErrorMessage(error.message || "Não foi possível enviar a solicitação de cadastro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page auth-page--single">
      <div className="auth-panel">
        <p className="auth-eyebrow">Novo registro // Cadastro de agente</p>
        <h1>Solicitar acesso</h1>
        <p className="auth-intro">Crie seu perfil para participar do arquivo comunitário.</p>
        {errorMessage && <p className="auth-message auth-message--error" role="alert">{errorMessage}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">Nome de agente</label>
          <input
            autoComplete="name"
            id="register-name"
            maxLength={80}
            name="nome"
            onChange={handleChange}
            required
            value={form.nome}
          />
          <label htmlFor="register-email">E-mail</label>
          <input
            autoComplete="email"
            id="register-email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={form.email}
          />
          <label htmlFor="register-password">Senha</label>
          <input
            autoComplete="new-password"
            id="register-password"
            minLength={8}
            name="senha"
            onChange={handleChange}
            required
            type="password"
            value={form.senha}
          />
          <label htmlFor="register-confirm-password">Confirmar senha</label>
          <input
            autoComplete="new-password"
            id="register-confirm-password"
            minLength={8}
            name="confirmarSenha"
            onChange={handleChange}
            required
            type="password"
            value={form.confirmarSenha}
          />
          <p className="auth-form__hint">A senha deve ter ao menos 8 caracteres.</p>
          <button className="auth-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Enviando solicitação..." : "Criar registro"}
          </button>
        </form>
        <p className="auth-switch">Já possui acesso? <Link to="/login">Entrar no arquivo</Link></p>
      </div>
    </section>
  );
}
