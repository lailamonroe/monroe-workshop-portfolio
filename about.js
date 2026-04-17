const socialBtn = document.getElementById("socialBtn");
const notebookBtn = document.getElementById("notebookBtn");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");

const dockPopout = document.getElementById("dockPopout");
const dockPopoutInner = document.getElementById("dockPopoutInner");

const frameHotspots = document.querySelectorAll(".frame-hotspot");

const aboutPanelLabel = document.getElementById("aboutPanelLabel");
const aboutPanelTitle = document.getElementById("aboutPanelTitle");
const aboutPanelText = document.getElementById("aboutPanelText");

const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

const defaultPanel = {
  label: "ABOUT",
  title: "Tap or hover over a frame to learn more.",
  text: "Each image highlights a different part of my life, background, interests, and creative perspective."
};

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

function setAboutPanel(label, title, text) {
  if (!aboutPanelLabel || !aboutPanelTitle || !aboutPanelText) return;
  aboutPanelLabel.textContent = label;
  aboutPanelTitle.textContent = title;
  aboutPanelText.textContent = text;
}

function resetAboutPanel() {
  setAboutPanel(defaultPanel.label, defaultPanel.title, defaultPanel.text);
}

frameHotspots.forEach((hotspot) => {
  const updatePanel = () => {
    setAboutPanel(
      hotspot.dataset.label,
      hotspot.dataset.title,
      hotspot.dataset.text
    );
  };

  hotspot.addEventListener("mouseenter", updatePanel);
  hotspot.addEventListener("focus", updatePanel);

  if (isTouchDevice) {
    hotspot.addEventListener("click", (event) => {
      event.preventDefault();
      updatePanel();
    });
  }

  hotspot.addEventListener("mouseleave", () => {
    if (!isTouchDevice) resetAboutPanel();
  });

  hotspot.addEventListener("blur", () => {
    if (!isTouchDevice) resetAboutPanel();
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
  navigateWithSlide("index.html", "right");
});

nextPageBtn?.addEventListener("click", () => {
  closeDockPopout();
  navigateWithSlide("contact.html", "left");
});

document.addEventListener("click", (event) => {
  const clickedInsideDock = event.target.closest(".bottom-dock-wrap");
  const clickedFrame = event.target.closest(".frame-hotspot");

  if (!clickedInsideDock) {
    closeDockPopout();
  }

  if (isTouchDevice && !clickedFrame) {
    resetAboutPanel();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDockPopout();
    resetAboutPanel();
  }
});

resetAboutPanel();