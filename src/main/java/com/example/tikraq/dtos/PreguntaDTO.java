package com.example.tikraq.dtos;

import com.example.tikraq.entities.Leccion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PreguntaDTO {
    private Integer id;
    private String texto;
    private List<String> opciones;
    private Integer indiceRespuestaCorrecta;
    private Leccion leccionesLeccionid;
}
