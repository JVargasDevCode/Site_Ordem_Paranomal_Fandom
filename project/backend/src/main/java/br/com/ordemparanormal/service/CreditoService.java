package br.com.ordemparanormal.service;

import br.com.ordemparanormal.domain.Credito;
import br.com.ordemparanormal.repository.CreditoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CreditoService {

    @Autowired
    private CreditoRepository creditoRepository;

    public List<Credito> listarTodos() {
        return creditoRepository.findAll();
    }
}