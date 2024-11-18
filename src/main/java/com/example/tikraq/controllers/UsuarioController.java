package com.example.tikraq.controllers;

import com.example.tikraq.dtos.UsuarioDTO;
import com.example.tikraq.entities.Role;
import com.example.tikraq.entities.Usuario;
import com.example.tikraq.services.RoleService;
import com.example.tikraq.services.SuscripcionService;
import com.example.tikraq.services.UsuarioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UsuarioController {
    @Autowired
    @Lazy
    private UsuarioService usuarioService;

    @Autowired
    private RoleService roleService;


    @PostMapping("/registrarUsuario")
    public UsuarioDTO registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Usuario usuario = modelMapper.map(usuarioDTO, Usuario.class);
            usuario = usuarioService.registrarUsuario(usuario);
            return modelMapper.map(usuario, UsuarioDTO.class);
        } catch (Exception e) {
            throw new Exception("No se puede registrar usuario: " + e.getMessage());
        }
    }

    @GetMapping("/obtenerusuarios")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<UsuarioDTO> obtenerUsuarios() throws Exception{
        try {
            ModelMapper modelMapper = new ModelMapper();
            List<Usuario> usuarios = usuarioService.obtenerClientes();
            return Arrays.asList(modelMapper.map(usuarios, UsuarioDTO[].class));
        }catch (Exception e){
            throw  new Exception("No se pudo listar los usuarios:" +e.getMessage()) ;
        }
    }
    @GetMapping("/login/{correoElectronico}/{contrasenia}")
    public UsuarioDTO iniciarSesion(@PathVariable String correoElectronico, @PathVariable String contrasenia) throws Exception {
        try {
            // Buscar al usuario por correo electrónico
            Usuario usuario = usuarioService.buscarPorCorreoElectronico(correoElectronico);

            if (usuario == null) {
                throw new Exception("Usuario no encontrado");
            }


            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (!passwordEncoder.matches(contrasenia, usuario.getContrasenia())) {
                throw new Exception("Usuario o contraseña incorrectos");
            }

            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(usuario, UsuarioDTO.class);
        } catch (Exception e) {
            throw new Exception("No se pudo iniciar sesión: " + e.getMessage());
        }
    }



    @PutMapping("/actualizarUsuario")
    @PreAuthorize("hasAnyAuthority('ADMIN','FREE','SUSCRIPTOR','PREMIUM')")
    public UsuarioDTO actualizarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Usuario usuario = modelMapper.map(usuarioDTO, Usuario.class);
            usuario = usuarioService.actualizarPerfil(usuario);
            return modelMapper.map(usuario, UsuarioDTO.class);
        } catch (Exception e) {
            throw new Exception("No se puede actualizar el perfil del usuario: " + e.getMessage());
        }
    }


    @DeleteMapping("/eliminarUsuario/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','FREE','SUSCRIPTOR','PREMIUM')")
    public void eliminarUsuario(@PathVariable Integer id) throws Exception {
        try {
            usuarioService.eliminarUsuario(id);
        }catch (Exception e){
            throw  new Exception("No se puede eliminar su cuenta" +e.getMessage());
        }
    }

}
