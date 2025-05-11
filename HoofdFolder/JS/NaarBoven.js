const Naarboven = document.getElementById('Naar_Boven');
const NaarBovenKnop = document.getElementById('TopKnop');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    NaarBovenKnop.style.display = entry.isIntersecting ? 'none' : 'block';
  });
});

observer.observe(Naarboven);

NaarBovenKnop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
