// public/scroll-animate.js

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach(el => observer.observe(el));
});
