import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostagemService from "../../services/PostagemService.js";

export default function CriarPostagem() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: "", conteudo: "", categoria: "conversa" });
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
      const response = await PostagemService.criar({
        titulo: form.titulo.trim(),
        conteudo: form.conteudo.trim(),
        categoria: form.categoria,
      });
      const post = response?.postagem ?? response?.data?.postagem ?? response?.data ?? response;
      if (post && typeof post === "object" && post.id) {
        navigate(`/comunidade/postagens/${encodeURIComponent(post.id)}`, { replace: true });
      } else {
        navigate("/comunidade/postagens", { replace: true });
      }
    } catch (error) {
      console.error("Não foi possível criar a publicação.", error);
      setErrorMessage(error.message || "Não foi possível publicar este registro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="archive-form-page">
      <Link className="archive-action-link" to="/comunidade/postagens">← Voltar ao mural</Link>
      <header className="archive-list-header">
        <p className="archive-label">Novo registro // Comunidade</p>
        <h1>Criar publicação</h1>
        <p>Compartilhe sua contribuição com respeito e sem revelar informações pessoais.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      <form className="archive-editor-form" onSubmit={handleSubmit}>
        <label htmlFor="post-title">Título</label>
        <input
          id="post-title"
          maxLength={140}
          name="titulo"
          onChange={handleChange}
          required
          value={form.titulo}
        />
        <label htmlFor="post-category">Categoria</label>
        <select id="post-category" name="categoria" onChange={handleChange} value={form.categoria}>
          <option value="conversa">Conversa</option>
          <option value="pergunta">Pergunta</option>
          <option value="relato">Relato</option>
          <option value="teoria">Discussão de teoria</option>
        </select>
        <label htmlFor="post-content">Conteúdo</label>
        <textarea
          id="post-content"
          maxLength={10000}
          minLength={10}
          name="conteudo"
          onChange={handleChange}
          required
          rows={9}
          value={form.conteudo}
        />
        <div className="archive-editor-form__footer">
          <span>{form.conteudo.length}/10000 caracteres</span>
          <button className="archive-primary-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Publicando..." : "Publicar registro"}
          </button>
        </div>
      </form>
    </div>
  );
}
