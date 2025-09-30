// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#carreiras' || targetId === '#blog') {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animation with Intersection Observer
const initScrollAnimations = () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
};

// Mobile menu functionality
const initMobileMenu = () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (toggle && navMenu) {
        if (window.innerWidth <= 768) {
            toggle.style.display = 'flex';

            toggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
            });

            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    toggle.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });
        } else {
            toggle.style.display = 'none';
            navMenu.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }

    initScrollAnimations();
    initMobileMenu();

    // Trigger initial animations
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});

// Re-initialize on resize
window.addEventListener('resize', function() {
    initMobileMenu();
});