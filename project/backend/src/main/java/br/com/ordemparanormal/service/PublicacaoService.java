package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Publicacao;
import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.exception.ResourceNotFoundException;
import br.com.ordemparanormal.repository.PublicacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PublicacaoService {

    @Autowired
    private PublicacaoRepository publicacaoRepository;

    public List<Publicacao> listarTodas() {
        return publicacaoRepository.findAll();
    }

    public Publicacao buscarPorId(Long id) {
        return publicacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publicação não encontrada com ID: " + id));
    }

    public Publicacao criar(Publicacao publicacao, Usuario autor) {
        publicacao.setAutor(autor);
        return publicacaoRepository.save(publicacao);
    }

    public void excluir(Long id) {
        Publicacao publicacao = buscarPorId(id);
        publicacaoRepository.delete(publicacao);
    }
}