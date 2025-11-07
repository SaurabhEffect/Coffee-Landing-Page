document.addEventListener("DOMContentLoaded", () => {
  // --- NEW: Typewriter Effect ---
  function typeWriter(lines, wait = 1000) {
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const speed = 100; // Typing speed

    const line1El = document.getElementById("typewriter-line1");
    const line2El = document.getElementById("typewriter-line2");
    const elements = [line1El, line2El];

    function type() {
      if (lineIndex >= lines.length) return;

      const currentLine = lines[lineIndex];
      const currentEl = elements[lineIndex];

      if (!currentEl) return;

      let displayText = currentLine.substring(0, charIndex);
      currentEl.innerHTML = displayText;
      currentEl.style.borderRight = ".15em solid var(--main-color)";

      if (!isDeleting && charIndex < currentLine.length) {
        // Typing
        charIndex++;
        setTimeout(type, speed);
      } else if (charIndex === currentLine.length) {
        // Line finished
        if (lineIndex < lines.length - 1) {
          // Move to next line
          setTimeout(() => {
            currentEl.style.borderRight = "none";
            lineIndex++;
            charIndex = 0;
            type();
          }, wait);
        } else {
          // Last line
          currentEl.style.animation = "blink-caret .75s step-end infinite";
        }
      }
    }
    if (line1El && line2El) {
      setTimeout(type, 500);
    }
  }

  // --- NEW: Product Modal ---
  const productModal = () => {
    const modalContainer = document.getElementById("modal-container");
    const modalClose = document.getElementById("modal-close");
    const cards = document.querySelectorAll(".card");

    if (!modalContainer || !modalClose) return;

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const title = card.getAttribute("data-title");
        const imgSrc = card.getAttribute("data-img-src");
        const items = card.getAttribute("data-items").split(",");

        document.getElementById("modal-title").innerText = title;
        document.getElementById(
          "modal-img"
        ).style.backgroundImage = `url(${imgSrc})`;

        const itemsHtml = items
          .map((item) => `<p>• ${item.trim()}</p>`)
          .join("");
        document.getElementById("modal-items").innerHTML = itemsHtml;

        modalContainer.style.display = "flex";
      });
    });

    const closeModal = () => {
      modalContainer.style.display = "none";
    };

    modalClose.addEventListener("click", closeModal);

    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        closeModal();
      }
    });
  };

  // --- NEW: Parallax Effect for "Our Story" ---
  const parallaxEffect = () => {
    const storyImg = document.querySelector("#our-story .img");
    if (!storyImg) return;

    window.addEventListener("scroll", () => {
      const rect = storyImg.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const speed = -0.15;
        const offset = (rect.top - window.innerHeight / 2) * speed;
        storyImg.style.backgroundPositionY = `calc(50% + ${offset}px)`;
      }
    });
  };

  // --- NEW: Contact Form Validation ---
  const contactForm = () => {
    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (!form || !formStatus) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("form-name").value;
      const email = document.getElementById("form-email").value;
      const message = document.getElementById("form-message").value;

      if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        formStatus.innerText = "Please fill out all fields.";
        formStatus.className = "error";
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        formStatus.innerText = "Please enter a valid email.";
        formStatus.className = "error";
        return;
      }

      formStatus.innerText = "Thank you! Your message has been sent (demo).";
      formStatus.className = "success";

      setTimeout(() => {
        form.reset();
        formStatus.innerText = "";
        formStatus.className = "";
      }, 4000);
    });
  };

  // --- Existing: Mobile Navigation ---
  const navSlide = () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    hamburger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });
      hamburger.classList.toggle("toggle");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("nav-active")) {
          nav.classList.remove("nav-active");
          hamburger.classList.remove("toggle");
          navLinks.forEach((link) => (link.style.animation = ""));
        }
      });
    });
  };

  // --- UPDATED: Scroll-to-Top and Progress Button ---
  const scrollProgressAndTop = () => {
    const progressBtn = document.getElementById("progressBtn");
    const progressValue = document.querySelector(".progress-value");

    if (!progressBtn || !progressValue) return;

    const circumference = 302;

    progressValue.style.strokeDasharray = circumference;
    progressValue.style.strokeDashoffset = circumference;

    window.onscroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // 1. Progress calculation
      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
      const offset = circumference - (scrollPercent / 100) * circumference;
      progressValue.style.strokeDashoffset = offset;

      // 2. Button Visibility (smooth fade-in)
      if (scrollTop > 300) {
        progressBtn.classList.add("visible");
      } else {
        progressBtn.classList.remove("visible");
      }
    };

    // 3. Click to scroll top
    progressBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  // --- Existing: On-Scroll Fade-in Animations ---
  const scrollAnimations = () => {
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    revealElements.forEach((element) => {
      revealOnScroll.observe(element);
    });
  };

  // --- Existing: Smooth Scrolling (for nav links) ---
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const navHeight = document.querySelector("nav").offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  };

  // ---== Initialize All Functions ==---

  // New Features
  typeWriter(["START YOUR DAY", "WITH OUR COFFEE"]);
  productModal();
  parallaxEffect();
  contactForm();

  // Existing Features
  navSlide();
  scrollProgressAndTop(); // <-- Yahaan hai
  scrollAnimations();
  smoothScroll();
});
