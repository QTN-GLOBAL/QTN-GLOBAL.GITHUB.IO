/* =========================
   HOME PAGE (CLEAN RENDER LAYER)
   - UI ONLY
   - NO CART LOGIC
========================= */

let allProductsCache = [];   

/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(productList = []) {

    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = productList
        .filter(p => p && p.id && p.name)
        .map(product => {

            product = getTranslatedProduct(product);

            return `
                <div class="product-card">

                    <img
                        src="images/${product.category}/${product.folder}/main.jpg"
                        alt="${product.name}"
                        onerror="this.src='images/no-image.jpg'"
                    >

                    <div class="product-info">

                        <h3>${product.name}</h3>

                        <a class="detail-btn"
                           href="chitiet.html?id=${product.id}">
                            ${t("detailBtn")}
                        </a>

                    </div>

                </div>
            `;
        })
        .join("");
}
/* =========================
   FILTER SYSTEM (PURE UI)
========================= */

function filterProducts(category) {

    const products = getProducts();

    const filtered = category
        ? products.filter(p => p.category === category)
        : products;

    renderProducts(filtered);
}

function filterByBrand(brand) {

    const products = getProducts();

    const filtered = brand
        ? products.filter(p => p.brand === brand)
        : products;

    renderProducts(filtered);
}

/* =========================
   EXCELL SLIDER (OPTIMIZED)
========================= */

let excellSlides = [];
let indexSlide = 0;

function getExcellImages() {

    return getProducts()
        .filter(p =>
            p.brand &&
            p.brand.toLowerCase().includes("excell")
        )
        .map(p =>
            `images/${p.category}/${p.folder}/main.jpg`
        );
}

function initExcellSlider() {

    const sliderImg = document.getElementById("slider-img");
    if (!sliderImg) return;

    excellSlides = getExcellImages();
    if (!excellSlides.length) return;

    function showSlide() {

        sliderImg.src = excellSlides[indexSlide];

        indexSlide = (indexSlide + 1) % excellSlides.length;
    }

    showSlide();
    setInterval(showSlide, 3000);
}

/* =========================
   SESSION NAVIGATION
========================= */

function goHomeAndCategory(category) {
    sessionStorage.setItem("filterCategory", category);
    window.location.href = "index.html";
}

function goHomeAndBrand(brand) {
    sessionStorage.setItem("filterBrand", brand);
    window.location.href = "index.html";
}
function handleSearch() {

    const input = document.getElementById("searchInput");
    if (!input) return;

    const keyword = input.value.trim().toLowerCase();

    // reset
    if (!keyword) {
        renderProducts(allProductsCache);
        return;
    }

    const filtered = allProductsCache.filter(p => {

        const name = (p.name || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const brand = (p.brand || "").toLowerCase();

        return name.includes(keyword) ||
               desc.includes(keyword) ||
               brand.includes(keyword);
    });

    renderProducts(filtered);
}
