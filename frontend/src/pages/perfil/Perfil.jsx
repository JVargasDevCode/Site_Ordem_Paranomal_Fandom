import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import UsuarioService from "../../services/UsuarioService.js";

function getAchievements(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.conquistas)) return response.conquistas;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  throw new Error("O serviço retornou um formato inesperado para as conquistas.");
}

function getAvatarFrame(user) {
  const frame = user?.molduraEspecial ?? user?.avatarFrame ?? user?.moldura;
  if (!frame || frame.desbloqueada === false || frame.unlocked === false) return null;
  const label = typeof frame === "string"
    ? frame
    : frame.nome ?? frame.name ?? frame.temporada ?? frame.theme ?? "";
  const theme = typeof frame === "object" ? frame.temporada ?? frame.theme ?? frame.slug ?? "" : "";
  return /vig[ií]lia/i.test(`${label} ${theme}`) ? frame : null;
}

function ProfileAvatar({ user }) {
  const frame = getAvatarFrame(user);
  const name = user?.nome ?? user?.name ?? "Agente";
  const image = user?.avatarUrl ?? user?.foto ?? user?.imagem;

  return (
    <div className={`profile-avatar${frame ? " profile-avatar--vigilia" : ""}`}>
      {image ? <img alt={`Avatar de ${name}`} src={image} /> : <span>{name.trim().charAt(0).toUpperCase() || "?"}</span>}
      {frame && <span aria-hidden="true" className="profile-avatar__frame" />}
      {frame && <span className="profile-avatar__frame-label">Moldura de A Vigília</span>}
    </div>
  );
}

export default function Perfil() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [profile, setProfile] = useState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    const userId = user?.id;

    Promise.all([
      UsuarioService.obterPerfil(),
      userId ? UsuarioService.listarConquistas(userId) : Promise.resolve([]),
    ])
      .then(([profileResponse, achievementResponse]) => {
        const profileResult = profileResponse?.usuario ?? profileResponse?.user ?? profileResponse?.data?.usuario ?? profileResponse?.data;
        if (!profileResult || typeof profileResult !== "object") {
          throw new Error("O serviço retornou um formato inesperado para o perfil.");
        }
        if (active) {
          setProfile(profileResult);
          setAchievements(getAchievements(achievementResponse));
        }
      })
      .catch((error) => {
        if (active) {
          console.error("Não foi possível carregar o perfil do agente.", error);
          setErrorMessage(error.message || "Não foi possível carregar os dados do perfil.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user?.id]);

  const currentUser = profile ?? user ?? {};
  const vigiliaFrame = getAvatarFrame(currentUser);
  const visibleAchievements = achievements.filter((achievement) => achievement && typeof achievement === "object");

  return (
    <div className="profile-page">
      <header className="profile-header">
        <ProfileAvatar user={currentUser} />
        <div className="profile-header__content">
          <p className="archive-label">Arquivo pessoal // Agente ativo</p>
          <h1>{currentUser.nome ?? currentUser.name ?? "Agente da Ordem"}</h1>
          <p>{currentUser.bio ?? currentUser.biografia ?? "Nenhuma descrição foi registrada."}</p>
          <div className="profile-header__actions">
            <Link className="archive-primary-button" to="/perfil/editar">Editar perfil</Link>
            <Link className="archive-secondary-button" to="/perfil/favoritos">Meus favoritos</Link>
          </div>
        </div>
      </header>

      {errorMessage && <p className="archive-error" role="alert">{errorMessage}</p>}

      {vigiliaFrame && (
        <section className="profile-event-card" aria-labelledby="profile-vigilia-title">
          <p className="archive-label">Conquista especial // A Vigília</p>
          <h2 id="profile-vigilia-title">Moldura de agente desbloqueada</h2>
          <p>
            Esta moldura foi disponibilizada pelos dados do seu perfil. Ela também aparece
            junto ao seu avatar nos comentários.
          </p>
        </section>
      )}

      <section className="profile-info-section">
        <div className="profile-section-heading">
          <div>
            <p className="archive-label">Dados de identificação</p>
            <h2>Registro do agente</h2>
          </div>
        </div>
        <dl className="profile-data-grid">
          <div><dt>E-mail</dt><dd>{currentUser.email ?? "Não informado"}</dd></div>
          <div><dt>Agente desde</dt><dd>{currentUser.dataCriacao ?? currentUser.criadoEm ?? "Registro indisponível"}</dd></div>
          <div><dt>Função</dt><dd>{currentUser.role ?? currentUser.perfil ?? "Agente"}</dd></div>
          <div><dt>Estado de verificação</dt><dd>{currentUser.emailVerificado ? "Verificado" : "Não informado"}</dd></div>
        </dl>
      </section>

      <section className="profile-info-section">
        <div className="profile-section-heading">
          <div>
            <p className="archive-label">Marcos da investigação</p>
            <h2>Conquistas</h2>
          </div>
          {isLoading && <span className="profile-loading" role="status">Sincronizando...</span>}
        </div>
        {!isLoading && visibleAchievements.length ? (
          <div className="achievement-grid">
            {visibleAchievements.map((achievement, index) => (
              <article className="achievement-card" key={achievement.id ?? achievement.slug ?? index}>
                <span aria-hidden="true" className="achievement-card__seal">{achievement.icone ?? "✦"}</span>
                <div>
                  <h3>{achievement.nome ?? achievement.titulo ?? "Conquista registrada"}</h3>
                  <p>{achievement.descricao ?? achievement.detalhes ?? "Marco registrado no arquivo do agente."}</p>
                  {(achievement.temporada === "A Vigília" || achievement.slug === "vigilia") && (
                    <span className="achievement-card__tag">A Vigília</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : !isLoading ? (
          <p className="archive-empty">Nenhuma conquista foi registrada para este agente.</p>
        ) : null}
      </section>
    </div>
  );
}
