document.addEventListener("DOMContentLoaded", () => {

  const elements = document.querySelectorAll(
    ".fade-up, .fade-down, .fade-left, .fade-right, .fade-in, .animate-down, .animate-up"
  );

  const EXIT_DELAY = 150; // small debounce
  const timers = new WeakMap();

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {

        // cancel pending hide
        const t = timers.get(el);
        if (t) clearTimeout(t);

        el.classList.add("show");

      } else {

        // debounce hide (prevents flicker)
        const id = setTimeout(() => {
          el.classList.remove("show");
          timers.delete(el);
        }, EXIT_DELAY);

        timers.set(el, id);
      }

    });

  }, {
    threshold: 0,
    rootMargin: "0px 0px -20% 0px" // trigger earlier like your working site
  });

  elements.forEach(el => observer.observe(el));

});
