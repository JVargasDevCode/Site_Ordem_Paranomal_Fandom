package br.com.ordemparanormal.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "participacoes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Participacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "jogador_id")
    private Jogador jogador;

    @ManyToOne
    @JoinColumn(name = "personagem_id")
    private Personagem personagem;

    @ManyToOne
    @JoinColumn(name = "temporada_id")
    private Temporada temporada;
}