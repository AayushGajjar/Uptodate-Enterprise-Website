// 1. SERVICE MODAL
function openService(serviceKey) {
    const modal = document.getElementById('service-modal');
    document.getElementById('modal-title').innerText = serviceData[serviceKey].title;
    document.getElementById('modal-description').innerText = serviceData[serviceKey].desc;
    modal.style.display = 'flex';
}

function closeService() {
    document.getElementById('service-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('service-modal');
    if (event.target === modal) modal.style.display = 'none';
};

// 2. TESTIMONIALS
const slider = document.getElementById('testimonial-slider');

testimonials.forEach(({ name, role, text }) => {
    const card = document.createElement('div');
    card.classList.add('testimonial-card');
    card.innerHTML = `
        <p>"${text}"</p>
        <h4>— ${name}, ${role}</h4>
    `;
    slider.appendChild(card);
});

let currentSlide = 0;
const totalSlides = testimonials.length;

function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function changeSlide(direction) {
    goToSlide(currentSlide + direction);
    resetAutoRoll();
}

let autoRoll = setInterval(() => goToSlide(currentSlide + 1), 3500);

function resetAutoRoll() {
    clearInterval(autoRoll);
    autoRoll = setInterval(() => goToSlide(currentSlide + 1), 3500);
}

// 3. FOOTER YEAR
document.getElementById('year').innerText = new Date().getFullYear();

// 4. HEADER SCROLL SHADOW
window.addEventListener('scroll', () => {
    document.getElementById('main-header').classList.toggle('scrolled', window.scrollY > 10);
});

// 5. COUNT-UP ANIMATION
function countUp(el, target, suffix) {
    let current = 0;
    const steps = 1800 / 20;
    const increment = target / steps;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.innerText = target + suffix;
            clearInterval(timer);
        } else {
            el.innerText = Math.floor(current) + suffix;
        }
    }, 20);
}

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = true;
            countUp(entry.target, parseInt(entry.target.dataset.target), entry.target.dataset.suffix || '');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));

// 6. MOBILE MENU TOGGLE
function toggleMenu() {
    document.getElementById('main-nav').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('open');
}

function closeMenu() {
    document.getElementById('main-nav').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
}

// 7. CONTACT FORM STATUS MESSAGE
(function () {
    const status = new URLSearchParams(window.location.search).get('status');
    const msg = document.getElementById('form-msg');
    if (!status || !msg) return;
    if (status === 'success') {
        msg.innerHTML = '<p class="form-success">✅ Message sent! We\'ll get back to you soon.</p>';
    } else {
        msg.innerHTML = '<p class="form-error">❌ Something went wrong. Please try again or email us directly.</p>';
    }
    window.history.replaceState({}, '', 'index.html');
})();
