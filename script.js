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

  /* ---- Hero viewport rebalance experiment ----
     Desktop only: treat the hero as one composed screen, with a title size
     derived from viewport height and tighter vertical rhythm. The portrait
     remains aligned to the translated/wrapped title. */
  var hero = document.querySelector(".hero");
  var heroGrid = document.querySelector(".hero-grid");
  var heroCopy = document.querySelector(".hero-copy");
  var heroEyebrow = heroCopy ? heroCopy.querySelector(".eyebrow") : null;
  var heroTitle = document.querySelector(".hero-title");
  var heroLede = document.querySelector(".hero-lede");
  var heroCta = document.querySelector(".hero-cta");
  var heroMarkers = document.querySelector(".hero-markers");
  var heroPortrait = document.querySelector(".hero-portrait");
  var portrait = heroPortrait ? heroPortrait.querySelector(".portrait") : null;
  var portraitImg = portrait ? portrait.querySelector(".portrait-img") : null;

  if (hero && heroGrid && heroCopy && heroTitle && heroPortrait && portrait && portraitImg) {
    var resetHeroDesktopStyles = function () {
      hero.style.minHeight = "";
      hero.style.display = "";
      hero.style.alignItems = "";
      hero.style.paddingTop = "";
      hero.style.paddingBottom = "";
      heroGrid.style.width = "";
      heroTitle.style.fontSize = "";
      heroTitle.style.lineHeight = "";
      if (heroEyebrow) heroEyebrow.style.marginBottom = "";
      if (heroLede) heroLede.style.marginTop = "";
      if (heroCta) heroCta.style.marginTop = "";
      if (heroMarkers) {
        heroMarkers.style.marginTop = "";
        heroMarkers.style.paddingTop = "";
      }
      heroPortrait.style.marginTop = "";
      portrait.style.width = "";
    };

    var syncHeroLayout = function () {
      if (window.innerWidth <= 980) {
        resetHeroDesktopStyles();
        return;
      }

      var headerHeight = header ? header.offsetHeight : 68;
      var availableHeight = Math.max(640, window.innerHeight - headerHeight);
      var titleSize = Math.max(48, Math.min(78, window.innerHeight * 0.07));

      hero.style.minHeight = availableHeight + "px";
      hero.style.display = "flex";
      hero.style.alignItems = "center";
      hero.style.paddingTop = "28px";
      hero.style.paddingBottom = "34px";
      heroGrid.style.width = "100%";

      heroTitle.style.fontSize = Math.round(titleSize) + "px";
      heroTitle.style.lineHeight = ".96";
      if (heroEyebrow) heroEyebrow.style.marginBottom = "14px";
      if (heroLede) heroLede.style.marginTop = "16px";
      if (heroCta) heroCta.style.marginTop = "20px";
      if (heroMarkers) {
        heroMarkers.style.marginTop = "26px";
        heroMarkers.style.paddingTop = "16px";
      }

      var copyRect = heroCopy.getBoundingClientRect();
      var titleRect = heroTitle.getBoundingClientRect();
      var titleStyle = window.getComputedStyle(heroTitle);
      var lineHeight = parseFloat(titleStyle.lineHeight) || titleSize * 0.96;
      var ratio = portraitImg.naturalWidth && portraitImg.naturalHeight
        ? portraitImg.naturalWidth / portraitImg.naturalHeight
        : 1.049;

      // Keep the portrait head aligned with the first title line.
      var topOffset = Math.max(0, titleRect.top - copyRect.top);

      // Let the portrait finish around the beginning of the final title line.
      var targetHeight = Math.max(320, titleRect.height - (lineHeight * 0.55));
      var targetWidth = targetHeight * ratio;

      heroPortrait.style.marginTop = Math.round(topOffset) + "px";
      portrait.style.width = Math.round(targetWidth) + "px";
    };

    var queueHeroLayoutSync = function () {
      window.requestAnimationFrame(syncHeroLayout);
    };

    if (portraitImg.complete) {
      queueHeroLayoutSync();
    } else {
      portraitImg.addEventListener("load", queueHeroLayoutSync, { once: true });
    }

    window.addEventListener("resize", queueHeroLayoutSync, { passive: true });

    if ("ResizeObserver" in window) {
      var heroResizeObserver = new ResizeObserver(queueHeroLayoutSync);
      heroResizeObserver.observe(heroTitle);
    }

    if ("MutationObserver" in window) {
      var heroMutationObserver = new MutationObserver(queueHeroLayoutSync);
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
