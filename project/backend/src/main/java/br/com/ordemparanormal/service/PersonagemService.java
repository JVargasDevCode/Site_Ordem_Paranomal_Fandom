package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Personagem;
import br.com.ordemparanormal.repository.PersonagemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonagemService {

    private final PersonagemRepository personagemRepository;

    public PersonagemService(PersonagemRepository personagemRepository) {
        this.personagemRepository = personagemRepository;
    }

    public List<Personagem> listarTodos() {
        return personagemRepository.findAll();
    }

    public Personagem buscarPorId(Long id) {
        return personagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Personagem não encontrado com ID: " + id));
    }

    public Personagem salvar(Personagem personagem) {
        if (personagem.getNome() == null || personagem.getNome().isBlank()) {
            throw new IllegalArgumentException("O nome do personagem não pode ser vazio.");
        }
        return personagemRepository.save(personagem);
    }

    public Personagem evoluirNex(Long id, int quantidade) {
        Personagem personagem = buscarPorId(id);
        personagem.avancarNex(quantidade); // Aplica a regra encapsulada na Entidade
        return personagemRepository.save(personagem);
    }

    public void deletar(Long id) {
        if (!personagemRepository.existsById(id)) {
            throw new RuntimeException("Não é possível deletar. Personagem não encontrado.");
        }
        personagemRepository.deleteById(id);
    }
}