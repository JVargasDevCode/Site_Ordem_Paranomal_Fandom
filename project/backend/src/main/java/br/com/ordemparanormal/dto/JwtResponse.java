package br.com.ordemparanormal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String tipo = "Bearer";
    private Long id;
    private String nome;
    private String email;
    private String role;
    private String molduraAtiva;

    public JwtResponse(String token, Long id, String nome, String email, String role, String molduraAtiva) {
        this.token = token;
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.role = role;
        this.molduraAtiva = molduraAtiva;
    }
}