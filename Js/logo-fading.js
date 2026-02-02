
const section = document.getElementById('videoSection');
const logo = document.getElementById('fadeLogo');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      logo.style.opacity = "1";   // show instantly
      logo.classList.add("fade-out"); // start fade animation
      observer.disconnect(); // run only once
    }
  });
}, { threshold: 0.6 });

observer.observe(section);
