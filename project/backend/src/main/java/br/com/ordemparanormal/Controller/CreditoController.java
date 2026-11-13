package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Credito;
import br.com.ordemparanormal.service.CreditoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/creditos")
public class CreditoController {

    @Autowired
    private CreditoService creditoService;

    @GetMapping
    public ResponseEntity<List<Credito>> listarTodos() {
        return ResponseEntity.ok(creditoService.listarTodos());
    }
}