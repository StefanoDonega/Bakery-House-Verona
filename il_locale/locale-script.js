gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initLocaleAnimations();
    initLocationActions();
    initTeamEffects();
});

function initLocaleAnimations() {
    //  header animation
    gsap.timeline()
        .from('.header-content h1', {
            duration: 1.2,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.header-content p', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.6');
    
    // Story section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '.story-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    })
    .from('.story-label', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
    })
    .from('.story-text h2', {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.story-intro', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.story-text p', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.story-image', {
        duration: 1,
        opacity: 0,
        x: 50,
        ease: 'power2.out'
    }, '-=0.8');
    
    
    // Philosophy section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '.philosophy-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    })
    .from('.section-label', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
    })
    .from('.philosophy-text h2', {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.philosophy-point', {
        duration: 0.6,
        opacity: 0,
        x: -30,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.phil-image', {
        duration: 1,
        opacity: 0,
        x: 50,
        ease: 'power2.out'
    }, '-=0.8');
    
    
    // Location section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '.location-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    })
    .from('.location-info', {
        duration: 1,
        opacity: 0,
        x: -50,
        ease: 'power2.out'
    })
    .from('.contact-item', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.location-actions', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.location-map', {
        duration: 1,
        opacity: 0,
        x: 50,
        ease: 'power2.out'
    }, '-=0.8');
    
    // Final CTA animation
    gsap.from('.locale-cta .cta-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.locale-cta',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Location actions functionality
function initLocationActions() {
    const directionsBtn = document.querySelector('.location-actions .cta-button');
    const callBtn = document.querySelector('.location-actions .secondary-btn');
    
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animate button click
            gsap.to(this, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            setTimeout(() => {
                showDirectionsModal();
            }, 200);
        });
    }
    
    if (callBtn) {
        callBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animate button click
            gsap.to(this, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            setTimeout(() => {
                showCallModal();
            }, 200);
        });
    }
}
