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
const degreeList = document.querySelector(".degree-list");
const degreeDetail = document.querySelector(".degree-detail");
const motionToggle = document.querySelector(".motion-toggle");
const driftToggle = document.querySelector("#drift-mode");
const focusToggle = document.querySelector("#focus-mode");
const superToggle = document.querySelector("#super-mode");

function syncMotionState(animated) {
  document.body.classList.toggle("still", !animated);
  motionToggle.setAttribute("aria-pressed", String(!animated));
  motionToggle.textContent = `Stillness: ${animated ? "off" : "on"}`;
  driftToggle.checked = animated;
}

function activateTabs(buttons, nextButton) {
  buttons.forEach((button) => {
    button.setAttribute("aria-selected", String(button === nextButton));
    button.tabIndex = button === nextButton ? 0 : -1;
  });
  nextButton.focus();
}

function bindHorizontalTabs(container) {
  container.addEventListener("keydown", (event) => {
    const buttons = [...container.querySelectorAll('[role="tab"]')];
    const currentIndex = buttons.indexOf(document.activeElement);

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % buttons.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = buttons.length - 1;
    else return;

    event.preventDefault();
    buttons[nextIndex].click();
  });
}

function showMilestone(item, button) {
  activateTabs([...timeline.querySelectorAll("button")], button);
  detail.innerHTML = `<p class="detail-date">${item.year}</p><h3>${item.title}</h3><p>${item.text}</p><p class="detail-tag">${item.tag}</p>`;
}

milestones.forEach((item, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.role = "tab";
  button.id = `milestone-tab-${index}`;
  button.setAttribute("aria-controls", "timeline-detail-panel");
  button.setAttribute("aria-selected", String(index === 0));
  button.tabIndex = index === 0 ? 0 : -1;
  button.innerHTML = `<span class="timeline-year">${item.year}</span><span class="timeline-label">${item.label}</span>`;
  button.addEventListener("click", () => showMilestone(item, button));
  timeline.append(button);
});
detail.id = "timeline-detail-panel";
bindHorizontalTabs(timeline);

function showDegree(item, ...buttons) {
  [...nodes.querySelectorAll("button"), ...degreeList.querySelectorAll("button")].forEach((candidate) => {
    candidate.classList.toggle("active", buttons.includes(candidate));
    candidate.setAttribute("aria-pressed", String(buttons.includes(candidate)));
  });
  degreeDetail.innerHTML = `<p class="detail-date">${item.label}° / ARCHIVAL LABEL</p><h3>${item.title}</h3><p>${item.text}</p>`;
}

degrees.forEach((item, index) => {
  const nodeButton = document.createElement("button");
  nodeButton.className = "degree-node";
  nodeButton.type = "button";
  nodeButton.style.left = `${item.x}%`;
  nodeButton.style.top = `${item.y}%`;
  nodeButton.textContent = item.label;
  nodeButton.setAttribute("aria-label", `Degree ${item.label}: ${item.title}`);
  nodeButton.setAttribute("aria-pressed", "false");

  const listButton = document.createElement("button");
  listButton.type = "button";
  listButton.innerHTML = `${item.label}° <span>${item.title}</span>`;
  listButton.setAttribute("aria-label", `Degree ${item.label}: ${item.title}`);
  listButton.setAttribute("aria-pressed", "false");
  const listItem = document.createElement("div");
  listItem.role = "listitem";
  listItem.append(listButton);

  const activate = () => showDegree(item, nodeButton, listButton);
  nodeButton.addEventListener("click", activate);
  listButton.addEventListener("click", activate);

  if (index === 0) {
    nodeButton.classList.add("active");
    listButton.classList.add("active");
    nodeButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "true");
    degreeDetail.innerHTML = `<p class="detail-date">${item.label}° / ARCHIVAL LABEL</p><h3>${item.title}</h3><p>${item.text}</p>`;
  }

  nodes.append(nodeButton);
  degreeList.append(listItem);
});

const revealButton = document.querySelector(".reveal-button");
const sourceNote = document.querySelector(".source-note");
revealButton.addEventListener("click", () => {
  const isOpen = revealButton.getAttribute("aria-expanded") === "true";
  revealButton.setAttribute("aria-expanded", String(!isOpen));
  revealButton.textContent = isOpen ? "Read the curator's note" : "Close the curator's note";
  sourceNote.hidden = isOpen;
});

motionToggle.addEventListener("click", () => {
  syncMotionState(document.body.classList.contains("still"));
});

const optionsPanel = document.querySelector(".options-panel");
const optionsToggle = document.querySelector(".options-toggle");
const optionsClose = document.querySelector(".options-close");
const panelScrim = document.querySelector(".panel-scrim");
const panelFocusableSelector = 'button, [href], select, input, [tabindex]:not([tabindex="-1"])';

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
  if (event.key !== "Tab" || !optionsPanel.classList.contains("open")) return;

  const focusable = [...optionsPanel.querySelectorAll(panelFocusableSelector)];
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
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

focusToggle.addEventListener("change", (event) => {
  document.body.classList.toggle("focus-mode", event.target.checked);
});
driftToggle.addEventListener("change", (event) => {
  syncMotionState(event.target.checked);
});
superToggle.addEventListener("change", (event) => {
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

function showArchitecture(button) {
  if (!button) return;

  const architecture = architectures[button.dataset.architecture];
  activateTabs([...architectureTabs.querySelectorAll("button")], button);
  architectureVisual.dataset.architecture = button.dataset.architecture;
  architectureVisual.classList.remove("reconfigure");
  void architectureVisual.offsetWidth;
  architectureVisual.classList.add("reconfigure");
  architectureVisual.querySelector(".architecture-number").textContent = architecture.number;
  architectureVisual.querySelector(".architecture-detail").innerHTML = `<p class="detail-date">${architecture.date}</p><h3>${architecture.title}</h3><p>${architecture.text}</p>`;
}

architectureTabs.querySelectorAll("button").forEach((button, index) => {
  button.setAttribute("aria-controls", "architecture-visual-panel");
  button.tabIndex = index === 0 ? 0 : -1;
});
architectureVisual.id = "architecture-visual-panel";

architectureTabs.addEventListener("click", (event) => {
  showArchitecture(event.target.closest("button[data-architecture]"));
});
bindHorizontalTabs(architectureTabs);
syncMotionState(false);
