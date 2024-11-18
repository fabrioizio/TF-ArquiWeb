package com.example.tikraq.controllers;

import com.example.tikraq.dtos.PreguntaDTO;
import com.example.tikraq.dtos.ProgresoDTO;
import com.example.tikraq.entities.Pregunta;
import com.example.tikraq.entities.Progreso;
import com.example.tikraq.services.ProgresoService;
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
public class ProgresoController {
    @Autowired
    @Lazy
    private ProgresoService progresoService;

    @PostMapping("/registrarprogreso")
    @PreAuthorize("hasAnyAuthority('ADMIN','PREMIUM')")
    public ProgresoDTO registrarProgreso(@RequestBody ProgresoDTO progresoDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Progreso progreso = modelMapper.map(progresoDTO,Progreso.class);
            progreso = progresoService.registrarProgreso(progreso);
            return modelMapper.map(progreso, ProgresoDTO.class);
        }catch (Exception e){
            throw  new Exception("No se puede registrar el progreso: "+e.getMessage());
        }
    }

    @PutMapping("/actualizarprogreso")
    @PreAuthorize("hasAnyAuthority('ADMIN','PREMIUM')")
    public ProgresoDTO actualizarProgreso(@RequestBody ProgresoDTO progresoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Progreso progreso = modelMapper.map(progresoDTO, Progreso.class);
        progreso = progresoService.actualizarProgreso(progreso);
        return modelMapper.map(progreso,ProgresoDTO.class);
    }

    @GetMapping("/listarProgresos")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<ProgresoDTO> listarProgresos() throws Exception{
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Progreso> progresos = progresoService.listarProgresos();
            return Arrays.asList(modelMapper.map(progresos, ProgresoDTO[].class));
        }catch (Exception e){
            throw  new Exception("No se pudo listar los progresos: "+ e.getMessage());
        }
    }

    @GetMapping("/listarProgresos/{leccionId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','PREMIUM')")
    public List<ProgresoDTO> listarPreguntasPorIdLeccion(@PathVariable Integer leccionId) throws Exception{
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Progreso> progresos = progresoService.listarProgresosPorIdLeccion(leccionId);
            return Arrays.asList(modelMapper.map(progresos, ProgresoDTO[].class));
        } catch (Exception e) {
            throw new Exception("No se puede listar progresos por Id de leccion: " + e.getMessage());
        }
    }
}
