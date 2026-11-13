package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByTipoAlvoAndAlvoId(String tipoAlvo, Long alvoId);
}