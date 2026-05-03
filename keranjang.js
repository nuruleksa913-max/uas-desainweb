document.addEventListener("DOMContentLoaded", function () {
  const {
    getCart,
    incrementQty,
    decrementQty,
    removeFromCart,
    cartSubtotal,
    formatRupiah,
    syncCartBadges
  } = window.GreenRootStore;

  const cartEmpty = document.getElementById("cartEmpty");
  const cartContent = document.getElementById("cartContent");
  const cartItems = document.getElementById("cartItems");
  const subtotalText = document.getElementById("subtotalValue");
  const shippingText = document.getElementById("shippingValue");
  const totalText = document.getElementById("totalValue");

  function createCartItemElement(item) {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML =
      '<img src="' +
      item.image +
      '" alt="' +
      item.name +
      '" class="cart-item-image">' +
      '<div class="cart-item-info">' +
      '<h3>' +
      item.name +
      "</h3>" +
      '<p class="cart-item-price">' +
      formatRupiah(item.price) +
      "</p>" +
      "</div>" +
      '<div class="cart-item-actions">' +
      '<button type="button" class="qty-btn" data-action="minus" data-id="' +
      item.id +
      '">-</button>' +
      '<span class="qty-value">' +
      item.qty +
      "</span>" +
      '<button type="button" class="qty-btn" data-action="plus" data-id="' +
      item.id +
      '">+</button>' +
      '<button type="button" class="remove-btn" data-action="remove" data-id="' +
      item.id +
      '">Hapus</button>' +
      "</div>";

    return row;
  }

  function renderTotals() {
    const subtotal = cartSubtotal();
    const shipping = 0;
    subtotalText.textContent = formatRupiah(subtotal);
    shippingText.textContent = formatRupiah(shipping);
    totalText.textContent = formatRupiah(subtotal + shipping);
  }

  function renderCart() {
    const cart = getCart();
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartEmpty.hidden = false;
      cartContent.hidden = true;
      renderTotals();
      syncCartBadges();
      return;
    }

    cart.forEach(function (item) {
      cartItems.appendChild(createCartItemElement(item));
    });

    cartEmpty.hidden = true;
    cartContent.hidden = false;
    renderTotals();
    syncCartBadges();
  }

  cartItems.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;

    if (action === "plus") incrementQty(id);
    if (action === "minus") decrementQty(id);
    if (action === "remove") removeFromCart(id);

    renderCart();
  });

  renderCart();
});
