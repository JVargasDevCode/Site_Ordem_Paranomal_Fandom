package br.com.ordemparanormal.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_moldura")
public class Moldura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome; // Ex: "Moldura A Vigília"
    private String codigoDesbloqueio; // O código associado à imagem/evento
    private String urlImagem;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getCodigoDesbloqueio() { return codigoDesbloqueio; }
    public void setCodigoDesbloqueio(String codigoDesbloqueio) { this.codigoDesbloqueio = codigoDesbloqueio; }
}