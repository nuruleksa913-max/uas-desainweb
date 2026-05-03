document.addEventListener("DOMContentLoaded", function () {
  const { getLastOrder, formatRupiah, syncCartBadges } = window.GreenRootStore;

  const order = getLastOrder();
  const wrapper = document.getElementById("receiptWrapper");
  const emptyState = document.getElementById("receiptEmpty");
  const printButton = document.getElementById("printButton");

  function formatPickupDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString + "T00:00:00");
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  function calculateDiscountRate(amount) {
    if (amount >= 300000) return 20;
    if (amount >= 200000) return 10;
    if (amount >= 100000) return 5;
    return 0;
  }

  function renderReceipt(data) {
    document.getElementById("receiptOrderNumber").textContent = data.orderNumber;
    document.getElementById("receiptDate").textContent = new Date(
      data.createdAt
    ).toLocaleString("id-ID");
    document.getElementById("receiptName").textContent = data.customer.fullName;
    document.getElementById("receiptPhone").textContent = data.customer.phone;
    document.getElementById("receiptEmail").textContent = data.customer.email || "-";
    document.getElementById("receiptPickupLocation").textContent =
      data.customer.pickupLocation ||
      (data.customer.address
        ? data.customer.address + ", " + (data.customer.city || "") + " " + (data.customer.postalCode || "")
        : "Jl. Pertanian No. 12, Palembang");
    const pickupDateText = formatPickupDate(data.customer.pickupDate);
    const pickupTimeText = data.customer.pickupTime || "";
    document.getElementById("receiptPickupSchedule").textContent =
      pickupDateText === "-" && !pickupTimeText
        ? "-"
        : pickupDateText + (pickupTimeText ? " - " + pickupTimeText : "");
    document.getElementById("receiptPayment").textContent = data.customer.paymentMethod;
    document.getElementById("receiptOrderType").textContent =
      data.orderType || "Pick Up (Ambil di Toko)";

    const tbody = document.getElementById("receiptItems");
    data.items.forEach(function (item) {
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        item.name +
        "</td>" +
        "<td>" +
        item.qty +
        "</td>" +
        "<td>" +
        formatRupiah(item.price) +
        "</td>" +
        "<td>" +
        formatRupiah(item.price * item.qty) +
        "</td>";
      tbody.appendChild(tr);
    });

    const subtotal = Number(data.subtotal) || 0;
    const pickupFee = Number(data.pickupFee || data.shipping) || 0;
    const totalBeforeDiscount = Number(data.totalBeforeDiscount) || subtotal + pickupFee;
    const discountRate =
      typeof data.discountRate === "number"
        ? data.discountRate
        : calculateDiscountRate(subtotal);
    const discountAmount =
      typeof data.discountAmount === "number"
        ? data.discountAmount
        : Math.floor((totalBeforeDiscount * discountRate) / 100);
    const finalTotal =
      typeof data.total === "number"
        ? data.total
        : Math.max(0, totalBeforeDiscount - discountAmount);

    document.getElementById("receiptSubtotal").textContent = formatRupiah(subtotal);
    document.getElementById("receiptShipping").textContent = formatRupiah(pickupFee);
    document.getElementById("receiptDiscountRate").textContent = "(" + discountRate + "%)";
    document.getElementById("receiptDiscount").textContent = "- " + formatRupiah(discountAmount);
    document.getElementById("receiptTotal").textContent = formatRupiah(finalTotal);
    document.getElementById("receiptStatus").textContent = data.paymentStatus;
  }

  if (!order) {
    wrapper.hidden = true;
    emptyState.hidden = false;
    printButton.disabled = true;
  } else {
    wrapper.hidden = false;
    emptyState.hidden = true;
    renderReceipt(order);
  }

  printButton.addEventListener("click", function () {
    window.print();
  });

  syncCartBadges();
});
