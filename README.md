# 🎬 Movie Explorer SPA

Een interactieve single-page applicatie waarmee gebruikers populaire films kunnen zoeken, filteren en toevoegen aan hun favorieten. Gebouwd voor het vak **Advanced Web** aan de hand van `The Movie Database API`.

---

## 📌 Projectbeschrijving

Deze SPA maakt gebruik van `The Movie Database API` om realtime filmdata op te halen. Gebruikers kunnen door films bladeren, filters toepassen, sorteren, films zoeken en favorieten opslaan. Deze voorkeuren worden lokaal opgeslagen en blijven behouden tussen sessies.

---

## ⚙️ Functionaliteiten

- ✅ Ophalen van data van een publieke API (`TMDb`)
- ✅ Visuele weergave in lijst + detailweergave (6+ kolommen)
- ✅ Zoeken op titel
- ✅ Filteren op jaartal
- ✅ Sorteren op populariteit
- ✅ Favorieten toevoegen en bewaren in `localStorage`
- ✅ Responsief design + thema switcher (dark/light)
- ✅ Smooth scroll en terug naar boven-knop (Observer API)

---

## 🌐 Gebruikte API

- **The Movie Database (TMDb) API**  
  - Link: https://developer.themoviedb.org/docs  
  - Authenticatie via Bearer Token  
    → `main.js`, **regel 1**

---

## ✅ Functionele vereisten & waar geïmplementeerd

| Functie                       | Bestand                        | Regel(s)   |
|------------------------------|--------------------------------|------------|
| API-data ophalen             | `main.js`                      | 1-12       |
| 20+ items laden              | `main.js` / `ExtrafilmsLaden.js`| 12+       |
| Data tonen (lijst + details) | `FilmData.js` / `main.js`      | Data --> 9–43 main--> 32-72|
| Filter op jaar               | `Zoek.js`                      | 3          |
| Zoekfunctie                  | `Zoek.js`                      | 2          |
| Sorteren                     | `Zoek.js`                      | 4          |
| Favorieten opslaan           | `main.js`                      | 76-106     |
| Donkere modus + opslag       | `DarkMode.js`                  | 12         |
| Observer API (scroll)        | `NaarBoven.js`                 | 6          |
| Responsive design            | `FilmData.css`, `Stijl.css`    | overal     |
| Gebruikersinterface          | `index.html`, `FilmData.js`    | algemeen   |

---

## 🧠 Toegepaste JavaScript-concepten

| Concept                            | Bestand                   | Regel(s)       |
|-----------------------------------|----------------------------|----------------|
| DOM selectie & manipulatie        | `FilmData.js`, `main.js`   | 2-6 en 25-32   |
| Event listeners                   | `Zoek.js`, `DarkMode.js`   | 2+, 10+        |
| `const`, `let`                    | Alle JS-bestanden          | overal         |
| Template literals                 | `FilmData.js`              | regel 10       |
| Array-methodes (map, filter, ...) | `main.js`, `FilmData.js`   | 13+            |
| Arrow functions                   | `NaarBoven.js`             | regel 6        |
| Ternary operator                  | `main.js`                  | 43-46          |
| Callback functies                 | `ExtrafilmsLaden.js`       | 31             |
| Promises / Async & Await          | `main.js`, `Zoek.js`       | 12+, 24        |
| Observer API                      | `NaarBoven.js`             | regel 6 en 13  |

---

## 💾 Opslag en validatie

| Functie                    | Bestand           | Regel(s)               |
|---------------------------|-------------------|------------------------|
| `localStorage` gebruik     | `main.js`         | 80                     |
| Donkere modus voorkeur     | `DarkMode.js`     | regel 12               |

---

## 🧪 Installatiehandleiding

1. open visual studio code, open dan de terminal en voer deze commando uit.
  ```bash
  cd \pad-naar-gewenste=map
  ```
   
2. Clone de repository in de visual studio code terminal
``` bash
git clone https://github.com/MarwanMakouh/Web-Project.git
```
3. Ga naar de map van de gekloonde repository
  ``` bash
  cd Web-Project
  ```
4. Open de map in vs code en voeg jouw eigen TMDB API-leestoegangstoken toe aan `main.js`

5. Installeer dependencies in de termilnal
  ```bash
  npm install
  ```

6. Start de Vite development server op in de terminal 
  ```bash
 npx vite HoofdFolder
   ```
7.hou ctrl ingedrukt en klik op de link in de terminal 

---

## 🖼️ Screenshots


<img width="1262" alt="Screenshot 2025-05-12 145738" src="https://github.com/user-attachments/assets/29b64c98-af36-4ab8-9a6e-ba35e25cd7d3" />
<img width="1250" alt="Screenshot 2025-05-12 145804" src="https://github.com/user-attachments/assets/853fbb34-1768-4834-aeb0-f9fa790bf0ec" />
<img width="1246" alt="Screenshot 2025-05-12 145824" src="https://github.com/user-attachments/assets/1da08d3b-79a1-448f-9407-e3445d5e6c77" />
<img width="718" alt="Screenshot 2025-05-12 145848" src="https://github.com/user-attachments/assets/d1eb597b-8828-4554-a1ed-f0511bf99957" />
<img width="1257" alt="Screenshot 2025-05-12 145919" src="https://github.com/user-attachments/assets/b2ec20bf-a288-45f9-b669-0302716303b8" />
<img width="1235" alt="Screenshot 2025-05-12 145942" src="https://github.com/user-attachments/assets/4b62343b-fa60-4dc7-9c3e-9bbe6369accc" />
<img width="889" alt="Screenshot 2025-05-19 171408" src="https://github.com/user-attachments/assets/81e099fe-0d8b-413b-a688-866061a1cef4" />
<img width="1211" alt="Screenshot 2025-05-12 150009" src="https://github.com/user-attachments/assets/8fa73593-d147-4f25-9320-76707abde175" />
<img width="1238" alt="Screenshot 2025-05-12 150056" src="https://github.com/user-attachments/assets/cf9c2b24-34ac-4b18-a7d7-de56083d84a2" />
<img width="1241" alt="Screenshot 2025-05-12 150111" src="https://github.com/user-attachments/assets/3758b346-3c1c-4870-aae7-e77e82cf78e9" />
<img width="236" alt="Screenshot 2025-05-12 150138" src="https://github.com/user-attachments/assets/d0018602-f95f-4376-a45a-3bc320d65673" />



---

## 📚 Gebruikte bronnen

- OpenAI. (2025). ChatGPT (voor uitleg en validatie). https://chatgpt.com/share/6821f38b-baec-8004-8d8d-598cfc0c9e43
- OpenAI. (2025). ChatGPT (voor uitleg en validatie). https://chatgpt.com/share/6821f45b-7744-8004-8f87-5565d2c9a1a7
- OpenAI. (2025). ChatGPT (voor uitleg en validatie). https://chatgpt.com/share/6821f600-3d04-8004-b46d-78a2760638ff
- OpenAI. (2025). ChatGPT (voor uitleg en validatie). https://chatgpt.com/share/6821f696-6fb8-8004-9dbf-8c9283f8233f
- OpenAI. (2025). ChatGPT (voor uitleg en validatie). https://chatgpt.com/share/6821ff4c-03ec-8004-9c9f-d36b140c9808
- OpenAI, (2025), chatGPT (voor uitleg en validatie). https://chatgpt.com/share/682b553e-dae8-8000-b8df-f54db03eada6
- The Movie Database (TMDb). (z.d.). TMDb API documentation. https://developer.themoviedb.org
- MDN Web Docs. (z.d.). JavaScript, Fetch API, CSS Grid en Flexbox. https://developer.mozilla.org
- Get CSS Scan. (z.d.). CSS buttons examples. https://getcssscan.com/css-buttons-examples

---

## 👥 Auteur

- Marwan Makouh
