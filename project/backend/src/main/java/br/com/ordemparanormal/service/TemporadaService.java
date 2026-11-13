package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Temporada;
import br.com.ordemparanormal.repository.TemporadaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemporadaService {

    private final TemporadaRepository temporadaRepository;

    public TemporadaService(TemporadaRepository temporadaRepository) {
        this.temporadaRepository = temporadaRepository;
    }

    public List<Temporada> listarTodas() {
        return temporadaRepository.findAll();
    }

    public Temporada buscarPorId(Long id) {
        return temporadaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Temporada não encontrada com ID: " + id));
    }

    public Temporada salvar(Temporada temporada) {
        return temporadaRepository.save(temporada);
    }
}