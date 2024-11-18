package com.example.tikraq.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "traducciones")
public class Traduccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String textoOriginal;
    private String textoTraducido;
    private LocalDate fechaTraduccion;
    private String idiomaOriginal;
    private String idiomaTraducir;
    @ManyToOne
    @JoinColumn(name = "usuarios_usuarioid")
    private Usuario usuariosUsuarioid;

}