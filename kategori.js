document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.getElementById("categoryProductGrid");
  const currentCategory = document.body.dataset.category;
  const DOUBLE_TAP_MS = 320;
  if (!productGrid || !currentCategory) return;

  const CATEGORY_PRODUCTS = {
    "sayuran-segar": [
      {
        id: "selada",
        name: "Selada Hijau",
        unit: "250 g",
        price: 12000,
        description: "Daun segar renyah, cocok untuk salad dan sandwich.",
        images: ["ss1.jpg", "ss2.jpg"],
      },
      {
        id: "sayur-seledri",
        name: "Seledri Segar",
        unit: "100 g",
        price: 8000,
        description: "Aroma kuat alami untuk kuah, tumis, dan taburan sop.",
        images: ["selery.jpg"],
      },
      {
        id: "kacang-panjang",
        name: "Kacang Panjang",
        unit: "500 g",
        price: 15000,
        description: "Polong muda dan renyah untuk tumis cepat atau sayur bening.",
        images: ["kacangpanjang.jpg"],
      },
      {
        id: "sayur-wortel",
        name: "Wortel Segar",
        unit: "500 g",
        price: 14000,
        description: "Manis alami dengan tekstur padat untuk sup dan capcay.",
        images: ["wotel.jpg"],
      },
      {
        id: "sayur-kentang",
        name: "Kentang Lokal",
        unit: "1 kg",
        price: 17000,
        description: "Ukuran sedang, empuk saat direbus dan enak untuk goreng.",
        images: ["Kentang.jpg"],
      },
      {
        id: "sayur-mentimun",
        name: "Mentimun Segar",
        unit: "500 g",
        price: 10000,
        description: "Segar berair untuk lalapan, acar, dan salad rumahan.",
        images: ["Timun.jpg"],
      },
      {
        id: "cabai-rawit",
        name: "Cabai Rawit",
        unit: "100 g",
        price: 15000,
        description: "Pedas kuat untuk sambal, tumisan, dan bumbu harian.",
        images: ["c2.jpg"],
      },
      {
        id: "cabai-keriting",
        name: "Cabai Keriting",
        unit: "100 g",
        price: 18000,
        description: "Warna cerah dengan rasa pedas stabil untuk masakan.",
        images: ["c1.jpg"],
      },
      {
        id: "cabai-setan",
        name: "Cabai Setan",
        unit: "100 g",
        price: 12000,
        description: "Level pedas tinggi untuk menu favorit pencinta pedas.",
        images: ["c3.jpg"],
      },
      {
        id: "terong-batu",
        name: "Terong Batu",
        unit: "500 g",
        price: 10000,
        description: "Daging lembut, pas untuk balado, sambal, atau tumisan.",
        images: ["terong-bulat.jpg"],
      },
      {
        id: "sayur-pare",
        name: "Pare Segar",
        unit: "500 g",
        price: 10000,
        description: "Pilih pare muda dengan rasa pahit ringan dan segar.",
        images: ["pare.jpg"],
      },
      {
        id: "terong-ungu",
        name: "Terong Ungu",
        unit: "500 g",
        price: 12000,
        description: "Kulit ungu mengilap, enak untuk panggang dan tumisan.",
        images: ["terong.jpg"],
      },
      {
        id: "kol-putih",
        name: "Kol Putih",
        unit: "500 g",
        price: 12000,
        description: "Tekstur lembut dan manis ringan untuk sup keluarga.",
        images: ["brokoliputih.jpg"],
      },
      {
        id: "sayur-kol",
        name: "Kol Segar",
        unit: "500 g",
        price: 10000,
        description: "Lembar kol renyah untuk tumis, bakwan, dan campuran mi.",
        images: ["kol.jpg"],
      },
      {
        id: "daun-bawang",
        name: "Daun Bawang Segar",
        unit: "250 g",
        price: 10000,
        description: "Aroma gurih segar untuk taburan dan bumbu dasar.",
        images: ["dbawang.jpg"],
      },
      {
        id: "sayur-pakcoy",
        name: "Pakcoy Segar",
        unit: "500 g",
        price: 10000,
        description: "Batang renyah dan daun lembut, pas untuk tumis bawang.",
        images: ["pakcoy.jpg"],
      },
      {
        id: "sayur-toge",
        name: "Toge Segar",
        unit: "500 g",
        price: 10000,
        description: "Kecambah segar untuk cah, bakwan, dan pecel.",
        images: ["toge.jpg"],
      },
      {
        id: "brokoli",
        name: "Brokoli Segar",
        unit: "500 g",
        price: 12000,
        description: "Kuntum padat hijau, cocok untuk menu sehat harian.",
        images: ["brokoli.jpg"],
      },
      {
        id: "labu-siam",
        name: "Labu Siam",
        unit: "500 g",
        price: 10000,
        description: "Lembut saat dimasak, cocok untuk sayur santan dan bening.",
        images: ["labusiam.jpg"],
      },
      {
        id: "kubis",
        name: "Kubis Segar",
        unit: "500 g",
        price: 10000,
        description: "Daun rapat segar, pas untuk tumis atau isian gorengan.",
        images: ["kubis.jpg"],
      },
    ],
    "buah-segar": [
      {
        id: "buah-pepaya",
        name: "Pepaya Segar",
        unit: "1 kg",
        price: 24000,
        description: "Matang alami, manis lembut untuk sarapan sehat.",
        images: ["pepaya.jpg"],
      },
      {
        id: "buah-durian",
        name: "Durian Segar",
        unit: "1 kg",
        price: 50000,
        description: "Daging tebal dengan aroma khas untuk pencinta durian.",
        images: ["durian.jpg"],
      },
      {
        id: "buah-nanas",
        name: "Nanas Segar",
        unit: "1 kg",
        price: 19000,
        description: "Rasa manis asam menyegarkan, enak untuk jus dan rujak.",
        images: ["nanas.jpg"],
      },
      {
        id: "buah-rambutan",
        name: "Rambutan Segar",
        unit: "1 kg",
        price: 22000,
        description: "Buah manis berair, cocok jadi camilan keluarga.",
        images: ["rambutan.jpg"],
      },
      {
        id: "buah-alpukat",
        name: "Alpukat Segar",
        unit: "1 kg",
        price: 35000,
        description: "Tekstur creamy, ideal untuk jus, salad, dan roti.",
        images: ["alpukat.jpg"],
      },
      {
        id: "buah-mangga",
        name: "Mangga Harum Manis",
        unit: "1 kg",
        price: 29000,
        description: "Manis legit dengan serat halus, favorit semua umur.",
        images: ["mangga-harumnais.jpg"],
      },
      {
        id: "buah-delima",
        name: "Delima Segar",
        unit: "1 kg",
        price: 45000,
        description: "Butiran merah segar dengan rasa manis asam seimbang.",
        images: ["delima.jpg"],
      },
      {
        id: "buah-jambu",
        name: "Jambu Air",
        unit: "1 kg",
        price: 25000,
        description: "Kriuk segar dan ringan, enak dimakan langsung.",
        images: ["jambu-air.jpg"],
      },
      {
        id: "buah-jambu-biji",
        name: "Jambu Biji",
        unit: "1 kg",
        price: 22000,
        description: "Padat dan manis, cocok untuk jus segar harian.",
        images: ["jambu-biji.jpg"],
      },
      {
        id: "buah-manggis",
        name: "Manggis Segar",
        unit: "1 kg",
        price: 25000,
        description: "Daging putih lembut dengan rasa manis khas.",
        images: ["manggis.jpg"],
      },
      {
        id: "buah-langsat",
        name: "Langsat Segar",
        unit: "1 kg",
        price: 25000,
        description: "Rasa segar manis asam, cocok untuk snack santai.",
        images: ["Langsat.jpg"],
      },
      {
        id: "buah-naga",
        name: "Buah Naga",
        unit: "1 kg",
        price: 25000,
        description: "Daging buah lembut dan juicy untuk menu sehat.",
        images: ["naga.jpg"],
      },
      {
        id: "buah-nangka",
        name: "Nangka Segar",
        unit: "1 kg",
        price: 25000,
        description: "Aroma kuat dan daging manis, pas untuk camilan.",
        images: ["nangka.jpg"],
      },
      {
        id: "buah-salak",
        name: "Salak Segar",
        unit: "1 kg",
        price: 25000,
        description: "Renyah dan manis sepat, cocok untuk oleh-oleh.",
        images: ["salak.jpg"],
      },
      {
        id: "buah-markisa",
        name: "Markisa Segar",
        unit: "1 kg",
        price: 25000,
        description: "Aroma wangi kuat untuk minuman dan saus buah.",
        images: ["markisa.jpg"],
      },
      {
        id: "buah-matoa",
        name: "Matoa Segar",
        unit: "1 kg",
        price: 25000,
        description: "Rasa unik manis legit dengan tekstur kenyal.",
        images: ["Matoa.jpg"],
      },
      {
        id: "buah-kelengkeng",
        name: "Kelengkeng",
        unit: "1 kg",
        price: 28000,
        description: "Buah kecil manis berair untuk camilan kapan saja.",
        images: ["kelengkeng.jpg"],
      },
    ],
    "biji-bijian": [
      {
        id: "kacang-pulses",
        name: "Kacang Mix Premium",
        unit: "500 g",
        price: 26000,
        description: "Campuran biji kacang pilihan untuk stok masak bergizi.",
        images: ["pulses.jpg", "k2.jpg"],
      },
      {
        id: "kacang-merah",
        name: "Kacang Merah Kering",
        unit: "500 g",
        price: 24000,
        description: "Kacang merah bersih, pas untuk sup dan semur.",
        images: ["k1.jpg"],
      },
      {
        id: "kacang-hijau",
        name: "Kacang Hijau",
        unit: "500 g",
        price: 22000,
        description: "Biji hijau berkualitas untuk bubur dan taoge rumahan.",
        images: ["k2.jpg"],
      },
      {
        id: "kacang-kedelai",
        name: "Kedelai Pilihan",
        unit: "500 g",
        price: 23000,
        description: "Biji kedelai kering untuk susu kedelai dan olahan tahu.",
        images: ["k3.jpg"],
      },
      {
        id: "biji-jagung",
        name: "Jagung Pipil",
        unit: "500 g",
        price: 19000,
        description: "Pipilan jagung manis untuk sup, bakwan, dan tumisan.",
        images: ["jagung.jpg"],
      },
      {
        id: "rempah-cabai-rawit",
        name: "Cabai Rawit Merah",
        unit: "250 g",
        price: 20000,
        description: "Rempah pedas segar untuk sambal dan bumbu tumis.",
        images: ["c2.jpg"],
      },
      {
        id: "rempah-cabai-keriting",
        name: "Cabai Keriting Merah",
        unit: "250 g",
        price: 22000,
        description: "Warna merah segar, cocok untuk bumbu halus masakan.",
        images: ["c1.jpg"],
      },
      {
        id: "rempah-daun-bawang",
        name: "Daun Bawang Iris",
        unit: "250 g",
        price: 12000,
        description: "Rempah hijau harum untuk penambah rasa hidangan.",
        images: ["dbawang.jpg"],
      },
    ],
    "sayuran-hijau": [
      {
        id: "olahan-salad-sayur",
        name: "Salad Sayur Fresh",
        unit: "350 g",
        price: 24000,
        description: "Campuran sayur renyah siap santap untuk menu sehat.",
        images: ["salad-sayur.jpg", "salad-sayur - Copy.jpg"],
      },
      {
        id: "olahan-salad-buah",
        name: "Salad Buah Creamy",
        unit: "400 g",
        price: 26000,
        description: "Potongan buah segar dengan saus creamy favorit keluarga.",
        images: ["salad-buah.jpg", "salad-buah - Copy.jpg"],
      },
      {
        id: "olahan-buah-potong",
        name: "Buah Potong Mix",
        unit: "500 g",
        price: 23000,
        description: "Aneka buah potong dingin untuk camilan praktis.",
        images: ["buah potong.jpg"],
      },
      {
        id: "olahan-smoothie-naga",
        name: "Smoothie Buah Naga",
        unit: "750 ml",
        price: 32000,
        description: "Minuman segar buah naga dengan rasa manis alami.",
        images: ["smoothis-naga.jpg"],
      },
      {
        id: "olahan-smoothie-strawberry",
        name: "Smoothie Stroberi",
        unit: "750 ml",
        price: 32000,
        description: "Smoothie stroberi segar dengan tekstur lembut creamy.",
        images: ["smoothie-strawberr.jpg"],
      },
      {
        id: "olahan-mango-smoothie",
        name: "Mango Smoothies",
        unit: "750 ml",
        price: 33000,
        description: "Perpaduan mangga manis dan es dingin yang menyegarkan.",
        images: ["mango smoothies.jpg"],
      },
      {
        id: "olahan-rujak-kacang",
        name: "Rujak Kacang",
        unit: "500 g",
        price: 22000,
        description: "Buah segar dengan bumbu kacang gurih pedas khas.",
        images: ["rujak-kacang.jpg"],
      },
      {
        id: "olahan-rujak-mangga",
        name: "Rujak Mangga",
        unit: "500 g",
        price: 22000,
        description: "Mangga muda segar dengan sambal manis pedas.",
        images: ["rujak-mangga.jpg"],
      },
      {
        id: "olahan-asinan-buah",
        name: "Asinan Buah Segar",
        unit: "500 g",
        price: 22000,
        description: "Potongan buah segar dengan kuah asinan pedas manis.",
        images: ["asinan-buah.jpg"],
      },
      {
        id: "olahan-paket-bekal",
        name: "Paket Bekal Sehat",
        unit: "600 g",
        price: 29000,
        description: "Kombinasi olahan segar siap bawa untuk aktivitas harian.",
        images: ["st1.jpg", "st1 - Copy.jpg"],
      },
    ],
  };

  const formatRupiah =
    window.GreenRootStore && typeof window.GreenRootStore.formatRupiah === "function"
      ? window.GreenRootStore.formatRupiah
      : function (value) {
          return "Rp " + Number(value || 0).toLocaleString("id-ID");
        };

  const products = CATEGORY_PRODUCTS[currentCategory] || [];
  const imageSwitchers = [];

  function createButton(product, type) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = type === "add" ? "btn btn-outline" : "btn btn-gold";
    button.textContent = type === "add" ? "Tambah" : "Beli Sekarang";
    button.dataset.id = product.id;
    button.dataset.name = product.name;
    button.dataset.price = String(product.price);
    button.dataset.image = product.images[0];
    button.dataset.unit = product.unit;
    return button;
  }

  function switchImage(entry) {
    if (!entry) return;
    if (!entry.images || entry.images.length < 2) return;
    entry.index = (entry.index + 1) % entry.images.length;
    entry.el.style.opacity = "0";
    window.setTimeout(function () {
      entry.el.src = entry.images[entry.index];
      if (entry.buttons && entry.buttons.length) {
        entry.buttons.forEach(function (button) {
          button.dataset.image = entry.images[entry.index];
        });
      }
      entry.el.style.opacity = "1";
    }, 180);
  }

  products.forEach(function (product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.images[0];
    image.alt = product.name;

    const body = document.createElement("div");
    body.className = "product-body";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const desc = document.createElement("p");
    desc.className = "product-desc";
    desc.textContent = product.description;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const unitInfo = document.createElement("p");
    unitInfo.className = "product-unit";
    unitInfo.textContent = "Berat/Isi: " + product.unit;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatRupiah(product.price);

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const addButton = createButton(product, "add");
    addButton.addEventListener("click", function () {
      if (!window.GreenRootStore) return;
      window.GreenRootStore.addToCartFromButton(addButton);
    });

    const buyButton = createButton(product, "buy");
    buyButton.addEventListener("click", function () {
      if (!window.GreenRootStore) return;
      window.GreenRootStore.buyNowFromButton(buyButton);
    });

    actions.appendChild(addButton);
    actions.appendChild(buyButton);
    bottom.appendChild(unitInfo);
    bottom.appendChild(price);
    bottom.appendChild(actions);

    body.appendChild(name);
    body.appendChild(desc);
    body.appendChild(bottom);
    card.appendChild(image);
    card.appendChild(body);
    productGrid.appendChild(card);

    function handleCardImageSwitch(event) {
      const target = event.target;
      if (target && target.closest("button")) return;
      event.preventDefault();
      switchImage(
        imageSwitchers.find(function (entry) {
          return entry.el === image;
        })
      );
    }
    let lastClickAt = 0;
    function handleDoubleTapFallback(event) {
      const target = event.target;
      if (target && target.closest("button")) return;
      const now = Date.now();
      if (now - lastClickAt <= DOUBLE_TAP_MS) {
        handleCardImageSwitch(event);
        lastClickAt = 0;
        return;
      }
      lastClickAt = now;
    }

    image.addEventListener("dblclick", handleCardImageSwitch);
    card.addEventListener("dblclick", handleCardImageSwitch);
    image.addEventListener("click", handleDoubleTapFallback);
    card.addEventListener("click", handleDoubleTapFallback);

    imageSwitchers.push({
      el: image,
      images: product.images,
      index: 0,
      buttons: [addButton, buyButton],
    });
  });

  if (window.GreenRootStore && typeof window.GreenRootStore.syncCartBadges === "function") {
    window.GreenRootStore.syncCartBadges();
  }
});
