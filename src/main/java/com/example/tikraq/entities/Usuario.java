package com.example.tikraq.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;


@Getter
@Setter
@Entity
@Table(name = "usuarios")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuarioid")
    private Integer id;

    @Column(name = "nombre")
    private String nombre;

    @NotNull
    @Column(unique = true)
    private String correoElectronico;

    @NotNull
    private String contrasenia;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "usuario_roles",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
    @Column(name = "idioma_preferido")
    private String idiomaPreferido;


    @OneToMany(mappedBy = "usuariosUsuarioid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Suscripcion> suscripciones = new LinkedHashSet<>();


    @OneToMany(mappedBy = "usuariosUsuarioid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Consulta> consultas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "usuariosUsuarioid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Calificacion> calificaciones = new LinkedHashSet<>();

    @OneToMany(mappedBy = "usuariosUsuarioid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Curso> cursos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "usuariosUsuarioid", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Traduccion> traducciones = new LinkedHashSet<>();

    @OneToMany(mappedBy = "usuariosUsuarioid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Progreso> progresos = new LinkedHashSet<>();


}