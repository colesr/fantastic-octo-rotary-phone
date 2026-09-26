const milestones = [
  { year: "1805", label: "Milan", title: "Refusal at Milan", text: "Period accounts place a related Misraim system in Milan after an exclusion from a Scottish Rite council. The later Memphis story is often told in its wake.", tag: "reported origin" },
  { year: "1814", label: "Paris", title: "A French passage", text: "The archive reports a move into France and a Paris lodge. Other source passages attach Egyptian lineage stories to this same moment.", tag: "contested transmission" },
  { year: "1838—39", label: "Reformation", title: "Memphis takes form", text: "Accounts associate a reformed Rite of Memphis with Paris and the names J. A. Marconis and E. N. Mouttet. Dates vary across the material.", tag: "reported re-founding" },
  { year: "1847—51", label: "Suppression", title: "A forced silence", text: "The periodicals describe intervention by Paris police, a resumption after revolution, and a later declaration of perpetual dormancy.", tag: "institutional account" },
  { year: "1860s", label: "American print", title: "The argument travels", text: "American Masonic magazines framed the Rite through conflict: irregularity, commerce, secret knowledge, and the right to name a tradition.", tag: "archival viewpoint" }
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
