/* =========================================================
   DaliDev-IA — Portfolio interactions
   Minimal, dependency-free, defensive.
   Language: French by default, English optional (FR / EN switch).
   ========================================================= */
(function () {
  "use strict";

  /* ---- Current year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* =======================================================
     Internationalisation (FR default, EN override via data-en)
     ======================================================= */
  var STORE = "ddia-lang";
  var currentLang = "fr";

  var metaDesc  = document.querySelector('meta[name="description"]');
  var ogTitle   = document.querySelector('meta[property="og:title"]');
  var ogDesc    = document.querySelector('meta[property="og:description"]');
  var ogLocale  = document.querySelector('meta[property="og:locale"]');

  var META = {
    fr: {
      title:    document.title,
      desc:     metaDesc ? metaDesc.content : "",
      ogTitle:  ogTitle ? ogTitle.content : "",
      ogDesc:   ogDesc ? ogDesc.content : "",
      locale:   "fr_FR",
      menuOpen: "Ouvrir le menu",
      menuClose:"Fermer le menu"
    },
    en: {
      title:    "DaliDev-IA — Software, AI & Automation",
      desc:     "DaliDev-IA — Software & AI Builder, Automation Architect, Entrepreneur and Educator. Building AI-powered products, software and automation systems.",
      ogTitle:  "DaliDev-IA — Software, AI & Automation",
      ogDesc:   "Entrepreneur, Software & AI Builder and Automation Architect. Turning ambitious ideas into working systems.",
      locale:   "en_US",
      menuOpen: "Open menu",
      menuClose:"Close menu"
    }
  };

  // Snapshot the French originals (authored in the HTML) so we can restore them.
  var textNodes = document.querySelectorAll("[data-en]");
  textNodes.forEach(function (n) { n.dataset.fr = n.textContent; });

  var altNodes = document.querySelectorAll("[data-en-alt]");
  altNodes.forEach(function (n) { n.dataset.frAlt = n.getAttribute("alt") || ""; });

  var ariaNodes = document.querySelectorAll("[data-en-aria]");
  ariaNodes.forEach(function (n) { n.dataset.frAria = n.getAttribute("aria-label") || ""; });

  var langBtns = document.querySelectorAll(".lang-btn");

  function applyLang(lang) {
    if (lang !== "en") lang = "fr";
    var isEn = lang === "en";
    var m = META[lang];

    textNodes.forEach(function (n) {
      n.textContent = isEn ? n.getAttribute("data-en") : n.dataset.fr;
    });
    altNodes.forEach(function (n) {
      n.setAttribute("alt", isEn ? n.getAttribute("data-en-alt") : n.dataset.frAlt);
    });
    ariaNodes.forEach(function (n) {
      n.setAttribute("aria-label", isEn ? n.getAttribute("data-en-aria") : n.dataset.frAria);
    });

    document.documentElement.lang = lang;
    document.title = m.title;
    if (metaDesc)  metaDesc.content = m.desc;
    if (ogTitle)   ogTitle.content = m.ogTitle;
    if (ogDesc)    ogDesc.content = m.ogDesc;
    if (ogLocale)  ogLocale.content = m.locale;

    langBtns.forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });

    if (toggle) {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-label", open ? m.menuClose : m.menuOpen);
    }

    currentLang = lang;
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

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
      var m = META[currentLang] || META.fr;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? m.menuClose : m.menuOpen);
      mobileNav.hidden = !open;
    };

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) setMenu(false);
    });
  }

  /* ---- Language switch wiring ---- */
  langBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      applyLang(b.getAttribute("data-lang"));
    });
  });

  // Resolve initial language: ?lang= > saved choice > French default.
  var urlLang;
  try { urlLang = new URLSearchParams(location.search).get("lang"); } catch (e) {}
  var saved;
  try { saved = localStorage.getItem(STORE); } catch (e) {}
  var initial = (urlLang === "en" || urlLang === "fr") ? urlLang
              : (saved === "en" || saved === "fr") ? saved
              : "fr";
  applyLang(initial);

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
