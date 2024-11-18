package com.example.tikraq.services;

import com.example.tikraq.entities.Role;

public interface RoleService {
    public Role registrarRolPorUsuarioId(Integer usuarioId, Integer roleId);
    public Role actualizarRolPorUsuarioId(Integer usuarioId, Integer roleId);
    public Role obtenerUltimoRolPorUsuarioId(Integer usuarioId);
}
