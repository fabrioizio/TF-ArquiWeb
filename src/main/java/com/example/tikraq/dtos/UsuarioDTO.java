package com.example.tikraq.dtos;

import com.example.tikraq.entities.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Integer id;
    private String nombre;
    private String correoElectronico;
    private String contrasenia;
    private Set<Role> roles = new HashSet<>();
    private Set<Consulta> consultas = new LinkedHashSet<>();
    private Set<Calificacion> calificaciones = new LinkedHashSet<>();
    private String idiomaPreferido;
    private Set<Curso> cursos = new HashSet<>();
    private Set<Suscripcion> suscripciones = new LinkedHashSet<>();
    private Set<Traduccion> traducciones = new LinkedHashSet<>();
    private Set<Progreso> progresos = new LinkedHashSet<>();

}
