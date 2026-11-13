import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService.js";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await AuthService.solicitarRecuperacaoSenha(email.trim());
      setRequestSent(true);
    } catch (error) {
      setErrorMessage(error.message || "Não foi possível solicitar a recuperação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page auth-page--single">
      <div className="auth-panel">
        <p className="auth-eyebrow">Protocolo de recuperação</p>
        <h1>Recuperar acesso</h1>
        {requestSent ? (
          <div className="auth-message auth-message--success" role="status">
            Se houver uma conta associada a este e-mail, as instruções de recuperação serão enviadas.
          </div>
        ) : (
          <>
            <p className="auth-intro">Informe o e-mail do cadastro para receber as próximas instruções.</p>
            {errorMessage && <p className="auth-message auth-message--error" role="alert">{errorMessage}</p>}
            <form className="auth-form" onSubmit={handleSubmit}>
              <label htmlFor="recovery-email">E-mail cadastrado</label>
              <input
                autoComplete="email"
                id="recovery-email"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
              <button className="auth-submit" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Enviando..." : "Solicitar instruções"}
              </button>
            </form>
          </>
        )}
        <p className="auth-switch"><Link to="/login">Voltar ao acesso</Link></p>
      </div>
    </section>
  );
}
