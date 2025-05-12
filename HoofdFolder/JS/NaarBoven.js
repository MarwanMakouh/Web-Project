// Elementen ophalen
const Naarboven = document.getElementById('Naar_Boven');
const NaarBovenKnop = document.getElementById('TopKnop');

// Observer toont/verbergt knop op basis van scrollpositie
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    NaarBovenKnop.style.display = entry.isIntersecting ? 'none' : 'block';
  });
});

// Observer koppelen aan bovenste element
observer.observe(Naarboven);

// Scroll naar boven bij klik op knop
NaarBovenKnop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
