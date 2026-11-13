package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.enums.Role;
import br.com.ordemparanormal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private TeoriaRepository teoriaRepository;
    @Autowired
    private PublicacaoRepository publicacaoRepository;
    @Autowired
    private PersonagemRepository personagemRepository;

    public Map<String, Object> obterEstatisticasDashboard() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsuarios", usuarioRepository.count());
        stats.put("totalTeorias", teoriaRepository.count());
        stats.put("totalPublicacoes", publicacaoRepository.count());
        stats.put("totalPersonagens", personagemRepository.count());
        return stats;
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario alterarCargo(Long usuarioId, Role novoRole) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuario.setRole(novoRole);
        return usuarioRepository.save(usuario);
    }

    public Usuario alternarStatusUsuario(Long usuarioId, boolean ativo) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuario.setAtivo(ativo);
        return usuarioRepository.save(usuario);
    }
}