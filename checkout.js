document.addEventListener("DOMContentLoaded", function () {
  const {
    getCart,
    cartSubtotal,
    formatRupiah,
    saveOrder,
    clearCart,
    syncCartBadges
  } = window.GreenRootStore;

  const list = document.getElementById("checkoutItems");
  const subtotalText = document.getElementById("checkoutSubtotal");
  const shippingText = document.getElementById("checkoutShipping");
  const discountLabelText = document.getElementById("checkoutDiscountLabel");
  const discountText = document.getElementById("checkoutDiscount");
  const totalText = document.getElementById("checkoutTotal");
  const form = document.getElementById("checkoutForm");
  const emptyMessage = document.getElementById("checkoutEmpty");

  const cart = getCart();
  const subtotal = cartSubtotal();
  const pickupFee = 0;

  function calculateDiscountRate(amount) {
    if (amount >= 300000) return 20;
    if (amount >= 200000) return 10;
    if (amount >= 100000) return 5;
    return 0;
  }

  const totalBeforeDiscount = subtotal + pickupFee;
  const discountRate = calculateDiscountRate(subtotal);
  const discountAmount = Math.floor((totalBeforeDiscount * discountRate) / 100);
  const grandTotal = Math.max(0, totalBeforeDiscount - discountAmount);

  function renderSummary() {
    if (cart.length === 0) {
      emptyMessage.hidden = false;
      form.querySelector("button[type='submit']").disabled = true;
    } else {
      emptyMessage.hidden = true;
      cart.forEach(function (item) {
        const li = document.createElement("li");
        li.className = "checkout-item";
        li.innerHTML =
          "<span>" +
          item.name +
          " x" +
          item.qty +
          "</span>" +
          "<strong>" +
          formatRupiah(item.price * item.qty) +
          "</strong>";
        list.appendChild(li);
      });
    }

    subtotalText.textContent = formatRupiah(subtotal);
    shippingText.textContent = formatRupiah(pickupFee);
    discountLabelText.textContent = "(" + discountRate + "%)";
    discountText.textContent = "- " + formatRupiah(discountAmount);
    totalText.textContent = formatRupiah(grandTotal);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (cart.length === 0) return;

    const formData = new FormData(form);
    const orderNumber = "GR-" + Date.now().toString().slice(-8);

    const order = {
      orderNumber: orderNumber,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: formData.get("fullName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        pickupDate: formData.get("pickupDate"),
        pickupTime: formData.get("pickupTime"),
        pickupLocation: formData.get("pickupLocation"),
        paymentMethod: formData.get("paymentMethod"),
        note: formData.get("note") || ""
      },
      orderType: "Pick Up (Ambil di Toko)",
      items: cart,
      subtotal: subtotal,
      pickupFee: pickupFee,
      totalBeforeDiscount: totalBeforeDiscount,
      discountRate: discountRate,
      discountAmount: discountAmount,
      total: grandTotal,
      paymentStatus: "Siap Diambil"
    };

    saveOrder(order);
    clearCart();
    syncCartBadges();
    window.location.href = "struk.html";
  });

  renderSummary();
  syncCartBadges();
});
