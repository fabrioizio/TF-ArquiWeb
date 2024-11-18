package com.example.tikraq.controllers;

import com.example.tikraq.dtos.LeccionDTO;
import com.example.tikraq.dtos.PreguntaDTO;
import com.example.tikraq.entities.Leccion;
import com.example.tikraq.entities.Pregunta;
import com.example.tikraq.services.PreguntaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class PreguntaController {

    @Autowired
    private PreguntaService preguntaService;

    @GetMapping("/listarPreguntas")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<PreguntaDTO> obtenerPreguntas() throws Exception{
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Pregunta> preguntas = preguntaService.listarPreguntas();
            return Arrays.asList(modelMapper.map(preguntas, PreguntaDTO[].class));
        }catch (Exception e){
            throw  new Exception("No se pudo listar las preguntas"+ e.getMessage());
        }
    }

    @GetMapping("/listarpreguntas/{leccionId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','PREMIUM')")
    public List<PreguntaDTO> listarPreguntasPorIdLeccion(@PathVariable Integer leccionId) throws Exception{
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Pregunta> preguntas = preguntaService.listarPreguntasPorIdLeccion(leccionId);
            return Arrays.asList(modelMapper.map(preguntas, PreguntaDTO[].class));
        } catch (Exception e) {
            throw new Exception("No se puede listar por Id de leccion: " + e.getMessage());
        }
    }


    @PostMapping("/registrarPregunta")
    @PreAuthorize("hasAuthority('ADMIN')")
    public PreguntaDTO registrarPregunta(@RequestBody PreguntaDTO preguntaDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Pregunta pregunta = modelMapper.map(preguntaDTO,Pregunta.class);
            pregunta = preguntaService.crearPregunta(pregunta);
            return modelMapper.map(pregunta, PreguntaDTO.class);
        }catch (Exception e){
            throw  new Exception("No se puede registrar la pregunta" + e.getMessage());
        }
    }

    @PutMapping("/actualizarPregunta")
    @PreAuthorize("hasAuthority('ADMIN')")
    public PreguntaDTO actualizarPregunta(@RequestBody PreguntaDTO preguntaDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Pregunta pregunta = modelMapper.map(preguntaDTO,Pregunta.class);
            pregunta = preguntaService.actualizarPregunta(pregunta);
            return modelMapper.map(pregunta, PreguntaDTO.class);
        }catch (Exception e){
            throw  new Exception("No se puede actualizar la pregunta" + e.getMessage());
        }
    }

//    // Eliminar una pregunta
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> eliminarPregunta(@PathVariable Integer id) {
//        if (preguntaRepositorio.existsById(id)) {
//            preguntaRepositorio.deleteById(id);
//            return ResponseEntity.noContent().build();
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
}
