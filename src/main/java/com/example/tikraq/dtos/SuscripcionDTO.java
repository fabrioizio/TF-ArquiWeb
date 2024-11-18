package com.example.tikraq.dtos;

import com.example.tikraq.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SuscripcionDTO {
    private Integer id;
    private String tipo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estado;
    private Usuario usuariosUsuarioid;
}
