package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Jogador;
import br.com.ordemparanormal.exception.ResourceNotFoundException;
import br.com.ordemparanormal.repository.JogadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JogadorService {

    @Autowired
    private JogadorRepository jogadorRepository;

    public List<Jogador> listarTodos() {
        return jogadorRepository.findAll();
    }

    public Jogador buscarPorId(Long id) {
        return jogadorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Jogador não encontrado com ID: " + id));
    }
}