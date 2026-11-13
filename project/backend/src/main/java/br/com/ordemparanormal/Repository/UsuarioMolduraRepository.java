package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Moldura;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MolduraRepository extends JpaRepository<Moldura, Long> {
    Optional<Moldura> findByCodigoDesbloqueio(String codigoDesbloqueio);
}