package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Usuario;
import br.com.ordemparanormal.dto.CadastroRequest;
import br.com.ordemparanormal.dto.JwtResponse;
import br.com.ordemparanormal.dto.LoginRequest;
import br.com.ordemparanormal.enums.Role;
import br.com.ordemparanormal.exception.BadRequestException;
import br.com.ordemparanormal.repository.UsuarioRepository;
import br.com.ordemparanormal.security.JwtUtils;
import br.com.ordemparanormal.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    public JwtResponse autenticar(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.gerarTokenJwt(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getNome(),
                userDetails.getEmail(),
                userDetails.getAuthorities().iterator().next().getAuthority(),
                userDetails.getMolduraAtiva()
        );
    }

    public void cadastrar(CadastroRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Erro: E-mail já está em uso!");
        }
        if (usuarioRepository.existsByNome(request.getNome())) {
            throw new BadRequestException("Erro: Nome de usuário já está em uso!");
        }

        Usuario usuario = Usuario.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(encoder.encode(request.getSenha()))
                .role(Role.ROLE_USER)
                .ativo(true)
                .build();

        usuarioRepository.save(usuario);
    }
}