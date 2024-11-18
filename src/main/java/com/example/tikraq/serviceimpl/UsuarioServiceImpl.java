package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Role;
import com.example.tikraq.entities.Usuario;
import com.example.tikraq.repositories.RoleRepository;
import com.example.tikraq.repositories.UsuarioRepositorio;
import com.example.tikraq.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    @Lazy
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    @Lazy
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inyectar el BCryptPasswordEncoder

    @Override
    public Usuario registrarUsuario(Usuario usuario) {
        usuario.setContrasenia(passwordEncoder.encode(usuario.getContrasenia()));

        Role roleFree = roleRepository.findById(2)
                .orElseThrow(() -> new RuntimeException("Rol 'Free' no encontrado"));

        usuario.getRoles().add(roleFree);

        return usuarioRepositorio.save(usuario);
    }
    @Override
    public Usuario iniciarSesion(String email, String contrasenia) throws Exception {
        Usuario usuario = usuarioRepositorio.findByCorreoElectronico(email)
                .orElseThrow(() -> new Exception("Usuario no encontrado"));


        if (!passwordEncoder.matches(contrasenia, usuario.getContrasenia())) {
            throw new Exception("Contraseña incorrecta");
        }

        return usuario; // Retorna el usuario si las credenciales son correctas
    }

    @Override
    public Usuario actualizarPerfil(Usuario usuario) {
        Usuario usuarioExistente = usuarioRepositorio.findById(usuario.getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualiza los campos básicos
        if (usuario.getNombre() != null) {
            usuarioExistente.setNombre(usuario.getNombre());
        }
        if (usuario.getCorreoElectronico() != null && !usuario.getCorreoElectronico().equals(usuarioExistente.getCorreoElectronico())) {
            usuarioExistente.setCorreoElectronico(usuario.getCorreoElectronico());
        }
        if (usuario.getIdiomaPreferido() != null) {
            usuarioExistente.setIdiomaPreferido(usuario.getIdiomaPreferido());
        }

        // Verifica si la contraseña es nueva y la encripta
        if (usuario.getContrasenia() != null && !passwordEncoder.matches(usuario.getContrasenia(), usuarioExistente.getContrasenia())) {
            usuarioExistente.setContrasenia(passwordEncoder.encode(usuario.getContrasenia()));
        }

        // Conserva las asociaciones existentes y evita que se sobrescriban
        if (usuario.getRoles() == null || usuario.getRoles().isEmpty()) {
            usuario.setRoles(usuarioExistente.getRoles());
        }
        if (usuario.getSuscripciones() == null || usuario.getSuscripciones().isEmpty()) {
            usuario.setSuscripciones(usuarioExistente.getSuscripciones());
        }
        if (usuario.getConsultas() == null || usuario.getConsultas().isEmpty()) {
            usuario.setConsultas(usuarioExistente.getConsultas());
        }
        if (usuario.getCalificaciones() == null || usuario.getCalificaciones().isEmpty()) {
            usuario.setCalificaciones(usuarioExistente.getCalificaciones());
        }
        if (usuario.getCursos() == null || usuario.getCursos().isEmpty()) {
            usuario.setCursos(usuarioExistente.getCursos());
        }

        // Actualiza y guarda el usuario
        return usuarioRepositorio.save(usuarioExistente);
    }


    @Override
    public List<Usuario> obtenerClientes() {
        return usuarioRepositorio.findAll();
    }

    @Override
    @Transactional
    public void eliminarUsuario(Integer id) throws Exception {
        Usuario usuario = usuarioRepositorio.findById(id)
                .orElseThrow(() -> new Exception("Usuario no encontrado"));

        // Limpiar asociaciones ManyToMany (usuario_roles)
        usuario.getRoles().clear();

        // Limpiar asociaciones OneToMany manualmente (si no están en cascada)
        usuario.getConsultas().clear();
        usuario.getCalificaciones().clear();
        usuario.getCursos().clear();
        usuario.getTraducciones().clear();
        usuario.getProgresos().clear();

        // Eliminar el usuario (las suscripciones se eliminarán en cascada)
        usuarioRepositorio.delete(usuario);
    }

    @Override
    public Usuario buscarPorCorreoElectronico(String correoElectronico) {
        return usuarioRepositorio.findByCorreoElectronico(correoElectronico).orElse(null);
    }

}
