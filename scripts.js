const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

const root = document.documentElement;
const THEME_KEY = 'hyc-theme';
const toggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggleBtn) {
        toggleBtn.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }
}

function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

applyTheme(getPreferredTheme());
toggleBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
});

function setupMobileCollapsibles() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    document.querySelectorAll('[data-mobile-collapsible]').forEach(card => {
        const toggle = card.querySelector('.card-toggle');
        const back = card.querySelector('.flip-card-back');
        
        if (!toggle || !back) {
            console.warn('Flip card is missing required elements:', card);
            return;
        }

        if (isMobile) {
            toggle.style.display = 'inline-block';
            back.style.display = 'none';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.onclick = null;

            toggle.onclick = () => {
                const isOpen = back.style.display === 'block';
                back.style.display = isOpen ? 'none' : 'block';
                toggle.setAttribute('aria-expanded', String(!isOpen));
                toggle.textContent = isOpen ? 'Hide' : 'Details';
            };
        } else {
            toggle.style.display = 'none';
            back.style.display = '';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Details';
        }
    });
}

document.addEventListener('DOMContentLoaded', setupMobileCollapsibles);
window.addEventListener('resize', setupMobileCollapsibles);

document.addEventListener('click', (e) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;
    document.querySelectorAll('[data-mobile-collapsible]').forEach(card => {
        const back = card.querySelector('.flip-card-back');
        const toggle = card.querySelector('.card-toggle');
        if (!back || !toggle) return;
        if (!card.contains(e.target) && back.style.display === 'block') {
        back.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Details';
        }
    });
});

let slideIndex = {};
function changeSlide(n, carouselId) {
    showSlides(slideIndex[carouselId] += n, carouselId);
}
function showSlides(n, carouselId) {
    const slides = document.querySelectorAll(`#${carouselId} .carousel-images img`);
    if (!slideIndex[carouselId]) slideIndex[carouselId] = 1;
    if (slides.length === 0) return;
    if (n > slides.length) slideIndex[carouselId] = 1;
    if (n < 1) slideIndex[carouselId] = slides.length;
    slides.forEach(s => s.style.display = "none");
    slides[slideIndex[carouselId] - 1].style.display = "block";
}
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const carouselId = carousel.id;
        slideIndex[carouselId] = 1;
        showSlides(slideIndex[carouselId], carouselId);
    });
});

document.querySelectorAll('.project .accordion').forEach(btn => {
    btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const isActive = panel.classList.contains('active');
        panel.classList.toggle('active', !isActive);
    });
});
