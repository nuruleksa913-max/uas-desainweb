document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("aboutLiveTrack");
  const windowEl = document.querySelector(".about-live-window");
  if (!track || !windowEl) return;

  const images = [
    "p1.jpg",
    "p2.jpg",
    "p3.jpg",
    "https://images.pexels.com/photos/28978124/pexels-photo-28978124.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/28965885/pexels-photo-28965885.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/8530570/pexels-photo-8530570.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/28978124/pexels-photo-28978124.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/28965885/pexels-photo-28965885.jpeg?auto=compress&cs=tinysrgb&w=900"
  ];

  function renderPhoto(src) {
    return (
      '<figure class="about-live-photo">' +
      '<img src="' +
      src +
      '" alt="Foto kebun GreenRoot">' +
      "</figure>"
    );
  }

  const once = images.map(renderPhoto).join("");
  track.innerHTML = once + once;

  const photos = Array.from(track.querySelectorAll(".about-live-photo"));

  function highlightCenterPhoto() {
    const windowRect = windowEl.getBoundingClientRect();
    const centerX = windowRect.left + windowRect.width / 2;
    let closestPhoto = null;
    let closestDistance = Infinity;

    photos.forEach(function (photo) {
      const rect = photo.getBoundingClientRect();
      const photoCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - photoCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPhoto = photo;
      }
    });

    photos.forEach(function (photo) {
      photo.classList.remove("is-main");
    });

    if (closestPhoto) {
      closestPhoto.classList.add("is-main");
    }
  }

  highlightCenterPhoto();
  window.setInterval(highlightCenterPhoto, 160);
  window.addEventListener("resize", highlightCenterPhoto);

});
