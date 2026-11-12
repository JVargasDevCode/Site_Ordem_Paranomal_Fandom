USE ordem_paranormal_db;

-- Inserindo Temporadas Clássicas
INSERT INTO temporada (titulo, descricao, ano, capa_url) VALUES
                                                             ('O Ordem Paranormal', 'Investigações sobenatural nem um colegio pos encedio.', 2020, '/capas/iniciação.jpng'),
                                                             ('O Segredo Na floresta', 'Envestigação de desaparecimento de agenste da ordem, em uma cidade do Rio Grande do Sul.', 2020, '/capas/Seegredo ma floresta.jpng'),
                                                             ('Calamidade', 'A ameaça global dos cultistas e das relíquias do Outro Lado.', 2021, '/capas/calamidade.png'),
                                                             ('Sinais do Outro Lado', 'A chegada de uma antiga equipe de investigadores da ordem.', 2022, '/capas/sinais do outro lado.jpng'),
                                                             ('Segredo na Ilha', 'Irmão embarcar em ferias numa ilha brasileira chamada Tipora e descobrem mistero sobre Tintas.', 2022, '/capas/segredo na ilha.jpng');

-- Inserindo Jogadores da Comunidade / Mestres / Atores
INSERT INTO jogador (nome, biografia, foto_url) VALUES
                                                    ('Rafael Lange (Cellbit)', 'Rafael Lange Severino, mais conhecido como Cellbit, é um escritor, diretor criativo, streamer e youtuber conhecido por solucionar enigmas em seu canal do YouTube, pela criação e realização da série de RPGs de mesa Ordem Paranormal em seu canal da Twitch e pela criação do jogo Enigma do Medo na Steam..', '/jogadores/cellbit.png'),
                                                    ('Lucas Rossi', 'Conhecido por interpretar personagens marcantes como Joui Jouki.é um youtuber, gamer, streamer e vlogueiro brasileiro. Ficou conhecido nacionalmente pelo seu canal na plataforma YouTube, onde inicialmente postava conteúdos de vlogs e jogos.', '/jogadores/guilherme.png'),
                                                    ('Gabriela Cattuzzo (bagi)', 'Gabriela Cattuzzo, mais conhecida como Bagi, é uma das maiores streamers e criadoras de conteúdo do Brasil..', '/jogadores/babs.png'),
                                                    ('Rafael Cunha (Guaxinim)', 'Rafael Montes Cunha, mais conhecido como Guaxinim, é um streamer e criador de conteúdo, fazendo vários vídeos/lives de jogos e também participando de muitos RPGs com seus amigos.', '/jogadores/caruso.png');

-- Inserindo Usuários do Fandom (para testar login e postagens)
INSERT INTO usuario (nome, email, senha, papel) VALUES
                                                    ('Admin Fandom', 'admin@ordem.com', '$2a$10$exemploHashSenhaAdmin', 'ADMIN'),
                                                    ('TeoricoDoOutroLado', 'fan@gmail.com', '$2a$10$exemploHashSenhaUser', 'USER');

-- Inserindo Personagens de Exemplo
INSERT INTO personagem (nome, classe, origem, nex, jogador_id, temporada_id, foto_url) VALUES
                                                                                           ('Joui Jouki', 'Combatente', 'Atleta', 65, 2, 2, '/personagens/joui.jpeg'),
                                                                                           ('Arthur Cervero', 'Especialista', 'Musico', 65, 3, 2, '/personagens/arthur.jpeg'),
                                                                                           ('Elizabeth Webber (Liz)', 'Especilista', 'FLourece', 35, 3, 1, '/personagens/liz.jpeg');

-- Inserindo Teorias da Comunidade
INSERT INTO teoria (titulo, conteudo, autor_id, data_criacao) VALUES
                                                                  ('A Verdade sobre a Relíquia de Sangue', 'Analisando os símbolos encontrados no último episódio, fica claro que...', 2, NOW()),
                                                                  ('O Anfitrião e sua verdadeira identidade', 'Se a gente juntar as pistas do diário do Kian com...', 2, NOW());