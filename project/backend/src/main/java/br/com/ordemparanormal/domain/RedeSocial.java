package br.com.ordemparanormal.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "redes_sociais")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RedeSocial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String plataforma;
    private String url;

    @ManyToOne
    @JoinColumn(name = "jogador_id")
    private Jogador jogador;
}