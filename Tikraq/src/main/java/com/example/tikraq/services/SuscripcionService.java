package com.example.tikraq.services;


import com.example.tikraq.entities.Suscripcion;

public interface SuscripcionService {
    public Suscripcion activarSuscripcion(Suscripcion suscripcion);
    public void cancelarSuscripcion(Integer id);
}
