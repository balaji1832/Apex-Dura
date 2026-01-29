
      (function () {
        const track = document.getElementById("apxCarouselTrack");
        const prevBtn = document.getElementById("apxPrevBtn");
        const nextBtn = document.getElementById("apxNextBtn");

        if (!track || !prevBtn || !nextBtn) {
          console.error("Carousel elements not found");
          return;
        }

        let index = 0;
        let slideWidth = 0;

        function slidesPerView() {
          if (window.innerWidth >= 1024) return 3;
          if (window.innerWidth >= 768) return 2;
          return 1;
        }

        function calculateWidth() {
          const firstSlide = track.querySelector(".apx-carousel-slide");
          slideWidth = firstSlide.offsetWidth;
        }

        function updateCarousel() {
          const totalSlides = track.children.length;
          const maxIndex = totalSlides - slidesPerView();

          if (index < 0) index = maxIndex;
          if (index > maxIndex) index = 0;

          track.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        function initCarousel() {
          calculateWidth();
          updateCarousel();
        }

        nextBtn.onclick = () => {
          index++;
          updateCarousel();
        };

        prevBtn.onclick = () => {
          index--;
          updateCarousel();
        };

        window.addEventListener("resize", () => {
          calculateWidth();
          updateCarousel();
        });

        // Wait for images + layout
        window.addEventListener("load", initCarousel);
      })();
