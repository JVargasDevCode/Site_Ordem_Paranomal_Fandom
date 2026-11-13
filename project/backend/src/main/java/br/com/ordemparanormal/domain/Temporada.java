package br.com.ordemparanormal.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "temporada")
public class Temporada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private Integer ano;

    private String capaUrl;

    // Relacionamento Um-para-Muitos com Personagens daquela temporada
    @OneToMany(mappedBy = "temporada", cascade = CascadeType.ALL)
    private List<Personagem> personagens = new ArrayList<>();

    protected Temporada() {}

    public Temporada(String titulo, String descricao, Integer ano, String capaUrl) {
        if (titulo == null || titulo.isBlank()) {
            throw new IllegalArgumentException("O título da temporada não pode ser vazio.");
        }
        if (ano == null || ano < 2015) {
            throw new IllegalArgumentException("Ano da temporada inválido.");
        }
        this.titulo = titulo;
        this.descricao = descricao;
        this.ano = ano;
        this.capaUrl = capaUrl;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescdescricao() { return descricao; }
    public Integer getAno() { return ano; }
    public String getCapaUrl() { return capaUrl; }
    public List<Personagem> getPersonagens() { return personagens; }
}