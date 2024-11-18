package com.example.tikraq.repositories;

import com.example.tikraq.entities.Suscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuscripcionRepositorio extends JpaRepository<Suscripcion,Integer> {
}
