document.addEventListener("DOMContentLoaded", () => {

  const slides = document.getElementById("slides");
  const slideItems = slides ? slides.children : [];

  const cards = document.querySelectorAll(".feature-card");
  const icons = document.querySelectorAll(".icon");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const featureWrapper = document.querySelector(".feature-wrapper");

  let index = 0;
  let auto = null;

  const total = slideItems.length || cards.length;



  /* =========================================
     MOVE MAIN SLIDES (video carousel)
  ========================================= */
  function updateCarousel() {
    if (!slides) return;

    slides.style.transform = `translate3d(-${index * 100}%,0,0)`; // GPU smooth
  }



  /* =========================================
     PLAY ONLY ACTIVE VIDEO
  ========================================= */
  function updateVideos(active) {
    [...slideItems].forEach((el, i) => {
      if (el.tagName === "VIDEO") {
        if (i === active) {
          el.play().catch(() => {});
        } else {
          el.pause();
          el.currentTime = 0;
        }
      }
    });
  }



  /* =========================================
     ICONS
  ========================================= */
  function updateIcons(active) {
    icons.forEach((icon, i) => {
      icon.classList.toggle("opacity-100", i === active);
      icon.classList.toggle("scale-110", i === active);
      icon.classList.toggle("opacity-0", i !== active);
      icon.classList.toggle("scale-75", i !== active);
    });
  }



  /* =========================================
     CARDS
  ========================================= */
  function updateCards(active) {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === active);
      card.classList.toggle("ring-2", i === active);
      card.classList.toggle("ring-red-500", i === active);
    });
  }



  /* =========================================
     MOBILE ONLY HORIZONTAL SCROLL
     (FIXED — NO scrollIntoView anymore)
  ========================================= */
  function scrollToActiveCard() {
    if (!featureWrapper) return;

    if (window.innerWidth <= 639) {
      const cardWidth = cards[0].offsetWidth;

      featureWrapper.scrollTo({
        left: cardWidth * index,
        behavior: "smooth"
      });
    }
  }



  /* =========================================
     GO TO SLIDE (central controller)
  ========================================= */
  function goToSlide(i) {
    index = (i + total) % total;

    updateCarousel();
    updateVideos(index);
    updateIcons(index);
    updateCards(index);
    scrollToActiveCard(); // safe now
  }



  /* =========================================
     AUTOPLAY (stable)
  ========================================= */
  function startAuto() {
    stopAuto();

    auto = setInterval(() => {
      goToSlide(index + 1);
    }, 5000);
  }

  function stopAuto() {
    if (auto) {
      clearInterval(auto);
      auto = null;
    }
  }



  /* =========================================
     EVENTS
  ========================================= */

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const slideIndex = parseInt(card.dataset.slide, 10);
      if (!isNaN(slideIndex)) goToSlide(slideIndex);
    });
  });

  nextBtn?.addEventListener("click", () => goToSlide(index + 1));
  prevBtn?.addEventListener("click", () => goToSlide(index - 1));



  /* pause on hover/touch */
  const carousel = document.getElementById("carousel");

  carousel?.addEventListener("mouseenter", stopAuto);
  carousel?.addEventListener("mouseleave", startAuto);
  carousel?.addEventListener("touchstart", stopAuto, { passive: true });
  carousel?.addEventListener("touchend", startAuto, { passive: true });



  /* =========================================
     INIT
  ========================================= */
  goToSlide(0);
  startAuto();

});
