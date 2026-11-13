package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Teoria;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeoriaRepository extends JpaRepository<Teoria, Long> {
    List<Teoria> findByStatus(String status);
    List<Teoria> findByAutorId(Long autorId);
}