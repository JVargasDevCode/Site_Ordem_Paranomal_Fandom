import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthService from "../../services/AuthService.js";

export default function VerificarEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email") ?? "";
  const [status, setStatus] = useState(token ? "verificando" : "aguardando");
  const [message, setMessage] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!token) return undefined;
    let active = true;

    AuthService.verificarEmail(token)
      .then(() => {
        if (active) {
          setStatus("verificado");
          setMessage("Seu e-mail foi verificado. O registro está pronto para acesso.");
        }
      })
      .catch((error) => {
        if (active) {
          setStatus("erro");
          setMessage(error.message || "Não foi possível validar este link de verificação.");
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  const handleResend = async () => {
    if (!email || isResending) return;
    setIsResending(true);
    setMessage("");

    try {
      await AuthService.reenviarVerificacao(email);
      setStatus("reenviado");
      setMessage("Se o endereço estiver associado a um cadastro, um novo link será enviado.");
    } catch (error) {
      setStatus("erro");
      setMessage(error.message || "Não foi possível solicitar outro link.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <section className="auth-page auth-page--single">
      <div className="auth-panel">
        <p className="auth-eyebrow">Validação de credenciais</p>
        <h1>Verificar e-mail</h1>
        {status === "verificando" ? (
          <p className="auth-message" role="status">Conferindo o registro...</p>
        ) : (
          <p
            className={`auth-message${status === "verificado" ? " auth-message--success" : status === "erro" ? " auth-message--error" : ""}`}
            role={status === "erro" ? "alert" : "status"}
          >
            {message || (email
              ? `Enviamos as instruções para ${email}.`
              : "Abra o link enviado para o seu e-mail para concluir a verificação.")}
          </p>
        )}
        {email && status !== "verificado" && (
          <button
            className="auth-submit auth-submit--secondary"
            disabled={isResending}
            onClick={handleResend}
            type="button"
          >
            {isResending ? "Solicitando..." : "Enviar novo link"}
          </button>
        )}
        {status === "verificado" && <Link className="auth-submit auth-submit--link" to="/login">Ir para o acesso</Link>}
        <p className="auth-switch"><Link to="/login">Voltar ao acesso</Link></p>
      </div>
    </section>
  );
}
