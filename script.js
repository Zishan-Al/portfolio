document.addEventListener("DOMContentLoaded", function() {

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('.main-container'),
        smooth: true,
        lerp: 0.05, // Linear Interpolation, 0.05 - 0.1 is a good range
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