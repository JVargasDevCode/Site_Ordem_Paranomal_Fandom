package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Comentario;
import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.security.UserDetailsImpl;
import br.com.ordemparanormal.service.ComentarioService;
import br.com.ordemparanormal.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Comentario>> listarPorAlvo(@RequestParam String tipoAlvo, @RequestParam Long alvoId) {
        return ResponseEntity.ok(comentarioService.listarPorAlvo(tipoAlvo, alvoId));
    }

    @PostMapping
    public ResponseEntity<Comentario> adicionar(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                @RequestBody Map<String, Object> payload) {
        String tipoAlvo = (String) payload.get("tipoAlvo");
        Long alvoId = Long.valueOf(payload.get("alvoId").toString());
        String conteudo = (String) payload.get("conteudo");
        Usuario autor = usuarioService.buscarPorId(userDetails.getId());

        return ResponseEntity.ok(comentarioService.adicionar(tipoAlvo, alvoId, conteudo, autor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        comentarioService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}