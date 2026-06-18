import { useState } from "react";
import personagens from "../personagens/personagem.js";
import CardPersonagem from "../components/CardPersonagem";

const loresSecretas = {
  1: `Filho de Brúlio, líder dos Gaudérios Abutres. Seu primeiro contato com o paranormal foi no bar Suco Seco, onde conheceu a Equipe E e enfrentou uma aranha de lodo preto. Entrou para a Ordo Realitas após ver Cristopher morrer. 

Durante a investigação dos Assombrados, sobreviveu ao ataque do Carniçal, que massacrou sua gangue e seu pai, deixando-o com uma cicatriz no rosto e trauma da cor vermelha. 

Após Santo Berço e a perda de Thiago, mudou-se para São Paulo com Kaiser (com quem criou laços de irmão) e adotou a gata Jennifer. Na Desconjuração, tentou salvar Liz Webber no Orfanato Santa Menefreda, mas presenciou sua morte pelas mãos de Joui (controlado por Gal). Transcendeu com Agatha para ficar mais forte e enfrentou o Espreitador na Mansão Endiabrada. Foi um dos únicos sobreviventes graças ao sacrifício de Kaiser.

Em Calamidade, assumiu o papel de líder, comandando Carina, Balu, Rubens e Dante na busca pelas Relíquias da Calamidade para deter Kian, reencontrando Joui e enfrentando os horrores do Diabo (Relíquia de Sangue).`,

  2: `Ocultista focado e inteligente. Foi preso inicialmente por Erin e Luciano, mas libertado temporariamente pela equipe para guiar o grupo até o Orfanato Santa Menefreda. É o responsável por explicar o processo de Transcender para a equipe. Em Calamidade, integra a equipe de liderança de Arthur Cervero, embora ambos possuam constantes conflitos pelas suas diferenças de personalidade. Sobreviveu à Desconjuração e ajuda a Ordem na batalha final contra Kian.`,

  3: `Um jovem ginasta olímpico altamente treinado. Foi o único sobrevivente de um ataque paranormal em um cemitério, onde foi salvo por Thiago e Liz, tornando-se o aprendiz deles. Integrou a Equipe E em Carpazinha. Na Desconjuração, foi forçado pelo ritual de Gal a assassinar sua mentora, Liz Webber. Para ajudar o grupo, infiltrou-se na Seita das Máscaras como um sacrifício. Retorna em Calamidade, trazendo esperança para a equipe no momento mais difícil.`,

  4: `Cesar Oliveira, conhecido como Kaiser. Hacker genial da Ordem e filho de Cristopher Cohen. Desenvolveu uma relação profunda de irmãos com Arthur após os eventos de Carpazinha. Foi o responsável por abater o Carniçal com um tiro fatal na cabeça. Na Desconjuração, realizou o sacrifício final utilizando o ritual Cinerária, permitindo que a Magistrada aparecesse e salvasse Arthur e Dante, morrendo como um verdadeiro herói.`,

  5: `Ex-agente da Ordo Veritates (antigo nome da Ordo Realitas) e filho do Grande Arnaldo Fritz. Entrou para a Ordem para investigar a morte de seu pai. Em sua primeira missão na Escola Nostradamus, ao lado de Liz e Daniel Hartmann, descobriu um bunker secreto e desmascarou o ritual de troca de corpos de Agatha e Gabriel. 

Após ficar gravemente ferido e passar por uma quase depressão, criou um vínculo forte com Liz. Juntos, salvaram Joui Jouki em um cemitério. Em Carpazinha (Equipe E), liderou a investigação que os levou a Santo Berço. No labirinto da civilização cinzenta, sacrificou-se desenhando a espiral em suas costas para que a equipe avançasse. 

No coração do local, após derrotarem o Ferreiro, Thiago realizou um ato heroico final: explodiu-se junto ao Deus da Morte. A criatura sugou sua vitalidade, fazendo-o morrer aos 63 anos. Seu legado de guerreiro que luta pelos amigos é eterno.`,

  6: `Filha de Lucille Webber, foi salva de um Zumbi de Sangue aos 5 anos por Arnaldo Fritz e Sr. Veríssimo. Formou-se em Medicina Forense para investigar a morte suspeita de sua mãe. Entrou para a Ordem através de Tristan Monteiro. Na Escola Nostradamus, descobriu o segredo de Agatha e desfez a criatura ao gritar o nome 'GABRIEL!'. 

Cuidou de Thiago no hospital, criando uma conexão forte com ele, e juntos adotaram Joui Jouki. Em Carpazinha (Equipe E), teve o corpo envelhecido instantaneamente de 28 para 50 anos pelo Deus da Morte em Santo Berço, ficando profundamente abalada com o sacrifício de Thiago. 

Ao investigar a Desconjuração com seu aprendiz Gustavo Dohmer, foi capturada pelos Escriptas. Foi encontrada no Orfanato Santa Menefreda, mas acabou morrendo tragicamente após ser golpeada no pescoço por Joui Jouki, que estava sob controle mental do vilão Gal.`,

  7: `Nascida na Itália, Carina faz parte da Família Leone, uma organização de justiceiros que combate o paranormal há gerações, além de ser formada em moda. Veio ao Brasil auxiliar a Ordo Realitas em Bariguara no caso de Elza Verlaz, onde conheceu Rubens e Antônio. 

Com sua personalidade calma, racional e exímia habilidade de infiltração, uniu-se a Arthur e Dante. Desenvolveu laços profundos com Balu, Rubens e Arthur, enxergando-os como uma segunda família. Teve acesso às memórias da Ordo Calamitas e enfrentou os horrores da Relíquia de Sangue (o Diabo), lutando bravamente na batalha final contra Kian.`
};

function Persona() {
  const [loresVisiveis, setLoresVisiveis] = useState({});

  const toggleLore = (id) => {
    setLoresVisiveis((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!personagens || personagens.length === 0) {
    return <p style={{ textAlign: "center", color: "red" }}>Nenhum agente encontrado no banco de dados.</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>Registros de Agentes</h1>
      <p style={{ textAlign: "center", marginBottom: "40px" }}>
        Consulte os dados confidenciais dos membros da Ordem.
      </p>

      {personagens.map((p) => (
        <section key={p.id} style={{ marginBottom: "30px", background: "#111", padding: "20px", borderRadius: "8px" }}>
          <div className="personagem" style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "flex-start" }}>
            
            <CardPersonagem
              nome={p.nome}
              temporada={p.temporada}
              status={p.status}
              imagem={p.imagem}
            />

            <div style={{ flex: 1, minWidth: "280px" }}>
              <h2 style={{ marginTop: "0" }}>{p.nome}</h2>
              <p>
                <strong>Status Vital:</strong>{" "}
                <span style={{ color: p.status.toLowerCase().includes("v") ? "#22c55e" : "#ef4444" }}>
                  {p.status}
                </span>
              </p>

              <button onClick={() => toggleLore(p.id)} style={{ padding: "10px 20px", cursor: "pointer", background: "#333", color: "#fff", border: "none", borderRadius: "4px" }}>
                {loresVisiveis[p.id] ? "Ocultar Documento" : "Revelar Lore"}
              </button>

              {loresVisiveis[p.id] && (
                <div className="card" style={{ borderLeft: "4px solid #ef4444", marginTop: "15px", padding: "15px", background: "#222" }}>
                  <p style={{ whiteSpace: "pre-line", margin: "0" }}>
                    <strong>História Oculta:</strong>{"\n"}{loresSecretas[p.id] || "Nenhum dado adicional encontrado no sistema."}
                  </p>

                  {p.id === 6 && (
                    <div style={{ marginTop: "20px", padding: "15px", background: "rgba(239, 68, 68, 0.1)", border: "1px dashed red", borderRadius: "8px" }}>
                      <h4 style={{ color: "red", marginBottom: "5px", marginTop: "0" }}>✉️ Arquivo Recuperado: Carta para Gustavo</h4>
                      <p style={{ fontStyle: "italic", whiteSpace: "pre-line", margin: "0" }}>
                        "Guto,{"\n"}
                        Se você estiver lendo isso, já é tarde demais.{"\n"}
                        Pegue todas as minhas anotações sobre a maldita Desconjuração e QUEIME TUDO.{"\n"}
                        Não venha atrás de mim.{"\n"}
                        Fuja desse prédio IMEDIATAMENTE!{"\n"}
                        Nesse ponto, eles já devem estar chegando.{"\n"}
                        CORRA."{"\n\n"}
                        — Elizabeth Webber
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </section>
      ))}
    </div>
  );
}

export default Persona;