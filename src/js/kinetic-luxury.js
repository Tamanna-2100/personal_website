// ===== SCROLL PROGRESS BAR =====
const scrollBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollBar) {
        scrollBar.style.width = scrollPercent + '%';
    }
});

// ===== NAVBAR SCROLL REVEAL =====
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 80) {
        header.classList.add('nav-visible');
    } else {
        header.classList.remove('nav-visible');
    }
});

// ===== REVEAL ANIMATIONS (Intersection Observer) =====
const revealElements = document.querySelectorAll('.reveal, .section-header, .skill-card, .carousel-item, .about-image, .contact-form, .contact-info');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, { threshold: 0.14 });

revealElements.forEach((el) => {
    revealObserver.observe(el);
});

// ===== 3D CAROUSEL LOGIC =====
let carouselContainer = null;
let carouselItems = [];
let currentIndex = 0;
let autoplayInterval = null;

function initCarousel() {
    // Ensure DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarouselNow);
    } else {
        initCarouselNow();
    }
}

function initCarouselNow() {
    carouselContainer = document.querySelector('.carousel-container');
    carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
    
    if (carouselItems.length === 0) {
        console.warn('⚠️ No carousel items found');
        return false;
    }
    
    console.log(`✨ Carousel initialized with ${carouselItems.length} projects`);
    
    // Initialize first state
    updateCarousel();
    startAutoplay();
    
    // Setup button listeners
    setupCarouselControls();
    
    // Setup hover behavior
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
    }
    
    // Click on carousel items to select
    carouselItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            stopAutoplay();
            currentIndex = index;
            updateCarousel();
            setTimeout(startAutoplay, 500);
        });
    });
    
    // Keyboard support
    document.addEventListener('keydown', handleCarouselKeyPress);
    
    return true;
}

function updateCarousel() {
    if (carouselItems.length === 0) return;
    
    carouselItems.forEach((item, index) => {
        item.classList.remove('active', 'left', 'right');
        
        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
            item.classList.add('left');
        } else if (index === (currentIndex + 1) % carouselItems.length) {
            item.classList.add('right');
        }
    });
}

function carouselNext() {
    if (carouselItems.length === 0) return;
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}

function carouselPrev() {
    if (carouselItems.length === 0) return;
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

function startAutoplay() {
    if (!autoplayInterval && carouselItems.length > 0) {
        autoplayInterval = setInterval(carouselNext, 4000);
        console.log('▶️  Carousel autoplay started');
    }
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
        console.log('⏸️  Carousel autoplay paused');
    }
}

function setupCarouselControls() {
    // Find all carousel buttons
    const buttons = document.querySelectorAll('.carousel-btn');
    
    if (buttons.length >= 2) {
        buttons[0].addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('← Previous clicked');
            stopAutoplay();
            carouselPrev();
            setTimeout(startAutoplay, 300);
        });
        
        buttons[1].addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('→ Next clicked');
            stopAutoplay();
            carouselNext();
            setTimeout(startAutoplay, 300);
        });
        
        console.log('✨ Carousel buttons initialized');
    } else {
        console.warn(`⚠️ Found ${buttons.length} carousel buttons, expected 2`);
    }
}

function handleCarouselKeyPress(e) {
    if (e.key === 'ArrowLeft') {
        console.log('Keyboard: Arrow Left');
        stopAutoplay();
        carouselPrev();
        setTimeout(startAutoplay, 300);
    } else if (e.key === 'ArrowRight') {
        console.log('Keyboard: Arrow Right');
        stopAutoplay();
        carouselNext();
        setTimeout(startAutoplay, 300);
    }
}

// Initialize carousel when script loads
initCarousel();

// ===== MAGNETIC BUTTON HOVER =====
const magneticButtons = document.querySelectorAll('.cta-btn, .carousel-btn, .form-submit');

magneticButtons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const offset = {
            x: x * 0.18,
            y: y * 0.18
        };
        
        button.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ===== PROJECT CARD 3D TILT =====
// Already handled by carousel CSS transforms

// ===== SECTION SPOTLIGHT EFFECT =====
const spotlightSections = document.querySelectorAll('section');

spotlightSections.forEach((section) => {
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        section.style.setProperty('--spotlight-x', x + 'px');
        section.style.setProperty('--spotlight-y', y + 'px');
    });
});

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
        // Add your form submission logic here
    });
}

// ===== SMOOTH SCROLL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== KEYBOARD NAVIGATION (Accessibility) =====
// Already handled in carousel initialization

// ===== TICKER ANIMATION =====
const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
    // Clone ticker items for seamless looping
    const items = tickerTrack.innerHTML;
    tickerTrack.innerHTML = items + items;
}

// ===== LAZY LOADING OPTIMIZATION =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
    });
}

// ===== THEME DETECTION =====
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function updateTheme() {
    if (prefersDark.matches) {
        document.documentElement.style.colorScheme = 'dark';
    }
}

updateTheme();
prefersDark.addEventListener('change', updateTheme);

// ===== PERFORMANCE: DEBOUNCE SCROLL =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Throttled scroll operations
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ===== ACCESSIBILITY: REDUCE MOTION =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0s');
    document.documentElement.style.setProperty('--transition-duration', '0s');
}

console.log('✨ Dark Luxury Portfolio - Interactive Elements Loaded');
