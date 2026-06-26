/* =========================
   HOME PAGE (CLEAN CORE)
   - NO SLIDER LOGIC HERE
   - ONLY DATA + RENDER + FILTER
========================= */

let allProductsCache = [];

/* =========================
   BRAND ORDER
========================= */

const brandOrder = [
    "EXCELL",
    "OHAUS",
    "YAOHUA",
    "VIBRA",
    "JADEVER",
    "AMWAY"
];

/* =========================
   RENDER GRID (GENERIC)
========================= */

function renderProducts(productList = []) {

    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = productList
        .filter(p => p && p.id && p.name)
        .map(p => {

            const product = getTranslatedProduct(p) || p;

            return `
<div class="product-card">
    <img src="images/${p.category}/${p.folder}/main.jpg">

    <div class="product-info">

        <h3>${product.name}</h3>

        <div class="product-buttons">

            <a class="detail-btn" href="chitiet.html?id=${p.id}">
                ${t("detailBtn")}
            </a>

            <button class="quote-btn" onclick="showQuote(${p.id})">
                ${t("quoteBtn")}
            </button>

        </div>

    </div>
</div>`;
        })
        .join("");
}

/* =========================
   FILTER
========================= */

function filterProducts(category) {

    const products = getProducts();

    const filtered = category
        ? products.filter(p => p.category === category)
        : products;

    renderProductList(filtered, category);
}

function filterByBrand(brand) {

    const products = getProducts();

    const filtered = brand
        ? products.filter(p =>
            p.brand?.trim().toUpperCase() === brand.toUpperCase()
        )
        : products;

    renderProductList(filtered, brand);
}

/* =========================
   HOME RENDER BY BRAND
========================= */

function renderHomeByBrand() {

    const container = document.getElementById("homeContainer");
    if (!container) return;

    const products = getProducts();

    const brands = {};

    products.forEach(p => {
        if (!p.brand) return;

        const key = p.brand.trim().toUpperCase();

        if (!brands[key]) brands[key] = [];

        brands[key].push(p);
    });

    let html = "";

    brandOrder.forEach(key => {

        const items = brands[key];

        if (!items || items.length === 0) return;

        html += createBrandSection(key, items);
    });

    container.innerHTML = html;
}

/* =========================
   BRAND SECTION (ONLY HTML)
========================= */

function createBrandSection(brandKey, items) {

    const id = brandKey.toLowerCase();

    return `
<section class="brand-section">

    <div class="brand-wrapper">

        <button class="slider-btn left"
                onclick="moveBrand('${id}', -1)">
            ❮
        </button>

        <div class="brand-track"
             id="${id}"
             data-index="0"
             data-items='${JSON.stringify(items)}'>
        </div>

        <button class="slider-btn right"
                onclick="moveBrand('${id}', 1)">
            ❯
        </button>

    </div>

</section>`;
}

/* =========================
   BRAND SLIDER CONTROL
   (LOGIC MOVED OUT)
========================= */

function goHomePage() {

    renderHomeByBrand();

    initBrandSliders();
}

/* =========================
   PRODUCT LIST PAGE
========================= */

function renderProductList(products, title) {

    const container = document.getElementById("homeContainer");
    if (!container) return;

    container.innerHTML = `
<div class="list-header">

    <button onclick="goHomePage()">
        ${t("home")}
    </button>

    <h2>${title}</h2>

</div>

<div class="product-grid">

${products.map(p => {

    const product = getTranslatedProduct(p) || p;

    return `
<div class="product-card">

    <img src="images/${p.category}/${p.folder}/main.jpg">

    <div class="product-info">

        <h3>${product.name}</h3>

        <div class="product-buttons">

            <a class="detail-btn" href="chitiet.html?id=${p.id}">
                ${t("detailBtn")}
            </a>

            <button class="quote-btn" onclick="showQuote(${p.id})">
                ${t("quoteBtn")}
            </button>

        </div>

    </div>

</div>`;
}).join("")}

</div>`;
}

/* =========================
   SESSION NAV
========================= */

function goHomeAndFilter(key, value) {
    sessionStorage.setItem(key, value);
    window.location.href = "index.html";
}

function goHomeAndCategory(category) {
    filterProducts(category);
}

function goHomeAndBrand(brand) {
    filterByBrand(brand);
}

function goHomeAndBusiness(business) {
    goHomeAndFilter("filterBusiness", business);
}

/* =========================
   SHOW QUOTE
========================= */

function showQuote(id) {
    alert("Chức năng nhận báo giá đang được cập nhật.");
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const category = sessionStorage.getItem("filterCategory");
    const brand = sessionStorage.getItem("filterBrand");

    if (category) {

        const products = getProducts().filter(p => p.category === category);

        renderProductList(products, category);

        sessionStorage.removeItem("filterCategory");
        return;
    }

    if (brand) {

        const products = getProducts().filter(p =>
            p.brand &&
            p.brand.toUpperCase() === brand.toUpperCase()
        );

        renderProductList(products, brand);

        sessionStorage.removeItem("filterBrand");
        return;
    }

    renderHomeByBrand();

    // 👉 CHỈ GỌI SLIDER EXTERNAL
    initHeroSlider();
    initBrandSliders();
});