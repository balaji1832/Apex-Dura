// Homepage slider js

const slides = document.getElementById("slides");
const cards  = document.querySelectorAll(".feature-card");
const icons  = document.querySelectorAll(".icon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const featureWrapper = document.querySelector(".feature-wrapper");

let index = 0;
const total = cards.length;

/* Move carousel */
function updateCarousel(){
  if(!slides) return;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

/* Update right panel icons */
function updateIcons(active){
  icons.forEach((icon, i) => {
    if(i === active){
      icon.classList.remove("opacity-0", "scale-75");
      icon.classList.add("opacity-100", "scale-110");
    } else {
      icon.classList.remove("opacity-100", "scale-110");
      icon.classList.add("opacity-0", "scale-75");
    }
  });
}

/* Update feature cards */
function updateCards(active){
  cards.forEach((card, i) => {
    if(i === active){
      card.classList.add("active", "ring-2", "ring-red-500");
    } else {
      card.classList.remove("active", "ring-2", "ring-red-500");
    }
  });
}

/* Scroll active card into view (mobile only) */
function scrollToActiveCard(){
  if(!featureWrapper) return;

  if(window.innerWidth <= 639){
    const activeCard = cards[index];
    if(activeCard){
      activeCard.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest"
      });
    }
  }
}

/* Central navigation */
function goToSlide(i){
  index = (i + total) % total;

  updateCarousel();
  updateIcons(index);
  updateCards(index);
  scrollToActiveCard();
}

/* Card click */
cards.forEach(card => {
  card.addEventListener("click", () => {
    const slideIndex = parseInt(card.dataset.slide, 10);
    if(!isNaN(slideIndex)) goToSlide(slideIndex);
  });
});

/* Buttons */
if(nextBtn){
  nextBtn.addEventListener("click", () => goToSlide(index + 1));
}

if(prevBtn){
  prevBtn.addEventListener("click", () => goToSlide(index - 1));
}

/* Initial state */
goToSlide(0);
