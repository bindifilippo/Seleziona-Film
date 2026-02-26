declare class Film {
    titolo: string;
    regista: string;
    anno: string;
    constructor(titolo: string, regista: string, anno: string);
}
declare class Genere {
    nome: string;
    films: Film[];
    constructor(nome: string);
    aggiungiFilm(nuovoFilm: Film): void;
    togliFilm(eliminaFilm: string): void;
}
declare class Playlist {
    films: {
        film: Film;
    }[];
    constructor();
    aggiungiFilm(film: Film): void;
    rimuoviFilm(titoloFilm: string): void;
}
declare let catalogo: Genere[];
export { Playlist, catalogo };
//# sourceMappingURL=film.d.ts.map