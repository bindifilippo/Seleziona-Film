import { Playlist, catalogo } from './film.js';

//uso contenitori html della pagina
const cardGeneri = document.getElementById("generi") as HTMLElement;
const cardFilm = document.getElementById("contenitore-blocchi") as HTMLElement;
const playlist = document.getElementById("playlist") as HTMLElement;

let genereAttivo = "Overview";

function renderGeneri() {
  cardGeneri.innerHTML = ""; //pulisce memoria e resetta html
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

function aggiungiAllaPlaylist(filmData:any, filmCard:any) {  //aggiornamento playlist nel DOM e in memoria
  let genereAppartenenza = "";

  // Trova il genere di appartenenza del film
  catalogo.forEach(genere => {
    if (genere.films.some(f => f.titolo === filmData.titolo)) {
      genereAppartenenza = genere.nome; 
    }
  });

  playlistGenere.aggiungiFilm(filmData, genereAppartenenza); 

  const copiaCard = filmCard.cloneNode(true);
  filmCard.classList.remove("is-active");
  copiaCard.classList.remove("is-active");

  // Aggiungi il genere alla card del film
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

    // Cerco il film nel catalogo
    let filmDaAggiungere = null; //memorizzare il film che verrà aggiunto alla playlist.
    catalogo.forEach(genere => {
      const film = genere.films.find(f => f.titolo === titoloFilm);
      if (film) {
        filmDaAggiungere = film;
      }
    });

      // Verifica se il film è già nella playlist
      const filmGiàAggiunto = playlistGenere.films.some(f => f.film.titolo === titoloFilm);

      if (!filmGiàAggiunto) {
        aggiungiAllaPlaylist(filmDaAggiungere, filmCard);
      } else if (filmGiàAggiunto) {
        filmCard.classList.remove("is-active");
        alert("Il film è già nella playlist!");
      }
    });
     console.log(playlistGenere);
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

