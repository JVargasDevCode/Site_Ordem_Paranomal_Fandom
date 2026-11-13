package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}