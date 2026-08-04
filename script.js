const projectData = {
  "character-cafe": {
    kicker: "UX research · Game design",
    title: "Character Cafe",
    summary: "A mixed-methods research game for observing how preschool-aged children make social categorization and resource-allocation decisions.",
    role: "Co-designer and researcher on a four-person team.",
    process: "Designed an age-appropriate cafe loop, structured character metadata, and quantitative plus qualitative data collection.",
    outcome: "Playtesting revealed unintended visual cues, so the team simplified stimuli and made choices more comparable.",
    tools: "Mixed methods, playtesting, metadata design, research ethics."
  },
  "museum-mistakes": {
    kicker: "Experience design · Playtesting",
    title: "Museum of Mistakes",
    summary: "An anonymous participatory gallery that turns mistakes into creative artifacts, reflection, humor, and community discussion.",
    role: "Co-designer and playtest researcher on a five-person team.",
    process: "Created a two-phase making and curation loop using artifact labels, reaction cards, and playful curator notes.",
    outcome: "Testing showed the gallery could become static, leading to a phased system for continued additions and commentary.",
    tools: "Participatory design, facilitation, behavioral design, prototyping."
  },
  "monster-vs-monster": {
    kicker: "Learning experience · Physical prototyping",
    title: "Monster vs Monster",
    summary: "A hands-on game where children build monsters, interpret comparison rules, and defend mathematical reasoning.",
    role: "Game designer and playtest researcher on a five-person team.",
    process: "Connected physical making with geometry, measurement, categorization, and evidence-based argumentation.",
    outcome: "Removed construction constraints that caused cognitive overload and made the defense phase the learning centerpiece.",
    tools: "Learning science, physical prototyping, playtesting, child-centered design."
  },
  "library-seat": {
    kicker: "Product design · Survey research",
    title: "Smart Library Seats",
    summary: "A research-backed product proposal for reducing the time students spend searching for available study spaces.",
    role: "Independent product researcher, strategist, and presenter.",
    process: "Surveyed students, prioritized features, designed an availability concept, and planned a phased campus rollout.",
    outcome: "Translated findings into real-time maps, amenity information, reservations, and an eight-month pilot plan.",
    tools: "Survey design, data visualization, product requirements, roadmap planning."
  },
  "raging-chef": {
    kicker: "Unity · C# · VR",
    title: "The Raging Chef",
    summary: "A VR destruction game that lets players throw and break objects inside a stylized restaurant environment.",
    role: "Gameplay programmer working with two other programmers and a cross-functional art and design team.",
    process: "Contributed C# interaction code and debugged throwable-object motion, Rigidbody behavior, collisions, and breakable objects.",
    outcome: "Iterated through inconsistent controller data and hardware testing constraints to restore and simplify throwing behavior.",
    tools: "Unity, C#, VR physics, debugging, playtesting."
  },
  "murder-mansion": {
    kicker: "Unity · C# · Tilt Five AR",
    title: "Murder Mansion",
    summary: "A two-player cooperative sabotage game where different viewpoints create asymmetric information and force communication.",
    role: "Programmer and technical project coordinator on a five-person team.",
    process: "Contributed interaction logic, lighting states, traps, collisions, player indicators, hardware testing, and build coordination.",
    outcome: "The team revised trap rules to reduce power imbalance and strengthen cooperative decision-making.",
    tools: "Unity, C#, AR interaction, state logic, playtest coordination."
  }
};

const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(element => revealObserver.observe(element));

const filterButtons = document.querySelectorAll("[data-filter]");
const caseCards = document.querySelectorAll(".case-card");
filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  const filter = button.dataset.filter;
  caseCards.forEach(card => {
    card.hidden = filter !== "all" && card.dataset.category !== filter;
  });
}));

const dialog = document.querySelector("[data-dialog]");
const fill = (selector, value) => { const element = dialog?.querySelector(selector); if (element) element.textContent = value; };
document.querySelectorAll("[data-open-project]").forEach(button => button.addEventListener("click", () => {
  const card = button.closest("[data-project]");
  const project = projectData[card?.dataset.project];
  if (!project || !dialog) return;
  fill("[data-dialog-kicker]", project.kicker);
  fill("[data-dialog-title]", project.title);
  fill("[data-dialog-summary]", project.summary);
  fill("[data-dialog-role]", project.role);
  fill("[data-dialog-process]", project.process);
  fill("[data-dialog-outcome]", project.outcome);
  fill("[data-dialog-tools]", project.tools);
  dialog.showModal();
}));
document.querySelector("[data-close-dialog]")?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-nav a");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

let previousScroll = window.scrollY;
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", () => {
  const current = window.scrollY;
  header?.classList.toggle("is-hidden", current > previousScroll && current > 180 && !nav?.classList.contains("open"));
  previousScroll = current;
}, { passive: true });

document.querySelector("[data-year]").textContent = new Date().getFullYear();
