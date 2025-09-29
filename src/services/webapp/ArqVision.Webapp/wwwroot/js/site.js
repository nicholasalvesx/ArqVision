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
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animation with Intersection Observer (mais eficiente)
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: deixar de observar após a animação
            // fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Animate progress bars when in view
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width') || bar.style.width;
            bar.style.width = '0%';

            setTimeout(() => {
                bar.style.width = width;
                bar.setAttribute('data-width', width);
            }, 300);

            // Para de observar após a animação
            progressObserver.unobserve(bar);
        }
    });
}, {
    threshold: 0.5
});

progressBars.forEach(bar => {
    // Salva a largura original como atributo
    const width = bar.style.width;
    bar.setAttribute('data-width', width);
    progressObserver.observe(bar);
});

// Mobile menu toggle (opcional - para futura implementação)
const initMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');

    if (window.innerWidth <= 768) {
        // Adicionar botão de menu mobile se não existir
        if (!document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            toggle.style.cssText = `
                display: none;
                flex-direction: column;
                background: none;
                border: none;
                cursor: pointer;
                padding: 5px;
            `;

            const spans = toggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.cssText = `
                    display: block;
                    width: 25px;
                    height: 3px;
                    background: var(--accent);
                    margin: 3px 0;
                    transition: 0.3s;
                `;
            });

            document.querySelector('.nav').appendChild(toggle);
        }
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();

    // Adiciona padding ao body para compensar o header fixo
    const headerHeight = document.getElementById('header').offsetHeight;
    document.body.style.paddingTop = headerHeight + 'px';

    // Trigger initial animations
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});

// Re-initialize on resize
window.addEventListener('resize', initMobileMenu);