package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Publicacao;
import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.security.UserDetailsImpl;
import br.com.ordemparanormal.service.PublicacaoService;
import br.com.ordemparanormal.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/postagens")
public class PublicacaoController {

    @Autowired
    private PublicacaoService publicacaoService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Publicacao>> listarTodas() {
        return ResponseEntity.ok(publicacaoService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publicacao> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(publicacaoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Publicacao> criar(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @Valid @RequestBody Publicacao publicacao) {
        Usuario autor = usuarioService.buscarPorId(userDetails.getId());
        return ResponseEntity.ok(publicacaoService.criar(publicacao, autor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        publicacaoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}