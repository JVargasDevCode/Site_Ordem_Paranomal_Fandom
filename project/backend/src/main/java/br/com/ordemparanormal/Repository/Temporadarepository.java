package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Temporada;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TemporadaRepository extends JpaRepository<Temporada, Long> {
    Optional<Temporada> findByTituloIgnoreCase(String titulo);
}