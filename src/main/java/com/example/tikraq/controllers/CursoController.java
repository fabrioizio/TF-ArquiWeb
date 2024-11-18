package com.example.tikraq.controllers;

import com.example.tikraq.dtos.CursoDTO;
import com.example.tikraq.entities.Curso;
import com.example.tikraq.services.CursoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class CursoController {
    @Autowired
    @Lazy
    private CursoService cursoService;
    @CrossOrigin(exposedHeaders = "Authorization")
    @PostMapping("/agregarcurso")
    @PreAuthorize("hasAuthority('ADMIN')")
    public CursoDTO crearCurso(@RequestBody CursoDTO cursoDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Curso curso = modelMapper.map(cursoDTO, Curso.class);
            curso = cursoService.crearCurso(curso);
            return modelMapper.map(curso, CursoDTO.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("No se puede registrar: " + e.getMessage());
        }
    }

    @PutMapping("/actualizarcurso")
    @PreAuthorize("hasAuthority('ADMIN')")
    public CursoDTO actualizarCurso(@RequestBody CursoDTO cursoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Curso curso = modelMapper.map(cursoDTO, Curso.class);
        curso = cursoService.actualizarCurso(curso);
        return modelMapper.map(curso,CursoDTO.class);
    }


    @GetMapping("/listarcursos")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<CursoDTO> listarCursos() throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Curso> cursos = cursoService.listarCursos();
            return Arrays.asList(modelMapper.map(cursos, CursoDTO[].class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("No se puede listar: " + e.getMessage());
        }
    }

    @GetMapping("/listarcursos/{usuarioId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','PREMIUM')")
    public List<CursoDTO> listarCursosPorIdUsuario(@PathVariable Integer usuarioId) throws Exception{
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Curso> cursos = cursoService.listarCursosPorIdUsuario(usuarioId);
            return Arrays.asList(modelMapper.map(cursos, CursoDTO[].class));
        } catch (Exception e) {
            throw new Exception("No se puede listar por Id de usuario: " + e.getMessage());
        }
    }

}
