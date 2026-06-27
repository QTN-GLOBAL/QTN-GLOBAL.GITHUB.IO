/* =========================
   HOME PAGE (CLEAN CORE FIXED)
========================= */

function normalize(str) {
    return (str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_");
}

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
   RENDER HOME (ALL PRODUCTS)
========================= */

function renderHomeByBrand() {

    const container = document.getElementById("homeContainer");
    if (!container) return;

    const products = getProducts().filter(p => p.category && p.brand);

    const brands = {};

    products.forEach(p => {

        const key = (p.brand || "").trim().toUpperCase();

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

    initBrandSliders();
}

/* =========================
   RENDER HOME FILTERED (BUSINESS)
========================= */

function renderHomeByBrandFiltered(products) {

    const container = document.getElementById("homeContainer");
    if (!container) return;

    const brands = {};

    products.forEach(p => {

        const key = (p.brand || "").trim().toUpperCase();

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

    initBrandSliders();
}

/* =========================
   LIST VIEW (CATEGORY / SEARCH / BRAND)
========================= */

function renderProductListPage(products, title) {

    const container = document.getElementById("homeContainer");
    if (!container) return;

    if (!products.length) {

        container.innerHTML = `
            <div class="empty-products">
                <h2>SẢN PHẨM ĐANG CẬP NHẬT</h2>
                <p>Vui lòng quay lại sau.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="list-header">
            <button onclick="location.href='index.html'">${t("home")}</button>
            <h2>${formatBrandName(title)}</h2>
        </div>

        <div class="product-grid">
            ${products.map(p => `
                <div class="product-card">
                    <div class="brand-overlay">${p.brand ? formatBrandName(p.brand) : ""}</div>
                    <img src="images/${p.category}/${p.folder}/main.jpg">
                    <div class="product-info">
                        <h3>${getTranslatedProduct(p)?.name || p.name}</h3>

                        <div class="product-buttons">
                            <a class="detail-btn" href="chitiet.html?id=${p.id}">
                                ${t("detailBtn")}
                            </a>
                            <button class="quote-btn" onclick="showQuote(${p.id})">
                                ${t("quoteBtn")}
                            </button>
                        </div>

                    </div>
                </div>
            `).join("")}
        </div>
    `;
}

/* =========================
   NAV FUNCTIONS
========================= */

function goHomeAndBusiness(business) {

    sessionStorage.setItem("filterBusiness", business);

    // QUAN TRỌNG: reset trạng thái cũ để tránh fallback HOME sai
    sessionStorage.removeItem("searchKeyword");
    sessionStorage.removeItem("filterCategory");
    sessionStorage.removeItem("filterBrand");

    window.location.href = "index.html";
}

function goHomeAndCategory(category) {
    sessionStorage.setItem("filterCategory", category);
    window.location.href = "index.html";
}

function goHomeAndBrand(brand) {
    sessionStorage.setItem("filterBrand", brand);
    window.location.href = "index.html";
}
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
function renderProducts(productList = []) {

    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = productList
        .map(p => `
            <div class="product-card">
                <img src="images/${p.category}/${p.folder}/main.jpg">
                <h3>${p.name}</h3>
            </div>
        `).join("");
}

/* =========================
   INIT ROUTER (FIXED FLOW)
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const search = sessionStorage.getItem("searchKeyword");
    const category = sessionStorage.getItem("filterCategory");
    const brand = sessionStorage.getItem("filterBrand");
    const business = sessionStorage.getItem("filterBusiness");

    // ================= SEARCH =================
    if (search) {

        const products = SearchSystem.filter(getProducts(), search);

        renderProductListPage(products, search);

        sessionStorage.removeItem("searchKeyword");
        return;
    }

    // ================= CATEGORY =================
    if (category) {

        const products = getProducts().filter(
            p => normalize(p.category) === normalize(category)
        );

        renderProductListPage(products, category);

        sessionStorage.removeItem("filterCategory");
        return;
    }

    // ================= BRAND =================
    if (brand) {

        const products = getProducts().filter(
            p => normalize(p.brand) === normalize(brand)
        );

        renderProductListPage(products, brand);

        sessionStorage.removeItem("filterBrand");
        return;
    }

    // ================= BUSINESS =================
    if (business) {

        const products = getProducts().filter(
            p => p.business === business
        );

        if (!products.length) {

            document.getElementById("homeContainer").innerHTML = `
                <div class="empty-products">
                    <h2>SẢN PHẨM ĐANG CẬP NHẬT</h2>
                    <p>Vui lòng quay lại sau.</p>
                </div>
            `;

            sessionStorage.removeItem("filterBusiness");
            return;
        }

        renderHomeByBrandFiltered(products);

        sessionStorage.removeItem("filterBusiness");
        return;
    }

    // ================= HOME =================
    renderHomeByBrand();
    initHeroSlider();
});