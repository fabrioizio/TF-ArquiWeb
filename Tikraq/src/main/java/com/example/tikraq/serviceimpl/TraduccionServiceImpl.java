package com.example.tikraq.serviceimpl;

import com.example.tikraq.entities.Traduccion;
import com.example.tikraq.repositories.TraduccionRepositorio;
import com.example.tikraq.services.TraduccionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

@Service
public class TraduccionServiceImpl implements TraduccionService {
    @Autowired
    private TraduccionRepositorio traduccionRepositorio;

    @Autowired
    private RestTemplate restTemplate;

    private final String GOOGLE_TRANSLATE_API_URL = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=%s&tl=%s&dt=t&q=%s";

    @Override
    public Traduccion traducirTexto(Traduccion traduccion) {

        // Formatear la URL con los parámetros correctos
        String url = String.format(GOOGLE_TRANSLATE_API_URL,
                traduccion.getIdiomaOriginal(),
                traduccion.getIdiomaTraducir(),
                traduccion.getTextoOriginal());

        // Hacer la solicitud y obtener la respuesta como un objeto genérico
        Object response = restTemplate.getForObject(url, Object.class);

        // Convertir el objeto a una lista de listas (array de arrays)
        ObjectMapper mapper = new ObjectMapper();
        List<List<List<String>>> responseList = mapper.convertValue(response, List.class);

        // Obtener el texto traducido desde la estructura de la respuesta
        String textoTraducido = responseList.get(0).get(0).get(0);
        traduccion.setTextoTraducido(textoTraducido);

        // Guardar la traducción en la base de datos
        traduccion.setFechaTraduccion(LocalDate.now());
        return traduccionRepositorio.save(traduccion);
    }
}
