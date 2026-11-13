package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.enums.Role;
import br.com.ordemparanormal.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity> obterDashboard() {
        return ResponseEntity.ok(adminService.obterEstatisticasDashboard());
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(adminService.listarUsuarios());
    }

    @PatchMapping("/usuarios/{id}/cargo")
    public ResponseEntity<Usuario> alterarCargo(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Role novoRole = Role.valueOf(payload.get("role"));
        return ResponseEntity.ok(adminService.alterarCargo(id, novoRole));
    }

    @PatchMapping("/usuarios/{id}/status")
    public ResponseEntity<Usuario> alternarStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> payload) {
        boolean ativo = payload.get("ativo");
        return ResponseEntity.ok(adminService.alternarStatusUsuario(id, ativo));
    }
}