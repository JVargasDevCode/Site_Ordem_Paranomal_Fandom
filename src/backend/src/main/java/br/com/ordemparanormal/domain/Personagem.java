package br.com.ordemparanormal.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "personagem")
public class Personagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String classe;
    private String origem;
    private Integer nex = 5;

    @ManyToOne
    @JoinColumn(name = "jogador_id")
    private Jogador jogador;

    @ManyToOne
    @JoinColumn(name = "temporada_id")
    private Temporada temporada;

    private String fotoUrl;

    // Regra de negócio: Evoluir NEX com validação de limite do sistema (até 100%)
    public void avancarNex(int quantidade) {
        if (quantidade <= 0) {
            throw new IllegalArgumentException("O incremento de NEX deve ser positivo.");
        }
        if (this.nex + quantidade > 100) {
            throw new IllegalStateException("O NEX não pode ultrapassar 100%.");
        }
        this.nex += quantidade;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getClasse() { return classe; }
    public void setClasse(String classe) { this.classe = classe; }
    public String getOrigem() { return origem; }
    public void setOrigem(String origem) { this.origem = origem; }
    public Integer getNex() { return nex; }
    public void setNex(Integer nex) { this.nex = nex; }
    public Jogador getJogador() { return jogador; }
    public void setJogador(Jogador jogador) { this.jogador = jogador; }
    public Temporada getTemporada() { return temporada; }
    public void setTemporada(Temporada temporada) { this.temporada = temporada; }
    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }
}