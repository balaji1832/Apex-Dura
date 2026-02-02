
document.addEventListener("DOMContentLoaded", () => {

  const elements = document.querySelectorAll(
    ".fade-up, .fade-down, .fade-left, .fade-right, .fade-in"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");   // animate in
      } else {
        entry.target.classList.remove("show"); // reset when out
      }

    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));

});

