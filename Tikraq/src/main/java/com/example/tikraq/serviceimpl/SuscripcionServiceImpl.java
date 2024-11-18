package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Suscripcion;
import com.example.tikraq.repositories.SuscripcionRepositorio;
import com.example.tikraq.services.SuscripcionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class SuscripcionServiceImpl implements SuscripcionService {
    @Autowired
    @Lazy
    private SuscripcionRepositorio suscripcionRepositorio;

    @Override
    public Suscripcion activarSuscripcion(Suscripcion suscripcion) {
        return suscripcionRepositorio.save(suscripcion);
    }

    @Override
    public void cancelarSuscripcion(Integer id) {
        suscripcionRepositorio.deleteById(id);
    }
}
