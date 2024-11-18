package com.example.tikraq.services;

import com.example.tikraq.entities.Leccion;
import com.example.tikraq.entities.Pregunta;

import java.util.List;

public interface PreguntaService {
    public Pregunta crearPregunta(Pregunta pregunta);
    public Pregunta actualizarPregunta(Pregunta pregunta);
    public List<Pregunta> listarPreguntas();
    public List<Pregunta> listarPreguntasPorIdLeccion(Integer leccionId);

    // public Pregunta actualizarPregunta(Integer id, Pregunta pregunta);
    // public void eliminarPregunta(Integer id);
    // public Pregunta obtenerPreguntaPorId(Integer id);
}
