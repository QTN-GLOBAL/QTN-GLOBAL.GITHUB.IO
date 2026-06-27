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
   FILTER BUSINESS
========================= */

function filterBusiness(business) {

    const products = getProducts();

    const filtered = business
        ? products.filter(
            p => p.business === business
        )
        : products;

    renderProductList(filtered, business);

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

    <h2>${formatBrandName(title)}</h2>

</div>

<div class="product-grid">

${products.map(p => {

    const product = getTranslatedProduct(p) || p;

    const brand = (p.brand || "").trim();

    return `
<div class="product-card">

    ${brand ? `
    <div class="brand-overlay">
        ${formatBrandName(brand)}
    </div>` : ""}

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

    sessionStorage.setItem(
        "filterCategory",
        category
    );

    window.location.href =
        "index.html";
}
function goHomeAndBrand(brand) {

    sessionStorage.setItem(
        "filterBrand",
        brand
    );

    window.location.href =
        "index.html";
}

function goHomeAndBusiness(business) {

    if (
        business === "industry" ||
        business === "service" ||
        business === "trade"
    ) {

        alert("Sản phẩm đang cập nhật.\nVui lòng quay lại sau.");

        goHomePage();

        return;
    }

    sessionStorage.setItem(
        "filterBusiness",
        business
    );

    window.location.href = "index.html";
}

/* =========================
   SHOW QUOTE
========================= */

function showQuote(id) {
    alert("Chức năng nhận báo giá đang được cập nhật.");
}
function renderGridWithBrand(products, title) {

    const container = document.getElementById("homeContainer");
    if (!container) return;

    /* KHÔNG CÓ SẢN PHẨM */

    if (!products.length) {

        container.innerHTML = `
            <div class="list-header">

                <button onclick="goHomePage()">
                    ${t("home")}
                </button>

                <h2>${formatBrandName(title)}</h2>

            </div>

            <div class="empty-products">

                <h2>SẢN PHẨM ĐANG CẬP NHẬT</h2>

                <p>
                    Vui lòng quay lại sau.
                </p>

            </div>
        `;

        return;
    }

    container.innerHTML = `
        <div class="list-header">

            <button onclick="goHomePage()">
                ${t("home")}
            </button>

            <h2>${formatBrandName(title)}</h2>

        </div>

        <div class="product-grid">

            ${products.map(p => {

                const product =
                    getTranslatedProduct(p) || p;

                return `
                <div class="product-card">

                    <div class="brand-overlay">
                        ${p.brand ? formatBrandName(p.brand) : ""}
                    </div>

                    <img src="images/${p.category}/${p.folder}/main.jpg">

                    <div class="product-info">

                        <h3>${product.name}</h3>

                        <div class="product-buttons">

                            <a class="detail-btn"
                               href="chitiet.html?id=${p.id}">
                                ${t("detailBtn")}
                            </a>

                            <button class="quote-btn"
                                    onclick="showQuote(${p.id})">
                                ${t("quoteBtn")}
                            </button>

                        </div>

                    </div>

                </div>
                `;
            }).join("")}

        </div>
    `;
}
/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", function () {

    const search = sessionStorage.getItem("searchKeyword");
    const category = sessionStorage.getItem("filterCategory");
    const brand = sessionStorage.getItem("filterBrand");
    const business = sessionStorage.getItem("filterBusiness");

    /* =========================
       SEARCH MODE
    ========================= */
    if (search) {

        window.APP_MODE.mode = "search";

        const products =
            SearchSystem.filter(
                getProducts(),
                search
            );

        renderGridWithBrand(
            products,
            search
        );

        sessionStorage.removeItem(
            "searchKeyword"
        );

        return;
    }

    /* =========================
       CATEGORY MODE
    ========================= */
    if (category) {

        window.APP_MODE.mode = "category";

        const products =
            getProducts().filter(
                p => p.category === category
            );

        renderGridWithBrand(
            products,
            category
        );

        sessionStorage.removeItem(
            "filterCategory"
        );

        return;
    }

    /* =========================
       BRAND MODE
    ========================= */
    if (brand) {

        window.APP_MODE.mode = "brand";

        const products =
            getProducts().filter(
                p =>
                p.brand &&
                p.brand.toUpperCase() ===
                brand.toUpperCase()
            );

        renderGridWithBrand(
            products,
            brand
        );

        sessionStorage.removeItem(
            "filterBrand"
        );

        return;
    }
  /* =========================
   BUSINESS MODE
========================= */

if (business) {

    /* THIẾT BỊ ĐO LƯỜNG + GIA DỤNG */

    if (
        business === "measure" ||
        business === "home"
    ) {

        window.APP_MODE.mode = "home";

        sessionStorage.removeItem(
            "filterBusiness"
        );

        return;
    }

    /* CÁC LĨNH VỰC KHÁC */

    window.APP_MODE.mode = "business";

    renderGridWithBrand(
        [],
        business
    );

    sessionStorage.removeItem(
        "filterBusiness"
    );

    setTimeout(() => {

        alert(
            "Sản phẩm đang cập nhật.\nVui lòng quay lại sau."
        );

        goHomePage();

    }, 100);

    return;
}
    /* =========================
       HOME MODE
    ========================= */
    window.APP_MODE.mode = "home";

    renderHomeByBrand();

    initHeroSlider();

    initBrandSliders();
});