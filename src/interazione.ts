import {Film,  Playlist, catalogo } from './film.js';

const cardGeneri = document.getElementById("generi") as HTMLElement;
const cardFilm = document.getElementById("contenitore-blocchi") as HTMLElement;
const playlist = document.getElementById("playlist") as HTMLElement;


let genereAttivo: String = "Overview";

function renderGeneri() {
  cardGeneri.innerHTML = ""; 
  catalogo.forEach((genere) => {
    const bottone = document.createElement("div");
    bottone.id = genere.nome; 
    bottone.className = "genere";
    bottone.textContent = genere.nome;

    if (genere.nome === genereAttivo) {
      bottone.classList.add("is-active");
    }
    bottone.addEventListener("click", () => {
      aggiornaUI(); 
    });

    cardGeneri.appendChild(bottone);
  });
}

function renderFilmPerGenere() {
  cardFilm.innerHTML = "";
  catalogo.forEach((index) => {
    //condizione per non ritornare niente
    if(index.nome === "Overview"){
      return;
    }
    const blocco = document.createElement("div");
    blocco.id = index.nome;
    blocco.className = "blocco-genere";
    cardFilm.appendChild(blocco); 

    const titolo = document.createElement("h3");
    titolo.textContent = index.nome;
    blocco.appendChild(titolo);

    const griglia = document.createElement("div");
    griglia.className = "film";
    blocco.appendChild(griglia);

    index.films.forEach((filmData) => {
      const card = document.createElement("div");
      card.className = "scheda-film";
      card.setAttribute("data-id", filmData.titolo); 

      card.innerHTML =
      "<p><strong>Titolo:</strong> " + filmData.titolo + "</p>" +
      "<p><strong>Regista:</strong> " + filmData.regista + "</p>" +
      "<p><strong>Anno:</strong> " + filmData.anno + "</p>";

      griglia.appendChild(card);

      card.addEventListener("click", function() {
        card.classList.toggle("is-active");
      });
    });
  });
}

let playlistGenere = new Playlist();

function aggiungiAllaPlaylist(filmData:Film, filmCard:HTMLElement) {  //aggiornamento playlist nel DOM e in memoria
  let genereAppartenenza = "";

  catalogo.forEach(genere => {
    if (genere.films.some(f => f.titolo === filmData.titolo)) {
      genereAppartenenza = genere.nome; 
    }
  });

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


const aggiungiBtn = document.getElementById("aggiungi") as HTMLElement;

aggiungiBtn.addEventListener("click", function () {
  const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");

  if (cardSelezionate.length > 0) {
    cardSelezionate.forEach(filmCard => {
      const titoloFilm = filmCard.getAttribute("data-id"); // Estraggo il titolo dal 'data-id'

      const filmCardElement = filmCard as HTMLElement;
      let filmDaAggiungere: Film | null = null; // Tipo Film | null per l'inizializzazione

      catalogo.forEach(genere => {
        const film = genere.films.find(f => f.titolo === titoloFilm);
        if (film) {
          filmDaAggiungere = film;
        }
      });

      // Verifica se il film è già nella playlist
      const filmGiàAggiunto = playlistGenere.films.some(f => f.titolo === titoloFilm);

      if (!filmGiàAggiunto) {
        if (filmDaAggiungere !== null) {
          aggiungiAllaPlaylist(filmDaAggiungere, filmCardElement);
        }
      } else {
        filmCardElement.classList.remove("is-active");
        alert("Il film è già nella playlist!");
      }
    });
  }
});


const rimuoviBtn = document.getElementById("rimuovi") as HTMLElement;

rimuoviBtn.addEventListener("click", function(){
  const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");
  if (cardSelezionate.length > 0) {
    cardSelezionate.forEach(filmCard => {
    const titoloFilm = filmCard.getAttribute("data-id"); 
      playlistGenere.rimuoviFilm(titoloFilm!);
      filmCard.remove();
    });
  }
});

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
    if (btn.id === genereAttivo){
      btn.classList.add("is-active");
    } 
    else {
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


function leggiEvento() {  
  const bottoni = cardGeneri.getElementsByClassName("genere");
  for (const btn of bottoni) { 
    btn.addEventListener("click", () => {
      genereAttivo = btn.id 
      aggiornaUI();
    });
  }
}


renderGeneri();
renderFilmPerGenere();
leggiEvento();

