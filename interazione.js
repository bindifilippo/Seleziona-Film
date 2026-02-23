//const listaGeneri = Object.keys(catalogo); //Object.keys non serve

import {catalogo} from './film.js';

//uso contenitori html della pagina
const cardGeneri = document.getElementById("generi");
const cardFilm = document.getElementById("contenitore-blocchi");
const playlist = document.getElementById("playlist");


function renderGeneri() {
  cardGeneri.innerHTML = ""; //pulisce memoria e resetta html
  catalogo.forEach((genere) => {
    const btn = document.createElement("div");
    btn.id = genere.nome; 
    btn.className = "genere";
    btn.textContent = genere.nome;
    cardGeneri.appendChild(btn);
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
    blocco.className = "blocco-genere";
    blocco.id = index.nome;
    const titolo = document.createElement("h3");
    titolo.textContent = index.nome;

    const griglia = document.createElement("div");
    griglia.className = "film";   

    index.films.forEach((filmData) => {
      const card = document.createElement("div");
      card.className = "scheda-film";
      card.innerHTML =
      "<p><strong>Titolo:</strong> " + filmData.titolo + "</p>" +
      "<p><strong>Regista:</strong> " + filmData.regista + "</p>" +
      "<p><strong>Anno:</strong> " + filmData.anno + "</p>" +
      "<div class='card-icon'>+</div>";
      
      // Aggiungo evento click per copiare la card nella playlist
      card.addEventListener("click", function () {
        // Creo una copia del film selezionato
        const copiaCard = card.cloneNode(true);
        // Aggiungo l'attributo genere alla copia
        copiaCard.setAttribute("data-genere", index.nome);
        const genereFilm = document.createElement("p");
        genereFilm.innerHTML = "<strong>Genere:</strong> " + index.nome;
        copiaCard.appendChild(genereFilm);
        
        // Aggiungo l'icona "minus" per rimuovere il film dalla playlist
        const minusIcon = copiaCard.querySelector(".card-icon");
        if (minusIcon) {
          minusIcon.textContent = "-"; 
          minusIcon.classList.add("card-minusIcon");
          // Aggiungo l'evento per rimuovere la card dalla playlist
          minusIcon.addEventListener("click", function (e) {
            e.stopPropagation();  // Evito che l'evento si propaghi al card
            copiaCard.remove();   // Rimuovo la card dalla playlist
          });
        }
        // Aggiungo la copia del film nella playlist
        copiaCard.classList.add("playlist");
        playlist.appendChild(copiaCard);
      });
      griglia.appendChild(card);
    });
    blocco.appendChild(titolo);
    blocco.appendChild(griglia);
    cardFilm.appendChild(blocco);
  });
}

let genereAttivo = "Overview";
//let genereAttivo = catalogo.nome;

function aggiornaUI() {
  const bottoni = cardGeneri.getElementsByClassName("genere");
  for (const btn of bottoni) {    
    if (btn.id === genereAttivo) btn.classList.add("is-active");
    else btn.classList.remove("is-active");
  }

  const blocchi = cardFilm.getElementsByClassName("blocco-genere");
  for (const blocco of blocchi) {
    const genereBlocco = blocco.id
    if (genereAttivo === "Overview" || genereBlocco === genereAttivo) {
      blocco.style.display = "block";
    } else {
      blocco.style.display = "none";
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
aggiornaUI();
leggiEvento();

