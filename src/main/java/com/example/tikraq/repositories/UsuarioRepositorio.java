package com.example.tikraq.repositories;

import com.example.tikraq.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario,Integer> {
    public Usuario findById(Usuario id);
    Optional<Usuario> findByCorreoElectronico(String email);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO user_roles (user_id, role_id ) VALUES (:user_id, :rol_id)", nativeQuery = true)
    public Integer insertarUsuarioRol(@Param("user_id") Integer user_id, @Param("rol_id") Integer rol_id);



}
