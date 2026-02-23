import {catalogo} from './film.js';

//uso contenitori html della pagina
const cardGeneri = document.getElementById("generi");
const cardFilm = document.getElementById("contenitore-blocchi");
const playlist = document.getElementById("playlist");


function renderGeneri() {
  cardGeneri.innerHTML = ""; //pulisce memoria e resetta html
  catalogo.forEach((genere) => {
    const bottone = document.createElement("div");
    bottone.id = genere.nome; 
    bottone.className = "genere";
    bottone.textContent = genere.nome;
    cardGeneri.appendChild(bottone);
  });
}

// creo blocchi film per genere
function renderFilmPerGenere() {
  cardFilm.innerHTML = "";
  catalogo.forEach((index) => {
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
      /*
      // Aggiungo evento click per copiare la card nella playlist
      card.addEventListener("click", function () {
        // Creo una copia del film selezionato
        const copiaCard = card.cloneNode(true);
        // Aggiungo l'attributo genere alla copia
        copiaCard.setAttribute("data-genere", index.nome);
        const genereFilm = document.createElement("p");
        genereFilm.innerHTML = "<strong>Genere:</strong> " + index.nome;
        copiaCard.appendChild(genereFilm);

        // Aggiungo la copia del film nella playlist
        //copiaCard.classList.add("playlist");
        //playlist.appendChild(copiaCard);
      }); */
    });
  });
}

let genereAttivo = "Overview";

function aggiornaUI() {
  const bottoni = cardGeneri.getElementsByClassName("genere");
  for (const btn of bottoni) {    
    if (btn.id === genereAttivo) btn.classList.add("is-active");
    else btn.classList.remove("is-active");
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

