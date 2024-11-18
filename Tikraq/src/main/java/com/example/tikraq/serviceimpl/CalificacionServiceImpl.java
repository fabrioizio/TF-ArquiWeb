package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Calificacion;
import com.example.tikraq.repositories.CalificacionRepositorio;
import com.example.tikraq.services.CalificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class CalificacionServiceImpl implements CalificacionService {

    @Autowired
    @Lazy
    private CalificacionRepositorio calificacionRepositorio;

    @Override
    public Calificacion crearCalificacion(Calificacion calificacion) {
        return calificacionRepositorio.save(calificacion);
    }
}
