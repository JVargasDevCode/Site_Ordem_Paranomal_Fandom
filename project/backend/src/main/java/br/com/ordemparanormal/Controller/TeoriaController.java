package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Teoria;
import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.security.UserDetailsImpl;
import br.com.ordemparanormal.service.TeoriaService;
import br.com.ordemparanormal.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/teorias")
public class TeoriaController {

    @Autowired
    private TeoriaService teoriaService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Teoria>> listarTodas(@RequestParam(required = false) String status) {
        return ResponseEntity.ok(teoriaService.listarTodas(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teoria> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(teoriaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Teoria> criar(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                        @Valid @RequestBody Teoria teoria) {
        Usuario autor = usuarioService.buscarPorId(userDetails.getId());
        return ResponseEntity.ok(teoriaService.criar(teoria, autor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teoria> atualizar(@PathVariable Long id, @RequestBody Teoria teoria) {
        return ResponseEntity.ok(teoriaService.atualizar(id, teoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        teoriaService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}