package com.example.tikraq.dtos;

import com.example.tikraq.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaDTO {
    private Integer id;
    private String titulo;
    private String descripcion;
    private Usuario usuariosUsuarioid;
}
