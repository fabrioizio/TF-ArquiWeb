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
public class TraduccionDTO {
    private Integer id;
    private String textoOriginal;
    private String textoTraducido;
    private LocalDate fechaTraduccion;
    private String idiomaOriginal;
    private String idiomaTraducir;
    private Usuario usuariosUsuarioid;

}
