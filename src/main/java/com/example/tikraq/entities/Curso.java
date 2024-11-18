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
@Table(name = "cursos")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cursoid", nullable = false)
    private Integer id;

    private String nombreCurso;

    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lenguas_lenguaid")
    private Lengua lenguasLenguaid;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "usuarios_usuarioid")
    private Usuario usuariosUsuarioid;

    @OneToMany(mappedBy = "cursosCursoid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Leccion> lecciones = new LinkedHashSet<>();

}