gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initMenuTabs();
    initMenuAnimations();
    initMenuBooking();
});

// Menu tabs functionality
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetMenu = this.getAttribute('data-menu');
            
            // Rimuovi active da tutti i tabs e contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            menuContents.forEach(content => content.classList.remove('active'));
            
            // Aggiungi active al tab cliccato e al content corrispondente
            this.classList.add('active');
            document.getElementById(targetMenu).classList.add('active');
            
            // Anima il cambio di tab
            gsap.from(`#${targetMenu}`, {
                duration: 0.5,
                opacity: 0,
                y: 20,
                ease: 'power2.out'
            });
            
            // Scroll to menu section
            const menuSection = document.getElementById(targetMenu);
            const offset = menuSection.offsetTop - 160; // Account for sticky nav
            
            gsap.to(window, {
                duration: 0.8,
                scrollTo: offset,
                ease: 'power2.out'
            });
        });
    });
    
    // Handle hash navigation (for links from home page)
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        const targetButton = document.querySelector(`[data-menu="${hash}"]`);
        if (targetButton) {
            setTimeout(() => {
                targetButton.click();
            }, 100);
        }
    }
}

// Menu animations
function initMenuAnimations() {
    // Page header animation
    gsap.timeline()
        .from('.header-content h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.header-content p', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5');
    

    
    // Menu categories animation
    gsap.utils.toArray('.category').forEach(category => {
        gsap.from(category, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
        
 
    });
    
    // Menu CTA animation
    gsap.from('.menu-cta .cta-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.menu-cta',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

}

// Menu item hover effects
function initMenuItemEffects() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                boxShadow: 'none',
                ease: 'power2.out'
            });
        });
    });
}



// Filter menu item
function filterMenuItems(searchTerm) {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const itemName = item.querySelector('h4').textContent.toLowerCase();
        const itemDescription = item.querySelector('p').textContent.toLowerCase();
        
        if (itemName.includes(searchTerm.toLowerCase()) || 
            itemDescription.includes(searchTerm.toLowerCase())) {
            gsap.to(item, {
                duration: 0.3,
                opacity: 1,
                height: 'auto',
                ease: 'power2.out'
            });
        } else {
            gsap.to(item, {
                duration: 0.3,
                opacity: 0.3,
                ease: 'power2.out'
            });
        }
    });
}

// Smooth scrolling between menu sections
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = section.offsetTop - 160;
        gsap.to(window, {
            duration: 0.8,
            scrollTo: offset,
            ease: 'power2.out'
        });
    }
}

// Price highlight animation
function animatePrices() {
    const prices = document.querySelectorAll('.price');
    
    gsap.from(prices, {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.menu-content.active',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Effects when tab changes
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tab-btn')) {
        setTimeout(() => {
            animatePrices();
            initMenuItemEffects();
        }, 100);
    }
});


