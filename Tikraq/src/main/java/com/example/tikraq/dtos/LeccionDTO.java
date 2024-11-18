package com.example.tikraq.dtos;

import com.example.tikraq.entities.Curso;
import com.example.tikraq.entities.Pregunta;
import com.example.tikraq.entities.Progreso;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LeccionDTO {
    private Integer id;
    private String titulo;
    private String contenido;
    private Curso cursosCursoid;
    private Set<Progreso> progresos = new LinkedHashSet<>();
    private Set<Pregunta> preguntas = new LinkedHashSet<>();
}
