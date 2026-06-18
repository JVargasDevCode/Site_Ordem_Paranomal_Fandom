import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="hero-title">O <span className="highlight">PARANORMAL</span>  NÃO VEM</h1>
        <h2 className="hero-subtitle">PARA NOSSA REALIDADE DE MANEIRA FÁCIL.</h2>
      </header>

      <section>
        <h2>👁️ Destaques da Investigação</h2>
        <p>Bem-vindo ao banco de dados secreto da Ordem. Aqui compilamos pistas, registros de agentes e relatórios das ameaças do Outro Lado.</p>
        <div className="card">
          <h3>Nova Teoria Encontrada!</h3>
          <p>Membros da comunidade estão decifrando os símbolos do último episódio. Você já deu o seu palpite?</p>
          <Link to="/teorias"><button>Ver Teorias</button></Link>
        </div>
      </section>

      <section>
        <h2>🎬 Transmissões & Temporadas</h2>
        <p>Acompanhe todos os casos desde o Incidente em Carpazinha até as investigações mais recentes.</p>
        <div className="card">
          <p>Assista aos episódios completos, analise os momentos mais tensos e confira as fichas de cada temporada.</p>
          <Link to="/temporadas"><button>Explorar Temporadas</button></Link>
        </div>
      </section>

      <section>
        <h2>👥 Arquivo de Agentes</h2>
        <p>Consulte o histórico, classes e a lore secreta de todos os combatentes, especialistas e ocultistas que enfrentaram o medo.</p>
        <Link to="/personagens"><button>Ver Personagens</button></Link>
      </section>

      {/* Seção Extra: Link Oficial para a Loja Jambô */}
      <section style={{ textAlign: 'center', border: '1px dashed #ef4444' }}>
        <h2>📚 Livro de Regras Oficial</h2>
        <p>Quer mestrar ou jogar o RPG oficial de Ordem Paranormal com seus amigos?</p>
        <a href="https://jamboeditora.com.br/produto/ordem-paranormal-rpg/" target="_blank" rel="noreferrer">
          <button>Garantir na Loja Jambô</button>
        </a>
      </section>
    </div>
  );
}

export default Home;