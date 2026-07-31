const authCallback =
  location.hash.includes("access_token=") ||
  location.hash.includes("type=invite") ||
  location.hash.includes("type=recovery") ||
  new URLSearchParams(location.search).has("code");

if (authCallback) {
  location.replace(`/login.html${location.search}${location.hash}`);
}

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const betaForm = document.querySelector("#beta-form");
const toast = document.querySelector("#toast");
const accountRange = document.querySelector("#account-range");
const accountOutput = document.querySelector("#account-output");
const manualTime = document.querySelector("#manual-time");
const controlTime = document.querySelector("#control-time");
const savingPercent = document.querySelector("#saving-percent");
const preview = document.querySelector("#feature-preview");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function setMenu(open) {
  header.classList.toggle("nav-open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => {
  setMenu(!header.classList.contains("nav-open"));
});

document.querySelectorAll(".main-nav a, .header-actions a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
});

function formatManualTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return `${hours} giờ ${remaining ? `${remaining} phút` : ""}`.trim();
}

function updateSimulator() {
  const accounts = Number(accountRange.value);
  const manualMinutes = accounts * 22;
  const controlMinutes = 12 + accounts * 0.5;
  const saving = Math.round((1 - controlMinutes / manualMinutes) * 100);

  accountOutput.value = accounts;
  accountOutput.textContent = accounts;
  manualTime.textContent = formatManualTime(manualMinutes);
  controlTime.textContent = `≈ ${Math.round(controlMinutes)} phút`;
  savingPercent.textContent = `${saving}%`;
}

accountRange.addEventListener("input", updateSimulator);
updateSimulator();

const previewContent = {
  overview: {
    label: "LIVE OPERATIONS",
    title: "Command center",
    stats: [["SPEND", "$42.6K"], ["REVENUE", "$96.2K"], ["INSTALLS", "18,420"], ["ROAS D7", "2.26x"]]
  },
  accounts: {
    label: "ACCOUNT REGISTRY",
    title: "Ad accounts",
    stats: [["TOTAL", "24"], ["READY", "22"], ["SYNCING", "1"], ["ACTION", "1"]]
  },
  creative: {
    label: "CREATIVE HEALTH",
    title: "Creative intelligence",
    stats: [["WINNERS", "12"], ["HEALTHY", "28"], ["FATIGUE", "7"], ["SCORE", "84"]]
  }
};

document.querySelectorAll(".feature-point").forEach((item) => {
  item.addEventListener("click", () => {
    const selected = previewContent[item.dataset.preview];
    document.querySelectorAll(".feature-point").forEach((point) => point.classList.remove("active"));
    item.classList.add("active");
    preview.classList.add("is-changing");

    setTimeout(() => {
      preview.querySelector(".preview-title small").textContent = selected.label;
      preview.querySelector(".preview-title strong").textContent = selected.title;
      preview.querySelectorAll(".preview-stats > div").forEach((card, index) => {
        card.querySelector("small").textContent = selected.stats[index][0];
        card.querySelector("strong").textContent = selected.stats[index][1];
      });
      preview.classList.remove("is-changing");
    }, 160);
  });
});

betaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(betaForm);
  showToast(`Cảm ơn ${data.get("name")} — form demo đã hoạt động.`);
  betaForm.reset();
});
