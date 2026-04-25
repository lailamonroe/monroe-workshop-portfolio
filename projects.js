function pinProjectHeader() {
  const header = document.querySelector(".project-site-header");
  if (!header) return;

  document.body.classList.add("show-header");
  header.style.position = "fixed";
  header.style.top = "0";
  header.style.left = "0";
  header.style.right = "0";
  header.style.transform = "none";
  header.style.opacity = "1";
  header.style.pointerEvents = "auto";
  header.style.transition = "none";
  header.style.background = "transparent";
  header.style.borderBottom = "0";
  header.style.backdropFilter = "none";
}

const RETURN_TO_DESK_KEY = "return-to-home-desk";
const mobilePerformanceMode = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px), (hover: none), (pointer: coarse)").matches;

document.querySelectorAll('a[href="../index.html"]').forEach((link) => {
  link.addEventListener("click", () => {
    sessionStorage.setItem(RETURN_TO_DESK_KEY, "true");
  });
});

document.addEventListener("DOMContentLoaded", pinProjectHeader);

document.addEventListener("DOMContentLoaded", () => {
  const leafLayer = document.querySelector(".leaf-fall-layer");

  if (!leafLayer || !document.body.classList.contains("npca-page")) return;

  const leafSources = [
    "../assets/leaf 1.png?v=20260425",
    "../assets/leaf2.png?v=20260425",
    "../assets/leaf3.png?v=20260425",
    "../assets/leaf4.png?v=20260425"
  ];

  const pageHeight = document.querySelector(".project-page").scrollHeight;
  leafLayer.style.height = `${pageHeight}px`;

  const leafCount = mobilePerformanceMode ? 11 : window.innerWidth < 768 ? 14 : 24;

  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement("img");
    leaf.className = "leaf-fall";
    leaf.src = leafSources[Math.floor(Math.random() * leafSources.length)];
    leaf.alt = "";

    const startLeft = Math.random() * 100;
    const startOffset = Math.random() * pageHeight * 0.9;
    const duration = mobilePerformanceMode ? 24 + Math.random() * 12 : 18 + Math.random() * 14;
    const delay = Math.random() * -25;
    const size = mobilePerformanceMode ? 0.82 + Math.random() * 0.5 : 0.95 + Math.random() * 0.9;
    const opacity = mobilePerformanceMode ? 0.2 + Math.random() * 0.12 : 0.32 + Math.random() * 0.22;

    leaf.style.left = `${startLeft}%`;
    leaf.style.top = `${-140 + startOffset}px`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.animationDelay = `${delay}s`;
    leaf.style.opacity = opacity.toFixed(2);
    leaf.style.width = `${82 * size}px`;

    leafLayer.appendChild(leaf);
  }
});

const contactSocialBtn = document.getElementById("contactSocialBtn") || document.getElementById("socialBtn");
const contactNotebookBtn = document.getElementById("contactNotebookBtn") || document.getElementById("notebookBtn");
const contactPrevPageBtn = document.getElementById("contactPrevPageBtn") || document.getElementById("prevPageBtn");
const contactNextPageBtn = document.getElementById("contactNextPageBtn") || document.getElementById("nextPageBtn");

const contactDockPopout = document.getElementById("contactDockPopout") || document.getElementById("dockPopout");
const contactDockPopoutInner = document.getElementById("contactDockPopoutInner") || document.getElementById("dockPopoutInner");

function contactNavigateWithSlide(url, direction = "left") {
  if (mobilePerformanceMode) {
    window.location.href = url;
    return;
  }

  document.body.classList.remove("page-slide-out-left", "page-slide-out-right");
  document.body.classList.add(
    direction === "left" ? "page-slide-out-left" : "page-slide-out-right"
  );

  setTimeout(() => {
    window.location.href = url;
  }, 350);
}

function closeContactDockPopout() {
  if (!contactDockPopout || !contactDockPopoutInner) return;
  contactDockPopout.classList.remove("active");
  contactDockPopoutInner.innerHTML = "";
}

function openContactSocialPopout() {
  if (!contactDockPopout || !contactDockPopoutInner) return;
  contactDockPopoutInner.innerHTML = `
    <div class="popout-socials">
      <a href="https://instagram.com/artxxlai" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="Instagram">
        <img src="../assets/logo1.png?v=20260425" alt="Instagram" />
      </a>
      <a href="https://www.linkedin.com/in/lailamonroe/" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="LinkedIn">
        <img src="../assets/logo2.png?v=20260425" alt="LinkedIn" />
      </a>
      <a href="https://github.com/lailamonroe" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="GitHub">
        <img src="../assets/logo3.png?v=20260425" alt="Github" />
      </a>
    </div>
  `;
  contactDockPopout.classList.add("active");
}

function openContactNotebookPopout() {
  if (!contactDockPopout || !contactDockPopoutInner) return;
  contactDockPopoutInner.innerHTML = `
    <div class="popout-note">
      <div class="popout-note-label">Brain Break</div>
      <div class="popout-note-title"> Thoughts and Quotes</div>
      <div class="popout-note-text">
        “Absorb what is useful, discard what is not, add what is uniquely your own.”
      </div>
    </div>
  `;
  contactDockPopout.classList.add("active");
}

contactSocialBtn?.addEventListener("click", () => {
  if (!contactDockPopout || !contactDockPopoutInner) return;
  const isOpen =
    contactDockPopout.classList.contains("active") &&
    contactDockPopoutInner.innerHTML.includes("popout-socials");

  if (isOpen) {
    closeContactDockPopout();
  } else {
    openContactSocialPopout();
  }
});

contactNotebookBtn?.addEventListener("click", () => {
  if (!contactDockPopout || !contactDockPopoutInner) return;
  const isOpen =
    contactDockPopout.classList.contains("active") &&
    contactDockPopoutInner.innerHTML.includes("popout-note");

  if (isOpen) {
    closeContactDockPopout();
  } else {
    openContactNotebookPopout();
  }
});

contactPrevPageBtn?.addEventListener("click", () => {
  closeContactDockPopout();
  contactNavigateWithSlide("../index.html", "right");
});

contactNextPageBtn?.addEventListener("click", () => {
  closeContactDockPopout();
  contactNavigateWithSlide("../projects/projects.html", "left");
});

document.addEventListener("click", (event) => {
  if (!contactDockPopout || !contactDockPopoutInner) return;

  const clickedInsideDock = event.target.closest(".bottom-dock-wrap");
  if (!clickedInsideDock) {
    closeContactDockPopout();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeContactDockPopout();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const symbolLayer = document.querySelector(".poppi-symbol-layer");

  if (!symbolLayer || !document.body.classList.contains("poppi-symbol-page")) return;

  const symbolSources = [
    "../assets/poppi1.png?v=20260425",
    "../assets/poppi2.png?v=20260425",
    "../assets/poppi3.png?v=20260425",
    "../assets/poppi4.png?v=20260425",
    "../assets/poppi5.png?v=20260425"
  ];

  const pageHeight = document.querySelector(".poppi-page").scrollHeight;
  symbolLayer.style.height = `${pageHeight}px`;

  const symbolCount = mobilePerformanceMode ? 10 : window.innerWidth < 768 ? 12 : 20;

  for (let i = 0; i < symbolCount; i++) {
    const symbol = document.createElement("img");
    symbol.className = "poppi-symbol";
    symbol.src = symbolSources[Math.floor(Math.random() * symbolSources.length)];
    symbol.alt = "";

    const startLeft = Math.random() * 100;
    const startOffset = Math.random() * pageHeight * 0.9;
    const duration = mobilePerformanceMode ? 24 + Math.random() * 10 : 18 + Math.random() * 14;
    const delay = Math.random() * -25;
    const size = mobilePerformanceMode ? 0.66 + Math.random() * 0.42 : 0.65 + Math.random() * 0.7;
    const opacity = mobilePerformanceMode ? 0.09 + Math.random() * 0.06 : 0.08 + Math.random() * 0.08;

    symbol.style.left = `${startLeft}%`;
    symbol.style.top = `${-140 + startOffset}px`;
    symbol.style.animationDuration = `${duration}s`;
    symbol.style.animationDelay = `${delay}s`;
    symbol.style.opacity = opacity.toFixed(2);
    symbol.style.width = `${68 * size}px`;

    symbolLayer.appendChild(symbol);
  }
});
