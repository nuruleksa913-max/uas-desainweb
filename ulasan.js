document.addEventListener("DOMContentLoaded", function () {
  const STORAGE_KEY = "greenroot_user_reviews";
  const streamTrack = document.getElementById("liveStreamTrack");
  const form = document.getElementById("reviewForm");
  const now = Date.now();

  const seedReviews = [
    {
      name: "Rina",
      city: "Palembang",
      rating: 5,
      message: "Sayurnya fresh, checkout mudah, dan struk langsung bisa dicetak.",
      createdAt: now - 2 * 60 * 1000
    },
    {
      name: "Arman",
      city: "Prabumulih",
      rating: 5,
      message: "Tombol beli sekarang dan keranjang sangat membantu saat belanja cepat.",
      createdAt: now - 5 * 60 * 1000
    },
    {
      name: "Tina",
      city: "Ogan Ilir",
      rating: 4,
      message: "UI rapi dan proses ordernya mirip marketplace, jadi gampang dipahami.",
      createdAt: now - 9 * 60 * 1000
    },
    {
      name: "Dian",
      city: "Jakabaring",
      rating: 5,
      message: "Proses pick up cepat dan buah diterima dalam kondisi bagus.",
      createdAt: now - 13 * 60 * 1000
    },
    {
      name: "Bima",
      city: "Lubuklinggau",
      rating: 5,
      message: "Kategori produk lengkap, dari sayur sampai biji-bijian semuanya jelas.",
      createdAt: now - 16 * 60 * 1000
    },
    {
      name: "Lusi",
      city: "Banyuasin",
      rating: 4,
      message: "Deskripsi produknya detail, jadi lebih gampang pilih sesuai kebutuhan masak.",
      createdAt: now - 20 * 60 * 1000
    },
    {
      name: "Wawan",
      city: "Sekayu",
      rating: 5,
      message: "Kemasan rapi dan barang sesuai pesanan saat diambil di toko.",
      createdAt: now - 25 * 60 * 1000
    },
    {
      name: "Nadia",
      city: "Pagar Alam",
      rating: 5,
      message: "Website ringan dibuka di HP, proses checkout juga lancar.",
      createdAt: now - 29 * 60 * 1000
    },
    {
      name: "Farhan",
      city: "Lahat",
      rating: 4,
      message: "Harga masih masuk akal dan stok produk sering update.",
      createdAt: now - 34 * 60 * 1000
    }
  ];

  function normalizeReview(review) {
    const safeReview = review || {};
    return {
      name: String(safeReview.name || "").trim(),
      city: String(safeReview.city || "").trim(),
      rating: Number(safeReview.rating) || 5,
      message: String(safeReview.message || "").trim(),
      createdAt: safeReview.createdAt || null,
      time: safeReview.time || ""
    };
  }

  function getUserReviews() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeReview);
    } catch {
      return [];
    }
  }

  function saveUserReviews(reviews) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }

  function ratingToStars(rating) {
    const full = "&#9733;".repeat(rating);
    const empty = "&#9734;".repeat(5 - rating);
    return full + empty;
  }

  function formatReviewTime(review) {
    if (review.createdAt) {
      const date = new Date(review.createdAt);
      return (
        date.toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }) + " WIB"
      );
    }
    return review.time || "Tanpa waktu";
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderCard(review) {
    return (
      '<article class="stream-card">' +
      '<p class="stars">' +
      ratingToStars(review.rating) +
      "</p>" +
      "<h4>" +
      escapeHtml(review.name) +
      " - " +
      escapeHtml(review.city) +
      "</h4>" +
      "<p>" +
      escapeHtml(review.message) +
      "</p>" +
      '<p class="time">' +
      formatReviewTime(review) +
      "</p>" +
      "</article>"
    );
  }

  function renderLiveStream() {
    const allReviews = getUserReviews().concat(seedReviews);
    const cards = allReviews.map(renderCard).join("");
    streamTrack.innerHTML = cards + cards;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const newReview = {
      name: String(formData.get("reviewName") || "").trim(),
      city: String(formData.get("reviewCity") || "").trim(),
      rating: Number(formData.get("reviewRating") || 5),
      message: String(formData.get("reviewMessage") || "").trim(),
      createdAt: new Date().toISOString()
    };

    if (!newReview.name || !newReview.city || !newReview.message) return;

    const reviews = getUserReviews();
    reviews.unshift(newReview);
    saveUserReviews(reviews.slice(0, 20));
    form.reset();
    renderLiveStream();
  });

  renderLiveStream();
});
