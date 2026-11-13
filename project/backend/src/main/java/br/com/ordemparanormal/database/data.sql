-- =========================================================================
-- 1. SEED DE TEMPORADAS (Com temas visuais e capas oficiais)
-- =========================================================================
INSERT INTO temporadas (id, titulo, descricao, ano, capa_url, status, tema) VALUES
                                                                                (1, 'O Ordem Paranormal', 'Investigações sobrenaturais em um colégio pós-incêndio.', 2020, '/capas/iniciacao.png', 'Concluída', 'PADRAO'),
                                                                                (2, 'O Segredo Na Floresta', 'Investigação de desaparecimento de agentes da Ordem em uma cidade do Rio Grande do Sul.', 2020, '/capas/segredo-floresta.png', 'Concluída', 'FLORESTA'),
                                                                                (3, 'Calamidade', 'A ameaça global dos cultistas e das relíquias do Outro Lado.', 2021, '/capas/calamidade.png', 'Concluída', 'CALAMIDADE'),
                                                                                (4, 'Sinais do Outro Lado', 'A chegada de uma antiga equipe de investigadores da Ordem.', 2022, '/capas/sinais.png', 'Concluída', 'PADRAO'),
                                                                                (5, 'Segredo na Ilha', 'Irmãos embarcam em férias numa ilha brasileira chamada Tipurá e descobrem mistérios sobre Tintas.', 2022, '/capas/segredo-ilha.png', 'Concluída', 'PADRAO'),
                                                                                (6, 'Hexatombe', 'Mistérios e rituais ancestrais em uma trama mortal e implacável.', 2023, '/capas/hexatombe.png', 'Concluída', 'HEXATOMBE'),
                                                                                (7, 'A Vigília', 'Evento especial de investigação, segredos ocultos e pistas enigmáticas.', 2024, '/capas/a-vigilia.png', 'Evento Ativo', 'VIGILIA');




INSERT INTO jogadores (id, nome, biografia, foto_url) VALUES
                                                          (1, 'Rafael Lange (Cellbit)', 'Rafael Lange Severino, mais conhecido como Cellbit, é um escritor, diretor criativo, streamer e youtuber conhecido por solucionar enigmas em seu canal do YouTube, pela criação e realização da série de RPGs de mesa Ordem Paranormal em sua Twitch e pela criação do jogo Enigma do Medo na Steam.', '/jogadores/cellbit.png'),
                                                          (2, 'Lucas Rossi', 'Conhecido por interpretar personagens marcantes como Joui Jouki. É um youtuber, gamer, streamer e vlogueiro brasileiro, conhecido nacionalmente pelo seu canal no YouTube.', '/jogadores/lucas.png'),
                                                          (3, 'Gabriela Cattuzzo (Bagi)', 'Gabriela Cattuzzo, mais conhecida como Bagi, é uma das maiores streamers e criadoras de conteúdo do Brasil, participando ativamente de diversas temporadas de RPG.', '/jogadores/babs.png'),
                                                          (4, 'Rafael Cunha (Guaxinim)', 'Rafael Montes Cunha, mais conhecido como Guaxinim, é um streamer e criador de conteúdo, fazendo lives de jogos e participando de muitos RPGs com seus amigos.', '/jogadores/caruso.png');



INSERT INTO usuarios (id, nome, email, senha, role, ativo, moldura_ativa, data_criacao) VALUES
(1, 'Admin Principal (JVargas)', 'admin@ordem.com', '123456', 'ROLE_ADMIN', true, 'vigilia-especial', NOW()),
(2, 'Mestre Cellbit', 'cellbit@ordem.com', 'ordem12345', 'ROLE_ADMIN', true, 'vigilia-especial', NOW()),
(3, 'Moderador Arq', 'mod@ordem.com', 'teste14569', 'ROLE_ADMIN', true, NULL, NOW()),
(4, 'TeoricoDoOutroLado', 'fan@gmail.com', 'usuariosim12', 'ROLE_USER', true, NULL, NOW()),
(5, 'InvestigadorX', 'investigadorx@gmail.com', 'cadastrocerto', 'ROLE_USER', true, NULL, NOW()),
(6, 'AgenteNovato', 'novato@gmail.com', 'caoticosdeenergia', 'ROLE_USER', true, NULL, NOW());


INSERT INTO personagens (id, nome, classe, origem, nex, foto_url, categoria, historico, relacoes, itens) VALUES
                                                                                                             (1, 'Joui Jouki', 'Combatente', 'Atleta', 65, '/personagens/joui.jpeg', 'protagonista', 'Joui é um jovem artista marcial e agente da Ordem que busca equilibrar sua honra com os perigos do Outro Lado.', 'Forte amizade com Arthur e Liz.', 'Katana ritualística, Fita isolante, Vestimenta de combate.'),
                                                                                                             (2, 'Arthur Cervero', 'Especialista', 'Músico', 65, '/personagens/arthur.jpeg', 'protagonista', 'Ex-motoqueiro e músico, Arthur se tornou uma peça fundamental nas investigações de O Segredo na Floresta e Calamidade.', 'Parceiro leal de equipe e protetor dos novatos.', 'Escopeta, Jaqueta de couro reforçada, Ferramentas de engenharia.'),
                                                                                                             (3, 'Elizabeth Webber (Liz)', 'Especialista', 'Engenheira', 35, '/personagens/liz.jpeg', 'protagonista', 'Especialista brilhante com grande conhecimento técnico e facilidade para resolver enigmas mecânicos e paranormais.', 'Ligação estreita com os membros da equipe de Iniciação.', 'Chave de grifo, Equipamentos eletrônicos, Coleta de amostras.');


INSERT INTO participacoes (id, jogador_id, personagem_id, temporada_id) VALUES
                                                                            (1, 2, 1, 2), -- Lucas Rossi jogou como Joui Jouki em O Segredo na Floresta
                                                                            (2, 3, 2, 2), -- Gabriela Cattuzzo jogou como Arthur Cervero em O Segredo na Floresta
                                                                            (3, 3, 3, 1); -- Gabriela Cattuzzo jogou como Elizabeth Webber em O Ordem Paranormal (Iniciação)



INSERT INTO teorias (id, titulo, conteudo, status, autor_id, data_criacao) VALUES
                                                                               (1, 'A Verdade sobre a Relíquia de Sangue', 'Analisando os símbolos encontrados no último episódio, fica claro que a relíquia tem uma conexão direta com o hospedeiro original...', 'APROVADA', 4, NOW()),
                                                                               (2, 'O Anfitrião e sua verdadeira identidade', 'Se a gente juntar as pistas do diário do Kian com as marcas deixadas nos cenários, podemos concluir que...', 'APROVADA', 4, NOW()),
                                                                               (3, 'O Segredo por trás da Tipurá', 'A ilha esconde rituais muito mais antigos do que a própria Ordem imagina...', 'PENDENTE', 5, NOW());



INSERT INTO creditos (id, funcao, link_profile, nome) VALUES
                                                          (1, 'Desenvolvedor Principal & Arquiteto', 'https://github.com/JVargas', 'JVargas'),