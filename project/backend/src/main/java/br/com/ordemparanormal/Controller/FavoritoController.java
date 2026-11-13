package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Favorito;
import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.security.UserDetailsImpl;
import br.com.ordemparanormal.service.FavoritoService;
import br.com.ordemparanormal.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {

    @Autowired
    private FavoritoService favoritoService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Favorito>> listarMeusFavoritos(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(favoritoService.listarPorUsuario(userDetails.getId()));
    }

    @PostMapping("/alternar")
    public ResponseEntity<?> alternarFavorito(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                              @RequestBody Map<String, Object> payload) {
        String tipoItem = (String) payload.get("tipoItem");
        Long itemId = Long.valueOf(payload.get("itemId").toString());
        Usuario usuario = usuarioService.buscarPorId(userDetails.getId());

        boolean favoritado = favoritoService.alternarFavorito(tipoItem, itemId, usuario);
        return ResponseEntity.ok(Map.of("favoritado", favoritado));
    }
}