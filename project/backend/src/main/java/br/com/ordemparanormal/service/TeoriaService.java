package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Teoria;
import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.exception.ResourceNotFoundException;
import br.com.ordemparanormal.repository.TeoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TeoriaService {

    @Autowired
    private TeoriaRepository teoriaRepository;

    public List<Teoria> listarTodas(String status) {
        if (status != null && !status.isBlank()) {
            return teoriaRepository.findByStatus(status);
        }
        return teoriaRepository.findAll();
    }

    public Teoria buscarPorId(Long id) {
        return teoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teoria não encontrada com ID: " + id));
    }

    public Teoria criar(Teoria teoria, Usuario autor) {
        teoria.setAutor(autor);
        return teoriaRepository.save(teoria);
    }

    public Teoria atualizar(Long id, Teoria novosDados) {
        Teoria teoria = buscarPorId(id);
        teoria.setTitulo(novosDados.getTitulo());
        teoria.setConteudo(novosDados.getConteudo());
        return teoriaRepository.save(teoria);
    }

    public void excluir(Long id) {
        Teoria teoria = buscarPorId(id);
        teoriaRepository.delete(teoria);
    }
}