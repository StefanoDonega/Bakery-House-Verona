gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initEventiAnimations();
    initEventBooking();
    initNewsletterForm();
    initGalleryEffects();
});

// Eventi page animations
function initEventiAnimations() {

    
    // Newsletter section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '.events-newsletter',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    })
    .from('.newsletter-text', {
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power2.out'
    })
    .from('.newsletter-form', {
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.7');
    
    // Final CTA animation
    gsap.from('.eventi-cta .cta-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.eventi-cta',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}





// Parallax effect for page header
gsap.to('.header-background', {
    ease: 'none',
    scrollTrigger: {
        trigger: '.page-header',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

