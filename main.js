const portfolioProjects = [
    {
        id: "kynetik",
        title: "KYNETIK",
        role: "Founder and Creator",
        description: "A hyper-casual hand-tracking wave shooter designed for fast onboarding, repeatable intensity, and zero wasted friction inside the headset.",
        image: "./assets/images/MetaQuest3.jpg",
        platform: "Meta Quest",
        tags: ["VR Game", "Hand Tracking", "Quest"],
        link: "https://www.meta.com/experiences/3753844808017398/",
        videoId: "8GoZydU9ibM"
    },
    {
        id: "graspxr",
        title: "GRASP XR",
        role: "Technical Lead",
        description: "An interaction-heavy XR framework for enterprise simulations, focused on natural gestures, stable interaction logic, and clean user flow design.",
        image: "./assets/images/GraspXR.jpg",
        platform: "Meta Quest",
        tags: ["Enterprise", "UE5", "Interaction Design"],
        link: "https://graspxr.app/",
        videoId: "8GoZydU9ibM"
    },
    {
        id: "final-overs",
        title: "FINAL OVERS",
        role: "XR Programmer",
        description: "A performance minded VR cricket experience tuned for standalone hardware, realistic physics, and responsive gameplay under pressure.",
        image: "./assets/images/FinalOvers.jpeg",
        platform: "Meta Quest",
        tags: ["Sports", "Physics", "Optimization"],
        link: "https://www.meta.com/experiences/3753844808017398/",
        videoId: "n_l357e-Buc"
    },
    {
        id: "beyond-the-valley",
        title: "BEYOND THE VALLEY",
        role: "Unreal Developer",
        description: "A visually rich environment project blending VFX, atmospheric lighting, and real-time scene composition for a polished cinematic look.",
        image: "./assets/images/BeyondTheValley.jpg",
        platform: "Steam",
        tags: ["Environment", "VFX", "Unreal Engine"],
        link: "https://store.steampowered.com/app/3889780/The_Valley_Beyond/",
        videoId: null
    },
    {
        id: "medicvr",
        title: "MEDIC VR",
        role: "Core Developer",
        description: "A medical simulation workflow built for procedural clarity, repeatable training, and high-stakes decision making in immersive environments.",
        image: "./assets/images/MedicVR.png",
        platform: "Meta Quest",
        tags: ["Medical", "Simulation", "Training"],
        link: "https://www.youtube.com/watch?v=g7u5WX0EFgM",
        videoId: "g7u5WX0EFgM"
    }
];

const THEME_KEY = "portfolio-theme";
const AUTOPLAY_MS = 7600;

let currentIndex = 0;
let autoplayTimer = null;
let revealObserver = null;
let glowRaf = null;

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initHeaderState();
    initVideoModal();
    initCarousel();
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

function initCarousel() {
    const card = document.getElementById("project-card");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!card || !prevBtn || !nextBtn) {
        return;
    }

    renderProject(currentIndex);

    prevBtn.addEventListener("click", () => {
        navigateTo(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        navigateTo(currentIndex + 1);
    });

    card.addEventListener("mouseenter", stopAutoplay);
    card.addEventListener("mouseleave", startAutoplay);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    startAutoplay();
}

function navigateTo(index) {
    if (index < 0) {
        currentIndex = portfolioProjects.length - 1;
    } else {
        currentIndex = index % portfolioProjects.length;
    }

    renderProject(currentIndex);
}

function renderProject(index) {
    const card = document.getElementById("project-card");
    if (!card) {
        return;
    }

    const project = portfolioProjects[index];
    const actionLabel = getProjectActionLabel(project);
    const actionIcon = project.videoId ? "fas fa-play" : "fas fa-arrow-up-right-from-square";
    const actionText = project.videoId ? "Play demo" : "Open project";
    const dots = portfolioProjects
        .map((_, dotIndex) => {
            const activeClass = dotIndex === index ? "active" : "";
            return `<button class="dot ${activeClass}" type="button" data-index="${dotIndex}" aria-label="Go to project ${dotIndex + 1}"></button>`;
        })
        .join("");
    const tags = project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("");

    card.classList.add("is-updating");

    window.setTimeout(() => {
        card.innerHTML = `
            <figure class="project-media project-action" data-project-action="${index}" role="button" tabindex="0" aria-label="${actionLabel}">
                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                <span class="${project.videoId ? "media-play" : "media-open"}" aria-hidden="true">
                    <i class="${actionIcon}" aria-hidden="true"></i>
                </span>
                <figcaption class="project-platform">${project.platform}</figcaption>
            </figure>
            <div class="project-body">
                <div class="project-head">
                    <div class="project-title-group">
                        <h3>${project.title}</h3>
                        <p class="project-role">${project.role}</p>
                    </div>
                    <button type="button" class="project-link" data-project-action="${index}" aria-label="${actionLabel}">
                        <i class="${actionIcon}" aria-hidden="true"></i>
                    </button>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-foot">
                    <div class="project-tags">${tags}</div>
                    <div class="project-dots" aria-label="Project navigation dots">${dots}</div>
                </div>
            </div>
        `;

        bindProjectActions(card);
        bindCarouselDots(card);
        card.classList.remove("is-updating");
    }, 140);
}

function bindCarouselDots(card) {
    const dots = card.querySelectorAll(".dot[data-index]");

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const targetIndex = Number.parseInt(dot.getAttribute("data-index"), 10);
            if (Number.isNaN(targetIndex)) {
                return;
            }

            currentIndex = targetIndex;
            renderProject(currentIndex);
            startAutoplay();
        });
    });
}

function initProjectsCatalog() {
    const catalog = document.getElementById("projectsCatalog");
    if (!catalog) {
        return;
    }

    catalog.innerHTML = portfolioProjects
        .map((project, index) => {
            const actionText = project.videoId ? "Watch demo" : "Open project";
            const signalIcon = project.videoId ? "fas fa-play" : "fas fa-arrow-up-right-from-square";
            const badges = project.tags.map((tag) => `<span class="catalog-card__badge">${tag}</span>`).join("");
            const delay = `${0.05 + index * 0.04}s`;

            return `
                <article class="catalog-card" data-project-action="${index}" role="button" tabindex="0" aria-label="${getProjectActionLabel(project)}" data-reveal style="--delay: ${delay};">
                    <div class="catalog-card__media">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                        <div class="catalog-card__overlay"></div>
                        <span class="catalog-card__signal" aria-hidden="true"><i class="${signalIcon}"></i></span>
                        <span class="catalog-card__platform">${project.platform}</span>
                    </div>
                    <div class="catalog-card__content">
                        <div class="catalog-card__kicker">${project.role}</div>
                        <h3 class="catalog-card__title">${project.title}</h3>
                        <p class="catalog-card__description">${project.description}</p>
                        <div class="catalog-card__footer">
                            <div class="catalog-card__badges">${badges}</div>
                            <span class="catalog-card__action">${actionText} <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
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

        if (target.matches(".project-media, .catalog-card")) {
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

function getProjectActionLabel(project) {
    return project.videoId ? `Play demo for ${project.title}` : `Open ${project.title}`;
}

function startAutoplay() {
    stopAutoplay();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    autoplayTimer = window.setInterval(() => {
        navigateTo(currentIndex + 1);
    }, AUTOPLAY_MS);
}

function stopAutoplay() {
    if (!autoplayTimer) {
        return;
    }

    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
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
