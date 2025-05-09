const zoekForm = document.getElementById('zoekForm');
const zoekveld = document.getElementById('zoekveld');
const jaarFilter = document.getElementById('jaarFilter');
const sorteerveld = document.getElementById('sorteerveld');
let LaadExtraURL = "";
let IsZoek = false;

zoekForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // voorkom herladen

    const zoekterm = zoekveld.value.trim();
    const sorteerOptie = sorteerveld.value;
    const jaar = jaarFilter.value.trim();

    let zoekURL = "";
    IsZoek = true;

    // 1. Gebruiker geeft zoekterm (optioneel jaar)
    if (zoekterm !== '') {
        zoekURL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(zoekterm)}&language=nl-NL&page=1`;

        if (jaar !== '') {
            zoekURL += `&primary_release_year=${jaar}`;
            LaadExtraURL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(zoekterm)}&language=nl-NL&primary_release_year=${jaar}&page=`;
        } else {
            LaadExtraURL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(zoekterm)}&language=nl-NL&page=`;
        }
    }
    // 2. Alleen jaar is ingevuld
    else if (jaar !== '') {
        zoekURL = `https://api.themoviedb.org/3/discover/movie?language=nl-NL&sort_by=${sorteerOptie}&primary_release_year=${jaar}&page=1`;
        LaadExtraURL = `https://api.themoviedb.org/3/discover/movie?language=nl-NL&sort_by=${sorteerOptie}&primary_release_year=${jaar}&page=`;
    }
    // 3. Geen zoekterm, geen jaar → standaardfilms
    else {
        IsZoek = false;
        haalFilmsOp();
        return;
    }

    try {
        const response = await fetch(zoekURL, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`, // Zorg dat API_TOKEN globaal beschikbaar is
            },
        });

        if (!response.ok) {
            throw new Error(`Zoekfout: ${response.status}`);
        }

        const data = await response.json();

        // Als het discover is, zijn ze al gesorteerd
        if (zoekterm !== '') {
            sorteerFilms(data.results, sorteerOptie);
        }

        toonFilms(data.results);
    } catch (error) {
        console.error('Fout bij zoeken:', error);
    }
});

//functie om films te sorteren
function sorteerFilms(films, sorteerOptie) {
    switch (sorteerOptie) {
        case 'popularity.desc':
            return films.sort((a, b) => b.popularity - a.popularity);
        case 'release_date.desc':
            return films.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        case 'vote_average.desc':
            return films.sort((a, b) => b.vote_average - a.vote_average);
        default:
            return films;
    }
}
