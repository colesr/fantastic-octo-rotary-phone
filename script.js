const milestones = [
  { year: "1805", label: "Milan", title: "Refusal at Milan", text: "Period accounts place a related Misraim system in Milan after an exclusion from a Scottish Rite council. The later Memphis story is often told in its wake.", tag: "reported origin" },
  { year: "1814", label: "Paris", title: "A French passage", text: "The archive reports a move into France and a Paris lodge. Other source passages attach Egyptian lineage stories to this same moment.", tag: "contested transmission" },
  { year: "1838—39", label: "Reformation", title: "Memphis takes form", text: "Accounts associate a reformed Rite of Memphis with Paris and the names J. A. Marconis and E. N. Mouttet. Dates vary across the material.", tag: "reported re-founding" },
  { year: "1847—51", label: "Suppression", title: "A forced silence", text: "The periodicals describe intervention by Paris police, a resumption after revolution, and a later declaration of perpetual dormancy.", tag: "institutional account" },
  { year: "1860s", label: "American print", title: "The argument travels", text: "American Masonic magazines framed the Rite through conflict: irregularity, commerce, secret knowledge, and the right to name a tradition.", tag: "archival viewpoint" },
  { year: "1881", label: "Union", title: "Memphis meets Misraim", text: "Modern reference accounts commonly date a unification of Memphis and Misraim to 1881. The resulting name signals continuity for some organizations and a new layer of complexity for the archive.", tag: "modern reference account" }
];

const degrees = [
  { label: "20", x: 12, y: 81, title: "Secret vault", text: "A twentieth-degree title preserved in one periodical list. It signals a vocabulary of hidden chambers and inherited authority." },
  { label: "49", x: 29, y: 62, title: "Chaos / first discretion", text: "A reported title in the sequence. Its language turns disorder into a threshold, but the archive does not explain a uniform meaning." },
  { label: "50", x: 41, y: 78, title: "Chaos / second wisdom", text: "Another listed title, paired in print with the previous degree. Here, adjacency is all the surviving source securely gives us." },
  { label: "52", x: 55, y: 53, title: "Commander of the stars", text: "A celestial title from a nineteenth-century degree list—an image the exhibit recasts as a point of orientation, not an office." },
  { label: "68", x: 71, y: 63, title: "Knight of the rainbow", text: "A title associated with a later point on the reported ladder, where color, rank, and spectacle meet." },
  { label: "90", x: 85, y: 23, title: "A disputed summit", text: "Some sources stop at ninety. Others count ninety-one or ninety-five. The disagreement is itself a central artifact." },
  { label: "91", x: 20, y: 31, title: "One more degree", text: "A number asserted in one account of reformed jurisdiction, complicating the supposed shape of the complete system." },
  { label: "95", x: 48, y: 20, title: "The longest ladder", text: "A critical magazine described an interminable ninety-five-degree ascent. This is an editorial characterization, not a neutral inventory." }
];

const timeline = document.querySelector(".timeline");
const detail = document.querySelector(".timeline-detail");
const nodes = document.querySelector(".degree-nodes");
const degreeDetail = document.querySelector(".degree-detail");

function showMilestone(item, button) {
  timeline.querySelectorAll("button").forEach((candidate) => candidate.setAttribute("aria-selected", "false"));
  button.setAttribute("aria-selected", "true");
  detail.innerHTML = `<p class="detail-date">${item.year}</p><h3>${item.title}</h3><p>${item.text}</p><p class="detail-tag">${item.tag}</p>`;
}

milestones.forEach((item, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.role = "tab";
  button.setAttribute("aria-selected", String(index === 0));
  button.innerHTML = `<span class="timeline-year">${item.year}</span><span class="timeline-label">${item.label}</span>`;
  button.addEventListener("click", () => showMilestone(item, button));
  timeline.append(button);
});

function showDegree(item, button) {
  nodes.querySelectorAll("button").forEach((candidate) => candidate.classList.remove("active"));
  button.classList.add("active");
  degreeDetail.innerHTML = `<p class="detail-date">${item.label}° / ARCHIVAL LABEL</p><h3>${item.title}</h3><p>${item.text}</p>`;
}

degrees.forEach((item) => {
  const button = document.createElement("button");
  button.className = "degree-node";
  button.type = "button";
  button.style.left = `${item.x}%`;
  button.style.top = `${item.y}%`;
  button.textContent = item.label;
  button.setAttribute("aria-label", `Degree ${item.label}: ${item.title}`);
  button.addEventListener("click", () => showDegree(item, button));
  nodes.append(button);
});

const revealButton = document.querySelector(".reveal-button");
const sourceNote = document.querySelector(".source-note");
revealButton.addEventListener("click", () => {
  const isOpen = revealButton.getAttribute("aria-expanded") === "true";
  revealButton.setAttribute("aria-expanded", String(!isOpen));
  revealButton.textContent = isOpen ? "Read the curator's note" : "Close the curator's note";
  sourceNote.hidden = isOpen;
});

const motionToggle = document.querySelector(".motion-toggle");
motionToggle.addEventListener("click", () => {
  const isStill = document.body.classList.toggle("still");
  motionToggle.setAttribute("aria-pressed", String(isStill));
  motionToggle.textContent = `Stillness: ${isStill ? "on" : "off"}`;
});

const optionsPanel = document.querySelector(".options-panel");
const optionsToggle = document.querySelector(".options-toggle");
const optionsClose = document.querySelector(".options-close");
const panelScrim = document.querySelector(".panel-scrim");

function setPanel(open) {
  optionsPanel.classList.toggle("open", open);
  optionsPanel.setAttribute("aria-hidden", String(!open));
  optionsToggle.setAttribute("aria-expanded", String(open));
  panelScrim.hidden = !open;
  if (open) optionsClose.focus();
  else optionsToggle.focus();
}

optionsToggle.addEventListener("click", () => setPanel(true));
optionsClose.addEventListener("click", () => setPanel(false));
panelScrim.addEventListener("click", () => setPanel(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && optionsPanel.classList.contains("open")) setPanel(false);
});

const themeSelect = document.querySelector("#theme-select");
themeSelect.addEventListener("change", () => {
  document.body.dataset.theme = themeSelect.value;
});

function bindRange(id, property, suffix) {
  const input = document.querySelector(`#${id}`);
  const output = document.querySelector(`output[for="${id}"]`);
  const apply = () => {
    document.documentElement.style.setProperty(property, id === "type-scale" ? input.value / 100 : input.value / 100);
    output.value = `${input.value}${suffix}`;
    output.textContent = output.value;
  };
  input.addEventListener("input", apply);
  apply();
}

bindRange("type-scale", "--type-scale", "%");
bindRange("grain-level", "--grain-opacity", "%");

document.querySelector("#focus-mode").addEventListener("change", (event) => {
  document.body.classList.toggle("focus-mode", event.target.checked);
});
document.querySelector("#drift-mode").addEventListener("change", (event) => {
  document.body.classList.toggle("still", !event.target.checked);
  motionToggle.setAttribute("aria-pressed", String(!event.target.checked));
  motionToggle.textContent = `Stillness: ${event.target.checked ? "off" : "on"}`;
});
document.querySelector("#super-mode").addEventListener("change", (event) => {
  document.body.classList.toggle("super-mode", event.target.checked);
});

const architectures = {
  "thirty-three": {
    number: "33",
    date: "1862 / France",
    title: "Four fields",
    text: "A compact published structure: symbolic lodge, Egyptian colleges, academy, and sanctuary."
  },
  "ninety-nine": {
    number: "99",
    date: "1881 / Memphis–Misraïm",
    title: "Ten fields",
    text: "An extended published structure whose classes progress from symbolic lodge to sovereign sanctuary."
  }
};
const architectureTabs = document.querySelector(".architecture-tabs");
const architectureVisual = document.querySelector(".architecture-visual");

architectureTabs.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-architecture]");
  if (!button) return;

  const architecture = architectures[button.dataset.architecture];
  architectureTabs.querySelectorAll("button").forEach((tab) => tab.setAttribute("aria-selected", "false"));
  button.setAttribute("aria-selected", "true");
  architectureVisual.dataset.architecture = button.dataset.architecture;
  architectureVisual.classList.remove("reconfigure");
  void architectureVisual.offsetWidth;
  architectureVisual.classList.add("reconfigure");
  architectureVisual.querySelector(".architecture-number").textContent = architecture.number;
  architectureVisual.querySelector(".architecture-detail").innerHTML = `<p class="detail-date">${architecture.date}</p><h3>${architecture.title}</h3><p>${architecture.text}</p>`;
});
