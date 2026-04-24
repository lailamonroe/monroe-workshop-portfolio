const contactSocialBtn = document.getElementById("contactSocialBtn");
const contactNotebookBtn = document.getElementById("contactNotebookBtn");
const contactPrevPageBtn = document.getElementById("contactPrevPageBtn");
const RETURN_TO_DESK_KEY = "return-to-home-desk";
const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

const contactDockPopout = document.getElementById("contactDockPopout");
const contactDockPopoutInner = document.getElementById("contactDockPopoutInner");

function contactNavigateWithSlide(url, direction = "left") {
  if (url === "index.html") {
    sessionStorage.setItem(RETURN_TO_DESK_KEY, "true");
  }

  if (isTouchDevice) {
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

document.querySelectorAll('a[href="index.html"]').forEach((link) => {
  link.addEventListener("click", () => {
    sessionStorage.setItem(RETURN_TO_DESK_KEY, "true");
  });
});

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
      </a>
       <a href="https://github.com/lailamonroe" target="_blank" rel="noopener noreferrer" class="popout-social-link" aria-label="LinkedIn">
        <img src="assets/logo3.png" alt="Github" />
      </a>
    </div>
  `;
  contactDockPopout.classList.add("active");
}

function openContactNotebookPopout() {
  contactDockPopoutInner.innerHTML = `
    <div class="popout-note">
      <div class="popout-note-label">Brain Break</div>
      <div class="popout-note-title">Thoughts and Quotes</div>
      <div class="popout-note-text">
      “Impossible is temporary.” - Muhammad Ali
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

contactPrevPageBtn?.addEventListener("click", () => {
  closeContactDockPopout();
  contactNavigateWithSlide("about.html", "right");
});

document.addEventListener("click", (event) => {
  const clickedInsideDock = event.target.closest(".contact-dock-wrap");
  if (!clickedInsideDock) {
    closeContactDockPopout();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeContactDockPopout();
  }
});
