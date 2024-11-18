package com.example.tikraq.repositories;

import com.example.tikraq.entities.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreguntaRepositorio extends JpaRepository<Pregunta, Integer> {
}
