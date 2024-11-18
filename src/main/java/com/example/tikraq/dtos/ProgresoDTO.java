package com.example.tikraq.dtos;

import com.example.tikraq.entities.Leccion;
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
public class ProgresoDTO {
    private Integer id;
    private String estado;
    private LocalDate fechaUltimoAcceso;
    private Leccion leccionesLeccionid;
    private Usuario usuariosUsuarioid;
}
