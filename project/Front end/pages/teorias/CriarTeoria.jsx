import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TeoriasService from "../../services/TeoriasService.js";

export default function CriarTeoria() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: "", resumo: "", conteudo: "", temporada: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await TeoriasService.criar({
        titulo: form.titulo.trim(),
        resumo: form.resumo.trim(),
        conteudo: form.conteudo.trim(),
        temporada: form.temporada.trim() || undefined,
      });
      const theory = response?.teoria ?? response?.data?.teoria ?? response?.data ?? response;
      if (theory && typeof theory === "object" && theory.id) {
        navigate(`/teorias/${encodeURIComponent(theory.id)}`, { replace: true });
      } else {
        navigate("/teorias", { replace: true });
      }
    } catch (error) {
      console.error("Não foi possível enviar a teoria.", error);
      setErrorMessage(error.message || "Não foi possível registrar esta hipótese.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="archive-form-page">
      <Link className="archive-action-link" to="/teorias">← Voltar às teorias</Link>
      <header className="archive-list-header">
        <p className="archive-label">Nova hipótese // Registro comunitário</p>
        <h1>Propor uma teoria</h1>
        <p>Apresente seus indícios e diferencie observações de especulações. Evite tratar hipóteses como fatos confirmados.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      <form className="archive-editor-form" onSubmit={handleSubmit}>
        <label htmlFor="theory-title">Título da hipótese</label>
        <input
          id="theory-title"
          maxLength={140}
          name="titulo"
          onChange={handleChange}
          required
          value={form.titulo}
        />
        <label htmlFor="theory-season">Temporada relacionada (opcional)</label>
        <input
          id="theory-season"
          maxLength={100}
          name="temporada"
          onChange={handleChange}
          value={form.temporada}
        />
        <label htmlFor="theory-summary">Resumo</label>
        <textarea
          id="theory-summary"
          maxLength={400}
          minLength={10}
          name="resumo"
          onChange={handleChange}
          required
          rows={3}
          value={form.resumo}
        />
        <label htmlFor="theory-content">Indícios e desenvolvimento</label>
        <textarea
          id="theory-content"
          maxLength={10000}
          minLength={20}
          name="conteudo"
          onChange={handleChange}
          required
          rows={8}
          value={form.conteudo}
        />
        <p className="archive-form-note">Inclua contexto suficiente para que outras pessoas possam avaliar sua interpretação. Spoilers devem ser sinalizados no texto.</p>
        <div className="archive-editor-form__footer">
          <span>{form.conteudo.length}/10000 caracteres</span>
          <button className="archive-primary-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Registrando..." : "Enviar hipótese"}
          </button>
        </div>
      </form>
    </div>
  );
}
