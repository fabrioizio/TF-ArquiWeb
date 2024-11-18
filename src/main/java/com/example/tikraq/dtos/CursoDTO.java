package com.example.tikraq.dtos;

import com.example.tikraq.entities.Leccion;
import com.example.tikraq.entities.Lengua;
import com.example.tikraq.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CursoDTO {
    private Integer id;
    private String nombreCurso;
    private String descripcion;
    private Lengua lenguasLenguaid;
    private Usuario usuariosUsuarioid;
    private Set<Leccion> lecciones = new LinkedHashSet<>();

}
