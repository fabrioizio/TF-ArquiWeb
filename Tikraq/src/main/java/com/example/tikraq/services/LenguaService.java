package com.example.tikraq.services;

import com.example.tikraq.entities.Lengua;

import java.util.List;

public interface LenguaService {
    public Lengua agregarLengua(Lengua lengua);
    public Lengua actualizarLengua(Lengua lengua);
    public List<Lengua> listarLenguas();
}
