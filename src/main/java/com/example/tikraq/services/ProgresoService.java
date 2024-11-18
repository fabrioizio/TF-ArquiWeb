package com.example.tikraq.services;

import com.example.tikraq.entities.Pregunta;
import com.example.tikraq.entities.Progreso;

import java.util.List;

public interface ProgresoService {
    public Progreso registrarProgreso (Progreso progreso);
    public Progreso actualizarProgreso(Progreso progreso);
    public List<Progreso> listarProgresos();
    public List<Progreso> listarProgresosPorIdLeccion(Integer leccionId);

}
