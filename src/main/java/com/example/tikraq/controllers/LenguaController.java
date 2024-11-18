package com.example.tikraq.controllers;

import com.example.tikraq.dtos.LenguaDTO;
import com.example.tikraq.entities.Lengua;
import com.example.tikraq.services.LenguaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200",exposedHeaders = "Authorization")
@RestController
@RequestMapping("/api")
public class LenguaController {
    @Autowired
    @Lazy
    private LenguaService lenguaService;

    @PostMapping("/agregarlengua")
    @PreAuthorize("hasAuthority('ADMIN')")
    public LenguaDTO agregarLengua(@RequestBody LenguaDTO lenguaDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Lengua lengua = modelMapper.map(lenguaDTO, Lengua.class);
            lengua = lenguaService.agregarLengua(lengua);
            return modelMapper.map(lengua, LenguaDTO.class);
        } catch (Exception e) {
            throw new Exception("No se puede registrar: " + e.getMessage());
        }
    }

    @PutMapping("/actualizarlengua")
    @PreAuthorize("hasAuthority('ADMIN')")
    public LenguaDTO actualizarLengua(@RequestBody LenguaDTO lenguaDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Lengua lengua = modelMapper.map(lenguaDTO, Lengua.class);
        lengua = lenguaService.actualizarLengua(lengua);
        return modelMapper.map(lengua,LenguaDTO.class);
    }

    @GetMapping("/listarlenguas")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<LenguaDTO> listarLenguas() throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Lengua> lenguas = lenguaService.listarLenguas();
            return Arrays.asList(modelMapper.map(lenguas, LenguaDTO[].class));
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("No se puede listar: " + e.getMessage());
        }
    }
}
