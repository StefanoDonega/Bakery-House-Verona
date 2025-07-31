gsap.registerPlugin(ScrollTrigger);

// Variabili globali
let currentSlide = 0;
const totalSlides = 3;

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initCarousel();
    initDeliveryButtons();
    initBookingButtons();
});

// Navbar 
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.from('.logo-main', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.logo-subtitle', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.6')
    .from('.hero-catchphrase', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4')
    .from('#hero-cta', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        scale: 0.9,
        ease: 'back.out(1.7)'
    }, '-=0.4')
    .from('.scroll-indicator', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
    }, '-=0.3');

    // Parallax effect hero 
    gsap.to('.hero-background', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Scroll animations per le sezioni
function initScrollAnimations() {
    // About section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    })
    .from('.about-text', {
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power2.out'
    })
    .from('.about-image', {
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.7')
    .from('.feature', {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.5');


    // Delivery section animation
    gsap.from('.delivery-section', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.delivery-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });

    // Events section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '.events-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    })

    .from('.events-carousel', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.5');

    // Final CTA animation
    gsap.from('.final-cta .cta-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.final-cta',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Events carousel functionality
function initCarousel() {
    const cards = document.querySelectorAll('.event-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function showSlide(index) {
        // Nascondi tutte le card
        cards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Rimuovi active da tutti i dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostra la card corrente con animazione
        gsap.set(cards[index], { opacity: 0, y: 20 });
        cards[index].classList.add('active');
        gsap.to(cards[index], {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: 'power2.out'
        });
        
        // Attiva il dot corrispondente
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Event listeners per i controlli del carousel
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners per i dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-slide ogni 5 secondi
    setInterval(nextSlide, 5000);

    // Pausa auto-slide quando si fa hover sul carousel
    const carousel = document.querySelector('.events-carousel');
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    startAutoSlide();
}

// Delivery buttons functionality
function initDeliveryButtons() {
    const deliveryButtons = document.querySelectorAll('.delivery-btn');
    
    deliveryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const partner = this.getAttribute('data-partner');
            
            // Animazione del click
            gsap.to(this, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // Simula l'apertura dell'app di delivery
            setTimeout(() => {
                switch(partner) {
                    case 'justeat':
                        showDeliveryModal('Just Eat', 'Reindirizzamento a Just Eat...');
                        break;
                    case 'deliveroo':
                        showDeliveryModal('Deliveroo', 'Reindirizzamento a Deliveroo...');
                        break;
                    case 'toogoodtogo':
                        showDeliveryModal('Too Good To Go', 'Reindirizzamento a Too Good To Go...');
                        break;
                }
            }, 200);
        });
    });
}

// Booking buttons functionality
function initBookingButtons() {
    const bookingButtons = document.querySelectorAll('#hero-cta, #final-book-btn, .nav-link.cta-btn');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animazione del click
            gsap.to(this, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // Mostra il modal di prenotazione
            setTimeout(() => {
                showBookingModal();
            }, 200);
        });
    });
}

// Modal per le prenotazioni
function showBookingModal() {
    const modal = createModal('Prenota il tuo tavolo', `
        <div class="booking-form">
            <p>Grazie per aver scelto Bakery House!</p>
            <p>Per prenotare il tuo tavolo, contattaci:</p>
            <div class="contact-options">
                <a href="tel:+390451234567" class="contact-btn">
                    <i class="fas fa-phone"></i>
                    Chiama: 045 123 4567
                </a>
                <a href="mailto:info@bakeryhouse.it" class="contact-btn">
                    <i class="fas fa-envelope"></i>
                    Email: info@bakeryhouse.it
                </a>
            </div>
            <p class="note">Oppure passa direttamente in Via Roma 123, Verona</p>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    // Animazione di apertura
    gsap.from(modal.querySelector('.modal-content'), {
        duration: 0.4,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
}

// Modal per delivery
function showDeliveryModal(platform, message) {
    const modal = createModal(`Ordina con ${platform}`, `
        <div class="delivery-info">
            <div class="loading-spinner"></div>
            <p>${message}</p>
            <p class="note">In un'app reale, questa azione ti reindirizzerebbe all'app di ${platform}</p>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    // Animazione di apertura
    gsap.from(modal.querySelector('.modal-content'), {
        duration: 0.4,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    // Chiudi automaticamente dopo 3 secondi
    setTimeout(() => {
        closeModal(modal);
    }, 3000);
}

// Funzione per creare modals
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Event listener per chiudere il modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            closeModal(modal);
        }
    });
    
    // Stili per il modal
    addModalStyles();
    
    return modal;
}

// Funzione per chiudere i modals
function closeModal(modal) {
    gsap.to(modal.querySelector('.modal-content'), {
        duration: 0.3,
        scale: 0.8,
        opacity: 0,
        ease: 'power2.in',
        onComplete: () => {
            modal.remove();
        }
    });
    
    gsap.to(modal, {
        duration: 0.3,
        opacity: 0,
        ease: 'power2.in'
    });
}

// Aggiunge gli stili per i modals
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #2c1810;
            font-family: 'Playfair Display', serif;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #f0f0f0;
            color: #333;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .booking-form,
        .delivery-info {
            text-align: center;
        }
        
        .contact-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .contact-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 20px;
            background: linear-gradient(135deg, #d4844a, #8B4513);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .contact-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(212, 132, 74, 0.3);
        }
        
        .note {
            font-size: 0.9rem;
            color: #666;
            font-style: italic;
            margin-top: 1rem;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #d4844a;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 1rem auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(styles);
}

// Gestione del redimensionamento della finestra
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Preload delle immagini (se presenti)
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.onload = function() {
            img.src = this.src;
            img.classList.add('loaded');
        };
        imageLoader.src = img.getAttribute('data-src');
    });
}

// Lazy loading per le immagini
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loading');
                img.onload = () => {
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                };
                imageObserver.unobserve(img);
            }
        }
    });
}, observerOptions);

// Osserva tutte le immagini con data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Smooth reveal animations per elementi che entrano nel viewport
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Performance optimization: riduce la frequenza degli eventi scroll
let ticking = false;

function updateOnScroll() {
    // Logica per eventi scroll pesanti
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});


