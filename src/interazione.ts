
const formAggiungiFilm = document.getElementById("aggiungi-film") as HTMLFormElement;
if (formAggiungiFilm) {
  formAggiungiFilm.addEventListener("submit", async (e) => {
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
      } else {
        alert("Errore nell'invio del film");
      }
  });
}

const cardGeneri = document.getElementById("generi") as HTMLElement;
const cardFilm = document.getElementById("contenitore-blocchi") as HTMLElement;
const playlist = document.getElementById("playlist") as HTMLElement;

interface Film {
  titolo: string;
  regista: string;
  anno: string;
}

interface Genere {
  genere: string;
  films: Film[];
}

async function inizializzaCatalogo(): Promise<Genere[]> {
  const response = await fetch("catalogo.json");
  const data: { catalogo: Genere[] } = await response.json();

  const catalogo = data.catalogo;

  renderGeneri(catalogo);
  renderFilmPerGenere(catalogo);

  return catalogo;
}

let genereAttivo: string = "Overview";

function renderGeneri(catalogo: Genere[]) {
  cardGeneri.innerHTML = "";
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

function renderFilmPerGenere(catalogo: Genere[]) {
  cardFilm.innerHTML = "";
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
      card.className = "scheda-film";
      card.setAttribute("data-id", filmData.titolo);

      card.innerHTML =
        "<p><strong>Titolo:</strong> " + filmData.titolo + "</p>" +
        "<p><strong>Regista:</strong> " + filmData.regista + "</p>" +
        "<p><strong>Anno:</strong> " + filmData.anno + "</p>";

      griglia.appendChild(card);

      card.addEventListener("click", function () {
        card.classList.toggle("is-active");
      });
    });
  });
}


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

  playlist.appendChild(copiaCard);

  copiaCard.addEventListener("click", () => {
    copiaCard.classList.toggle("is-active");
  });
}


async function main() {
  const catalogo = await inizializzaCatalogo();
  const aggiungiBtn = document.getElementById("aggiungi") as HTMLElement;
  const rimuoviBtn = document.getElementById("rimuovi") as HTMLElement;
  
  aggiungiBtn.addEventListener("click", () => {
    const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");

    cardSelezionate.forEach((filmCard) => {
      const titoloFilm = filmCard.getAttribute("data-id");
      if (!titoloFilm) return;

      // Cerca il film nel catalogo
      let filmDaAggiungere: Film | null = null;
      for (const genere of catalogo) {
        const film = genere.films.find((f) => f.titolo === titoloFilm);
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
  });

  rimuoviBtn.addEventListener("click", () => {
    const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");
    cardSelezionate.forEach((filmCard) => {
      const titoloFilm = filmCard.getAttribute("data-id");
      if (!titoloFilm) return;

      playlistGenere.rimuoviFilm(titoloFilm);
      filmCard.remove();
    });
  });
}

const glasspane = document.getElementById("glasspane") as HTMLDivElement;
const formSection = document.getElementById("form") as HTMLElement;
const bottone = document.getElementById("attiva-form") as HTMLElement;

glasspane.style.display = "none";
formSection.style.display = "none";
bottone.style.display= "block";

function mostraForm(): void {
  glasspane.style.display = "block";
  formSection.style.display = "block";
  bottone.style.display= "none";
}

function nascondiForm(): void {
  glasspane.style.display = "none";
  formSection.style.display = "none";
  bottone.style.display= "block";
}

bottone?.addEventListener("click", (e) => {
  e.preventDefault();
  mostraForm();
});

glasspane.addEventListener("click", (e) => {
  if (e.target === glasspane) nascondiForm();
});



function aggiornaUI() {
  const bottoni = cardGeneri.getElementsByClassName("genere");
  for (const btn of bottoni) {
    if ((btn as HTMLElement).id === genereAttivo) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  }
  const blocchi = cardFilm.getElementsByClassName("blocco-genere");
  for (const genere of blocchi) {
    const bloccoGenere = genere as HTMLElement;
    if (genereAttivo === "Overview" || genere.id === genereAttivo) {
      bloccoGenere.style.display = "block";
    } else {
      bloccoGenere.style.display = "none";
    }
  }
}


inizializzaCatalogo();
main();
