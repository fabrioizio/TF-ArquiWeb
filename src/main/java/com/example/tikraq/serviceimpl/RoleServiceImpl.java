package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Role;
import com.example.tikraq.entities.Usuario;
import com.example.tikraq.repositories.RoleRepository;
import com.example.tikraq.repositories.UsuarioRepositorio;
import com.example.tikraq.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Override
    @Transactional
    public Role registrarRolPorUsuarioId(Integer usuarioId, Integer roleId) {
        Usuario usuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));

        usuario.getRoles().add(role);
        usuarioRepositorio.save(usuario);
        return role;
    }

    @Override
    @Transactional
    public Role actualizarRolPorUsuarioId(Integer usuarioId, Integer roleId) {
        Usuario usuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        usuario.getRoles().clear(); // Limpiar roles actuales

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));

        usuario.getRoles().add(role);
        usuarioRepositorio.save(usuario);
        return role;
    }

    @Override
    public Role obtenerUltimoRolPorUsuarioId(Integer usuarioId) {
        Usuario usuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        Set<Role> roles = usuario.getRoles();
        return roles.stream().reduce((first, second) -> second).orElse(null);
    }




}


