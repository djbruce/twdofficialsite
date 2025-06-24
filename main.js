// ==========================
// Slider Functionality
// ==========================
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

if (slides.length) {
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
  showSlide(currentSlide);
  autoPlaySlider();
}

// ==========================
// Navbar Toggle (Mobile)
// ==========================
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener('click', () => {
    const open = navbarMenu.classList.toggle('open');
    navbarToggle.setAttribute('aria-expanded', open);
  });
  navbarMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        navbarMenu.classList.remove('open');
        navbarToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// ==========================
// Contact Form (Demo)
// ==========================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.reset();
    alert('Thank you for contacting us! We will get back to you soon.');
  });
}

// ==========================
// Source Slideshow Functionality
// ==========================
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

// ==========================
// Team Slideshow Functionality
// ==========================
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

// --- Team Slider: Show one member at a time, in order ---
document.addEventListener('DOMContentLoaded', function () {
  const teamSlider = document.querySelector('.team-slider');
  const teamPrev = document.getElementById('team-prev');
  const teamNext = document.getElementById('team-next');
  const teamIndicatorsContainer = document.querySelector('.team-indicators');

  if (!teamSlider) return;

  // Gather all members in order
  const allMembers = Array.from(teamSlider.querySelectorAll('.member'));
  let currentMember = 0;

  // Create a container for displaying a single member
  let singleSlide = document.createElement('div');
  singleSlide.className = 'team-slide active';
  let membersDiv = document.createElement('div');
  membersDiv.className = 'team-members';
  singleSlide.appendChild(membersDiv);

  // Replace all slides with the single slide container
  teamSlider.innerHTML = '';
  teamSlider.appendChild(singleSlide);

  // Function to show a member by index
  function showMember(index) {
    membersDiv.innerHTML = '';
    membersDiv.appendChild(allMembers[index].cloneNode(true));

    // Update indicators
    if (teamIndicatorsContainer) {
      teamIndicatorsContainer.querySelectorAll('.indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
      });
    }
  }

  // Build indicators
  if (teamIndicatorsContainer) {
    teamIndicatorsContainer.innerHTML = '';
    for (let i = 0; i < allMembers.length; i++) {
      const indicator = document.createElement('span');
      indicator.className = 'indicator' + (i === 0 ? ' active' : '');
      indicator.dataset.slide = i;
      indicator.addEventListener('click', () => {
        currentMember = i;
        showMember(currentMember);
      });
      teamIndicatorsContainer.appendChild(indicator);
    }
  }

  // Navigation
  if (teamPrev) {
    teamPrev.onclick = function () {
      currentMember = (currentMember - 1 + allMembers.length) % allMembers.length;
      showMember(currentMember);
    };
  }
  if (teamNext) {
    teamNext.onclick = function () {
      currentMember = (currentMember + 1) % allMembers.length;
      showMember(currentMember);
    };
  }

  // Show the first member
  showMember(currentMember);
});

// ==========================
// Scroll To Top Button
// ==========================
document.addEventListener('DOMContentLoaded', function () {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', function () {
    scrollBtn.classList.toggle('show', window.scrollY > 200);
  });

  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ==========================
// Explore Button Smooth Scroll
// ==========================
document.addEventListener('DOMContentLoaded', function () {
  const exploreBtns = document.querySelectorAll('.cta-btn[href^="#"]');
  exploreBtns.forEach(exploreBtn => {
    exploreBtn.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const targetY = target.getBoundingClientRect().top + window.pageYOffset;
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const duration = 1500;
        let startTime = null;

        function animateScroll(currentTime) {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          window.scrollTo(0, startY + distance * easeInOutQuad(progress));
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        }

        function easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(animateScroll);
      }
    });
  });
});

// ==========================
// Services List Toggle
// ==========================
document.addEventListener('DOMContentLoaded', function () {
  const servicesList = document.getElementById('servicesList');
  const seeMoreBtn = document.getElementById('seeMoreServices');
  if (!servicesList || !seeMoreBtn) return;

  function updateServicesList() {
    const items = servicesList.querySelectorAll('li');
    if (window.innerWidth <= 600) {
      // Hide all after the 10th
      items.forEach((li, i) => {
        li.style.display = i < 10 ? '' : 'none';
      });
      seeMoreBtn.style.display = items.length > 10 ? 'block' : 'none';
      seeMoreBtn.textContent = 'See More...';
    } else {
      // Show all on larger screens
      items.forEach(li => li.style.display = '');
      seeMoreBtn.style.display = 'none';
    }
  }

  seeMoreBtn.addEventListener('click', function () {
    const items = servicesList.querySelectorAll('li');
    const isExpanded = seeMoreBtn.textContent === 'See Less';
    if (!isExpanded) {
      items.forEach(li => li.style.display = '');
      seeMoreBtn.textContent = 'See Less';
    } else {
      items.forEach((li, i) => {
        li.style.display = i < 10 ? '' : 'none';
      });
      seeMoreBtn.textContent = 'See More...';
      window.scrollTo({ top: servicesList.offsetTop - 80, behavior: 'smooth' });
    }
  });

  window.addEventListener('resize', updateServicesList);
  updateServicesList();
});

// ==========================
// Disable Inspect (basic)
// ==========================
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', function(e) {
  // F12
  if (e.key === 'F12' || e.keyCode === 123) {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+U
  if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
      (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
    return false;
  }
});