package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.dto.CadastroRequest;
import br.com.ordemparanormal.dto.JwtResponse;
import br.com.ordemparanormal.dto.LoginRequest;
import br.com.ordemparanormal.security.UserDetailsImpl;
import br.com.ordemparanormal.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.autenticar(request));
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastro(@Valid @RequestBody CadastroRequest request) {
        authService.cadastrar(request);
        return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    }

    @GetMapping("/me")
    public ResponseEntity<?> perfilAtual(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Não autenticado");
        }
        return ResponseEntity.ok(userDetails);
    }
}