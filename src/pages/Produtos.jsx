const produtos = [
  {
    titulo: "Livro de Regras",
    descricao: "Regras completas do RPG Ordem Paranormal.",
    url: "https://jamboeditora.com.br/produto/ordem-paranormal-rpg/",
  },
  {
    titulo: "HQ Ordem Paranormal Vol. 1",
    descricao: "Iniciação: aventura e mistério sobrenatural.",
    url: "https://jamboeditora.com.br/produto/ordem-paranormal-iniciacao/",
  },
  {
    titulo: "HQ Ordem Paranormal Vol. 2",
    descricao: "Segredo na Floresta: suspense e descobertas.",
    url: "https://jamboeditora.com.br/produto/ordem-paranormal-segredo-na-floresta/",
  },
  {
    titulo: "HQ Ordem Paranormal Vol. 3",
    descricao: "Segredo na Floresta Parte 2: o mistério continua.",
    url: "https://jamboeditora.com.br/produto/ordem-paranormal-vol-3-o-segredo-na-floresta-parte2/",
  },
  {
    titulo: "HQ Ordem Paranormal Vol. 4",
    descricao: "Desconjuração Parte 1: a trama se intensifica.",
    url: "https://jamboeditora.com.br/produto/ordem-paranormal-vol-4-desconjuracao-parte-1/",
  },
  {
    titulo: "Livro do Anfitrião",
    descricao: "Guia especial para mestres da mesa paranormal.",
    url: "https://jamboeditora.com.br/produto/ordem-paranormal-o-jogo-do-anfitriao/",
  },
  {
    titulo: "Pacote Paranormal Completo",
    descricao: "Coleção completa de jogos e HQs da Ordem Paranormal.",
    url: "https://jamboeditora.com.br/produto/pacote-acervo-paranormal-completo/",
  },
  {
    titulo: "Coleção Jambo Editora",
    descricao: "Veja todos os produtos da marca Ordem Paranormal.",
    url: "https://jamboeditora.com.br/categoria/marcas/ordem-paranormal-2/",
  },
  {
    titulo: "Camisas e Merch",
    descricao: "Roupas e itens oficiais na loja Lolja.",
    url: "https://www.lolja.com.br/ordem-cellbit?srsltid=AfmBOooRpTlelXqSXDjelIceb_2Yy_zlN7T-PWmJDY_nhdqLw28rmue4",
  },
];

function Produtos() {
  return (
    <section className="produtos-page">
      <div className="page-header">
        <h1>Produtos</h1>
        <p>Confira itens oficiais de Ordem Paranormal e clique em "Ver Mais" para abrir a loja.</p>
      </div>

      <div className="produtos-grid">
        {produtos.map((item, index) => (
          <article className="produto-card" key={index}>
            <div>
              <h2>{item.titulo}</h2>
              <p>{item.descricao}</p>
            </div>
            <a className="produto-button" href={item.url} target="_blank" rel="noreferrer">
              Ver Mais
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Produtos;
