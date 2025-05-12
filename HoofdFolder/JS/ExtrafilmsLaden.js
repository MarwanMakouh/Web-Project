let huidigePagina = 1;
const laadMeerKnop2 = document.getElementById('laadMeerKnop');
let LadenURL;
async function haalVolgendePaginaOp() {
  huidigePagina++;

  if (IsZoek) {   
    LadenURL = LaadExtraURL;
  }else {
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
    toonFilmsBij(data.results);
  } catch (error) {
    console.error('Fout bij laden volgende pagina:', error);
  }
}

function toonFilmsBij(films) {
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

    const favorietKnop = filmElement.querySelector('.favoriet-knop');
    const verwijderKnop = filmElement.querySelector('.verwijder-knop');

    favorietKnop.addEventListener('click', () => voegToeAanFavorieten(film, filmElement));
    verwijderKnop.addEventListener('click', () => verwijderVanFavorieten(film, filmElement));

    MovieContainer.appendChild(filmElement);
  });
}

laadMeerKnop2.addEventListener('click', haalVolgendePaginaOp);
