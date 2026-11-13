package br.com.ordemparanormal.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "creditos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Credito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String funcao;
    private String linkPerfil;
}