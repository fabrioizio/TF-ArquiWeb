package com.example.tikraq.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "lenguas")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Lengua {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lenguaid", nullable = false)
    private Integer id;
    private String nombreLengua;
    @JsonIgnore
    @OneToMany(mappedBy = "lenguasLenguaid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Curso> cursos = new LinkedHashSet<>();

}