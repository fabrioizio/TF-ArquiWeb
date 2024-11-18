package com.example.tikraq.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "preguntas")
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preguntaid")
    private Integer id;
    private String texto;

    @ElementCollection
    @CollectionTable(name = "opciones", joinColumns = @JoinColumn(name = "pregunta_id"))
    @Column(name = "opcion")
    private List<String> opciones;

    @Column(name = "indice_respuesta_correcta", nullable = false)
    private Integer indiceRespuestaCorrecta;
    @ManyToOne
    @JoinColumn(name = "lecciones_leccionid")
    @JsonIgnore
    private Leccion leccionesLeccionid;

}
