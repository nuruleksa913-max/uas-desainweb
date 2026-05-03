document.addEventListener("DOMContentLoaded", function () {
  const images = Array.from(document.querySelectorAll(".category-rotating-image"));
  if (!images.length) return;
  const DOUBLE_TAP_MS = 320;

  function createMapping(imageElement) {
    const sourceList = (imageElement.dataset.images || imageElement.src)
      .split("|")
      .map(function (url) {
        return url.trim();
      })
      .filter(Boolean);

    return {
      el: imageElement,
      list: sourceList,
      index: 0
    };
  }

  function changeImage(item, direction) {
    if (!item.list || item.list.length < 2) return;
    item.index = (item.index + direction + item.list.length) % item.list.length;
    item.el.style.opacity = "0";
    window.setTimeout(function () {
      item.el.src = item.list[item.index];
      item.el.style.opacity = "1";
    }, 200);
  }

  const mappings = images.map(function (image) {
    const item = createMapping(image);
    let lastClickAt = 0;

    image.addEventListener("click", function (event) {
      event.preventDefault();
      const now = Date.now();
      if (now - lastClickAt <= DOUBLE_TAP_MS) {
        event.stopPropagation();
        changeImage(item, 1);
        lastClickAt = 0;
        return;
      }
      lastClickAt = now;
    });

    image.addEventListener("dblclick", function (event) {
      event.preventDefault();
      event.stopPropagation();
      changeImage(item, 1);
    });

    return item;
  });

});
