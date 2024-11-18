package com.example.tikraq.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "consultas")
public class Consulta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consultaId")
    private Integer id;

    private String titulo;
    private String descripcion;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "usuarios_usuarioid")
    private Usuario usuariosUsuarioid;
}
