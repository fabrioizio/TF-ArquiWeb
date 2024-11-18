package com.example.tikraq.controllers;

import com.example.tikraq.dtos.SuscripcionDTO;
import com.example.tikraq.entities.Suscripcion;
import com.example.tikraq.services.SuscripcionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class SuscripcionController {
    @Autowired
    @Lazy
    private SuscripcionService suscripcionService;

    @PostMapping("/activarsus")
    @PreAuthorize("hasAnyAuthority('ADMIN','FREE','SUSCRIPTOR','PREMIUM')")
    public SuscripcionDTO activarSuscripcion(@RequestBody SuscripcionDTO suscripcionDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Suscripcion suscripcion = modelMapper.map(suscripcionDTO,Suscripcion.class);
            suscripcion = suscripcionService.activarSuscripcion(suscripcion);
            return modelMapper.map(suscripcion, SuscripcionDTO.class);
        }catch (Exception e){
            throw  new Exception("No se puede activar su suscripcion: " + e.getMessage());
        }
    }

    @DeleteMapping("/cancelarsus/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','FREE','SUSCRIPTOR','PREMIUM')")
    public void cancelarSuscripcion(@PathVariable Integer id) throws Exception {
        try {
            suscripcionService.cancelarSuscripcion(id);
        }catch (Exception e){
            throw  new Exception("No se puede cancelar su suscripcion: " +e.getMessage());
        }
    }
}
