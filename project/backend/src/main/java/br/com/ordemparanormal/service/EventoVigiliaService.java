package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Moldura;
import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.repository.MolduraRepository;
import br.com.ordemparanormal.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EventoVigiliaService {

    @Autowired
    private MolduraRepository molduraRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private static final LocalDateTime DATA_LIMITE = LocalDateTime.of(2026, 11, 14, 23, 59, 59);

    public void resgatarRecompensaPorClique(Long usuarioId, String codigoInformado) {
        LocalDateTime agora = LocalDateTime.now();
        if (agora.isAfter(DATA_LIMITE)) {
            throw new RuntimeException("O prazo para resgatar a recompensa do evento 'A Vigília' encerrou em 14/11!");
        }


        Moldura moldura = molduraRepository.findByCodigoDesbloqueio(codigoInformado)
                .orElseThrow(() -> new RuntimeException("Código ou item secreto inválido!"));

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));


        usuarioRepository.save(usuario);
    }
}