document.addEventListener("DOMContentLoaded", function () {
  const heroImage = document.getElementById("heroImage");
  if (!heroImage) return;

  const images = [
    "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1200&q=80",
    "h1.jpg",
    "h2.jpg",
    "h3.jpg"
  ];

  let currentIndex = 0;

  function renderImage(index) {
    heroImage.style.opacity = "0";
    window.setTimeout(function () {
      heroImage.src = images[index];
      heroImage.style.opacity = "1";
    }, 220);
  }

  heroImage.addEventListener("dblclick", function () {
    currentIndex = (currentIndex + 1) % images.length;
    renderImage(currentIndex);
  });
});
