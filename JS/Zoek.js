const zoekForm = document.getElementById('zoekForm');
const zoekveld = document.getElementById('zoekveld');
const sorteerveld = document.getElementById('sorteerveld');

zoekForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // voorkom herladen

    const zoekterm = zoekveld.value.trim();
    const sorteerOptie = sorteerveld.value;

    if (zoekterm !== '') {
        const zoekURL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(zoekterm)}&sort_by=${sorteerOptie}&language=nl-NL&page=1`;

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
            toonFilms(data.results); // Zorg dat toonFilms ook beschikbaar is in dit script
        } catch (error) {
            console.error('Fout bij zoeken:', error);
        }
    } else {
        haalFilmsOp(); // standaard films opnieuw laden
        return;
    }
});
