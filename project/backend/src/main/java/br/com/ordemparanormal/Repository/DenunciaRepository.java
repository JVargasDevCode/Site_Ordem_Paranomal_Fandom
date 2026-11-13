package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Denuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    List<Denuncia> findByStatus(String status);
}