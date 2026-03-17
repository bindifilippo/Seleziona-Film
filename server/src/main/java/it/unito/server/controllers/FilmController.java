package it.unito.server.controllers;

import tools.jackson.databind.ObjectMapper;
import it.unito.server.model.Catalogo;
import it.unito.server.model.Film;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
public class FilmController {

    @GetMapping("/catalogo")
    public Catalogo getCatalogo() throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    ClassPathResource resource = new ClassPathResource("catalogo.json");
    return mapper.readValue(resource.getInputStream(), Catalogo.class);
    }

     @GetMapping("/films")
    public List<Film> getFilms() throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    ClassPathResource resource = new ClassPathResource("catalogo.json");
    Catalogo catalogo = mapper.readValue(resource.getInputStream(), Catalogo.class);
    return catalogo.getFilms();
    }

     @GetMapping("/films/drammatici")
    public List<Film> getFilmDrammatici() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("catalogo.json");
        Catalogo catalogo = mapper.readValue(resource.getInputStream(), Catalogo.class);

        return catalogo.getFilms().stream()
                .filter(film -> film.getGenreIds() != null && film.getGenreIds().contains("Drammatico"))
                .toList();
    }
}