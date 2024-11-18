package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Consulta;
import com.example.tikraq.repositories.ConsultaRepositorio;
import com.example.tikraq.services.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class ConsultaServiceImpl implements ConsultaService {

    @Autowired
    @Lazy
    private ConsultaRepositorio consultaRepositorio;

    @Override
    public Consulta createConsulta(Consulta consulta) {
        return consultaRepositorio.save(consulta);
    }
}
