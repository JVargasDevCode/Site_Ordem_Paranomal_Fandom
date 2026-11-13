package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Publicacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PublicacaoRepository extends JpaRepository<Publicacao, Long> {
    List<Publicacao> findByAutorId(Long autorId);
}