document.addEventListener("DOMContentLoaded", function() {
  const mainContainer = document.querySelector(".main-container");
  const isDesktop = window.innerWidth >= 768;
  let locoScroll;

  if (isDesktop && typeof LocomotiveScroll !== "undefined") {
    locoScroll = new LocomotiveScroll({
      el: mainContainer,
      smooth: true,
      lerp: 0.1,
      tablet: { smooth: false },
      smartphone: { smooth: false }
    });
    window.addEventListener("resize", () => locoScroll.update());
  } else {
    document.documentElement.style.scrollBehavior = "smooth";
  }

  // Anchor links via Locomotive on desktop
  if (isDesktop && locoScroll) {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      link.addEventListener("click", e => {
        e.preventDefault();
        locoScroll.scrollTo(target);
      });
    });
  }

  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks  = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Accordion (if you have any)
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.padding   = "0 1.5rem";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding   = "1.5rem";
      }
      if (isDesktop && locoScroll) {
        setTimeout(() => locoScroll.update(), 500);
      }
    });
  });
});
