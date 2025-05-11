const API_TOKEN = '';
const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=nl-NL&page=1';
const MovieContainer = document.getElementById('MovieContainer');
const favorietenContainer = document.getElementById('favorietenContainer');
const toonFavorietenKnop = document.getElementById('toonFavorieten');
const ToonAlleFilms = document.getElementById('ToonFilms');
const laadMeerKnop1 = document.getElementById('laadMeerKnop');

// Haal films op
async function haalFilmsOp() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Fout bij ophalen: ${response.status}`);
    }

    const data = await response.json();
    toonFilms(data.results);
  } catch (error) {
    console.error('Fout:', error);
  }
}

// Toon films en voeg de favorietenknop toe
function toonFilms(films) {
  // Verberg de favorieten en toon de films
  MovieContainer.style.display = 'grid';
  favorietenContainer.style.display = 'none';

  MovieContainer.innerHTML = '';

  films.forEach(film => {
    const filmElement = document.createElement('div');
    filmElement.classList.add('film-kaart');

    const posterPath = film.poster_path
      ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
      : '../DefaultFoto/DefaultPoster.jpg';

    filmElement.innerHTML = `
      <div class="Groote">
      <div class="FilmInformatie">
      <img src="${posterPath}" alt="${film.title}">
      <div class="film-informatie">
        <h3>${film.title}</h3>
        <p>⭐ ${film.vote_average}</p>
        <p>📅 ${film.release_date}</p>
        </div> 
      </div>
      </div>
      <button class="favoriet-knop">Voeg toe aan favorieten</button>
      <button class="verwijder-knop" style="display: none;">Verwijder uit favorieten</button>
    `;

    const infoElement = filmElement.querySelector(".FilmInformatie");
    infoElement.addEventListener("click", () => haalFilmDetailsOp(film.id));
    // Voeg event listener toe voor de favoriet knop
    const favorietKnop = filmElement.querySelector('.favoriet-knop');
    const verwijderKnop = filmElement.querySelector('.verwijder-knop');

    favorietKnop.addEventListener('click', () => voegToeAanFavorieten(film, filmElement));
    verwijderKnop.addEventListener('click', () => verwijderVanFavorieten(film, filmElement));

    MovieContainer.appendChild(filmElement);
  });
}

// Voeg film toe aan favorieten
function voegToeAanFavorieten(film, filmElement) {
  let favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
  if (!favorieten.find(f => f.id === film.id)) {
    favorieten.push(film);
    localStorage.setItem('favorieten', JSON.stringify(favorieten));
    filmElement.querySelector('.favoriet-knop').style.display = 'none';
    filmElement.querySelector('.verwijder-knop').style.display = 'inline-block';
  }
}

// Verwijder film uit favorieten
function verwijderVanFavorieten(film, filmElement) {
  let favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];

  // Verwijder de film uit de favorietenlijst
  favorieten = favorieten.filter(f => f.id !== film.id);
  localStorage.setItem('favorieten', JSON.stringify(favorieten));

  const favorietKnop = filmElement.querySelector('.favoriet-knop');
  const verwijderKnop = filmElement.querySelector('.verwijder-knop') || filmElement.querySelector('.verwijder1-knop');

  // Controle: zitten we in de gewone lijst of in de favorietenweergave?
  if (favorietKnop && verwijderKnop) {
    // We zitten in de gewone 'films'-lijst ➔ gewoon knoppen wisselen
    favorietKnop.style.display = 'inline-block';
    verwijderKnop.style.display = 'none';
  } else {
    // We zitten in de favorieten-weergave ➔ volledig element verwijderen
    filmElement.remove();
  }
}

// Toon favorieten
// TOON FAVORIETEN MET SORTEER-FORMULIER
function toonFavorieten() {
  laadMeerKnop1.style.display = 'none';

  // Toon het formulier voor sorteren
  const sorteerFormulier = document.getElementById('favorietenForm');
  sorteerFormulier.style.display = 'block';

  const sorteerSelect = document.getElementById('sorteerFavorieten');
  const sorteerWaarde = sorteerSelect ? sorteerSelect.value : 'release_date.desc';

  let favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];

  // Sorteer op basis van de dropdown
  favorieten.sort((a, b) => {
    if (sorteerWaarde === 'release_date.desc') {
      return new Date(b.release_date) - new Date(a.release_date);
    } else if (sorteerWaarde === 'release_date.asc') {
      return new Date(a.release_date) - new Date(b.release_date);
    } else if (sorteerWaarde === 'vote_average.desc') {
      return b.vote_average - a.vote_average;
    } else if (sorteerWaarde === 'vote_average.asc') {
      return a.vote_average - b.vote_average;
    }
    return 0;
  });

  favorietenContainer.innerHTML = '';

  if (favorieten.length === 0) {
    favorietenContainer.innerHTML = '<p>Geen favorieten toegevoegd.</p>';
  } else {
    favorieten.forEach(film => {
      const div = document.createElement('div');
      div.classList.add('film-kaart');
      const poster = `https://image.tmdb.org/t/p/w500${film.poster_path}`;

      div.innerHTML = `
      <div class="Groote">
      <div class="FilmInformatie">
        <img src="${poster}" alt="${film.title}">
        <div class="film-informatie">
          <h3>${film.title}</h3>
          <p>⭐ ${film.vote_average}</p>
          <p>📅 ${film.release_date}</p>
          </div>
        </div>
        </div>
          <button id="Button_Layout" class="verwijder1-knop" data-id="${film.id}">Verwijder</button>
      `;

      div.querySelector('.FilmInformatie').addEventListener('click', () => haalFilmDetailsOp(film.id));
      div.querySelector('.verwijder1-knop').addEventListener('click', () => verwijderVanFavorieten(film, div));

      favorietenContainer.appendChild(div);
    });
  }

  // Verberg de normale filmweergave
  MovieContainer.style.display = 'none';
  favorietenContainer.style.display = 'grid';
}


// Koppel de "Toon Favorieten" knop
toonFavorietenKnop.addEventListener('click', toonFavorieten);
// toont alle films terug
ToonAlleFilms.addEventListener('click', () => {
  location.reload();
});

// Laad de films bij het laden van de pagina
document.addEventListener('DOMContentLoaded', haalFilmsOp);
document.getElementById('sorteerFavorieten').addEventListener('change', toonFavorieten);

