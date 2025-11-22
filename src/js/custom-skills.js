document.addEventListener('DOMContentLoaded', function () {
    const skills = [
        { name: 'Python', level: 5, info: 'Data / ML, Flask, scripting' },
        { name: 'JavaScript', level: 5, info: 'Frontend interactivity, DOM' },
        { name: 'TypeScript', level: 4, info: 'Typed JavaScript, tooling' },
        { name: 'HTML', level: 4, info: 'Semantic markup, accessibility' },
        { name: 'CSS', level: 5, info: 'Responsive layouts, animations' },
        { name: 'SQL', level: 4, info: 'SQLite, queries, data modeling' },
        { name: 'Git', level: 5, info: 'Version control, collaboration' },
        { name: 'Hugging Face', level: 3, info: 'Transformers / model usage' },
        { name: 'Pillow', level: 2, info: 'Image preprocessing (PIL)' }
    ];

    const container = document.querySelector('.skills-container');
    if (!container) return;
    // Remove any existing generated content
    container.innerHTML = '';

    skills.forEach(s => {
        const card = document.createElement('div');
        card.className = 'skill-card';

        const header = document.createElement('div');
        header.className = 'skill-header';

        const name = document.createElement('div');
        name.className = 'skill-name';
        name.textContent = s.name;

        const level = document.createElement('div');
        level.className = 'skill-level';

        for (let i = 1; i <= 5; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i <= s.level ? ' filled' : '');
            level.appendChild(dot);
        }

        header.appendChild(name);
        header.appendChild(level);

        const info = document.createElement('div');
        info.className = 'skill-info';
        info.textContent = s.info;

        card.appendChild(header);
        card.appendChild(info);
        container.appendChild(card);
    });
});