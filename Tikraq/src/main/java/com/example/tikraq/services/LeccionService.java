package com.example.tikraq.services;


import com.example.tikraq.entities.Leccion;

import java.util.List;

public interface LeccionService {
    public Leccion crearLeccion(Leccion leccion);
    public Leccion actualizarLeccion(Leccion leccion);
    public List<Leccion> listarLecciones();
    public List<Leccion> listarLeccionesPorIdCurso(Integer cursoId);
}
