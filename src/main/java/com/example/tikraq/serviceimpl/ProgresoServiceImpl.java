package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Leccion;
import com.example.tikraq.entities.Pregunta;
import com.example.tikraq.entities.Progreso;
import com.example.tikraq.repositories.LeccionRepositorio;
import com.example.tikraq.repositories.ProgresoRepositorio;
import com.example.tikraq.services.ProgresoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ProgresoServiceImpl implements ProgresoService {
    @Autowired
    @Lazy
    private ProgresoRepositorio progresoRepositorio;
    @Autowired
    @Lazy
    private LeccionRepositorio leccionRepositorio;


    @Override
    public Progreso registrarProgreso(Progreso progreso) {
        return progresoRepositorio.save(progreso);
    }

    @Override
    public Progreso actualizarProgreso(Progreso progreso){
        return progresoRepositorio.save(progreso);
    }

    @Override
    public List<Progreso> listarProgresos() {
        return progresoRepositorio.findAll();
    }

    @Override
    public List<Progreso> listarProgresosPorIdLeccion(Integer leccionId) {
        Leccion leccion = leccionRepositorio.findById(leccionId)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));
        Set<Progreso> progresos = leccion.getProgresos();
        return new ArrayList<>(progresos);
    }
}
