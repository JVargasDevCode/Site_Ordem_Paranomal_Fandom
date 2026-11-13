package br.com.ordemparanormal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResgateVigiliaRequest {
    @NotBlank(message = "O código do segredo é obrigatório")
    private String codigoSegredo;
}