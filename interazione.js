import {catalogo} from './film.js';

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


const aggiungiBtn = document.getElementById("aggiungi");

aggiungiBtn.addEventListener("click", function () {
  const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");
  if (cardSelezionate.length > 0) {
    cardSelezionate.forEach(card => {
      const copiaCard = card.cloneNode(true);
      card.classList.remove("is-active");
      copiaCard.classList.remove("is-active"); 
      copiaCard.classList.add("playlist"); 
      playlist.appendChild(copiaCard); 
      copiaCard.addEventListener("click", () => {
        copiaCard.classList.toggle("is-active"); 
      });
    });
  } else {
    alert("SELEZIONA UN FILM");
  }
});

const rimuoviBtn = document.getElementById("rimuovi");

rimuoviBtn.addEventListener("click", function(){
  const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");
  if (cardSelezionate.length > 0) {
    cardSelezionate.forEach(card => {
       card.remove();
    });
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

