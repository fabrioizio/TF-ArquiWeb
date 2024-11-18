package com.example.tikraq.controllers;

import com.example.tikraq.dtos.ConsultaDTO;
import com.example.tikraq.entities.Consulta;
import com.example.tikraq.repositories.UsuarioRepositorio;
import com.example.tikraq.services.ConsultaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ConsultaController {
    @Autowired
    @Lazy
    private ConsultaService consultaService;
    @CrossOrigin(exposedHeaders = "Authorization")
    @PostMapping("/agregarConsulta")
    @PreAuthorize("hasAnyAuthority('ADMIN','FREE','SUSCRIPTOR','PREMIUM')")
    public ConsultaDTO createConsulta(@RequestBody ConsultaDTO consultaDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Consulta consulta = modelMapper.map(consultaDTO, Consulta.class);
            consulta = consultaService.createConsulta(consulta);
            return modelMapper.map(consulta, ConsultaDTO.class);
        }catch (Exception e){
            throw  new Exception("No se puede agregar consulta"+ e.getMessage());
        }
    }
}
