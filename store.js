(function () {
  const CART_KEY = "greenroot_cart";
  const ORDER_KEY = "greenroot_last_order";

  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    syncCartBadges();
  }

  function addToCart(product, qty) {
    const quantity = Number(qty) > 0 ? Number(qty) : 1;
    const cart = getCart();
    const found = cart.find((item) => item.id === product.id);

    if (found) {
      found.qty += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: product.image || "",
        qty: quantity
      });
    }

    saveCart(cart);
  }

  function setQty(id, qty) {
    const cart = getCart();
    const target = cart.find((item) => item.id === id);
    if (!target) return;

    target.qty = Number(qty) || 1;
    if (target.qty < 1) {
      const next = cart.filter((item) => item.id !== id);
      saveCart(next);
      return;
    }

    saveCart(cart);
  }

  function incrementQty(id) {
    const cart = getCart();
    const target = cart.find((item) => item.id === id);
    if (!target) return;

    target.qty += 1;
    saveCart(cart);
  }

  function decrementQty(id) {
    const cart = getCart();
    const target = cart.find((item) => item.id === id);
    if (!target) return;

    target.qty -= 1;
    if (target.qty < 1) {
      const next = cart.filter((item) => item.id !== id);
      saveCart(next);
      return;
    }

    saveCart(cart);
  }

  function removeFromCart(id) {
    const next = getCart().filter((item) => item.id !== id);
    saveCart(next);
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
    syncCartBadges();
  }

  function cartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function cartSubtotal() {
    return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(Number(value) || 0);
  }

  function syncCartBadges() {
    const total = cartCount();
    document.querySelectorAll(".cart-badge").forEach((badge) => {
      badge.textContent = String(total);
    });
  }

  function readProductFromButton(button) {
    return {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      image: button.dataset.image || ""
    };
  }

  function showToast(message) {
    const oldToast = document.querySelector(".toast-message");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    document.body.appendChild(toast);

    window.setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    window.setTimeout(() => {
      toast.classList.remove("show");
      window.setTimeout(() => toast.remove(), 250);
    }, 1700);
  }

  function addToCartFromButton(button) {
    const product = readProductFromButton(button);
    addToCart(product, 1);
    showToast(product.name + " ditambahkan ke keranjang");
  }

  function buyNowFromButton(button) {
    const product = readProductFromButton(button);
    addToCart(product, 1);
    window.location.href = "keranjang.html";
  }

  function saveOrder(order) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  }

  function getLastOrder() {
    try {
      const raw = localStorage.getItem(ORDER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  window.GreenRootStore = {
    CART_KEY,
    ORDER_KEY,
    getCart,
    saveCart,
    addToCart,
    setQty,
    incrementQty,
    decrementQty,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    formatRupiah,
    syncCartBadges,
    addToCartFromButton,
    buyNowFromButton,
    saveOrder,
    getLastOrder
  };
})();
