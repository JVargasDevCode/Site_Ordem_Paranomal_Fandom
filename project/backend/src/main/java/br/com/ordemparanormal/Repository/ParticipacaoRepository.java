package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Participacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParticipacaoRepository extends JpaRepository<Participacao, Long> {
    List<Participacao> findByTemporadaId(Long temporadaId);
    List<Participacao> findByPersonagemId(Long personagemId);
    List<Participacao> findByJogadorId(Long jogadorId);
}