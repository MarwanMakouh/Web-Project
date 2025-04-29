const toggleButton = document.getElementById('darkModeToggle');

// Functie om dark mode aan/uit te zetten
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');

  // Zet de juiste knoptekst
  toggleButton.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';

  // Sla op in localStorage
  localStorage.setItem('darkMode', isDark);
}

// Eventlistener voor klik
toggleButton.addEventListener('click', toggleDarkMode);

// Bij het laden van de pagina, check localStorage
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  toggleButton.textContent = '☀️ Light Mode';
} else {
  toggleButton.textContent = '🌙 Dark Mode';
}
