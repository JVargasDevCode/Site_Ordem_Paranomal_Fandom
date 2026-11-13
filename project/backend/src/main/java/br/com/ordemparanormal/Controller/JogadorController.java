package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Jogador;
import br.com.ordemparanormal.service.JogadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/jogadores")
public class JogadorController {

    @Autowired
    private JogadorService jogadorService;

    @GetMapping
    public ResponseEntity<List<Jogador>> listarTodos() {
        return ResponseEntity.ok(jogadorService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jogador> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(jogadorService.buscarPorId(id));
    }
}