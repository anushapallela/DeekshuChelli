document.addEventListener('DOMContentLoaded', () => {

    const loaderWrapper = document.getElementById('loader-wrapper');
    const pageContent = document.getElementById('page-content');

    // --- Loader Logic ---
    // Hide loader and show page content after a delay
    setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        pageContent.classList.add('visible');
        pageContent.classList.remove('hidden-initial');

        // Remove loader from the DOM after transition
        loaderWrapper.addEventListener('transitionend', () => {
            loaderWrapper.style.display = 'none';
        });

    }, 2800); // 2.8 seconds, matching the heartbeat animation loop

    // --- The rest of your script ---
    const nav = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section, .hero');

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active link highlighting on scroll
    const onScroll = () => {
        const scrollPosition = window.scrollY + nav.offsetHeight + 100;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (section.id === link.getAttribute('href').substring(1)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', onScroll);


    // Parallax Effect
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${offset * 0.4}px)`;
    });

    // Sparkling Particles
    const sparkleContainer = document.getElementById('sparkle-container');
    const sparkleCount = 50;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * -100}vh`; // Start above the screen
        sparkle.style.animationDelay = `${Math.random() * 10}s`;
        sparkle.style.animationDuration = `${5 + Math.random() * 5}s`;
        sparkleContainer.appendChild(sparkle);
    }
    
    // Animate elements on scroll (fade-in effect)
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    hiddenElements.forEach(el => observer.observe(el));
});