package br.com.ordemparanormal.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "favoritos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Favorito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoItem;
    private Long itemId;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}