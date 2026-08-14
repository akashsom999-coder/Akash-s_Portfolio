/* ==========================================================================
   AKASH SOM — PORTFOLIO SCRIPTS
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    setupThemeToggle();
    setupMobileMenu();
    setupSmoothScrollAndActiveNav();
    setupScrollReveal();
    setupBackToTop();
    setupTypingAnimation();
    setupProfileImageFallback();
    setupProjectFilters();
    setupContactForm();
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Theme toggle (dark default) ---------- */
  function setupThemeToggle() {
    var body = document.body;
    var toggle = document.getElementById("themeToggle");
    var stored = null;
    try { stored = localStorage.getItem("akashsom-theme"); } catch (e) { stored = null; }

    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    applyTheme(theme);

    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var current = body.getAttribute("data-theme") === "light" ? "light" : "dark";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("akashsom-theme", next); } catch (e) {}
    });

    function applyTheme(t) {
      body.setAttribute("data-theme", t);
      toggle && toggle.setAttribute("aria-pressed", t === "light" ? "true" : "false");
    }
  }

  /* ---------- Mobile hamburger menu ---------- */
  function setupMobileMenu() {
    var hamburger = document.getElementById("hamburger");
    var menu = document.getElementById("mobileMenu");
    if (!hamburger || !menu) return;

    hamburger.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ---------- Smooth scroll + active nav link tracking ---------- */
  function setupSmoothScrollAndActiveNav() {
    var navTabs = Array.prototype.slice.call(document.querySelectorAll(".nav-tab"));
    var sections = navTabs
      .map(function (tab) {
        var id = tab.getAttribute("href").replace("#", "");
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            navTabs.forEach(function (tab) {
              tab.classList.toggle("active", tab.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- Scroll reveal animations ---------- */
  function setupScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Back to top button ---------- */
  function setupBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener("scroll", function () {
      btn.classList.toggle("visible", window.scrollY > 480);
    }, { passive: true });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Hero typing animation ---------- */
  function setupTypingAnimation() {
    var target = document.getElementById("typedText");
    if (!target) return;

    var phrases = ["\"available for hire\"", "\"open to internships\"", "\"ready to build\""];
    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var typeSpeed = 65;
    var deleteSpeed = 35;
    var pauseAfterType = 1400;
    var pauseAfterDelete = 300;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.textContent = phrases[0];
      return;
    }

    function tick() {
      var current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        target.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, pauseAfterType);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        charIndex--;
        target.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, pauseAfterDelete);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }

    setTimeout(tick, typeSpeed);
  }

  /* ---------- Profile image fallback ---------- */
  function setupProfileImageFallback() {
    var img = document.getElementById("profileImg");
    var fallback = document.getElementById("profileFallback");
    if (!img || !fallback) return;

    function showFallback() {
      img.style.display = "none";
      fallback.hidden = false;
    }

    if (img.complete) {
      if (img.naturalWidth === 0) showFallback();
    } else {
      img.addEventListener("error", showFallback);
      img.addEventListener("load", function () {
        if (img.naturalWidth === 0) showFallback();
      });
    }
  }

  /* ---------- Project filtering by technology ---------- */
  function setupProjectFilters() {
    var bar = document.getElementById("filterBar");
    var cards = document.querySelectorAll(".project-card");
    var emptyMsg = document.getElementById("filterEmpty");
    if (!bar || !cards.length) return;

    bar.addEventListener("click", function (e) {
      var chip = e.target.closest(".filter-chip");
      if (!chip) return;

      bar.querySelectorAll(".filter-chip").forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");

      var filter = chip.getAttribute("data-filter");
      var visibleCount = 0;

      cards.forEach(function (card) {
        var tech = card.getAttribute("data-tech") || "";
        var match = filter === "all" || tech.indexOf(filter) !== -1;
        card.classList.toggle("filtered-out", !match);
        if (match) visibleCount++;
      });

      if (emptyMsg) emptyMsg.hidden = visibleCount !== 0;
    });
  }

  /* ---------- Contact form validation + mailto submission ---------- */
  function setupContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var nameField = document.getElementById("fName");
    var emailField = document.getElementById("fEmail");
    var messageField = document.getElementById("fMessage");
    var errName = document.getElementById("errName");
    var errEmail = document.getElementById("errEmail");
    var errMessage = document.getElementById("errMessage");
    var note = document.getElementById("formNote");
    var defaultNote = note ? note.textContent : "";

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      valid = validateField(nameField, errName, nameField.value.trim().length >= 2, "Please enter your name.") && valid;
      valid = validateField(emailField, errEmail, emailPattern.test(emailField.value.trim()), "Please enter a valid email address.") && valid;
      valid = validateField(messageField, errMessage, messageField.value.trim().length >= 10, "Message should be at least 10 characters.") && valid;

      if (!valid) {
        if (note) { note.textContent = defaultNote; note.classList.remove("success"); }
        return;
      }

      var subject = encodeURIComponent("Portfolio Contact from " + nameField.value.trim());
      var body = encodeURIComponent(
        "Name: " + nameField.value.trim() +
        "\nEmail: " + emailField.value.trim() +
        "\n\nMessage:\n" + messageField.value.trim()
      );
      var mailtoLink = "mailto:akashsom999@gmail.com?subject=" + subject + "&body=" + body;

      window.location.href = mailtoLink;

      if (note) {
        note.textContent = "Your email client should now be open with this message pre-filled. Backend integration can be added later for direct in-page delivery.";
        note.classList.add("success");
      }
    });

    [nameField, emailField, messageField].forEach(function (field) {
      field.addEventListener("input", function () {
        field.closest(".form-row").classList.remove("has-error");
      });
    });

    function validateField(field, errorEl, isValid, message) {
      var row = field.closest(".form-row");
      if (isValid) {
        row.classList.remove("has-error");
        if (errorEl) errorEl.textContent = "";
        return true;
      }
      row.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
      return false;
    }
  }
})();
