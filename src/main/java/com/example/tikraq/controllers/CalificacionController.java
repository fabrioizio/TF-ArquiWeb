package com.example.tikraq.controllers;


import com.example.tikraq.dtos.CalificacionDTO;

import com.example.tikraq.entities.Calificacion;
import com.example.tikraq.services.CalificacionService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class CalificacionController {

    @Autowired
    @Lazy
    private CalificacionService calificacionService;
    @CrossOrigin(exposedHeaders = "Authorization")
    @PostMapping("/agregarCalificacion")
    @PreAuthorize("hasAnyAuthority('ADMIN','FREE','SUSCRIPTOR','PREMIUM')")
    public CalificacionDTO createCalificacion(@RequestBody CalificacionDTO calificacionDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Calificacion calificacion = modelMapper.map(calificacionDTO, Calificacion.class);
            calificacion = calificacionService.crearCalificacion(calificacion);
            return modelMapper.map(calificacion,CalificacionDTO.class);
        }catch (Exception e){
            throw  new Exception("No se puede agregar la calificacion");
        }
    }
}
