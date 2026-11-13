import { useLocation, NavLink, Route, Routes } from "react-router-dom";
import ProtecaoRota from "./components/ProtecaoRota.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuth } from "./hooks/useAuth.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Cadastro from "./pages/auth/Cadastro.jsx";
import RecuperarSenha from "./pages/auth/RecuperarSenha.jsx";
import VerificarEmail from "./pages/auth/VerificarEmail.jsx";
import Temporadas from "./pages/temporadas/Temporadas.jsx";
import TemporadaDetalhes from "./pages/temporadas/TemporadaDetalhes.jsx";
import Personagens from "./pages/personagens/Personagens.jsx";
import PersonagemDetalhes from "./pages/personagens/PersonagemDetalhes.jsx";
import PersonagemBusca from "./pages/personagens/PersonagemBusca.jsx";
import Jogadores from "./pages/jogadores/Jogadores.jsx";
import JogadorDetalhes from "./pages/jogadores/JogadorDetalhes.jsx";
import Comunidade from "./pages/comunidade/Comunidade.jsx";
import Postagens from "./pages/comunidade/Postagens.jsx";
import CriarPostagem from "./pages/comunidade/CriarPostagem.jsx";
import DetalhesPostagem from "./pages/comunidade/DetalhesPostagem.jsx";
import Teorias from "./pages/teorias/Teorias.jsx";
import CriarTeoria from "./pages/teorias/CriarTeoria.jsx";
import DetalhesTeoria from "./pages/teorias/DetalhesTeoria.jsx";
import Perfil from "./pages/perfil/Perfil.jsx";
import EditarPerfil from "./pages/perfil/EditarPerfil.jsx";
import Favoritos from "./pages/perfil/Favoritos.jsx";
import Produtos from "./pages/produtos/Produtos.jsx";
import Creditos from "./pages/creditos/Creditos.jsx";
import DashboardAdmin from "./pages/admin/DashboardAdmin.jsx";
import GerenciarUsuarios from "./pages/admin/GerenciarUsuarios.jsx";
import GerenciarPersonagens from "./pages/admin/GerenciarPersonagens.jsx";
import GerenciarJogadores from "./pages/admin/GerenciarJogadores.jsx";
import GerenciarTemporadas from "./pages/admin/GerenciarTemporadas.jsx";
import GerenciarTeorias from "./pages/admin/GerenciarTeorias.jsx";
import GerenciarPublicacoes from "./pages/admin/GerenciarPublicacoes.jsx";
import GerenciarCreditos from "./pages/admin/GerenciarCreditos.jsx";
import "./App.css";

const routeTitles = [
  ["/personagens", "Dossiês de personagens"],
  ["/jogadores", "Agentes e jogadores"],
  ["/temporadas", "Temporadas"],
  ["/comunidade", "Comunidade"],
  ["/teorias", "Teorias"],
  ["/produtos", "Produtos"],
  ["/creditos", "Créditos"],
  ["/login", "Acesso de agente"],
  ["/cadastro", "Cadastro de agente"],
  ["/recuperar-senha", "Recuperar acesso"],
  ["/verificar-email", "Verificação de e-mail"],
  ["/perfil", "Arquivo do agente"],
  ["/admin", "Painel de autoridade"],
];

function ArchivePage({ isHome = false }) {
  const { pathname } = useLocation();
  const match = routeTitles.find(([route]) => pathname.startsWith(route));
  const title = isHome ? "Arquivo central" : match?.[1] ?? "Registro não localizado";

  return (
    <section className="archive-page">
      <p className="archive-page__eyebrow">Ordem Paranormal // Arquivo digital</p>
      <h1 className="archive-page__title">{isHome ? "O inexplicável deixa rastros." : title}</h1>
      <p className="archive-page__description">
        {isHome
          ? "Um arquivo de investigação dedicado aos casos, agentes e relatos que orbitam o Outro Lado."
          : "Este setor está sendo preparado para receber os registros da Ordem. Volte em breve para consultar o arquivo."}
      </p>
      <span className="archive-status">Acesso ao arquivo em preparação</span>

      {isHome && (
        <nav className="archive-links" aria-label="Seções do arquivo">
          <NavLink className="archive-link" to="/temporadas">Temporadas</NavLink>
          <NavLink className="archive-link" to="/personagens">Personagens</NavLink>
          <NavLink className="archive-link" to="/jogadores">Jogadores</NavLink>
          <NavLink className="archive-link" to="/comunidade">Comunidade</NavLink>
        </nav>
      )}
    </section>
  );
}

function AppLayout() {
  const { authError } = useAuth();
  const { pathname } = useLocation();
  const isAuthRoute = ["/login", "/cadastro", "/recuperar-senha", "/verificar-email"]
    .includes(pathname);

  return (
    <div className="app-shell">
      <Navbar />
      {authError && !isAuthRoute && (
        <p className="auth-error" role="alert">
          Não foi possível concluir a operação de autenticação: {authError.message}
        </p>
      )}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/verificar-email" element={<VerificarEmail />} />
          <Route path="/temporadas" element={<Temporadas />} />
          <Route path="/temporadas/:id" element={<TemporadaDetalhes />} />
          <Route path="/personagens" element={<Personagens />} />
          <Route path="/personagens/busca" element={<PersonagemBusca />} />
          <Route path="/personagens/:id" element={<PersonagemDetalhes />} />
          <Route path="/jogadores" element={<Jogadores />} />
          <Route path="/jogadores/:id" element={<JogadorDetalhes />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/comunidade/postagens" element={<Postagens />} />
          <Route path="/comunidade/postagens/:id" element={<DetalhesPostagem />} />
          <Route path="/comunidade/criar" element={
            <ProtecaoRota>
              <CriarPostagem />
            </ProtecaoRota>
          } />
          <Route path="/teorias" element={<Teorias />} />
          <Route path="/teorias/criar" element={
            <ProtecaoRota>
              <CriarTeoria />
            </ProtecaoRota>
          } />
          <Route path="/teorias/:id" element={<DetalhesTeoria />} />
          <Route path="/perfil" element={
            <ProtecaoRota>
              <Perfil />
            </ProtecaoRota>
          } />
          <Route path="/perfil/editar" element={
            <ProtecaoRota>
              <EditarPerfil />
            </ProtecaoRota>
          } />
          <Route path="/perfil/favoritos" element={
            <ProtecaoRota>
              <Favoritos />
            </ProtecaoRota>
          } />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/creditos" element={<Creditos />} />
          <Route path="/admin" element={
            <ProtecaoRota requireAdmin>
              <DashboardAdmin />
            </ProtecaoRota>
          } />
          <Route path="/admin/usuarios" element={<ProtecaoRota requireAdmin><GerenciarUsuarios /></ProtecaoRota>} />
          <Route path="/admin/personagens" element={<ProtecaoRota requireAdmin><GerenciarPersonagens /></ProtecaoRota>} />
          <Route path="/admin/jogadores" element={<ProtecaoRota requireAdmin><GerenciarJogadores /></ProtecaoRota>} />
          <Route path="/admin/temporadas" element={<ProtecaoRota requireAdmin><GerenciarTemporadas /></ProtecaoRota>} />
          <Route path="/admin/teorias" element={<ProtecaoRota requireAdmin><GerenciarTeorias /></ProtecaoRota>} />
          <Route path="/admin/publicacoes" element={<ProtecaoRota requireAdmin><GerenciarPublicacoes /></ProtecaoRota>} />
          <Route path="/admin/creditos" element={<ProtecaoRota requireAdmin><GerenciarCreditos /></ProtecaoRota>} />
          <Route path="*" element={<ArchivePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
