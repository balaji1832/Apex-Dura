
document.addEventListener("DOMContentLoaded", () => {

  const slides = document.getElementById("slides");
  const slideItems = slides ? slides.children : [];

  const cards  = document.querySelectorAll(".feature-card");
  const icons  = document.querySelectorAll(".icon");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const featureWrapper = document.querySelector(".feature-wrapper");

  let index = 0;
  let auto;

  const total = slideItems.length || cards.length;



  /* ================= MOVE CAROUSEL ================= */
  function updateCarousel() {
    if (!slides) return;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }



  /* ================= PLAY ONLY ACTIVE VIDEO ================= */
  function updateVideos(active) {
    [...slideItems].forEach((video, i) => {
      if (video.tagName === "VIDEO") {
        if (i === active) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }



  /* ================= ICONS ================= */
  function updateIcons(active) {
    icons.forEach((icon, i) => {
      icon.classList.toggle("opacity-100", i === active);
      icon.classList.toggle("scale-110", i === active);
      icon.classList.toggle("opacity-0", i !== active);
      icon.classList.toggle("scale-75", i !== active);
    });
  }



  /* ================= CARDS ================= */
  function updateCards(active) {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === active);
      card.classList.toggle("ring-2", i === active);
      card.classList.toggle("ring-red-500", i === active);
    });
  }



  /* ================= MOBILE SCROLL ================= */
  function scrollToActiveCard() {
    if (!featureWrapper) return;

    if (window.innerWidth <= 639) {
      const activeCard = cards[index];
      if (activeCard) {
        activeCard.scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest"
        });
      }
    }
  }



  /* ================= CENTRAL NAV ================= */
  function goToSlide(i) {
    index = (i + total) % total;

    updateCarousel();
    updateVideos(index);   // ⭐ added
    updateIcons(index);
    updateCards(index);
    scrollToActiveCard();
  }



  /* ================= AUTO PLAY (5s HOLD) ================= */
  function startAuto() {
    auto = setInterval(() => {
      goToSlide(index + 1);
    }, 5000); // ⭐ 5 seconds
  }

  function stopAuto() {
    clearInterval(auto);
  }



  /* ================= EVENTS ================= */
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const slideIndex = parseInt(card.dataset.slide, 10);
      if (!isNaN(slideIndex)) goToSlide(slideIndex);
    });
  });

  if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(index + 1));
  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(index - 1));

  const carousel = document.getElementById("carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);
    carousel.addEventListener("touchstart", stopAuto);
    carousel.addEventListener("touchend", startAuto);
  }



  /* ================= INIT ================= */
  goToSlide(0);
  startAuto();

});

