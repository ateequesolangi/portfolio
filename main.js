const portfolioProjects = [
    {
        id: "electricityvr",
        title: "ElectricityVR",
        role: "Technical Lead & Sole Developer",
        timeframe: "Delivered 2024 / Meta Quest",
        platform: "Meta Quest",
        metric: "20+ field scenarios",
        summary: "Field operations simulator built for a government institute with branching task logic, safety-critical interactions, and realistic site simulation behavior.",
        highlights: [
            "Built full product end-to-end as sole developer from concept to delivery.",
            "Implemented branching workflows, custom input mappings, and dynamic safety feedback loops.",
            "Engineered session design supporting 20 concurrent trainees in practical training cycles."
        ],
        outcome: "Production simulator delivered with 20+ practical scenarios and concurrent trainee support.",
        image: "./assets/images/MetaQuest3.jpg",
        tags: ["Simulation", "Government Client", "Meta Quest"],
        link: null,
        videoId: null
    },
    {
        id: "medic-vr",
        title: "Medic VR",
        role: "Scenario Developer",
        timeframe: "Shipped 2023 / Meta Quest",
        platform: "Meta Quest",
        metric: "15+ scenarios | 500+ nurse users",
        summary: "Medical training platform with procedure-focused scenario logic, guided workflows, and custom interaction layers aligned with clinical requirements.",
        highlights: [
            "Delivered 15+ procedural training scenarios with dynamic event branching.",
            "Built workflow logic around user guidance, validation, and repeatable procedural flow.",
            "Contributed to platform used by 500+ nurse users in training contexts."
        ],
        outcome: "Scaled medical training scenarios with repeatable process quality across high-volume users.",
        image: "./assets/images/MedicVR.png",
        tags: ["Medical Training", "Procedure Design", "XR UX"],
        link: "https://www.youtube.com/watch?v=g7u5WX0EFgM",
        videoId: "g7u5WX0EFgM"
    },
    {
        id: "graspxr",
        title: "GraspXR",
        role: "Scenario Developer",
        timeframe: "Shipped 2023-24 / Quest + PC VR",
        platform: "Quest + PC VR",
        metric: "5+ enterprise scenarios",
        summary: "Enterprise VR training platform extended with multi-industry scenarios, shared simulation architecture, AI-driven feedback hooks, and multilingual content flow.",
        highlights: [
            "Authored scenario tracks for healthcare, industrial, and education use cases.",
            "Integrated AI-driven feedback and multilingual delivery pipeline requirements.",
            "Worked on top of shared architecture for maintainable enterprise scenario deployment."
        ],
        outcome: "Strengthened enterprise scenario breadth across multiple industry verticals.",
        image: "./assets/images/GraspXR.jpg",
        tags: ["Enterprise XR", "Training", "Quest + PC"],
        link: "https://graspxr.app",
        videoId: null
    },
    {
        id: "final-overs",
        title: "The Final Overs",
        role: "Systems Developer",
        timeframe: "Shipped 2023 / Meta Quest 2-3",
        platform: "Meta Quest 2-3",
        metric: "40M+ balls | 4.5 Quest rating",
        summary: "Cricket title support through telemetry, analytics, and in-game feedback systems built on REST APIs and event logging for v2.0 decision making.",
        highlights: [
            "Implemented gameplay telemetry and event-logging architecture.",
            "Integrated real-time dashboards to track engagement and session-level behavior.",
            "Contributed systems used in v2.0 update path and live product iteration."
        ],
        outcome: "v2.0 launch supported with 40M+ balls played and strong Quest store performance.",
        image: "./assets/images/FinalOvers.jpeg",
        tags: ["Telemetry", "Analytics", "Live Product"],
        link: "https://www.meta.com/experiences/final-overs-vr-cricket/3753844808017398/",
        videoId: null
    },
    {
        id: "valley-beyond",
        title: "The Valley Beyond",
        role: "UE Developer",
        timeframe: "Shipped Dec 2025 / PC Steam",
        platform: "PC Steam",
        metric: "Shipped title",
        summary: "UE5 gameplay and environment contributions for a PC puzzle-adventure title released on Steam.",
        highlights: [
            "Contributed gameplay logic and environment-side systems for production release.",
            "Worked within shipping constraints for stability and maintainability.",
            "Supported final delivery path for a Steam-published title."
        ],
        outcome: "Shipped puzzle-adventure project on Steam in December 2025.",
        image: "./assets/images/BeyondTheValley.jpg",
        tags: ["Steam", "Gameplay", "Environment"],
        link: "https://store.steampowered.com/app/1578730/Beyond_The_Valley/",
        videoId: null
    }
];

const featuredProjects = [
    {
        id: "final-overs-featured",
        title: "The Final Overs",
        role: "Systems Developer",
        platform: "Meta Quest and PC VR",
        impact: "Multiplayer VR cricket game with real-time analytics and telemetry systems used to drive live updates and player engagement.",
        videoId: "9yAwpSjihTg",
        highlights: [
            "REST API telemetry system",
            "Event logging pipeline",
            "Cross-platform VR deployment",
            "Performance optimization for Meta Quest"
        ]
    },
    {
        id: "kynetik-featured",
        title: "Kynetik",
        role: "Technical Lead / Gameplay Systems",
        platform: "Meta Quest and PC VR",
        impact: "High-intensity VR interaction experience demonstrating advanced player movement and immersive gameplay systems.",
        videoId: "OfFT4EXDvqo",
        highlights: [
            "Real-time interaction systems",
            "Physics-based gameplay",
            "VR input handling",
            "Performance tuning"
        ]
    },
    {
        id: "graspxr-featured",
        title: "GraspXR",
        role: "Scenario Developer",
        platform: "Enterprise Quest and PC VR",
        impact: "Enterprise VR training platform delivering multi-industry simulations including healthcare and industrial training scenarios.",
        videoId: "8GoZydU9ibM",
        highlights: [
            "Scenario-based simulation architecture",
            "Multi-user training environments",
            "AI-driven feedback integration",
            "Modular content pipeline"
        ]
    }
];

const THEME_KEY = "portfolio-theme";

let revealObserver = null;
let glowRaf = null;

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initHeaderState();
    initVideoModal();
    initFeaturedProjects();
    initClipsCarousel();
    initProjectReflectionBoard();
    initProjectsCatalog();
    initRevealAnimations();
    initPointerGlow();
});

function initThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";

    applyTheme(savedTheme);

    if (!toggle) {
        return;
    }

    toggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(nextTheme);
    });
}

function applyTheme(theme) {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");

    if (theme === "light") {
        root.setAttribute("data-theme", "light");
    } else {
        root.removeAttribute("data-theme");
    }

    localStorage.setItem(THEME_KEY, theme);

    if (toggle) {
        toggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    }
}

function initHeaderState() {
    const header = document.querySelector(".site-header");
    if (!header) {
        return;
    }

    const syncHeader = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
}

function initFeaturedProjects() {
    const container = document.getElementById("featuredProjectsGrid");
    if (!container) {
        return;
    }

    container.innerHTML = featuredProjects
        .map((project, index) => renderFeaturedProjectCard(project, index))
        .join("");

    container.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-load-video]");
        if (!trigger) {
            return;
        }

        loadFeaturedProjectVideo(trigger);
    });
}

function renderFeaturedProjectCard(project, index) {
    const highlights = project.highlights
        .map((item) => `<li><i class="fas fa-check-circle" aria-hidden="true"></i> ${item}</li>`)
        .join("");

    return `
        <article class="featured-project-card" data-reveal style="--delay: ${0.07 + index * 0.04}s;">
            <div class="featured-project-card__head">
                <h3>${project.title}</h3>
                <span>${project.platform}</span>
            </div>

            <p class="featured-project-card__role"><strong>Role:</strong> ${project.role}</p>
            <p class="featured-project-card__impact">${project.impact}</p>

            <div class="featured-project-card__video" data-video-shell>
                <button
                    type="button"
                    class="featured-video-trigger"
                    data-load-video="${project.videoId}"
                    data-video-title="${project.title} gameplay video"
                    aria-label="Play ${project.title} gameplay video">
                    <img src="https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg" alt="${project.title} video preview" loading="lazy">
                    <span class="featured-video-trigger__overlay"></span>
                    <span class="featured-video-trigger__play"><i class="fas fa-play" aria-hidden="true"></i></span>
                </button>
            </div>

            <p class="featured-project-card__tech-title">Key technical highlights</p>
            <ul class="featured-project-card__highlights">${highlights}</ul>
        </article>
    `;
}

function loadFeaturedProjectVideo(trigger) {
    const videoShell = trigger.closest("[data-video-shell]");
    const videoId = trigger.getAttribute("data-load-video");
    const videoTitle = trigger.getAttribute("data-video-title") || "Project gameplay video";

    if (!videoShell || !videoId || videoShell.classList.contains("is-loaded")) {
        return;
    }

    videoShell.classList.add("is-loaded");
    videoShell.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1"
            title="${videoTitle}"
            loading="lazy"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
        </iframe>
    `;
}

function initProjectReflectionBoard() {
    const list = document.getElementById("projectSwitchList");
    const panel = document.getElementById("projectReflection");

    if (!list || !panel) {
        return;
    }

    list.innerHTML = portfolioProjects
        .map((project, index) => {
            const activeClass = index === 0 ? "is-active" : "";
            return `
                <button
                    type="button"
                    class="project-switch ${activeClass}"
                    role="tab"
                    aria-selected="${index === 0 ? "true" : "false"}"
                    data-project-tab="${index}">
                    <span class="project-switch__title">${project.title}</span>
                    <span class="project-switch__metric">${project.metric}</span>
                </button>
            `;
        })
        .join("");

    const tabs = list.querySelectorAll("[data-project-tab]");

    const activate = (index) => {
        const project = portfolioProjects[index];
        if (!project) {
            return;
        }

        tabs.forEach((tab) => {
            const tabIndex = Number.parseInt(tab.getAttribute("data-project-tab"), 10);
            const isActive = tabIndex === index;
            tab.classList.toggle("is-active", isActive);
            tab.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        renderProjectReflection(panel, index);
    };

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const tabIndex = Number.parseInt(tab.getAttribute("data-project-tab"), 10);
            if (!Number.isNaN(tabIndex)) {
                activate(tabIndex);
            }
        });
    });

    activate(0);
}

function renderProjectReflection(container, index) {
    const project = portfolioProjects[index];
    if (!container || !project) {
        return;
    }

    const action = getProjectActionMeta(project);
    const highlights = project.highlights
        .map((item) => `<li>${item}</li>`)
        .join("");
    const mediaAttrs = action.enabled
        ? `data-project-action="${index}" role="button" tabindex="0" aria-label="${action.label}"`
        : `aria-label="${action.label}"`;
    const buttonAttrs = action.enabled
        ? `data-project-action="${index}" aria-label="${action.label}"`
        : `disabled aria-disabled="true"`;

    container.innerHTML = `
        <figure class="reflection-media ${action.enabled ? "" : "is-locked"}" ${mediaAttrs}>
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <span class="reflection-media__badge">${project.platform}</span>
        </figure>
        <div class="reflection-body">
            <div class="reflection-head">
                <div>
                    <h3>${project.title}</h3>
                    <p class="reflection-role">${project.role} | ${project.timeframe}</p>
                </div>
                <span class="reflection-metric">${project.metric}</span>
            </div>
            <p class="reflection-summary">${project.summary}</p>
            <ul class="reflection-highlights">${highlights}</ul>
            <p class="reflection-outcome"><strong>Outcome:</strong> ${project.outcome}</p>
            <div class="reflection-actions">
                <button type="button" class="btn btn--primary reflection-action-btn" ${buttonAttrs}>
                    <i class="${action.icon}" aria-hidden="true"></i> ${action.text}
                </button>
            </div>
        </div>
    `;

    bindProjectActions(container);
}

function initProjectsCatalog() {
    const catalog = document.getElementById("projectsCatalog");
    if (!catalog) {
        return;
    }

    catalog.innerHTML = portfolioProjects
        .map((project, index) => {
            const action = getProjectActionMeta(project);
            const badges = project.tags.map((tag) => `<span class="catalog-card__badge">${tag}</span>`).join("");
            const delay = `${0.05 + index * 0.04}s`;
            const cardAttrs = action.enabled
                ? `data-project-action="${index}" role="button" tabindex="0" aria-label="${action.label}"`
                : `aria-label="${action.label}"`;

            return `
                <article class="catalog-card ${action.enabled ? "" : "catalog-card--locked"}" ${cardAttrs} data-reveal style="--delay: ${delay};">
                    <div class="catalog-card__media">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                        <div class="catalog-card__overlay"></div>
                        <span class="catalog-card__signal" aria-hidden="true"><i class="${action.icon}"></i></span>
                        <span class="catalog-card__platform">${project.platform}</span>
                    </div>
                    <div class="catalog-card__content">
                        <div class="catalog-card__kicker">${project.role}</div>
                        <h3 class="catalog-card__title">${project.title}</h3>
                        <p class="catalog-card__description">${project.summary}</p>
                        <p class="catalog-card__metric">${project.metric}</p>
                        <p class="catalog-card__outcome">${project.outcome}</p>
                        <div class="catalog-card__footer">
                            <div class="catalog-card__badges">${badges}</div>
                            <span class="catalog-card__action">${action.text} <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");

    bindProjectActions(catalog);
    observeRevealTargets(catalog);
}

function bindProjectActions(root) {
    const actionTargets = root.querySelectorAll("[data-project-action]");

    actionTargets.forEach((target) => {
        const projectIndex = Number.parseInt(target.getAttribute("data-project-action"), 10);
        if (Number.isNaN(projectIndex)) {
            return;
        }

        target.addEventListener("click", () => {
            openProjectAction(projectIndex);
        });

        if (target.matches(".reflection-media, .catalog-card")) {
            target.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProjectAction(projectIndex);
                }
            });
        }
    });
}

function openProjectAction(index) {
    const project = portfolioProjects[index];
    if (!project) {
        return;
    }

    if (project.videoId) {
        openVideo(project.videoId);
        return;
    }

    if (project.link) {
        const popup = window.open(project.link, "_blank", "noopener,noreferrer");
        if (popup) {
            popup.opener = null;
        }
    }
}

function getProjectActionMeta(project) {
    if (project.videoId) {
        return {
            icon: "fas fa-play",
            text: "Play demo",
            label: `Play demo for ${project.title}`,
            enabled: true
        };
    }

    if (project.link) {
        return {
            icon: "fas fa-arrow-up-right-from-square",
            text: "Open project",
            label: `Open ${project.title}`,
            enabled: true
        };
    }

    return {
        icon: "fas fa-lock",
        text: "NDA details",
        label: `${project.title} has no public link`,
        enabled: false
    };
}

function initVideoModal() {
    const modal = document.getElementById("videoModal");
    const closeButton = modal ? modal.querySelector(".close-modal") : null;

    if (!modal || !closeButton) {
        return;
    }

    closeButton.addEventListener("click", closeVideo);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeVideo();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeVideo();
        }
    });
}

function openVideo(videoId) {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("videoIframe");

    if (!modal || !iframe || !videoId) {
        return;
    }

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("videoIframe");

    if (!modal || !iframe) {
        return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    iframe.src = "";
    document.body.style.overflow = "";
}

function initRevealAnimations() {
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll("[data-reveal]").forEach((element) => {
            element.classList.add("is-visible");
        });
        return;
    }

    revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    observeRevealTargets(document);
}

function observeRevealTargets(root) {
    if (!revealObserver) {
        return;
    }

    root.querySelectorAll("[data-reveal]").forEach((element) => {
        revealObserver.observe(element);
    });
}

function initPointerGlow() {
    const orbA = document.querySelector(".orb-a");
    const orbB = document.querySelector(".orb-b");

    if (!orbA || !orbB) {
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (prefersReducedMotion || isTouch) {
        return;
    }

    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const animate = () => {
        current.x += (target.x - current.x) * 0.08;
        current.y += (target.y - current.y) * 0.08;

        orbA.style.transform = `translate(${current.x}px, ${current.y}px)`;
        orbB.style.transform = `translate(${-current.x * 0.35}px, ${-current.y * 0.25}px)`;

        glowRaf = window.requestAnimationFrame(animate);
    };

    document.addEventListener("pointermove", (event) => {
        target.x = (event.clientX - window.innerWidth / 2) * 0.05;
        target.y = (event.clientY - window.innerHeight / 2) * 0.05;
    });

    if (!glowRaf) {
        glowRaf = window.requestAnimationFrame(animate);
    }
}

function initClipsCarousel() {
    const track = document.getElementById("clipsTrack");
    const prev = document.getElementById("clipsPrev");
    const next = document.getElementById("clipsNext");

    if (!track || !prev || !next) {
        return;
    }

    const getStep = () => Math.max(280, Math.floor(track.clientWidth * 0.84));

    prev.addEventListener("click", () => {
        track.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
        track.scrollBy({ left: getStep(), behavior: "smooth" });
    });
}
