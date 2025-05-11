const detailSectie = document.getElementById("filmDetail");
const sluitKnop = document.getElementById("sluitDetail");
const titelEl = document.getElementById("detailTitel");
const overzichtEl = document.getElementById("detailOverzicht");
const acteursEl = document.getElementById("detailActeurs");

async function haalFilmDetailsOp(filmId) {
  const API_DETAILS_URL = `https://api.themoviedb.org/3/movie/${filmId}?language=nl-NL&append_to_response=credits`;

  try {
    const response = await fetch(API_DETAILS_URL, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) throw new Error("Fout bij ophalen filmgegevens");

    const data = await response.json();
    const acteurs = data.credits.cast.slice(0, 5).map(acteur => acteur.name).join(", ");

    // Vul de elementen met data
    titelEl.textContent = data.title;
    overzichtEl.textContent = data.overview;
    acteursEl.textContent = acteurs;

    detailSectie.style.display = "block";
    detailSectie.scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    console.error("Detail fout:", error);
  }
}

// Sluit knop
sluitKnop.addEventListener("click", () => {
  detailSectie.style.display = "none";
});
