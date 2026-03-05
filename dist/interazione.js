// Miglioramenti
// il programma deve riconoscere il film selezionato attraverso una variabile e non html
// fetch su più json e richiamarli quando serve  
async function inizializzaCatalogo() {
    //recupero dati
    const response = await fetch("catalogo.json");
    const data = await response.json();
    const catalogo = data.catalogo;
    //rendering
    renderGeneri(catalogo);
    renderFilmPerGenere(catalogo);
    //restituzione dati
    return catalogo;
}
const cardGeneri = document.getElementById("generi");
const cardFilm = document.getElementById("contenitore-blocchi");
let genereAttivo = "Overview";
function renderGeneri(catalogo) {
    //cardGeneri.innerHTML = "";
    catalogo.forEach((nome) => {
        const bottone = document.createElement("div");
        bottone.id = nome.genere;
        bottone.className = "genere";
        bottone.textContent = nome.genere;
        if (nome.genere === genereAttivo) {
            bottone.classList.add("is-active");
        }
        bottone.addEventListener("click", () => {
            genereAttivo = bottone.id;
            aggiornaUI();
        });
        cardGeneri.appendChild(bottone);
    });
}
//associa una chiave a un valore.
const cardById = new Map();
//elenco in cui non possono esserci duplicati.
const filmSelezionati = new Set();
function renderFilmPerGenere(catalogo) {
    //cardFilm.innerHTML = "";
    catalogo.forEach((nome) => {
        if (nome.genere === "Overview") {
            return;
        }
        const blocco = document.createElement("div");
        blocco.id = nome.genere;
        blocco.className = "blocco-genere";
        cardFilm.appendChild(blocco);
        const titolo = document.createElement("h3");
        titolo.textContent = nome.genere;
        blocco.appendChild(titolo);
        const griglia = document.createElement("div");
        griglia.className = "film";
        blocco.appendChild(griglia);
        nome.films.forEach((filmData) => {
            const card = document.createElement("div");
            const id = filmData.titolo;
            card.className = "scheda-film";
            card.innerHTML =
                "<p><strong>Titolo:</strong> " + filmData.titolo + "</p>" +
                    "<p><strong>Regista:</strong> " + filmData.regista + "</p>" +
                    "<p><strong>Anno:</strong> " + filmData.anno + "</p>";
            cardById.set(id, card);
            griglia.appendChild(card);
            card.addEventListener("click", () => {
                if (filmSelezionati.has(id)) {
                    filmSelezionati.delete(id);
                    card.classList.remove("is-active");
                }
                else {
                    filmSelezionati.add(id);
                    card.classList.add("is-active");
                }
            });
        });
    });
}
function aggiornaUI() {
    const bottoni = cardGeneri.getElementsByClassName("genere");
    for (const btn of bottoni) {
        if (btn.id === genereAttivo) {
            btn.classList.add("is-active");
        }
        else {
            btn.classList.remove("is-active");
        }
    }
    const blocchi = cardFilm.getElementsByClassName("blocco-genere");
    for (const genere of blocchi) {
        const bloccoGenere = genere;
        if (genereAttivo === "Overview" || genere.id === genereAttivo) {
            bloccoGenere.style.display = "block";
        }
        else {
            bloccoGenere.style.display = "none";
        }
    }
}
const glasspane = document.getElementById("glasspane");
const formSection = document.getElementById("form");
const bottone = document.getElementById("attiva-form");
glasspane.style.display = "none";
formSection.style.display = "none";
bottone.style.display = "block";
function mostraForm() {
    glasspane.style.display = "block";
    formSection.style.display = "block";
    bottone.style.display = "none";
}
function nascondiForm() {
    glasspane.style.display = "none";
    formSection.style.display = "none";
    bottone.style.display = "block";
}
bottone.addEventListener("click", (e) => {
    mostraForm();
});
glasspane.addEventListener("click", function (e) {
    if (e.target === glasspane) {
        nascondiForm();
    }
});
const resetBtn = document.getElementById('cancella');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        nascondiForm();
    });
}
const formAggiungiFilm = document.getElementById("aggiungi-film");
if (formAggiungiFilm) {
    formAggiungiFilm.addEventListener("submit", async () => {
        //serializzo i campi del form automaticamente
        const formData = new FormData(formAggiungiFilm);
        //fetch-richiesta http
        //async-funzione che restituisce sempre una promise
        //promise-promessa che un certo dato arriverà. //tre stati: in attesa, completato, errore
        //await-aspetta il risultato della promise
        const response = await fetch(formAggiungiFilm.action, {
            body: formData
        });
        if (response.ok) {
            nascondiForm();
        }
        else {
            alert("Errore nell'invio del film");
        }
    });
}
const rimuoviBtn = document.getElementById("rimuovi");
rimuoviBtn.addEventListener("click", () => {
    for (const id of filmSelezionati) {
        cardById.get(id)?.remove();
        cardById.delete(id);
    }
    filmSelezionati.clear();
});
inizializzaCatalogo();
export {};
//const playlist = document.getElementById("playlist") as HTMLElement;
/*
class Playlist {
  films: Film[] = [];
  aggiungiFilm(film: Film): void {
    if (!this.films.some(f => f.titolo === film.titolo)) {
      this.films.push(film);
    }
  }
  rimuoviFilm(titoloFilm: string): void {
    this.films = this.films.filter(f => f.titolo !== titoloFilm);
  }
}

let playlistGenere = new Playlist();

function aggiungiAllaPlaylist(filmData: Film, filmCard: HTMLElement, catalogo: Genere[]) {
  let genereAppartenenza = "";
  for (const g of catalogo) {
    if (g.films.some(f => f.titolo === filmData.titolo)) {
      genereAppartenenza = g.genere;
      break;
    }
  }
  playlistGenere.aggiungiFilm(filmData);
  const copiaCard = filmCard.cloneNode(true) as HTMLElement;
  copiaCard.classList.remove("is-active");
  filmCard.classList.remove("is-active");

  const genereFilm = document.createElement("p");
  genereFilm.innerHTML = `<strong>Genere:</strong> ${genereAppartenenza}`;
  copiaCard.appendChild(genereFilm);
  copiaCard.addEventListener("click", () => {
    copiaCard.classList.toggle("is-active");
  });
  playlist.appendChild(copiaCard);
}
*/
//const catalogo = await inizializzaCatalogo();
//const aggiungiBtn = document.getElementById("aggiungi") as HTMLElement;  
/*
aggiungiBtn.addEventListener("click", () => {
  const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");
  cardSelezionate.forEach((filmCard) => {
    const titoloFilm: string | null = filmCard.getAttribute("data-id");
    // Inizializzio la variabile risultato
    let filmDaAggiungere: Film | null = null;
    //Scorro tutti i generi del catalogo
    for (const genere of catalogo) {
      //Cerco dentro i film di quel genere
      const film = genere.films.find((f) => f.titolo === titoloFilm);
      //Se lo trovo,  salvo e interrompo il ciclo
      if (film) { filmDaAggiungere = film; break; }
    }
    const giaInPlaylist = playlistGenere.films.some((f) => f.titolo === titoloFilm);
    if (giaInPlaylist) {
      (filmCard as HTMLElement).classList.remove("is-active");
      alert("Il film è già nella playlist!");
      return;
    }
      if (filmDaAggiungere) {
      aggiungiAllaPlaylist(filmDaAggiungere, filmCard as HTMLElement, catalogo);
    }
  });
});*/
//# sourceMappingURL=interazione.js.map