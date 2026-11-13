package br.com.ordemparanormal.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "plataformas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Plataforma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String url;
    private String icone;
}