package com.example.tikraq.dtos;

public class AuthRequestDTO {
    private String correoElectronico;
    private String contrasenia;
    // getters and setters

    public String getcorreoElectronico() {
        return correoElectronico;
    }

    public void setEmail(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }
}