/* =========================================================
   DaliDev-IA — Portfolio interactions
   Minimal, dependency-free, defensive.
   ========================================================= */
(function () {
  "use strict";

  /* ---- Current year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Header state on scroll ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      mobileNav.hidden = !open;
    };

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a destination
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    // Reset when returning to desktop layout
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) setMenu(false);
    });
  }

  /* ---- Adaptive hero portrait ----
     Desktop: align portrait head with the first title line and
     extend the portrait down to roughly the start of the final title line.
     This stays correct when translation or viewport width changes wrapping. */
  var heroCopy = document.querySelector(".hero-copy");
  var heroTitle = document.querySelector(".hero-title");
  var heroPortrait = document.querySelector(".hero-portrait");
  var portrait = heroPortrait ? heroPortrait.querySelector(".portrait") : null;
  var portraitImg = portrait ? portrait.querySelector(".portrait-img") : null;

  if (heroCopy && heroTitle && heroPortrait && portrait && portraitImg) {
    var syncHeroPortrait = function () {
      if (window.innerWidth <= 980) {
        heroPortrait.style.marginTop = "";
        portrait.style.width = "";
        return;
      }

      var copyRect = heroCopy.getBoundingClientRect();
      var titleRect = heroTitle.getBoundingClientRect();
      var titleStyle = window.getComputedStyle(heroTitle);
      var lineHeight = parseFloat(titleStyle.lineHeight) || 0;
      var ratio = portraitImg.naturalWidth && portraitImg.naturalHeight
        ? portraitImg.naturalWidth / portraitImg.naturalHeight
        : 1.049;

      // Align the very top of the cut-out with the first title line ("Je" / "I").
      var topOffset = Math.max(0, titleRect.top - copyRect.top);

      // Stop near the beginning of the final title line instead of the title bottom.
      var targetHeight = Math.max(360, titleRect.height - (lineHeight * 0.55));
      var targetWidth = targetHeight * ratio;

      heroPortrait.style.marginTop = Math.round(topOffset) + "px";
      portrait.style.width = Math.round(targetWidth) + "px";
    };

    var queueHeroPortraitSync = function () {
      window.requestAnimationFrame(syncHeroPortrait);
    };

    if (portraitImg.complete) {
      queueHeroPortraitSync();
    } else {
      portraitImg.addEventListener("load", queueHeroPortraitSync, { once: true });
    }

    window.addEventListener("resize", queueHeroPortraitSync, { passive: true });

    if ("ResizeObserver" in window) {
      var heroResizeObserver = new ResizeObserver(queueHeroPortraitSync);
      heroResizeObserver.observe(heroTitle);
    }

    if ("MutationObserver" in window) {
      var heroMutationObserver = new MutationObserver(queueHeroPortraitSync);
      heroMutationObserver.observe(heroTitle, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }

  /* ---- Scroll reveal ---- */
  var revealItems = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach(function (el) { observer.observe(el); });
  }
})();
