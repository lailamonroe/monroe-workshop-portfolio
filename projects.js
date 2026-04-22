document.addEventListener("DOMContentLoaded", () => {
  const leafLayer = document.querySelector(".leaf-fall-layer");

  if (!leafLayer || !document.body.classList.contains("npca-page")) return;

  const leafSources = [
    "../assets/leaf 1.png",
    "../assets/leaf2.png",
    "../assets/leaf3.png",
    "../assets/leaf4.png"
  ];

  const pageHeight = document.querySelector(".project-page").scrollHeight;
  leafLayer.style.height = `${pageHeight}px`;

  const leafCount = window.innerWidth < 768 ? 14 : 24;

  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement("img");
    leaf.className = "leaf-fall";
    leaf.src = leafSources[Math.floor(Math.random() * leafSources.length)];
    leaf.alt = "";

    const startLeft = Math.random() * 100;
    const startOffset = Math.random() * pageHeight * 0.9;
    const duration = 18 + Math.random() * 14;
    const delay = Math.random() * -25;
    const size = 0.65 + Math.random() * 0.65;
    const opacity = 0.05 + Math.random() * 0.05;

    leaf.style.left = `${startLeft}%`;
    leaf.style.top = `${-140 + startOffset}px`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.animationDelay = `${delay}s`;
    leaf.style.opacity = opacity.toFixed(2);
    leaf.style.width = `${55 * size}px`;

    leafLayer.appendChild(leaf);
  }
});

const contactSocialBtn = document.getElementById("contactSocialBtn");
const contactNotebookBtn = document.getElementById("contactNotebookBtn");
const contactPrevPageBtn = document.getElementById("contactPrevPageBtn");

const contactDockPopout = document.getElementById("contactDockPopout");
const contactDockPopoutInner = document.getElementById("contactDockPopoutInner");

function contactNavigateWithSlide(url, direction = "left") {
  document.body.classList.remove("page-slide-out-left", "page-slide-out-right");
  document.body.classList.add(
    direction === "left" ? "page-slide-out-left" : "page-slide-out-right"
  );

  setTimeout(() => {
    window.location.href = url;
  }, 350);
}

function closeContactDockPopout() {
  contactDockPopout.classList.remove("active");
  contactDockPopoutInner.innerHTML = "";
}

function openContactSocialPopout() {
  contactDockPopoutInner.innerHTML = `
    <div class="popout-socials">
      <a href="https://instagram.com/artxxlai" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="Instagram">
        <img src="assets/logo1.png" alt="Instagram" />
      </a>
      <a href="https://www.linkedin.com/in/lailamonroe/" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="LinkedIn">
        <img src="assets/logo2.png" alt="LinkedIn" />
      </a>
    </div>
  `;
  contactDockPopout.classList.add("active");
}

function openContactNotebookPopout() {
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
  const isOpen =
    contactDockPopout.classList.contains("active") &&
    contactDockPopoutInner.innerHTML.includes("popout-note");

  if (isOpen) {
    closeContactDockPopout();
  } else {
    openContactNotebookPopout();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const symbolLayer = document.querySelector(".poppi-symbol-layer");

  if (!symbolLayer || !document.body.classList.contains("poppi-symbol-page")) return;

  const symbolSources = [
    "../assets/poppi1.png",
    "../assets/poppi2.png",
    "../assets/poppi3.png",
    "../assets/poppi4.png",
    "../assets/poppi5.png"
  ];

  const pageHeight = document.querySelector(".poppi-page").scrollHeight;
  symbolLayer.style.height = `${pageHeight}px`;

  const symbolCount = window.innerWidth < 768 ? 12 : 20;

  for (let i = 0; i < symbolCount; i++) {
    const symbol = document.createElement("img");
    symbol.className = "poppi-symbol";
    symbol.src = symbolSources[Math.floor(Math.random() * symbolSources.length)];
    symbol.alt = "";

    const startLeft = Math.random() * 100;
    const startOffset = Math.random() * pageHeight * 0.9;
    const duration = 18 + Math.random() * 14;
    const delay = Math.random() * -25;
    const size = 0.65 + Math.random() * 0.7;
    const opacity = 0.08 + Math.random() * 0.08;

    symbol.style.left = `${startLeft}%`;
    symbol.style.top = `${-140 + startOffset}px`;
    symbol.style.animationDuration = `${duration}s`;
    symbol.style.animationDelay = `${delay}s`;
    symbol.style.opacity = opacity.toFixed(2);
    symbol.style.width = `${68 * size}px`;

    symbolLayer.appendChild(symbol);
  }
});