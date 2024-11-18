package com.example.tikraq.repositories;

import com.example.tikraq.entities.Lengua;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface    LenguaRepositorio extends JpaRepository<Lengua,Integer> {
}
