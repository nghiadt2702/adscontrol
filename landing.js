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

function setMenu(open) {
  if (!header || !menuToggle) return;
  header.classList.toggle("nav-open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle?.addEventListener("click", () => {
  setMenu(!header.classList.contains("nav-open"));
});

document.querySelectorAll(".main-nav a, .header-actions a, .hero-actions a, .footer-links a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
});
