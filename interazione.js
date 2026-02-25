import { Playlist, catalogo } from './film.js';

//uso contenitori html della pagina
const cardGeneri = document.getElementById("generi");
const cardFilm = document.getElementById("contenitore-blocchi");
const playlist = document.getElementById("playlist");

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
      card.setAttribute("data-id", filmData.titolo); // Aggiungi il titolo come identificatore unico

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


let playlistGenere = new Playlist("Playlist");

function aggiungiAllaPlaylist(film, card) {
  let genereAppartenenza = "";

    catalogo.forEach(genere => {
      if (genere.films.some(f => f.titolo === film.titolo)) {
        genereAppartenenza = genere.nome;
      }
    });

  playlistGenere.aggiungiFilm(film, genereAppartenenza);
  
  const copiaCard = card.cloneNode(true);
  card.classList.remove("is-active");
  copiaCard.classList.remove("is-active");
  copiaCard.classList.add("playlist");

  const genereElemento = document.createElement("p");
  genereElemento.innerHTML = `<strong>Genere:</strong> ${genereAppartenenza}`;
  copiaCard.appendChild(genereElemento);

  playlist.appendChild(copiaCard);
  copiaCard.addEventListener("click", () => {
    copiaCard.classList.toggle("is-active");
  });
}

const aggiungiBtn = document.getElementById("aggiungi");

aggiungiBtn.addEventListener("click", function () {
  const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");

  if (cardSelezionate.length > 0) {
    cardSelezionate.forEach(card => {
      const titoloFilm = card.getAttribute("data-id"); // Estraggo il titolo dal 'data-id'

      // Cerco il film nel catalogo
      let filmDaAggiungere = null;
      catalogo.forEach(genere => {
        genere.films.forEach(film => {
          if (film.titolo === titoloFilm) {
            filmDaAggiungere = film;
          }
        });
      });

      // Verifica se il film è già nella playlist 
      const filmGiàAggiunto = playlistGenere.films.some(f => f.titolo === titoloFilm);
      if (!filmGiàAggiunto && filmDaAggiungere) {
        aggiungiAllaPlaylist(filmDaAggiungere, card);
      } else if (filmGiàAggiunto) {
        alert("Il film è già nella playlist!");
      }
    });
    console.log(playlistGenere);
  } else {
    alert("SELEZIONA UN FILM");
  }
});


const rimuoviBtn = document.getElementById("rimuovi");

rimuoviBtn.addEventListener("click", function(){
  const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");
  if (cardSelezionate.length > 0) {
    cardSelezionate.forEach(card => {
    const titoloFilm = card.getAttribute("data-id"); // Estraggo il titolo dal 'data-id'
      playlistGenere.rimuoviFilm(titoloFilm);
      card.remove();
    });
    console.log(playlistGenere);  // Mostra la playlist aggiornata dopo la rimozione
  } else {
    alert("NESSUN FILM SELEZIONATO");
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
    if (genereAttivo === "Overview" || genere.id === genereAttivo) {
      genere.style.display = "block";
    } else {
      genere.style.display = "none";
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

