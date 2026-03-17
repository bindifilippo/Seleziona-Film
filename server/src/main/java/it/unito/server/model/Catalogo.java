package it.unito.server.model;

import java.util.List;

public class Catalogo {
    private List<Genere> generi;
    private List<Film> films;

    public Catalogo() {
    }

    public List<Genere> getGeneri() {
        return generi;
    }

    public void setGeneri(List<Genere> generi) {
        this.generi = generi;
    }

    public List<Film> getFilms() {
        return films;
    }

    public void setFilms(List<Film> films) {
        this.films = films;
    }
}
