package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.exception.BadRequestException;
import br.com.ordemparanormal.exception.ResourceNotFoundException;
import br.com.ordemparanormal.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));
    }

    public Usuario resgatarMolduraVigilia(Long usuarioId, String codigo) {
        // Prazo limite do evento: 14/11/2026
        LocalDate limite = LocalDate.of(2026, 11, 14);
        if (LocalDate.now().isAfter(limite)) {
            throw new BadRequestException("O evento 'A Vigília' foi encerrado em 14/11!");
        }

        // Código secreto de exemplo para desbloquear a moldura
        if (!"VIGILIA-SECRETO-2026".equalsIgnoreCase(codigo)) {
            throw new BadRequestException("Código secreto inválido para A Vigília!");
        }

        Usuario usuario = buscarPorId(usuarioId);
        usuario.setMolduraAtiva("vigilia-especial");
        usuario.setSegredosResgatadosVigilia(codigo);
        return usuarioRepository.save(usuario);
    }

    public Usuario equiparMoldura(Long usuarioId, String molduraId) {
        Usuario usuario = buscarPorId(usuarioId);
        usuario.setMolduraAtiva(molduraId);
        return usuarioRepository.save(usuario);
    }
}