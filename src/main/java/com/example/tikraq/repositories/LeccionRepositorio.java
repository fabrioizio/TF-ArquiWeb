package com.example.tikraq.repositories;

import com.example.tikraq.entities.Curso;
import com.example.tikraq.entities.Leccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeccionRepositorio extends JpaRepository<Leccion,Integer> {
    public Leccion findById(Leccion id);
}
