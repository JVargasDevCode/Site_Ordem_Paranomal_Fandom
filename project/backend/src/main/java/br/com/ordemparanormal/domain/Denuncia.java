package br.com.ordemparanormal.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "denuncias")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Denuncia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoAlvo;
    private Long alvoId;

    @Column(columnDefinition = "TEXT")
    private String motivo;

    @ManyToOne
    @JoinColumn(name = "denunciante_id")
    private Usuario denunciante;

    private String status;
    private LocalDateTime dataCriacao;

    @PrePersist
    public void prePersist() {
        this.dataCriacao = LocalDateTime.now();
        this.status = "PENDENTE";
    }
}