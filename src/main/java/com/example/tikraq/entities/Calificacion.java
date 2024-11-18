package com.example.tikraq.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "calificaciones")
public class Calificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calificacionId", nullable = false)
    private Integer id;

    private Integer rating;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "usuarios_usuarioid")
    private Usuario usuariosUsuarioid;
}
