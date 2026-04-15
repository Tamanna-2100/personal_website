document.addEventListener('DOMContentLoaded', () => {
    const revealTargets = document.querySelectorAll('.section-header, .project-card, .skill-card, .service-card, .info-item, .contact-form');

    revealTargets.forEach((el) => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const group = entry.target.parentElement;
            if (group) {
                const siblings = Array.from(group.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${Math.max(0, index) * 0.1}s`;
            }

            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.14
    });

    revealTargets.forEach((el) => revealObserver.observe(el));

    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach((button) => {
        button.addEventListener('mousemove', (event) => {
            const rect = button.getBoundingClientRect();
            const offsetX = event.clientX - (rect.left + rect.width / 2);
            const offsetY = event.clientY - (rect.top + rect.height / 2);

            button.style.transform = `translate(${offsetX * 0.18}px, ${offsetY * 0.18}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    const tickerTrack = document.querySelector('.ticker-track');
    if (tickerTrack) {
        tickerTrack.setAttribute('aria-hidden', 'true');
    }

    const projectsSection = document.querySelector('.projects-section');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectsSection && projectCards.length) {
        projectsSection.addEventListener('mousemove', (event) => {
            const rect = projectsSection.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            projectsSection.style.setProperty('--spotlight-x', `${x}px`);
            projectsSection.style.setProperty('--spotlight-y', `${y}px`);
        });

        projectCards.forEach((card) => {
            card.addEventListener('mousemove', (event) => {
                const rect = card.getBoundingClientRect();
                const relativeX = (event.clientX - rect.left) / rect.width;
                const relativeY = (event.clientY - rect.top) / rect.height;
                const tiltY = (relativeX - 0.5) * 10;
                const tiltX = (0.5 - relativeY) * 8;

                card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
                card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
                card.classList.add('project-active');
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
                card.classList.remove('project-active');
            });
        });
    }
});
