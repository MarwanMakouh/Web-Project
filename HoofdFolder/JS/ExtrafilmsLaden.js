// Huidige pagina bijhouden
let huidigePagina = 1;
const laadMeerKnop2 = document.getElementById('laadMeerKnop');
let LadenURL;

// Haal volgende pagina films op
async function haalVolgendePaginaOp() {
  huidigePagina++;

  // Kies juiste URL (zoekresultaten of populaire films)
  if (IsZoek) {   
    LadenURL = LaadExtraURL;
  } else {
    LadenURL = 'https://api.themoviedb.org/3/movie/popular?language=nl-NL&page=';
  }

  try {
    const response = await fetch(`${LadenURL}${huidigePagina}`, {
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
    toonFilmsBij(data.results); // Voeg films toe aan de pagina
  } catch (error) {
    console.error('Fout bij laden volgende pagina:', error);
  }
}

// Toon films op de pagina
function toonFilmsBij(films) {
  films.forEach(film => {
    const filmElement = document.createElement('div');
    filmElement.classList.add('film-kaart');

    // Gebruik poster of standaardafbeelding
    const posterPath = film.poster_path
      ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
      : '../DefaultFoto/DefaultPoster.jpg';

    // HTML voor filmkaart
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

    // Klik op info opent detailweergave
    const infoElement = filmElement.querySelector(".FilmInformatie");
    infoElement.addEventListener("click", () => haalFilmDetailsOp(film.id));

    // Favorietenknoppen koppelen
    const favorietKnop = filmElement.querySelector('.favoriet-knop');
    const verwijderKnop = filmElement.querySelector('.verwijder-knop');

    favorietKnop.addEventListener('click', () => voegToeAanFavorieten(film, filmElement));
    verwijderKnop.addEventListener('click', () => verwijderVanFavorieten(film, filmElement));

    // Voeg filmkaart toe aan container
    MovieContainer.appendChild(filmElement);
  });
}

// Koppel functie aan "Laad meer" knop
laadMeerKnop2.addEventListener('click', haalVolgendePaginaOp);
