// Project cards functionality
const projectCards = document.querySelectorAll('.project-card');
const projectsPerPage = 3;
let currentPage = 1;

function showProjects(page) {
    const start = projectsPerPage * (page - 1);
    const end = start + projectsPerPage;
    
    projectCards.forEach((card, index) => {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        if (index >= start && index < end) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, (index % 3) * 100);
        } else {
            card.style.display = 'none';
        }
    });
    
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(projectCards.length / 3);
    const pagination = document.querySelector('.pagination');
    
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('pagination-btn', 'prev-btn');
    prevBtn.innerHTML = '&larr;';
    prevBtn.disabled = currentPage === 1;
    prevBtn.setAttribute('aria-label', 'Previous page');
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showProjects(currentPage);
        }
    });
    pagination.appendChild(prevBtn);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('pagination-btn', 'page-num');
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            showProjects(currentPage);
        });
        pagination.appendChild(pageBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('pagination-btn', 'next-btn');
    nextBtn.innerHTML = '&rarr;';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.setAttribute('aria-label', 'Next page');
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showProjects(currentPage);
        }
    });
    pagination.appendChild(nextBtn);
}

// Intersection Observer for projects
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('projects-container') && !document.querySelector('.pagination .active')) {
                showProjects(currentPage);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const projectsContainer = document.querySelector('.projects-container');
if (projectsContainer) {
    projectObserver.observe(projectsContainer);
}

// Project card hover effects
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// Project button functionality
const projectBtns = document.querySelectorAll('.project-btn');
projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href') === '#') {
            e.preventDefault();
            const card = btn.closest('.project-card');
            const description = card.querySelector('.project-description');
            if (description) {
                description.classList.add('show');
            }
        }
    });
});

// Close description buttons
const closeButtons = document.querySelectorAll('.close-description');
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const description = btn.closest('.project-description');
        description.classList.remove('show');
    });
});

// Page load event
document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click and text selection
    document.addEventListener('contextmenu', e => (e.preventDefault(), false));
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserDrag = 'none';
    document.body.style.MozUserSelect = 'none';
    
    // Disable drag on images
    document.addEventListener('dragstart', e => (e.preventDefault(), false));
    
    // Disable Ctrl+C
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
            return e.preventDefault(), false;
        }
    });
    
    startFSASlideshow();
    animateWebsiteButtons();
});

// FSA Slideshow
function startFSASlideshow() {
    const fsaImg = document.querySelector('.project-card img[alt="FSA"]');
    if (!fsaImg) return;
    
    const images = [
        '/public/assets/projects/project2-0.webp',
        '/public/assets/projects/project2-1.webp',
        '/public/assets/projects/project2-2.webp'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        fsaImg.style.opacity = '0';
        setTimeout(() => {
            fsaImg.src = images[currentIndex];
            fsaImg.style.opacity = '1';
        }, 100);
    }, 10000);
}

// Animate website buttons
function animateWebsiteButtons() {
    const buttons = document.querySelectorAll('.website-btn');
    const section = document.querySelector('.websites-section');
    
    if (!buttons.length || !section) return;
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                buttons.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.style.opacity = '1';
                        btn.style.transform = 'translateX(0px)';
                    }, 150 * index);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(section);
    
    buttons.forEach(btn => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(30px)';
        btn.style.transition = 'all 0.6s ease';
    });
}

// Skills section - UPDATED WITH NEW SKILLS
document.addEventListener('DOMContentLoaded', function() {
    const skills = [
        {'name': 'Python', 'level': 5, 'description': 'Backend development, data analysis, machine learning'},
        {'name': 'JavaScript', 'level': 4, 'description': 'Web development, interactive features, DOM manipulation'},
        {'name': 'Java', 'level': 4, 'description': 'Object-oriented programming, enterprise applications'},
        {'name': 'C++', 'level': 4, 'description': 'System programming, algorithms, data structures'},
        {'name': 'SQL', 'level': 4, 'description': 'Database design, queries, data management'},
        {'name': 'PostgreSQL', 'level': 4, 'description': 'Relational database, advanced queries, optimization'},
        {'name': 'Flask', 'level': 4, 'description': 'Python web framework, RESTful APIs, backend development'},
        {'name': 'Django', 'level': 4, 'description': 'Full-stack Python framework, ORM, web applications'},
        {'name': 'PyTorch', 'level': 4, 'description': 'Deep learning, neural networks, model training'},
        {'name': 'Next.js', 'level': 4, 'description': 'React framework, SSR, static site generation'},
        {'name': 'React', 'level': 4, 'description': 'Frontend development, component-based UI, hooks'},
        {'name': 'LangChain', 'level': 4, 'description': 'LLM applications, RAG pipelines, AI agents'},
        {'name': 'Git', 'level': 4, 'description': 'Version control, collaboration, project management'},
        {'name': 'GitHub', 'level': 4, 'description': 'Code hosting, CI/CD, collaborative development'},
        {'name': 'Vercel', 'level': 4, 'description': 'Deployment platform, serverless functions, hosting'},
        {'name': 'Tableau', 'level': 4, 'description': 'Data visualization, business intelligence, dashboards'}
    ];
    
    const skillsContainer = document.querySelector('.skills-container');
    
    if (!skillsContainer) return;
    
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        
        const skillHeader = document.createElement('div');
        skillHeader.className = 'skill-header';
        
        const skillName = document.createElement('div');
        skillName.className = 'skill-name';
        skillName.textContent = skill.name;
        
        const skillLevel = document.createElement('div');
        skillLevel.className = 'skill-level';
        
        for (let i = 1; i <= 5; i++) {
            const dot = document.createElement('div');
            dot.className = i <= skill.level ? 'dot filled' : 'dot';
            skillLevel.appendChild(dot);
        }
        
        const skillInfo = document.createElement('div');
        skillInfo.className = 'skill-info';
        skillInfo.textContent = skill.description;
        
        skillHeader.appendChild(skillName);
        skillHeader.appendChild(skillLevel);
        skillCard.appendChild(skillHeader);
        skillCard.appendChild(skillInfo);
        skillsContainer.appendChild(skillCard);
    });
});

// Certificates carousel
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('resize', initCertificatesCarousel);
    
    function initCertificatesCarousel() {
        const firstGroup = document.querySelector('.certificates-group');
        if (!firstGroup) return;
        
        const clone = firstGroup.cloneNode(true);
        const track = document.querySelector('.certificates-track');
        if (!track) return;
        
        const secondGroup = track.querySelector('.certificates-group:nth-child(2)');
        if (secondGroup) {
            secondGroup.remove();
        }
        track.appendChild(clone);
        
        const groupWidth = firstGroup.offsetWidth;
        let isDragging = false;
        let startX, scrollLeft, animationId;
        let speed = 0.5;
        let offset = 0;
        
        function autoScroll() {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            function animate() {
                offset -= speed;
                
                if (Math.abs(offset) >= groupWidth && groupWidth > 0) {
                    offset = 0;
                }
                
                track.style.transform = 'translateX(' + offset + 'px)';
                animationId = requestAnimationFrame(animate);
            }
            animate();
        }
        
        autoScroll();
        
        const container = document.querySelector('.certificates-scroll-container');
        if (!container) return;
        
        // Mouse events
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = offset;
            cancelAnimationFrame(animationId);
        });
        
        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = 'grab';
            autoScroll();
        });
        
        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.style.cursor = 'grab';
            autoScroll();
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            offset = scrollLeft + walk;
            
            if (groupWidth > 0 && Math.abs(offset) >= groupWidth) {
                offset = offset % groupWidth;
                scrollLeft = offset;
                startX = e.pageX - track.offsetLeft;
            }
            
            track.style.transform = 'translateX(' + offset + 'px)';
        });
        
        // Certificate card click events
        const cards = document.querySelectorAll('.certificate-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                if (url && url !== '#' && url !== 'undefined') {
                    window.open(url, '_blank');
                }
            });
            
            card.addEventListener('mouseenter', function() {
                cancelAnimationFrame(animationId);
                this.style.boxShadow = '0 15px 35px rgba(100, 100, 255, 0.4), 0 0 20px rgba(100, 100, 255, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                autoScroll();
                this.style.boxShadow = '';
            });
        });
        
        // Touch events
        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - track.offsetLeft;
            scrollLeft = offset;
            cancelAnimationFrame(animationId);
        }, { passive: false });
        
        container.addEventListener('touchend', () => {
            isDragging = false;
            autoScroll();
        });
        
        container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const x = e.touches[0].pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            offset = scrollLeft + walk;
            
            if (groupWidth > 0 && Math.abs(offset) >= groupWidth) {
                offset = offset % groupWidth;
                scrollLeft = offset;
                startX = e.touches[0].pageX - track.offsetLeft;
            }
            
            track.style.transform = 'translateX(' + offset + 'px)';
            e.preventDefault();
        }, { passive: false });
        
        function updateSpeed() {
            speed = window.innerWidth > 1200 ? 1 : 0.5;
        }
        
        window.addEventListener('resize', () => {
            updateSpeed();
            const newWidth = firstGroup.offsetWidth;
            if (newWidth > 0 && Math.abs(newWidth - groupWidth) > 100) {
                offset = 0;
                track.style.transform = 'translateX(0px)';
            }
        });
        
        updateSpeed();
    }
});
