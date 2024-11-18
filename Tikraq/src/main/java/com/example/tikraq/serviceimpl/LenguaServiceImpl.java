package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Lengua;
import com.example.tikraq.repositories.LenguaRepositorio;
import com.example.tikraq.services.LenguaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LenguaServiceImpl implements LenguaService {
    @Autowired
    @Lazy
    private LenguaRepositorio lenguaRepositorio;
    @Override
    public Lengua agregarLengua(Lengua lengua) {
        return lenguaRepositorio.save(lengua);
    }

    @Override
    public Lengua actualizarLengua(Lengua lengua){
        return lenguaRepositorio.save(lengua);
    }

    @Override
    public List<Lengua> listarLenguas() { return lenguaRepositorio.findAll(); }
}
