package com.example.tikraq.controllers;

import com.example.tikraq.dtos.LeccionDTO;
import com.example.tikraq.entities.Leccion;
import com.example.tikraq.services.LeccionService;
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
public class LeccionController {
    @Autowired
    @Lazy
    private LeccionService leccionService;

    @CrossOrigin(exposedHeaders = "Authorization")
    @PostMapping("/agregarleccion")
    @PreAuthorize("hasAuthority('ADMIN')")
    public LeccionDTO crearLeccion(@RequestBody LeccionDTO leccionDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Leccion leccion = modelMapper.map(leccionDTO,Leccion.class);
            leccion = leccionService.crearLeccion(leccion);
            return modelMapper.map(leccion, LeccionDTO.class);
        }catch (Exception e){
            throw  new Exception("No se puede registrar");
        }
    }

    @PutMapping("/actualizarleccion")
    @PreAuthorize("hasAuthority('ADMIN')")
    public LeccionDTO actualizarLeccion(@RequestBody LeccionDTO leccionDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Leccion leccion = modelMapper.map(leccionDTO, Leccion.class);
        leccion = leccionService.actualizarLeccion(leccion);
        return modelMapper.map(leccion,LeccionDTO.class);
    }

    @GetMapping("/listarlecciones")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<LeccionDTO> listarLecciones() throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Leccion> lecciones = leccionService.listarLecciones();
            return Arrays.asList(modelMapper.map(lecciones, LeccionDTO[].class));
        } catch (Exception e) {
            throw new Exception("No se puede listar: " + e.getMessage());
        }
    }

    @GetMapping("/listarlecciones/{cursoId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','PREMIUM')")
    public List<LeccionDTO> listarCursosPorIdUsuario(@PathVariable Integer cursoId) throws Exception{
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Leccion> lecciones = leccionService.listarLeccionesPorIdCurso(cursoId);
            return Arrays.asList(modelMapper.map(lecciones, LeccionDTO[].class));
        } catch (Exception e) {
            throw new Exception("No se puede listar por Id de curso: " + e.getMessage());
        }
    }
}
