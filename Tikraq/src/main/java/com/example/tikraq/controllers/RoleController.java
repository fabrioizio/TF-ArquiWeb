package com.example.tikraq.controllers;

import com.example.tikraq.dtos.RoleDTO;
import com.example.tikraq.entities.Role;
import com.example.tikraq.services.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200",exposedHeaders = "Authorization")
@RestController
@RequestMapping("/api")
public class RoleController {

    @Autowired
    @Lazy
    private RoleService roleService;

    @PostMapping("/registrarRol/{usuarioId}/{roleId}")
    public RoleDTO registrarRolPorUsuarioId(@PathVariable Integer usuarioId, @PathVariable Integer roleId) throws Exception {
        try {
            Role nuevoRol = roleService.registrarRolPorUsuarioId(usuarioId, roleId);
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(nuevoRol, RoleDTO.class);
        } catch (Exception e) {
            throw new Exception("No se puede registrar el rol: " + e.getMessage());
        }
    }

    @PutMapping("/actualizarRol/{usuarioId}/{roleId}")

    public RoleDTO actualizarRol(@PathVariable Integer usuarioId, @PathVariable Integer roleId) throws Exception {
        try {
            Role roleActualizado = roleService.actualizarRolPorUsuarioId(usuarioId, roleId);
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(roleActualizado, RoleDTO.class);
        } catch (Exception e) {
            throw new Exception("No se puede actualizar el rol: " + e.getMessage());
        }
    }

    @GetMapping("/roles/{usuarioId}")
    public RoleDTO obtenerUltimoRolPorUsuarioId(@PathVariable Integer usuarioId) throws Exception {
        try {
            ModelMapper modelMapper = new ModelMapper();
            Role role = roleService.obtenerUltimoRolPorUsuarioId(usuarioId);
            return modelMapper.map(role, RoleDTO.class);
        } catch (Exception e) {
            throw new Exception("No se puede obtner el ultimo el rol por id de usuario: " + e.getMessage());
        }
    }
}
