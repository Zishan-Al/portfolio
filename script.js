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

  // Accordion (if present)
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
    
    // --- SMOOTH SCROLL TO ANCHORS --- //
    const anchorLinks = document.querySelectorAll('a[data-scroll-to]');
    
    anchorLinks.forEach(anchorLink => {
        let hashval = anchorLink.getAttribute('href');
        let target = document.querySelector(hashval);

        anchorLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            locoScroll.scrollTo(target);
        });
    });

    // --- ACCORDION LOGIC --- //
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            this.classList.toggle("active");
            const accordionContent = this.nextElementSibling;

            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
                accordionContent.style.padding = "0 1.5rem";
            } else {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                accordionContent.style.padding = "1.5rem";
            }
            
            setTimeout(() => {
                locoScroll.update();
            }, 500);
        });
    });

    // Update locomotive scroll on window resize
    window.addEventListener('resize', () => {
        locoScroll.update();
    });

});
