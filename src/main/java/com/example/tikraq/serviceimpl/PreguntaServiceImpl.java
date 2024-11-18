package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Curso;
import com.example.tikraq.entities.Leccion;
import com.example.tikraq.entities.Pregunta;
import com.example.tikraq.repositories.LeccionRepositorio;
import com.example.tikraq.repositories.PreguntaRepositorio;
import com.example.tikraq.services.PreguntaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class PreguntaServiceImpl implements PreguntaService {
    @Autowired
    @Lazy
    private PreguntaRepositorio preguntaRepositorio;
    @Autowired
    @Lazy
    private LeccionRepositorio leccionRepositorio;

    @Override
    public Pregunta crearPregunta(Pregunta pregunta) {
        return preguntaRepositorio.save(pregunta);
    }

    @Override
    public Pregunta actualizarPregunta(Pregunta pregunta) {
        return preguntaRepositorio.save(pregunta);
    }
    @Override
    public List<Pregunta> listarPreguntas() {
        return preguntaRepositorio.findAll();
    }

    @Override
    public List<Pregunta> listarPreguntasPorIdLeccion(Integer leccionId) {
        Leccion leccion = leccionRepositorio.findById(leccionId)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));
        Set<Pregunta> preguntas = leccion.getPreguntas();
        return new ArrayList<>(preguntas);
    }

}
