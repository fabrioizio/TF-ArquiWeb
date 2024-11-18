package com.example.tikraq.repositories;

import com.example.tikraq.entities.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepositorio  extends JpaRepository<Curso,Integer> {
    public Curso findById(Curso id);
}
