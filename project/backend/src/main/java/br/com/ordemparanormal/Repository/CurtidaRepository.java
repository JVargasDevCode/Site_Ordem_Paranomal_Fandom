package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Curtida;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CurtidaRepository extends JpaRepository<Curtida, Long> {
    Optional<Curtida> findByTipoAlvoAndAlvoIdAndUsuarioId(String tipoAlvo, Long alvoId, Long usuarioId);
    long countByTipoAlvoAndAlvoId(String tipoAlvo, Long alvoId);
}