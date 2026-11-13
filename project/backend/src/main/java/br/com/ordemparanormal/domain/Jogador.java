package br.com.ordemparanormal.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "jogadores")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Jogador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String fotoUrl;

    @Column(columnDefinition = "TEXT")
    private String biografia;
}