const ModeBtn = document.getElementById('ThemaToggle');

// Functie om dark mode aan/uit te zetten
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode'); 

  // Zet de juiste knoptekst
  ModeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';

  // Sla op in localStorage 
  localStorage.setItem('darkMode', isDark);
}

// Eventlistener voor klik
ModeBtn.addEventListener('click', toggleDarkMode);

// Bij het laden van de pagina, check localStorage
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  ModeBtn.textContent = '☀️ Light Mode';
} else {
  ModeBtn.textContent = '🌙 Dark Mode';
}
