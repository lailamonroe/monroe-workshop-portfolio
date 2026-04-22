const sequence = document.getElementById("scrollSequence");
const typedText = document.getElementById("typedText");

const bgDark = document.getElementById("bgDark");
const bgLight = document.getElementById("bgLight");

const phaseLogo = document.getElementById("phaseLogo");
const phaseStars = document.getElementById("phaseStars");
const phaseDesk = document.getElementById("phaseDesk");

const cycleLogos = Array.from(document.querySelectorAll(".cycle-logo"));
const stars = Array.from(document.querySelectorAll(".star"));
const sceneTrack = document.getElementById("sceneTrack");

const socialBtn = document.getElementById("socialBtn");
const notebookBtn = document.getElementById("notebookBtn");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");

const dockPopout = document.getElementById("dockPopout");
const dockPopoutInner = document.getElementById("dockPopoutInner");

const desktopFolders = document.querySelectorAll(".desktop-folder");

const fullText = "welcome to my portfolio :)";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobileQuery = window.matchMedia("(max-width: 760px)");
const tabletQuery = window.matchMedia("(max-width: 1024px)");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function mapProgress(value, start, end) {
  return clamp((value - start) / (end - start), 0, 1);
}

function getSequenceConfig() {
  const isMobile = mobileQuery.matches;
  const isTablet = tabletQuery.matches;

  if (isMobile) {
    return {
      lightStart: 0.1,
      lightEnd: 0.28,
      logoFadeStart: 0.08,
      logoFadeEnd: 0.2,
      starsInStart: 0.18,
      starsInEnd: 0.32,
      starsOutStart: 0.42,
      starsOutEnd: 0.56,
      typingStart: 0.22,
      typingEnd: 0.38,
      deskInStart: 0.4,
      deskInEnd: 0.62,
      deskScaleStart: 0.9,
      deskScaleEnd: 1.02
    };
  }

  if (isTablet) {
    return {
      lightStart: 0.12,
      lightEnd: 0.32,
      logoFadeStart: 0.1,
      logoFadeEnd: 0.24,
      starsInStart: 0.22,
      starsInEnd: 0.36,
      starsOutStart: 0.48,
      starsOutEnd: 0.62,
      typingStart: 0.26,
      typingEnd: 0.44,
      deskInStart: 0.5,
      deskInEnd: 0.7,
      deskScaleStart: 0.88,
      deskScaleEnd: 1.01
    };
  }

  return {
    lightStart: 0.14,
    lightEnd: 0.34,
    logoFadeStart: 0.1,
    logoFadeEnd: 0.26,
    starsInStart: 0.22,
    starsInEnd: 0.36,
    starsOutStart: 0.52,
    starsOutEnd: 0.64,
    typingStart: 0.28,
    typingEnd: 0.46,
    deskInStart: 0.54,
    deskInEnd: 0.74,
    deskScaleStart: 0.86,
    deskScaleEnd: 1
  };
}

function navigateWithSlide(url, direction = "left") {
  document.body.classList.remove("page-slide-out-left", "page-slide-out-right");
  document.body.classList.add(
    direction === "left" ? "page-slide-out-left" : "page-slide-out-right"
  );

  setTimeout(() => {
    window.location.href = url;
  }, 350);
}

function closeDockPopout() {
  if (!dockPopout || !dockPopoutInner) return;
  dockPopout.classList.remove("active");
  dockPopoutInner.innerHTML = "";
}

function openSocialPopout() {
  if (!dockPopout || !dockPopoutInner) return;
  dockPopoutInner.innerHTML = `
    <div class="popout-socials">
      <a href="https://instagram.com/artxxlai" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="Instagram">
        <img src="assets/logo1.png" alt="Instagram" />
      </a>
      <a href="https://www.linkedin.com/in/lailamonroe/" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="LinkedIn">
        <img src="assets/logo2.png" alt="LinkedIn" />
      </a>
       <a href="https://github.com/lailamonroe" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="LinkedIn">
        <img src="assets/logo3.png" alt="Github" />
      </a>
    </div>
  `;
  dockPopout.classList.add("active");
}

function openNotebookPopout() {
  if (!dockPopout || !dockPopoutInner) return;
  dockPopoutInner.innerHTML = `
    <div class="popout-note">
      <div class="popout-note-label">Brain Break</div>
      <div class="popout-note-title">Thoughts and Quotes </div>
      <div class="popout-note-text">
        “Everything negative, pressure, challenges, is all an opportunity for me to rise.” - Kobe Bryant 
      </div>
    </div>
  `;
  dockPopout.classList.add("active");
}

let logoIndex = 0;

if (!prefersReducedMotion && cycleLogos.length > 0) {
  setInterval(() => {
    cycleLogos.forEach((logo, index) => {
      logo.classList.toggle("active", index === logoIndex);
    });
    logoIndex = (logoIndex + 1) % cycleLogos.length;
  }, 260);
} else {
  cycleLogos.forEach((logo, index) => {
    logo.classList.toggle("active", index === 0);
  });
}

function updateSequence() {
  if (!sequence || !bgDark || !bgLight || !phaseLogo || !phaseStars || !phaseDesk || !sceneTrack) {
    return;
  }

  const config = getSequenceConfig();
  const rect = sequence.getBoundingClientRect();
  const total = Math.max(rect.height - window.innerHeight, 1);
  const progress = clamp(-rect.top / total, 0, 1);

  const lightReveal = mapProgress(progress, config.lightStart, config.lightEnd);
  bgLight.style.opacity = lightReveal;
  bgDark.style.opacity = 1 - lightReveal;

  const logoFade = 1 - mapProgress(progress, config.logoFadeStart, config.logoFadeEnd);
  const logoScale = 1 - mapProgress(progress, 0, config.logoFadeEnd) * 0.08;
  phaseLogo.style.opacity = logoFade;
  phaseLogo.style.transform = `scale(${logoScale})`;

  const starsIn = mapProgress(progress, config.starsInStart, config.starsInEnd);
  const starsOut = 1 - mapProgress(progress, config.starsOutStart, config.starsOutEnd);
  const starsOpacity = clamp(starsIn * starsOut, 0, 1);
  phaseStars.style.opacity = starsOpacity;

  stars.forEach((star, index) => {
    const stagger = index * 0.03;
    const local = clamp((starsIn - stagger) / 0.6, 0, 1);
    const y = 60 - local * 95;
    const scale = 0.8 + local * 0.24;
    const rotation = (index % 2 === 0 ? 1 : -1) * (14 - local * 20);
    const opacity = clamp(local * starsOut * 1.2, 0, 1);

    star.style.opacity = opacity;
    star.style.transform = prefersReducedMotion
      ? "translateY(0) scale(1) rotate(0deg)"
      : `translateY(${y}px) scale(${scale}) rotate(${rotation}deg)`;
  });

  const typingProgress = mapProgress(progress, config.typingStart, config.typingEnd);
  const charCount = Math.floor(fullText.length * typingProgress);
  typedText.textContent = fullText.slice(0, charCount);

  const deskIn = mapProgress(progress, config.deskInStart, config.deskInEnd);
  phaseDesk.style.opacity = deskIn;

  const deskScale = config.deskScaleStart + deskIn * (config.deskScaleEnd - config.deskScaleStart);
  sceneTrack.style.opacity = deskIn;
  sceneTrack.style.transform = `translate(-50%, -50%) scale(${deskScale})`;
}

function updateHeaderVisibility() {
  if (!sequence) {
    return;
  }

  const config = getSequenceConfig();
  const rect = sequence.getBoundingClientRect();
  const total = Math.max(rect.height - window.innerHeight, 1);
  const progress = clamp(-rect.top / total, 0, 1);
  const deskIn = mapProgress(progress, config.deskInStart, config.deskInEnd);

  document.body.classList.toggle("show-header", deskIn > 0.02);
}

desktopFolders.forEach((folder) => {
  folder.addEventListener("click", (event) => {
    event.preventDefault();
    closeDockPopout();

    const href = folder.getAttribute("href");
    const direction = folder.dataset.slide || "left";
    navigateWithSlide(href, direction);
  });
});

socialBtn?.addEventListener("click", () => {
  const isOpen =
    dockPopout.classList.contains("active") &&
    dockPopoutInner.innerHTML.includes("popout-socials");

  if (isOpen) {
    closeDockPopout();
  } else {
    openSocialPopout();
  }
});

notebookBtn?.addEventListener("click", () => {
  const isOpen =
    dockPopout.classList.contains("active") &&
    dockPopoutInner.innerHTML.includes("popout-note");

  if (isOpen) {
    closeDockPopout();
  } else {
    openNotebookPopout();
  }
});

prevPageBtn?.addEventListener("click", () => {
  closeDockPopout();
});

nextPageBtn?.addEventListener("click", () => {
  closeDockPopout();
  navigateWithSlide("about.html", "left");
});

document.addEventListener("click", (event) => {
  const clickedInsideDock = event.target.closest(".bottom-dock-wrap");
  const clickedDesktopFolder = event.target.closest(".desktop-folder");

  if (!clickedInsideDock && !clickedDesktopFolder) {
    closeDockPopout();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDockPopout();
  }
});

window.addEventListener("scroll", updateSequence, { passive: true });
window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
window.addEventListener("resize", updateSequence);
window.addEventListener("resize", updateHeaderVisibility);
window.addEventListener("load", updateSequence);
window.addEventListener("load", updateHeaderVisibility);

updateSequence();
updateHeaderVisibility();
