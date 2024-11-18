package com.example.tikraq.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "lecciones")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Leccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leccionid")
    private Integer id;

    private String titulo;

    private String contenido;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "cursos_cursoid")
    private Curso cursosCursoid;

    @OneToMany(mappedBy = "leccionesLeccionid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Progreso> progresos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "leccionesLeccionid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Pregunta> preguntas = new LinkedHashSet<>();
}
