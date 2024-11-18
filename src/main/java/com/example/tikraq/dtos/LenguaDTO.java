package com.example.tikraq.dtos;

import com.example.tikraq.entities.Curso;
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
public class LenguaDTO {
    private Integer id;
    private String nombreLengua;
    private Set<Curso> cursos = new LinkedHashSet<>();
}
