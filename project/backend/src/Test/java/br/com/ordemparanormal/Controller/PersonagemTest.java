package br.com.ordemparanormal.domain;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PersonagemTest {

    @Test
    void naoDevePermitirNexAcimaDeCem() {
        // Arrange
        Personagem p = new Personagem();
        p.setNome("Rafael");
        p.setNex(90);

        // Act & Assert
        Exception exception = assertThrows(IllegalStateException.java.class, () -> {
            p.avancarNex(15);
        });

        assertEquals("O NEX não pode ultrapassar 100%.", exception.getMessage());
    }

    @Test
    void deveAvancarNexComSucesso() {
        // Arrange
        Personagem p = new Personagem();
        p.setNex(10);

        // Act
        p.avancarNex(15);

        // Assert
        assertEquals(25, p.getNex());
    }
}