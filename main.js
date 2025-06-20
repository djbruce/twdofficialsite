// Slider functionality
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
let sliderInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    if (indicators[i]) indicators[i].classList.toggle('active', i === index);
  });
}

document.getElementById('prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
  resetSliderInterval();
});
document.getElementById('next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
  resetSliderInterval();
});
if (indicators.length) {
  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      currentSlide = i;
      showSlide(currentSlide);
      resetSliderInterval();
    });
  });
}
function autoPlaySlider() {
  sliderInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);
}
function resetSliderInterval() {
  clearInterval(sliderInterval);
  autoPlaySlider();
}
showSlide(currentSlide);
autoPlaySlider();

// Navbar mobile toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener('click', () => {
    const open = navbarMenu.classList.toggle('open');
    navbarToggle.setAttribute('aria-expanded', open);
  });
}

// Contact form (demo, no backend)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.reset();
    alert('Thank you for contacting us! We will get back to you soon.');
  });
}

// Source slideshow functionality
const sourceSlides = document.querySelectorAll('.source-slide');
const sourceCaptions = [
  'Water Source 1',
  'Water Source 2',
  'Water Source 3',
  'Water Source 4'
];
let currentSource = 0;
const sourcePrev = document.getElementById('source-prev');
const sourceNext = document.getElementById('source-next');
const sourceCaption = document.getElementById('source-caption');

function showSourceSlide(index) {
  sourceSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  if (sourceCaption) sourceCaption.textContent = sourceCaptions[index];
}
if (sourcePrev && sourceNext && sourceSlides.length) {
  sourcePrev.addEventListener('click', () => {
    currentSource = (currentSource - 1 + sourceSlides.length) % sourceSlides.length;
    showSourceSlide(currentSource);
  });
  sourceNext.addEventListener('click', () => {
    currentSource = (currentSource + 1) % sourceSlides.length;
    showSourceSlide(currentSource);
  });
  showSourceSlide(currentSource);
}

// Team slideshow functionality
const teamSlides = document.querySelectorAll('.team-slide');
const teamPrev = document.querySelector('.team-prev');
const teamNext = document.querySelector('.team-next');
const teamIndicatorsContainer = document.querySelector('.team-indicators');
let currentTeam = 0;

function showTeamSlide(index) {
  teamSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    if (teamIndicatorsContainer && teamIndicatorsContainer.children[i]) {
      teamIndicatorsContainer.children[i].classList.toggle('active', i === index);
    }
  });
}

// Generate indicators
if (teamIndicatorsContainer && teamSlides.length) {
  teamIndicatorsContainer.innerHTML = '';
  for (let i = 0; i < teamSlides.length; i++) {
    const indicator = document.createElement('span');
    indicator.className = 'team-indicator' + (i === 0 ? ' active' : '');
    indicator.addEventListener('click', () => {
      currentTeam = i;
      showTeamSlide(currentTeam);
    });
    teamIndicatorsContainer.appendChild(indicator);
  }
}

if (teamPrev && teamNext && teamSlides.length) {
  teamPrev.addEventListener('click', () => {
    currentTeam = (currentTeam - 1 + teamSlides.length) % teamSlides.length;
    showTeamSlide(currentTeam);
  });
  teamNext.addEventListener('click', () => {
    currentTeam = (currentTeam + 1) % teamSlides.length;
    showTeamSlide(currentTeam);
  });
  showTeamSlide(currentTeam);
}
