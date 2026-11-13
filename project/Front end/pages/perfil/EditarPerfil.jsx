import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import UsuarioService from "../../services/UsuarioService.js";

export default function EditarPerfil() {
  const { user, updateUser, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: user?.nome ?? user?.name ?? "",
    bio: user?.bio ?? user?.biografia ?? "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm({
      nome: user?.nome ?? user?.name ?? "",
      bio: user?.bio ?? user?.biografia ?? "",
    });
  }, [user]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await updateUser({ nome: form.nome.trim(), bio: form.bio.trim() });
      if (avatarFile) {
        await UsuarioService.atualizarAvatar(avatarFile);
        await refreshUser();
      }
      navigate("/perfil", { replace: true });
    } catch (error) {
      console.error("Não foi possível atualizar o perfil.", error);
      setErrorMessage(error.message || "Não foi possível salvar as alterações.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="archive-form-page">
      <Link className="archive-action-link" to="/perfil">← Voltar ao perfil</Link>
      <header className="archive-list-header">
        <p className="archive-label">Atualização de dados // Perfil</p>
        <h1>Editar perfil</h1>
        <p>Atualize as informações visíveis no seu arquivo de agente.</p>
      </header>
      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}
      <form className="archive-editor-form" onSubmit={handleSubmit}>
        <label htmlFor="profile-name">Nome de agente</label>
        <input
          autoComplete="name"
          id="profile-name"
          maxLength={80}
          name="nome"
          onChange={handleChange}
          required
          value={form.nome}
        />
        <label htmlFor="profile-bio">Apresentação</label>
        <textarea
          id="profile-bio"
          maxLength={500}
          name="bio"
          onChange={handleChange}
          placeholder="Conte algo sobre você para a comunidade."
          rows={5}
          value={form.bio}
        />
        <label htmlFor="profile-avatar">Imagem de avatar (opcional)</label>
        <input
          accept="image/*"
          id="profile-avatar"
          onChange={(event) => setAvatarFile(event.target.files?.[0] ?? null)}
          type="file"
        />
        <p className="archive-form-note">
          Molduras de temporada e conquistas são carregadas do perfil fornecido pelo serviço;
          não é possível concedi-las ou alterá-las por este formulário.
        </p>
        <div className="archive-editor-form__footer">
          <span>{avatarFile ? avatarFile.name : "Avatar atual mantido"}</span>
          <button className="archive-primary-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
