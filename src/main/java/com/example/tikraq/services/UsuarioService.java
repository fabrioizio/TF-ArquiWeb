package com.example.tikraq.services;

import com.example.tikraq.entities.Usuario;

import java.util.List;



public interface UsuarioService {
    public Usuario registrarUsuario(Usuario usuario);
    public Usuario iniciarSesion(String correoElectronico, String contrasenia) throws Exception;
    public Usuario actualizarPerfil(Usuario usuario);
    public List<Usuario> obtenerClientes();

    public void eliminarUsuario(Integer id) throws Exception;
    public Usuario buscarPorCorreoElectronico(String correoElectronico);


}

