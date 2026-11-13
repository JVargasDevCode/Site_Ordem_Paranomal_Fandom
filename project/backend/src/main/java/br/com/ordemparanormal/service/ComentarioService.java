package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Comentario;
import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.exception.ResourceNotFoundException;
import br.com.ordemparanormal.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public List<Comentario> listarPorAlvo(String tipoAlvo, Long alvoId) {
        return comentarioRepository.findByTipoAlvoAndAlvoId(tipoAlvo, alvoId);
    }

    public Comentario adicionar(String tipoAlvo, Long alvoId, String conteudo, Usuario autor) {
        Comentario comentario = Comentario.builder()
                .tipoAlvo(tipoAlvo)
                .alvoId(alvoId)
                .conteudo(conteudo)
                .autor(autor)
                .build();
        return comentarioRepository.save(comentario);
    }

    public void excluir(Long id) {
        Comentario comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comentário não encontrado com ID: " + id));
        comentarioRepository.delete(comentario);
    }
}