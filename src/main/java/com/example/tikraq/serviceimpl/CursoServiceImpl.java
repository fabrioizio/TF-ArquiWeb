package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Curso;
import com.example.tikraq.entities.Usuario;
import com.example.tikraq.repositories.CursoRepositorio;
import com.example.tikraq.repositories.UsuarioRepositorio;
import com.example.tikraq.services.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class CursoServiceImpl implements CursoService {
    @Autowired
    @Lazy
    private CursoRepositorio cursoRepositorio;

    @Autowired
    @Lazy
    private UsuarioRepositorio usuarioRepositorio;


    @Override
    public Curso crearCurso(Curso curso) {
        return cursoRepositorio.save(curso);
    }

    @Override
    public Curso actualizarCurso(Curso curso) {
        return cursoRepositorio.save(curso);
    }

    @Override
    public List<Curso> listarCursos() { return cursoRepositorio.findAll(); }

    @Override
    public List<Curso> listarCursosPorIdUsuario(Integer usuarioId) {
        Usuario usuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        Set<Curso> cursos = usuario.getCursos();
        return new ArrayList<>(cursos);
    }



}
