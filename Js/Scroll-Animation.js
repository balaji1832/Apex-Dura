
document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector("#whyChooseScroll");
  if (!section) return; // safety

  const cards = gsap.utils.toArray("#whyChooseScroll .card-inner");
  const parallaxImgs = gsap.utils.toArray("#whyChooseScroll .bg-parallax");
  const isMobile = window.innerWidth <= 768;

  cards.forEach((card, i) => {
    if (i === 0) return;

    gsap.fromTo(card,
      {
        rotateX: isMobile ? 25 : 65,
        rotateY: isMobile ? -4 : -12,
        y: isMobile ? 120 : 260,
        z: isMobile ? -120 : -300,
        opacity: 0,
        scale: isMobile ? 0.94 : 0.88,
        filter: "blur(4px)"
      },
      {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        z: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        ease: "power4.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 25%",
          scrub: 1,
          id: "whyChoose-card-" + i
        }
      }
    );

    gsap.to(cards[i - 1], {
      scale: 0.92,
      y: isMobile ? -70 : -160,
      z: -200,
      rotateX: -8,
      opacity: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 75%",
        end: "top 40%",
        scrub: 1,
        id: "whyChoose-stack-" + i
      }
    });
  });

  parallaxImgs.forEach(img => {
    gsap.to(img, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        id: "whyChoose-parallax"
      }
    });
  });

});
