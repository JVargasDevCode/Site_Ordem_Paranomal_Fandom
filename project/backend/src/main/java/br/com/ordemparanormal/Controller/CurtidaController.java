package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.security.UserDetailsImpl;
import br.com.ordemparanormal.service.CurtidaService;
import br.com.ordemparanormal.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/curtidas")
public class CurtidaController {

    @Autowired
    private CurtidaService curtidaService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> alternarCurtida(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                             @RequestBody Map<String, Object> payload) {
        String tipoAlvo = (String) payload.get("tipoAlvo");
        Long alvoId = Long.valueOf(payload.get("alvoId").toString());
        Usuario usuario = usuarioService.buscarPorId(userDetails.getId());

        boolean curtiu = curtidaService.alternarCurtida(tipoAlvo, alvoId, usuario);
        long total = curtidaService.contarCurtidas(tipoAlvo, alvoId);
        return ResponseEntity.ok(Map.of("curtiu", curtiu, "total", total));
    }
}