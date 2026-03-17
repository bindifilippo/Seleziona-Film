package it.unito.server.controllers;

import tools.jackson.databind.ObjectMapper;
import it.unito.server.model.Catalogo;
import it.unito.server.model.Film;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class FilmController {

    @GetMapping("/films")
    public List<Film> getFilms() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("catalogo.json");
        Catalogo catalogo = mapper.readValue(resource.getInputStream(), Catalogo.class);
        return catalogo.getFilms();
    }
}