package br.com.ordemparanormal.security;

import br.com.ordemparanormal.domain.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

@Getter
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {
    private Long id;
    private String nome;
    private String email;
    @JsonIgnore
    private String senha;
    private String molduraAtiva;
    private Collection<? extends GrantedAuthority> authorities;

    public static UserDetailsImpl construir(Usuario usuario) {
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(usuario.getRole().name()));

        return new UserDetailsImpl(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getSenha(),
                usuario.getMolduraAtiva(),
                authorities
        );
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}