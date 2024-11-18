package com.example.tikraq.controllers;

import com.example.tikraq.dtos.TraduccionDTO;
import com.example.tikraq.entities.Traduccion;
import com.example.tikraq.services.TraduccionService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TraduccionController {
    @Autowired
    @Lazy
    private TraduccionService traduccionService;

    @PostMapping("/traducir")
    @PreAuthorize("hasAnyAuthority('ADMIN','FREE','SUSCRIPTOR','PREMIUM')")
    public TraduccionDTO traducirTexto(@RequestBody TraduccionDTO traduccionDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Traduccion traduccion = modelMapper.map(traduccionDTO, Traduccion.class);
            traduccion = traduccionService.traducirTexto(traduccion);
            return modelMapper.map(traduccion, TraduccionDTO.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("No se puede traducir: " + e.getMessage());
        }
    }

}
