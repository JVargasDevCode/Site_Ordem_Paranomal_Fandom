package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Jogador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JogadorRepository extends JpaRepository<Jogador, Long> {
}