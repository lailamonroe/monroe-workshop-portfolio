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

const hotspots = document.querySelectorAll(".hotspot");

const socialBtn = document.getElementById("socialBtn");
const notebookBtn = document.getElementById("notebookBtn");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");

const dockPopout = document.getElementById("dockPopout");
const dockPopoutInner = document.getElementById("dockPopoutInner");

const fullText = "welcome to my portfolio";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function mapProgress(value, start, end) {
  return clamp((value - start) / (end - start), 0, 1);
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
  dockPopout.classList.remove("active");
  dockPopoutInner.innerHTML = "";
}

function openSocialPopout() {
  dockPopoutInner.innerHTML = `
    <div class="popout-socials">
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="Instagram">
        <img src="assets/logo1.png" alt="Instagram" />
      </a>
      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="LinkedIn">
        <img src="assets/logo2.png" alt="LinkedIn" />
      </a>
    </div>
  `;
  dockPopout.classList.add("active");
}

function openNotebookPopout() {
  dockPopoutInner.innerHTML = `
    <div class="popout-note">
      <div class="popout-note-label">NOTEBOOK</div>
      <div class="popout-note-title">Sketchbook / Notes</div>
      <div class="popout-note-text">
        Process, thoughts, inspiration, and quick pieces from my creative world.
      </div>
    </div>
  `;
  dockPopout.classList.add("active");
}

let logoIndex = 0;

if (!prefersReducedMotion) {
  setInterval(() => {
    cycleLogos.forEach((logo, index) => {
      logo.classList.toggle("active", index === logoIndex);
    });
    logoIndex = (logoIndex + 1) % cycleLogos.length;
  }, 220);
} else {
  cycleLogos.forEach((logo, index) => {
    logo.classList.toggle("active", index === 0);
  });
}

function updateSequence() {
  if (!sequence) return;

  const rect = sequence.getBoundingClientRect();
  const total = Math.max(rect.height - window.innerHeight, 1);
  const progress = clamp(-rect.top / total, 0, 1);

  const lightReveal = mapProgress(progress, 0.14, 0.34);
  bgLight.style.opacity = lightReveal;
  bgDark.style.opacity = 1 - lightReveal;

  const logoFade = 1 - mapProgress(progress, 0.1, 0.26);
  const logoScale = 1 - mapProgress(progress, 0, 0.26) * 0.08;
  phaseLogo.style.opacity = logoFade;
  phaseLogo.style.transform = `scale(${logoScale})`;

  const starsIn = mapProgress(progress, 0.22, 0.36);
  const starsOut = 1 - mapProgress(progress, 0.52, 0.64);
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
      ? `translateY(0) scale(1) rotate(0deg)`
      : `translateY(${y}px) scale(${scale}) rotate(${rotation}deg)`;
  });

  const typingProgress = mapProgress(progress, 0.28, 0.46);
  const charCount = Math.floor(fullText.length * typingProgress);
  typedText.textContent = fullText.slice(0, charCount);

  const deskIn = mapProgress(progress, 0.54, 0.74);
  phaseDesk.style.opacity = deskIn;

  const deskScale = 0.86 + deskIn * 0.14;
  sceneTrack.style.opacity = deskIn;
  sceneTrack.style.transform = `translate(-50%, -50%) scale(${deskScale})`;

  document.body.classList.toggle("show-header", progress > 0.78);
}

hotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", () => {
    const target = hotspot.dataset.target;
    const popout = hotspot.dataset.openPopout;

    if (popout === "social") {
      openSocialPopout();
      return;
    }

    if (popout === "notebook") {
      openNotebookPopout();
      return;
    }

    if (!target) return;

    if (target.includes("about")) {
      navigateWithSlide(target, "right");
    } else {
      navigateWithSlide(target, "left");
    }
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
  const clickedHotspot = event.target.closest(".hotspot");

  if (!clickedInsideDock && !clickedHotspot) {
    closeDockPopout();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDockPopout();
  }
});

window.addEventListener("scroll", updateSequence, { passive: true });
window.addEventListener("resize", updateSequence);
window.addEventListener("load", updateSequence);

updateSequence();