package com.example.tikraq.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "progreso")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Progreso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progresoid", nullable = false)
    private Integer id;

    private String estado;

    private LocalDate fechaUltimoAcceso;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "lecciones_leccionid")
    private Leccion leccionesLeccionid;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "usuarios_usuarioid")
    private Usuario usuariosUsuarioid;

}