//TO DO
//impostare OOP-done

//menu a sx
    //visualizzazione dati a dx
         //bottone aggiungi - rimuovi

//migrare codice a typescript

//form modale


class Film {
    constructor(titolo, regista, anno){
        this.titolo = titolo;
        this.regista = regista;
        this.anno = anno;
    }
}

class Genere {
    constructor(nome) {
        this.nome = nome;
        this.films = [];
    }
    aggiungiFilm(nuovoFilm) {
        if (!this.films.some(f => f.titolo === nuovoFilm.titolo)) {
            this.films.push(nuovoFilm);
        }
    }
    togliFilm(eliminaFilm) {
        this.films = this.films.filter(f => eliminaFilm !== f.titolo);
    }
}


class Playlist {
    constructor() {
        this.films = []; 
    }
    aggiungiFilm(film, genere) {
        if (!this.films.some(f => f.titolo === film.titolo)) {
            this.films.push({ film, genere }); 
        }
    }
    rimuoviFilm(titoloFilm) {
        this.films = this.films.filter(f => f.titolo !== titoloFilm); 
    }
}

let drammatico = new Genere("Drammatico");
drammatico.aggiungiFilm(new Film("Petroliere", "Paul Thomas Anderson", "2007"));
drammatico.aggiungiFilm(new Film("La La Land", "Damien Chazelle", "2016"));
drammatico.aggiungiFilm(new Film("Forrest Gump", "Robert Zemeckis", "1994"));
drammatico.aggiungiFilm(new Film("The Shawshank Redemption", "Frank Darabont", "1994"));

let azione = new Genere("Azione");
azione.aggiungiFilm(new Film ("Die Hard - Duri a morire", "John McTiernan", "1988"));
azione.aggiungiFilm(new Film ("Mad Max: Fury Road", "George Miller", "2015"));
azione.aggiungiFilm(new Film ("John Wick", "Chad Stahelski", "2014"));

let commedia = new Genere("Commedia");
commedia.aggiungiFilm(new Film("Un'impresa da Dio", "Tom Shadyac", "2003"));
commedia.aggiungiFilm(new Film("Superbad", "Greg Mottola", "2007"));
commedia.aggiungiFilm(new Film("Una notte da leoni", "Todd Phillips", "2009"));;

const overview = new Genere("Overview")

let catalogo = [];
catalogo.push(overview);
catalogo.push(drammatico);
catalogo.push(azione);
catalogo.push(commedia);

console.log(catalogo);

export {Playlist, catalogo };
