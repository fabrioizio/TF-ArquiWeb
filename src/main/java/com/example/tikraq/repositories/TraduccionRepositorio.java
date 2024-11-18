package com.example.tikraq.repositories;

import com.example.tikraq.entities.Traduccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TraduccionRepositorio extends JpaRepository<Traduccion,Integer> {

}
