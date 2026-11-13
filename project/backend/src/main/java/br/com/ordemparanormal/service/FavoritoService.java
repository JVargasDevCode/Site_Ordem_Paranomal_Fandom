package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Favorito;
import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    public List<Favorito> listarPorUsuario(Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId);
    }

    public boolean alternarFavorito(String tipoItem, Long itemId, Usuario usuario) {
        Optional<Favorito> existente = favoritoRepository.findByUsuarioIdAndTipoItemAndItemId(usuario.getId(), tipoItem, itemId);
        if (existente.isPresent()) {
            favoritoRepository.delete(existente.get());
            return false;
        } else {
            Favorito favorito = Favorito.builder()
                    .tipoItem(tipoItem)
                    .itemId(itemId)
                    .usuario(usuario)
                    .build();
            favoritoRepository.save(favorito);
            return true;
        }
    }
}