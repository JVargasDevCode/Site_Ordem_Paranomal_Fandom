package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Temporada;
import br.com.ordemparanormal.service.TemporadaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/temporadas")
@CrossOrigin(origins = "*")
public class TemporadaController {

    private final TemporadaService temporadaService;

    public TemporadaTemporadaController(TemporadaService temporadaService) {
        this.temporadaService = temporadaService;
    }

    @GetMapping
    public ResponseEntity<List<Temporada>> listar() {
        return ResponseEntity.ok(temporadaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Temporada> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(temporadaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Temporada> criar(@RequestBody Temporada temporada) {
        Temporada nova = temporadaService.salvar(temporada);
        return ResponseEntity.status(HttpStatus.CREATED).body(nova);
    }
}