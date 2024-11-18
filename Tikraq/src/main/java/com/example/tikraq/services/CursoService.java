package com.example.tikraq.services;

import com.example.tikraq.entities.Curso;

import java.util.List;

public interface CursoService {
    public Curso crearCurso(Curso curso) throws Exception;
    public Curso actualizarCurso(Curso curso);
    public List<Curso> listarCursos();
    public List<Curso> listarCursosPorIdUsuario(Integer usuarioId);
}
