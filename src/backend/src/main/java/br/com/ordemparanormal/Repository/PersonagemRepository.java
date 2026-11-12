package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Personagem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PersonagemRepository extends JpaRepository<Personagem, Long> {
    List<Personagem> findByClasseIgnoreCase(String classe);
    List<Personagem> findByTemporadaId(Long temporadaId);
}