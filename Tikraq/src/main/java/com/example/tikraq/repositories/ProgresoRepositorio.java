package com.example.tikraq.repositories;

import com.example.tikraq.entities.Progreso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgresoRepositorio extends JpaRepository<Progreso,Integer> {
}
