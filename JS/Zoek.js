const zoekForm = document.getElementById('zoekForm');
const zoekveld = document.getElementById('zoekveld');
const sorteerveld = document.getElementById('sorteerveld');

zoekForm.addEventListener('submit', async (event) => {
    //event is het object dat de info bezit van de form
    event.preventDefault(); // voorkom herladen

    const zoekterm = zoekveld.value;
    const sorteerOptie = sorteerveld.value;

    if (zoekterm !== '') {
        console.log(sorteerOptie);
        
        const zoekURL = `https://api.themoviedb.org/3/search/movie?query=${zoekterm}&language=nl-NL&page=1`;

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
            
            //films sorteeren
            sorteerFilms(data.results,sorteerOptie);
            toonFilms(data.results); // Zorg dat toonFilms ook beschikbaar is in dit script
        } catch (error) {
            console.error('Fout bij zoeken:', error);
        }
    } else {
        haalFilmsOp(); // standaard films opnieuw laden
        return;
    }
});

//functie om fils te sorteeren
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
    
