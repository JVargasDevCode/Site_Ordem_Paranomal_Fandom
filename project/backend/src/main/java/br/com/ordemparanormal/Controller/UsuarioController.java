package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.dto.MolduraRequest;
import br.com.ordemparanormal.dto.ResgateVigiliaRequest;
import br.com.ordemparanormal.security.UserDetailsImpl;
import br.com.ordemparanormal.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.buscarPorId(id));
    }

    @PostMapping("/evento-vigilia/resgatar")
    public ResponseEntity<Usuario> resgatarVigilia(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                   @Valid @RequestBody ResgateVigiliaRequest request) {
        Usuario atualizado = usuarioService.resgatarMolduraVigilia(userDetails.getId(), request.getCodigoSegredo());
        return ResponseEntity.ok(atualizado);
    }

    @PatchMapping("/moldura")
    public ResponseEntity<Usuario> equiparMoldura(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                  @Valid @RequestBody MolduraRequest request) {
        Usuario atualizado = usuarioService.equiparMoldura(userDetails.getId(), request.getMolduraId());
        return ResponseEntity.ok(atualizado);
    }
}