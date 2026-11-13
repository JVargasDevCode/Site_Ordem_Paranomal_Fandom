package br.com.ordemparanormal.repository;

import br.com.ordemparanormal.domain.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    List<Favorito> findByUsuarioId(Long usuarioId);
    Optional<Favorito> findByUsuarioIdAndTipoItemAndItemId(Long usuarioId, String tipoItem, Long itemId);
}