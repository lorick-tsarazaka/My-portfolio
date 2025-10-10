const items = document.querySelectorAll(".nav-item");
let activeItem = document.querySelector(".nav-item.active");

// Hover effect
items.forEach(item => {
  item.addEventListener("mouseover", () => {
    document.querySelectorAll(".nav-item.active").forEach(act => act.classList.remove("active"));
    item.classList.add("active");
  });
});

const navbar = document.querySelector(".offcanvas");
if (navbar) {
  navbar.addEventListener("mouseleave", () => {
    document.querySelectorAll(".nav-item.active").forEach(act => act.classList.remove("active"));
    if (activeItem) activeItem.classList.add("active");
  });
}

// Clic sur un lien
function navClicked(navItem) {
  document.querySelectorAll(".nav-item.active").forEach(act => act.classList.remove("active"));
  navItem.classList.add("active");
  activeItem = navItem;

  // Mise à jour de l'URL
  const href = navItem.querySelector("a").getAttribute("href");
  history.replaceState(null, "", href);
}

// Suivre la section visible + mettre à jour l'URL
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY;
    const sectionTop = offsetTop - 120; // marge
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  if (currentSection) {
    document.querySelectorAll(".nav-item.active").forEach(act => act.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-item a[href="#${currentSection}"]`);
    if (activeLink) {
      activeLink.parentElement.classList.add("active");
      activeItem = activeLink.parentElement;

      // Mise à jour de l'URL sans recharger la page
      history.replaceState(null, "", "#" + currentSection);
    }
  }
});

window.addEventListener("load", () => {
  const loader = document.getElementById("intro-loader");
  const main = document.getElementById("main-content");

  // Attendre la fin de l’animation (≈ 3,5 s)
  setTimeout(() => {
    loader.classList.add("hide");
    setTimeout(() => {
      loader.style.display = "none";
      main.style.display = "block";
    }, 1000);
  }, 3500);
});
