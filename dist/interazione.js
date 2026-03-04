const formAggiungiFilm = document.getElementById("aggiungi-film");
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
        }
        else {
            alert("Errore nell'invio del film");
        }
    });
}
const cardGeneri = document.getElementById("generi");
const cardFilm = document.getElementById("contenitore-blocchi");
const playlist = document.getElementById("playlist");
let catalogo = [];
async function inizializzaCatalogo() {
    let response = await fetch('catalogo.json');
    let data = await response.json();
    catalogo = data.catalogo;
    renderGeneri(catalogo);
    renderFilmPerGenere(catalogo);
    return catalogo;
}
let genereAttivo = "Overview";
function renderGeneri(catalogo) {
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
function renderFilmPerGenere(catalogo) {
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
    films = [];
    aggiungiFilm(film) {
        if (!this.films.some(f => f.titolo === film.titolo)) {
            this.films.push(film);
        }
    }
    rimuoviFilm(titoloFilm) {
        this.films = this.films.filter(f => f.titolo !== titoloFilm);
    }
}
let playlistGenere = new Playlist();
function aggiungiAllaPlaylist(filmData, filmCard, catalogo) {
    let genereAppartenenza = "";
    for (const g of catalogo) {
        if (g.films.some(f => f.titolo === filmData.titolo)) {
            genereAppartenenza = g.genere;
            break;
        }
    }
    playlistGenere.aggiungiFilm(filmData);
    const copiaCard = filmCard.cloneNode(true);
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
const aggiungiBtn = document.getElementById("aggiungi");
aggiungiBtn.addEventListener("click", function () {
    const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");
    if (cardSelezionate.length > 0) {
        cardSelezionate.forEach(filmCard => {
            const titoloFilm = filmCard.getAttribute("data-id");
            const filmCardElement = filmCard;
            let filmDaAggiungere = null;
            catalogo.forEach(genere => {
                const film = genere.films.find(f => f.titolo === titoloFilm);
                if (film) {
                    filmDaAggiungere = film;
                }
            });
            const filmGiaAggiunto = playlistGenere.films.some(f => f.titolo === titoloFilm);
            if (!filmGiaAggiunto) {
                if (filmDaAggiungere !== null) {
                    aggiungiAllaPlaylist(filmDaAggiungere, filmCardElement, catalogo);
                }
            }
            else {
                filmCardElement.classList.remove("is-active");
                alert("Il film è già nella playlist!");
            }
        });
    }
});
const rimuoviBtn = document.getElementById("rimuovi");
rimuoviBtn.addEventListener("click", function () {
    const cardSelezionate = document.querySelectorAll(".scheda-film.is-active");
    if (cardSelezionate.length > 0) {
        cardSelezionate.forEach(filmCard => {
            const titoloFilm = filmCard.getAttribute("data-id");
            playlistGenere.rimuoviFilm(titoloFilm);
            filmCard.remove();
        });
    }
});
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
bottone?.addEventListener("click", (e) => {
    e.preventDefault();
    mostraForm();
});
glasspane.addEventListener("click", (e) => {
    if (e.target === glasspane)
        nascondiForm();
});
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
inizializzaCatalogo();
export {};
//# sourceMappingURL=interazione.js.map