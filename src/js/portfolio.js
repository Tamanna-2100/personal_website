(function () {
  "use strict";

  const INTRO_TIMING = Object.freeze({
    blank: 600,
    handwriting: 2400,
    captionDelay: 550,
    hold: 1000,
    fade: 800,
    badgeStart: 4800,
    badgeDrop: 1200,
    heroStart: 5600,
    heroStep: 450,
    heroDuration: 700,
    splashWipe: 2200,
    heroWipe: 1200,
    quickFade: 800,
    reducedFade: 400,
    deckCrossfade: 140
  });

  const content = window.PORTFOLIO_CONTENT;
  if (!content) return;

  const { profile, projects, skills, certificates, timeline, achievements, ui } = content;
  const main = document.querySelector("#main");
  const escapeHtml = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const sectionHeading = (number, label, title, id) => `<header class="section-heading"><p class="eyebrow">${number} · ${escapeHtml(label)}</p><h2 id="${id}-title">${escapeHtml(title[0])} <em>${escapeHtml(title[1])}</em></h2></header>`;
  const chips = (items) => items.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("");
  const linkAttrs = "target=\"_blank\" rel=\"noopener noreferrer\"";

  document.documentElement.classList.add("intro-pending");

  document.title = `${profile.name} | AI Research`;
  document.querySelector('meta[name="description"]').content = profile.summary;

  document.querySelector("#navigation-links").innerHTML = ui.navigation.map((label) => {
    const id = label.toLowerCase();
    return `<a class="nav-link" href="#${id}">${escapeHtml(label)}</a>`;
  }).join("");

  main.innerHTML = `
    <div class="splash" aria-hidden="true"><div class="splash-signature">${scriptNameMarkup("splash-writing")}</div><span>${escapeHtml(ui.introSplashCaption)}</span></div>
    <div class="intro-curtain" aria-hidden="true"></div>
    <section class="intro section-wrap" id="intro" aria-labelledby="intro-title">
      <div class="intro-copy">
        <p class="eyebrow intro-label">${escapeHtml(ui.sectionLabels.intro)}</p>
        <h1 id="intro-title"><span class="hello intro-hello">Hello,</span></h1>
        <div class="intro-name-line"><span class="intro-im">I'm</span>${scriptNameMarkup("hero-signature")}</div>
        <p class="intro-role">${escapeHtml(ui.introRole)}</p>
        <p class="intro-summary">${escapeHtml(ui.introSummary)}</p>
        <div class="intro-actions"><a class="button button-primary" href="#work">${escapeHtml(ui.introButton)} <span aria-hidden="true">↘</span></a>
        <a class="scroll-note" href="#about">${escapeHtml(ui.introScroll)} <span aria-hidden="true">↓</span></a></div>
      </div>
      <div class="id-stage" aria-label="Student identification badge">
        <div class="badge-position"><div class="badge-drop">
          <div class="lanyard-ribbon" aria-hidden="true"></div>
          <div class="lanyard-hardware" aria-hidden="true"><span class="swivel-clip"></span><span class="metal-ring"></span></div>
          <div class="badge-rig" role="group" aria-label="A swinging student ID badge for Tamanna Gaur">
          <div class="badge-card">
            <span class="badge-slot" aria-hidden="true"></span>
            <div class="badge-topline"><span>TAMANNA GAUR</span><svg class="nfc-mark" viewBox="0 0 24 24" aria-label="NFC"><path d="M4 8.5a5 5 0 0 1 0 7M8 5a10 10 0 0 1 0 14M12 2a15 15 0 0 1 0 20M17 7v10M17 7l4 10M21 7v10"/></svg></div>
            <img class="badge-photo" src="profile_pic.jpg" alt="Tamanna Gaur" loading="eager">
            <div class="badge-name"><span>Tamanna</span><small>Gaur</small></div>
            <span class="badge-role">M.S. AI ALGORITHMS &amp; SYSTEMS</span>
            <span class="badge-status"><i></i>${escapeHtml(ui.badgeStatus)}</span>
            <div class="badge-bottom"><span>WAYNE STATE UNIVERSITY<br>CLASS OF 2028</span><a class="badge-qr" href="${escapeHtml(profile.site)}" ${linkAttrs} aria-label="Scan QR code to visit Tamanna's website">${qrSvg(profile.site)}</a></div>
            <span class="badge-barcode" aria-hidden="true"></span>
          </div>
          </div>
        </div></div>
        <span class="badge-caption">${escapeHtml(ui.badgeCaption)}</span>
      </div>
      <a class="intro-down" href="#skills" aria-label="Continue to skills">↓</a>
    </section>

    <section class="section-wrap skills-section" id="skills" aria-labelledby="skills-title">
      ${sectionHeading("01", ui.sectionLabels.skills, ui.sectionTitles.skills, "skills")}
      <p class="section-intro">${escapeHtml(ui.skillHint)}</p>
      <div class="family-filters" role="group" aria-label="Filter technologies by family"></div>
      <div class="skills-layout">
        <div class="element-grid" role="list" aria-label="Technology skills"></div>
        <aside class="skill-detail" aria-live="polite" aria-label="Technology project details">
          <div class="detail-empty"><span class="detail-mark">✳</span><p>${escapeHtml(ui.skillDefault)}</p></div>
        </aside>
      </div>
    </section>

    <section class="section-wrap work-section" id="work" aria-labelledby="work-title">
      ${sectionHeading("02", ui.sectionLabels.work, ui.sectionTitles.work, "work")}
      <p class="section-intro">${escapeHtml(ui.projectIntro)}</p>
      <div class="project-row" aria-label="Project deck">
        <button type="button" class="deck-control deck-prev" aria-label="Previous project">←</button>
        <div class="project-deck">
          <article class="project-expanded" aria-live="polite"></article>
          <div class="project-tabs" role="group" aria-label="Next two projects"></div>
        </div>
        <button type="button" class="deck-control deck-next" aria-label="Next project">→</button>
      </div>
      <div class="project-counter" aria-live="polite"></div>
    </section>

    <section class="section-wrap certificates-section" id="certificates" aria-labelledby="certificates-title">
      ${sectionHeading("03", ui.sectionLabels.certificates, ui.sectionTitles.certificates, "certificates")}
      <p class="section-intro">${escapeHtml(ui.certificatesIntro)}</p>
      <div class="certificate-list"></div>
    </section>

    <section class="section-wrap timeline-section" id="experience" aria-labelledby="experience-title">
      ${sectionHeading("04", ui.sectionLabels.experience, ui.sectionTitles.experience, "experience")}
      <div class="timeline"><div class="timeline-line"><span></span></div><div class="timeline-items"></div></div>
    </section>

    <section class="section-wrap achievements-section" id="achievements" aria-labelledby="achievements-title">
      ${sectionHeading("05", ui.sectionLabels.achievements, ui.sectionTitles.achievements, "achievements")}
      <div class="achievement-grid"></div>
    </section>

    <section class="section-wrap about-section" id="about" aria-labelledby="about-title">
      ${sectionHeading("06", ui.sectionLabels.about, ui.sectionTitles.about, "about")}
      <div class="about-layout">
        <img src="profile_pic.jpg" alt="Tamanna Gaur" loading="lazy" class="about-photo">
        <div class="about-copy"><p>${escapeHtml(profile.about)}</p><div class="about-links">
          <a href="${escapeHtml(profile.resume)}" target="_blank" rel="noopener noreferrer" data-resume-link>${escapeHtml(ui.links.resume)} <span aria-hidden="true">↗</span></a>
          <a href="${escapeHtml(profile.github)}" ${linkAttrs}>${escapeHtml(ui.links.github)} <span aria-hidden="true">↗</span></a>
          <a href="${escapeHtml(profile.linkedin)}" ${linkAttrs}>${escapeHtml(ui.links.linkedin)} <span aria-hidden="true">↗</span></a>
          <a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(ui.links.email)} <span aria-hidden="true">↗</span></a>
        </div></div>
      </div>
    </section>

    <section class="section-wrap contact-section" id="contact" aria-labelledby="contact-title">
      ${sectionHeading("07", ui.sectionLabels.contact, ui.sectionTitles.contact, "contact")}
      <a class="button button-primary" href="mailto:${escapeHtml(profile.email)}">${escapeHtml(ui.letsTalk)} <span aria-hidden="true">↗</span></a>
      <span class="contact-location">${escapeHtml(profile.location)}</span>
    </section>`;

  document.querySelector("#site-footer").innerHTML = `<span>${escapeHtml(profile.name)}</span><span>${escapeHtml(ui.footerNote)}</span><a href="#intro" aria-label="${escapeHtml(ui.links.backToTop)}">${escapeHtml(ui.links.backToTop)} ↑</a>`;

  renderSkills();
  renderProjects(0);
  renderCertificates();
  renderTimeline();
  renderAchievements();
  setupMotion();
  setupBadgePhysics();
  setupIntro();

  function scriptNameMarkup(className) {
    return `<span class="${className} script-name" aria-label="${escapeHtml(profile.firstName)}">${escapeHtml(profile.firstName)}</span>`;
  }

  function qrSvg(value) {
    const version = 4;
    const size = 17 + version * 4;
    const dataCapacity = 80;
    const eccLength = 20;
    const bits = [];
    const appendBits = (number, count) => {
      for (let bit = count - 1; bit >= 0; bit--) bits.push((number >>> bit) & 1);
    };
    const bytes = new TextEncoder().encode(value);
    appendBits(4, 4);
    appendBits(bytes.length, 8);
    bytes.forEach((byte) => appendBits(byte, 8));
    appendBits(0, Math.min(4, dataCapacity * 8 - bits.length));
    while (bits.length % 8) bits.push(0);
    const data = [];
    for (let index = 0; index < bits.length; index += 8) data.push(bits.slice(index, index + 8).reduce((acc, bit) => (acc << 1) | bit, 0));
    for (let pad = 0; data.length < dataCapacity; pad++) data.push(pad % 2 ? 0x11 : 0xec);
    const gfMultiply = (left, right) => {
      let product = 0;
      for (let bit = 7; bit >= 0; bit--) {
        product = (product << 1) ^ ((product >>> 7) * 0x11d);
        if ((right >>> bit) & 1) product ^= left;
      }
      return product;
    };
    let generator = [1];
    let root = 1;
    for (let degree = 0; degree < eccLength; degree++) {
      const next = new Array(generator.length + 1).fill(0);
      generator.forEach((coefficient, index) => {
        next[index] ^= coefficient;
        next[index + 1] ^= gfMultiply(coefficient, root);
      });
      generator = next;
      root = gfMultiply(root, 2);
    }
    const message = [...data, ...new Array(eccLength).fill(0)];
    data.forEach((_, index) => {
      const factor = message[index];
      generator.forEach((coefficient, offset) => { message[index + offset] ^= gfMultiply(coefficient, factor); });
    });
    const allBytes = [...data, ...message.slice(data.length)];
    const matrix = Array.from({ length: size }, () => new Array(size).fill(false));
    const reserved = Array.from({ length: size }, () => new Array(size).fill(false));
    const setFunction = (row, column, dark) => {
      if (row < 0 || column < 0 || row >= size || column >= size) return;
      matrix[row][column] = dark;
      reserved[row][column] = true;
    };
    const finder = (row, column) => {
      for (let dy = -1; dy <= 7; dy++) for (let dx = -1; dx <= 7; dx++) {
        const distance = Math.max(Math.abs(dx - 3), Math.abs(dy - 3));
        setFunction(row + dy, column + dx, distance === 3 || distance <= 1);
      }
    };
    finder(0, 0);
    finder(0, size - 7);
    finder(size - 7, 0);
    for (let index = 8; index < size - 8; index++) {
      setFunction(6, index, index % 2 === 0);
      setFunction(index, 6, index % 2 === 0);
    }
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setFunction(size - 7 + dy, size - 7 + dx, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    const format = (0b01 << 3) | 0;
    let remainder = format << 10;
    for (let bit = 14; bit >= 10; bit--) if ((remainder >>> bit) & 1) remainder ^= 0x537 << (bit - 10);
    const formatBits = ((format << 10) | remainder) ^ 0x5412;
    for (let bit = 0; bit <= 5; bit++) setFunction(bit, 8, ((formatBits >>> bit) & 1) !== 0);
    setFunction(7, 8, ((formatBits >>> 6) & 1) !== 0);
    setFunction(8, 8, ((formatBits >>> 7) & 1) !== 0);
    setFunction(8, 7, ((formatBits >>> 8) & 1) !== 0);
    for (let bit = 9; bit < 15; bit++) setFunction(8, 14 - bit, ((formatBits >>> bit) & 1) !== 0);
    for (let bit = 0; bit < 8; bit++) setFunction(8, size - 1 - bit, ((formatBits >>> bit) & 1) !== 0);
    for (let bit = 8; bit < 15; bit++) setFunction(size - 15 + bit, 8, ((formatBits >>> bit) & 1) !== 0);
    setFunction(size - 8, 8, true);
    let bitIndex = 0;
    for (let column = size - 1; column > 0; column -= 2) {
      if (column === 6) column--;
      for (let vertical = 0; vertical < size; vertical++) {
        const row = ((column + 1) & 2) === 0 ? size - 1 - vertical : vertical;
        for (let offset = 0; offset < 2; offset++) {
          const currentColumn = column - offset;
          if (reserved[row][currentColumn]) continue;
          const raw = bitIndex < allBytes.length * 8 ? (allBytes[bitIndex >>> 3] >>> (7 - (bitIndex & 7))) & 1 : 0;
          matrix[row][currentColumn] = Boolean(raw ^ ((row + currentColumn) % 2 === 0 ? 1 : 0));
          bitIndex++;
        }
      }
    }
    const darkModules = [];
    matrix.forEach((row, y) => row.forEach((dark, x) => { if (dark) darkModules.push(`<rect x="${x + 4}" y="${y + 4}" width="1" height="1"/>`); }));
    return `<svg viewBox="0 0 ${size + 8} ${size + 8}" role="img" aria-label="QR code to Tamanna's website" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="white"/>${darkModules.join("")}</svg>`;
  }

  function renderSkills() {
    const families = ["All", ...new Set(skills.map((skill) => skill.family))];
    const filters = document.querySelector(".family-filters");
    const grid = document.querySelector(".element-grid");
    let activeFamily = "All";
    let pinned = false;

    filters.innerHTML = families.map((family, index) => `<button type="button" class="filter-chip${index === 0 ? " is-active" : ""}" data-family="${escapeHtml(family)}" aria-pressed="${index === 0}">${escapeHtml(family)}</button>`).join("");
    grid.setAttribute("role", "group");
    grid.innerHTML = skills.map((skill, index) => `<button class="element-tile tile-${skill.family.toLowerCase().replace(/[^a-z]+/g, "-")}" type="button" data-skill="${index}" data-family="${escapeHtml(skill.family)}" aria-label="${escapeHtml(skill.name)}, ${escapeHtml(skill.family)}"><span class="atomic-number">${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(skill.symbol)}</strong><span class="element-name">${escapeHtml(skill.name)}</span></button>`).join("");

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-family]");
      if (!button) return;
      activeFamily = button.dataset.family;
      filters.querySelectorAll("button").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      grid.querySelectorAll(".element-tile").forEach((tile) => tile.classList.toggle("is-dimmed", activeFamily !== "All" && tile.dataset.family !== activeFamily));
    });

    grid.addEventListener("pointerover", (event) => {
      if (pinned) return;
      const tile = event.target.closest(".element-tile");
      if (tile) showSkill(Number(tile.dataset.skill));
    });
    grid.addEventListener("focusin", (event) => {
      if (!pinned && event.target.matches(".element-tile")) showSkill(Number(event.target.dataset.skill));
    });
    grid.addEventListener("click", (event) => {
      const tile = event.target.closest(".element-tile");
      if (!tile) return;
      if (pinned && tile.classList.contains("is-selected")) {
        pinned = false;
        tile.classList.remove("is-selected");
        showSkill(Number(tile.dataset.skill));
      } else {
        pinned = true;
        grid.querySelectorAll(".element-tile").forEach((item) => item.classList.toggle("is-selected", item === tile));
        showSkill(Number(tile.dataset.skill));
      }
    });
    document.addEventListener("click", (event) => {
      if (pinned && !event.target.closest(".element-tile, .skill-detail")) {
        pinned = false;
        grid.querySelectorAll(".is-selected").forEach((item) => item.classList.remove("is-selected"));
        resetSkill();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && pinned) {
        pinned = false;
        grid.querySelectorAll(".is-selected").forEach((item) => item.classList.remove("is-selected"));
        resetSkill();
      }
    });

    function showSkill(index) {
      const skill = skills[index];
      const detail = document.querySelector(".skill-detail");
      const matches = projects.filter((project) => project.tech.some((tech) => technologyMatches(skill.name, tech)));
      const projectRows = matches.length ? matches.map((project) => {
        const title = project.github ? `<a href="${escapeHtml(project.github)}" ${linkAttrs}>${escapeHtml(project.name)} <span aria-hidden="true">↗</span></a>` : project.live ? `<a href="${escapeHtml(project.live)}" ${linkAttrs}>${escapeHtml(project.name)} · Live <span aria-hidden="true">↗</span></a>` : `<span class="plain-project">${escapeHtml(project.name)}</span>`;
        return `<li><div class="skill-project-title">${title}<small>${escapeHtml(project.category)}</small></div><p>${escapeHtml(project.description)}</p>${project.live && project.github ? `<a class="live-link" href="${escapeHtml(project.live)}" ${linkAttrs}>Live ↗</a>` : ""}</li>`;
      }).join("") : `<li class="skill-empty">${skill.coursework ? escapeHtml(ui.courseworkFallback) : escapeHtml(ui.projectUsedFallback)}</li>`;
      detail.innerHTML = `<div class="skill-detail-content"><p class="eyebrow">${escapeHtml(skill.family)}</p><h3>${escapeHtml(skill.name)}</h3><p class="skill-description">${escapeHtml(skill.detail)}</p><p class="detail-list-label">${escapeHtml(ui.projectListLabel)}</p><ul>${projectRows}</ul><p class="unpin-note">${escapeHtml(ui.unpin)}</p></div>`;
      detail.classList.add("has-content", "is-open");
      detail.setAttribute("aria-label", `${skill.name} project details`);
    }

    function resetSkill() {
      const detail = document.querySelector(".skill-detail");
      detail.innerHTML = `<div class="detail-empty"><span class="detail-mark" aria-hidden="true">✳</span><p>${escapeHtml(ui.skillDefault)}</p></div>`;
      detail.classList.remove("has-content", "is-open");
      detail.setAttribute("aria-label", "Technology project details");
    }
  }

  function technologyMatches(skillName, projectTech) {
    const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "");
    const skill = normalize(skillName);
    const tech = normalize(projectTech);
    if (skill === tech || (skill.length > 3 && tech.startsWith(skill))) return true;
    const equivalents = {
      "llmsrag": ["rag"], "openaiapi": ["openai", "openaigpt4"], "nlptransformers": ["nlp"],
      "pandas": ["pandas"], "postgresql": ["postgres"], "python": ["python"],
      "pytorch": ["pytorch"], "cnncomputervision": ["computervision", "cnn"],
      "javascript": ["javascript"], "html": ["html5"], "css": ["css3"], "ml": ["ml"]
    };
    return (equivalents[skill] || []).some((alias) => tech === normalize(alias));
  }

  function renderProjects(index) {
    const panel = document.querySelector(".project-expanded");
    const tabs = document.querySelector(".project-tabs");
    const deck = document.querySelector(".project-deck");
    const previous = document.querySelector(".deck-prev");
    const next = document.querySelector(".deck-next");
    const counter = document.querySelector(".project-counter");
    let selected = index;
    const draw = () => {
      const project = projects[selected];
      const media = project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt || project.name)}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('is-placeholder')">` : "";
      const image = `<div class="project-visual${project.image ? "" : " is-placeholder"}">${media}<div class="placeholder-art" aria-hidden="true"><span>${String(selected + 1).padStart(2, "0")}</span><i></i><b>${escapeHtml(project.name)}</b></div></div>`;
      const githubAction = project.github ? `<a class="button button-primary" href="${escapeHtml(project.github)}" ${linkAttrs}>View on GitHub ↗</a>${project.teamRepo ? `<span class="team-repo-note">team repo</span>` : ""}` : "";
      const liveAction = project.live ? `<a class="button button-secondary" href="${escapeHtml(project.live)}" ${linkAttrs}>${project.github ? "Live demo" : "View live"} ↗</a>` : "";
      panel.innerHTML = `<div class="project-copy"><p class="eyebrow">${String(selected + 1).padStart(2, "0")} · ${escapeHtml(project.category)}</p><h3>${escapeHtml(project.name)}</h3><p class="project-description">${escapeHtml(project.description)}</p>${project.highlights.length ? `<ul class="project-highlights">${project.highlights.slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}<div class="project-chips">${chips(project.tech)}</div><div class="project-actions">${githubAction}${liveAction}</div></div>${image}`;
      tabs.innerHTML = [1, 2].map((offset) => {
        const projectIndex = (selected + offset) % projects.length;
        const item = projects[projectIndex];
        return `<button class="project-tab" type="button" aria-label="Show project ${projectIndex + 1}: ${escapeHtml(item.name)}" data-project="${projectIndex}"><span class="side-project-number">${String(projectIndex + 1).padStart(2, "0")}</span><span class="side-project-name">${escapeHtml(item.name)}</span><span class="side-project-arrow" aria-hidden="true">→</span></button>`;
      }).join("");
      panel.id = "work-panel";
      panel.setAttribute("aria-label", `Project ${selected + 1}: ${project.name}`);
      counter.textContent = `${String(selected + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
    };
    const selectProject = (projectIndex, direction = projectIndex < selected ? "prev" : "next") => {
      if (projectIndex === selected) return;
      deck.dataset.direction = direction;
      document.documentElement.classList.add(`project-${direction}`);
      const commit = () => {
        selected = (projectIndex + projects.length) % projects.length;
        draw();
      };
      if (document.startViewTransition && !document.hidden) {
        const transition = document.startViewTransition(commit);
        transition.finished.then(() => {
          document.documentElement.classList.remove("project-prev", "project-next");
          delete deck.dataset.direction;
        }, () => {
          document.documentElement.classList.remove("project-prev", "project-next");
          delete deck.dataset.direction;
        });
        transition.updateCallbackDone.catch(() => {});
      } else {
        panel.classList.add("is-switching-out");
        tabs.classList.add("is-switching-out");
        window.setTimeout(() => {
          commit();
          panel.classList.add("is-switching-in");
          tabs.classList.add("is-switching-in");
          requestAnimationFrame(() => {
            panel.classList.remove("is-switching-out", "is-switching-in");
            tabs.classList.remove("is-switching-out", "is-switching-in");
            document.documentElement.classList.remove("project-prev", "project-next");
            delete deck.dataset.direction;
          });
        }, 300);
      }
    };
    draw();
    tabs.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-project]");
      if (button) selectProject(Number(button.dataset.project), "next");
    });
    previous.addEventListener("click", () => selectProject(selected - 1, "prev"));
    next.addEventListener("click", () => selectProject(selected + 1, "next"));
    deck.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? "next" : "prev";
      selectProject(selected + (direction === "next" ? 1 : -1), direction);
    });
    let touchStartX = 0;
    deck.addEventListener("pointerdown", (event) => { touchStartX = event.clientX; });
    deck.addEventListener("pointerup", (event) => {
      const delta = event.clientX - touchStartX;
      if (Math.abs(delta) < 70) return;
      const direction = delta < 0 ? "next" : "prev";
      selectProject(selected + (direction === "next" ? 1 : -1), direction);
    });
  }

  function renderCertificates() {
    document.querySelector(".certificate-list").innerHTML = certificates.map((certificate, index) => {
      const title = certificate.pdf ? `<a href="${escapeHtml(certificate.pdf)}" ${linkAttrs}>${escapeHtml(certificate.name)} <span aria-hidden="true">↗</span></a>` : `<span>${escapeHtml(certificate.name)}</span>`;
      return `<div class="certificate-row"><span class="certificate-index">${String(index + 1).padStart(2, "0")}</span><div class="certificate-name">${title}<small>${escapeHtml(certificate.issuer || "")}</small></div></div>`;
    }).join("");
  }

  function renderTimeline() {
    document.querySelector(".timeline-items").innerHTML = timeline.map((item, index) => {
      const side = index % 2 === 0 ? "left" : "right";
      const card = `<div class="timeline-card"><p class="eyebrow">${escapeHtml(item.tag)}</p><h3>${escapeHtml(item.title)}</h3><p class="timeline-org">${escapeHtml(item.organization)}</p><p class="timeline-dates">${escapeHtml(item.dates)}</p>${item.bullets.length ? `<ul>${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>` : ""}<div class="timeline-chips">${chips(item.skills)}</div></div>`;
      return `<article class="timeline-item reveal side-${side}${index < 2 ? " is-featured" : ""}"><div class="timeline-side timeline-left">${side === "left" ? card : ""}</div><div class="timeline-center"><span class="timeline-year">${escapeHtml(item.year)}</span><span class="timeline-node" aria-hidden="true"></span></div><div class="timeline-side timeline-right">${side === "right" ? card : ""}</div></article>`;
    }).join("");
  }

  function renderAchievements() {
    document.querySelector(".achievement-grid").innerHTML = achievements.map((item, index) => `<article class="achievement-card reveal"><div class="achievement-icon">${escapeHtml(item.icon)}</div><p class="eyebrow">${String(index + 1).padStart(2, "0")} · RECOGNITION</p><h3>${escapeHtml(item.label)}</h3><p>${escapeHtml(item.detail)}</p></article>`).join("");
  }

  function setupMotion() {
    const navLinks = [...document.querySelectorAll(".nav-link")];
    navLinks[0].classList.add("is-current");
    navLinks[0].setAttribute("aria-current", "location");
    const targetIds = ["about", "skills", "work", "experience", "achievements", "contact"];
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const current = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-current", current);
          if (current) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-38% 0px -52% 0px" });
    targetIds.forEach((id) => {
      const target = document.getElementById(id);
      if (target) navObserver.observe(target);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

    const timelineSection = document.querySelector(".timeline");
    const updateTimeline = () => {
      const rect = timelineSection.getBoundingClientRect();
      const distance = window.innerHeight * 0.7;
      const progress = Math.max(0, Math.min(1, (distance - rect.top) / (rect.height + distance - window.innerHeight)));
      timelineSection.style.setProperty("--timeline-progress", `${(progress * 100).toFixed(1)}%`);
    };
    window.addEventListener("scroll", updateTimeline, { passive: true });
    updateTimeline();
  }

  function setupIntro() {
    const root = document.documentElement;
    const body = document.body;
    const splash = document.querySelector(".splash");
    const curtain = document.querySelector(".intro-curtain");
    const stage = document.querySelector(".id-stage");
    const drop = document.querySelector(".badge-drop");
    const heroParts = [
      [".intro-label", ".monogram", ".top-wordmark", ".site-nav"],
      [".intro-hello"],
      [".intro-name-line"],
      [".intro-role"],
      [".intro-summary"],
      [".intro-actions", ".intro-down"]
    ];
    const timers = [];
    let active = true;
    let savedOverflow = "";
    let completionAt = Infinity;
    root.style.setProperty("--intro-write-duration", `${INTRO_TIMING.handwriting}ms`);
    root.style.setProperty("--intro-splash-wipe", `${INTRO_TIMING.splashWipe}ms`);
    root.style.setProperty("--intro-hero-wipe", `${INTRO_TIMING.heroWipe}ms`);
    root.style.setProperty("--intro-reveal-duration", `${INTRO_TIMING.heroDuration}ms`);
    root.style.setProperty("--intro-badge-duration", `${INTRO_TIMING.badgeDrop}ms`);
    root.style.setProperty("--intro-fade-duration", `${INTRO_TIMING.fade}ms`);
    root.style.setProperty("--intro-quick-duration", `${INTRO_TIMING.quickFade}ms`);
    const schedule = (callback, delay) => timers.push(window.setTimeout(callback, delay));
    const finish = () => {
      if (!active) return;
      active = false;
      timers.forEach(window.clearTimeout);
      revealAll(false);
      document.querySelector(".hero-signature")?.classList.remove("is-writing");
      document.querySelector(".hero-signature")?.classList.add("is-static");
      drop.classList.add("is-settled");
      curtain.classList.remove("is-sweeping");
      splash.classList.add("is-dismissed");
      body.classList.remove("intro-playing");
      root.classList.remove("intro-pending");
      root.classList.add("intro-complete");
      root.style.overflow = savedOverflow;
      try { window.sessionStorage.setItem("tamanna-portfolio-intro-seen", "true"); } catch (error) { /* Storage can be unavailable in private contexts. */ }
      document.removeEventListener("pointerdown", skipIntro, true);
      document.removeEventListener("keydown", skipIntro, true);
      document.removeEventListener("visibilitychange", resumeIntro, true);
    };
    const skipIntro = (event) => {
      if (!active) return;
      if (event.type === "keydown") event.preventDefault();
      finish();
    };
    const resumeIntro = () => {
      if (!document.hidden && active && performance.now() >= completionAt) finish();
    };
    const revealAll = (isReduced) => {
      heroParts.flat().forEach((selector) => document.querySelector(selector)?.classList.add("intro-revealed"));
      stage.classList.add("badge-visible");
      if (isReduced) document.querySelector(".hero-signature")?.classList.add("is-static");
    };
    let alreadySeen = false;
    try { alreadySeen = window.sessionStorage.getItem("tamanna-portfolio-intro-seen") === "true"; } catch (error) { alreadySeen = false; }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    body.classList.add("intro-playing");
    savedOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    document.addEventListener("visibilitychange", resumeIntro, true);

    if (alreadySeen || reducedMotion) {
      const duration = reducedMotion ? INTRO_TIMING.reducedFade : INTRO_TIMING.quickFade;
      root.classList.add("intro-quick");
      splash.classList.add("is-dismissed");
      revealAll(reducedMotion);
      completionAt = performance.now() + duration;
      schedule(finish, duration);
      document.addEventListener("pointerdown", skipIntro, true);
      document.addEventListener("keydown", skipIntro, true);
      return;
    }

    document.addEventListener("pointerdown", skipIntro, true);
    document.addEventListener("keydown", skipIntro, true);
    try { window.sessionStorage.setItem("tamanna-portfolio-intro-seen", "true"); } catch (error) { /* Storage can be unavailable in private contexts. */ }
    const heroRevealTimes = [];
    heroParts.forEach((selectors, index) => {
      let delay = INTRO_TIMING.heroStart + INTRO_TIMING.heroStep * index;
      if (index === 3) delay = Math.max(delay, heroRevealTimes[2] + INTRO_TIMING.heroWipe);
      heroRevealTimes.push(delay);
    });
    const introEndDelay = heroRevealTimes[heroRevealTimes.length - 1] + INTRO_TIMING.heroDuration;
    completionAt = performance.now() + introEndDelay;

    schedule(() => splash.classList.add("is-writing"), INTRO_TIMING.blank);
    schedule(() => splash.classList.add("caption-visible"), INTRO_TIMING.blank + INTRO_TIMING.captionDelay);
    schedule(() => {
      splash.classList.add("is-fading");
      curtain.classList.add("is-sweeping");
    }, INTRO_TIMING.blank + INTRO_TIMING.handwriting + INTRO_TIMING.hold);
    schedule(() => {
      stage.classList.add("badge-visible");
      drop.classList.add("is-dropped");
    }, INTRO_TIMING.badgeStart);
    heroParts.forEach((selectors, index) => {
      schedule(() => {
        selectors.forEach((selector) => document.querySelector(selector)?.classList.add("intro-revealed"));
        if (index === 2) document.querySelector(".hero-signature")?.classList.add("is-writing");
      }, heroRevealTimes[index]);
    });
    schedule(finish, introEndDelay);
  }

  function setupBadgePhysics() {
    const rig = document.querySelector(".badge-rig");
    const stage = document.querySelector(".id-stage");
    const card = document.querySelector(".badge-card");
    const ribbon = document.querySelector(".lanyard-ribbon");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let angle = -2;
    let velocity = 0;
    let target = 0;
    let dragging = false;
    let lastX = 0;
    let lastTime = 0;
    let cursorAngle = 0;
    let cursorTiltX = 0;
    let cursorTiltY = 0;

    stage.addEventListener("pointermove", (event) => {
      if (dragging || event.pointerType === "touch") return;
      const bounds = stage.getBoundingClientRect();
      const horizontal = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const vertical = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      cursorAngle = horizontal * 8;
      cursorTiltX = vertical * -9;
      cursorTiltY = horizontal * 10;
      card.style.setProperty("--tilt-x", `${cursorTiltX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${cursorTiltY.toFixed(2)}deg`);
      card.style.setProperty("--shine-x", `${Math.round((horizontal + 1) * 50)}%`);
      card.style.setProperty("--shine-y", `${Math.round((vertical + 1) * 50)}%`);
      target = cursorAngle;
    });
    stage.addEventListener("pointerleave", () => {
      if (dragging) return;
      target = 0;
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--shine-x", "50%");
      card.style.setProperty("--shine-y", "40%");
    });
    rig.addEventListener("pointerdown", (event) => {
      dragging = true;
      lastX = event.clientX;
      lastTime = performance.now();
      rig.setPointerCapture(event.pointerId);
      rig.classList.add("is-dragging");
      event.preventDefault();
    });
    rig.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const now = performance.now();
      const delta = event.clientX - lastX;
      angle = Math.max(-32, Math.min(32, angle + delta * 0.34));
      velocity = (delta / Math.max(1, now - lastTime)) * 18;
      lastX = event.clientX;
      lastTime = now;
    });
    const release = () => {
      if (!dragging) return;
      dragging = false;
      rig.classList.remove("is-dragging");
      target = cursorAngle;
    };
    rig.addEventListener("pointerup", release);
    rig.addEventListener("pointercancel", release);

    let previous = performance.now();
    const animate = (time) => {
      const delta = Math.min(0.032, (time - previous) / 1000);
      previous = time;
      if (!dragging) {
        const stiffness = 22;
        const damping = 7.2;
        const idleSway = Math.sin(time / 1600) * 1.15;
        velocity += ((target + idleSway - angle) * stiffness - velocity * damping) * delta;
        angle += velocity * delta;
      }
      rig.style.setProperty("--badge-angle", `${angle.toFixed(2)}deg`);
      ribbon.style.setProperty("--ribbon-bend", `${(angle * 0.22).toFixed(2)}deg`);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
})();