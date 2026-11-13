package br.com.ordemparanormal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MolduraRequest {
    @NotBlank(message = "O ID da moldura é obrigatório")
    private String molduraId;
}