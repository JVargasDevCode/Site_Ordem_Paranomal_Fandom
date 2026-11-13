package br.com.ordemparanormal.controller;

import br.com.ordemparanormal.domain.Personagem;
import br.com.ordemparanormal.service.PersonagemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personagens")
@CrossOrigin(origins = "*") // Permite comunicação com o ReactJS
public class PersonagemController {

    private final PersonagemService personagemService;

    public PersonagemController(PersonagemService personagemService) {
        this.personagemService = personagemService;
    }

    @GetMapping
    public ResponseEntity<List<Personagem>> listar() {
        return ResponseEntity.ok(personagemService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Personagem> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(personagemService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Personagem> criar(@RequestBody Personagem personagem) {
        Personagem novoPersonagem = personagemService.salvar(personagem);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPersonagem);
    }

    @PatchMapping("/{id}/nex")
    public ResponseEntity<Personagem> evoluirNex(@PathVariable Long id, @RequestParam int qtd) {
        Personagem atualizado = personagemService.evoluirNex(id, qtd);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        personagemService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}