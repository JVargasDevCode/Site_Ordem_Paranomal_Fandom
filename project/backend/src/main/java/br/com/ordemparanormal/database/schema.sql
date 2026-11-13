CREATE DATABASE IF NOT EXISTS ordem_paranormal_db;
USE ordem_paranormal_db;

CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    papel VARCHAR(50) DEFAULT 'USER'
);

CREATE TABLE temporada (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    ano INT NOT NULL,
    capa_url VARCHAR(255)
);

CREATE TABLE jogador (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    biografia TEXT,
    foto_url VARCHAR(255)
);

CREATE TABLE personagem (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    classe VARCHAR(50) NOT NULL,
    origem VARCHAR(50),
    nex INT DEFAULT 5,
    jogador_id BIGINT,
    temporada_id BIGINT,
    foto_url VARCHAR(255),
    CONSTRAINT fk_personagem_jogador FOREIGN KEY (jogador_id) REFERENCES jogador(id),
    CONSTRAINT fk_personagem_temporada FOREIGN KEY (temporada_id) REFERENCES temporada(id)
);

CREATE TABLE teoria (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id BIGINT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_teoria_usuario FOREIGN KEY (autor_id) REFERENCES usuario(id)
);

CREATE TABLE comentario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conteudo TEXT NOT NULL,
    usuario_id BIGINT NOT NULL,
    teoria_id BIGINT NOT NULL,
    CONSTRAINT fk_comentario_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_comentario_teoria FOREIGN KEY (teoria_id) REFERENCES teoria(id)
);