package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Curso;
import com.example.tikraq.entities.Leccion;
import com.example.tikraq.repositories.CursoRepositorio;
import com.example.tikraq.repositories.LeccionRepositorio;
import com.example.tikraq.services.LeccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class LeccionServiceImpl implements LeccionService {
    @Autowired
    @Lazy
    private LeccionRepositorio leccionRepositorio;
    @Autowired
    @Lazy
    private CursoRepositorio cursoRepositorio;

    @Override
    public Leccion crearLeccion(Leccion leccion) {

        return leccionRepositorio.save(leccion);
    }

    @Override
    public Leccion actualizarLeccion(Leccion leccion) {
        return leccionRepositorio.save(leccion);
    }

    @Override
    public List<Leccion> listarLecciones() { return leccionRepositorio.findAll(); }

    @Override
    public List<Leccion> listarLeccionesPorIdCurso(Integer cursoId) {
        Curso curso = cursoRepositorio.findById(cursoId)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));
        Set<Leccion> lecciones = curso.getLecciones();
        return new ArrayList<>(lecciones);
    }
}
