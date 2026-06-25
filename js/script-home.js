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
        .map(p => {
            p = getTranslatedProduct(p);

           return `
    <div class="product-card">
        <img src="images/${p.category}/${p.folder}/main.jpg" alt="${p.name}">

        <div class="product-info">
            <h3>${p.name}</h3>

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

function goHomeAndFilter(key, value) {

    sessionStorage.setItem(
        key,
        value
    );

    window.location.href =
        "index.html";
}

function goHomeAndCategory(category) {
    goHomeAndFilter(
        "filterCategory",
        category
    );
}

function goHomeAndBrand(brand) {
    goHomeAndFilter(
        "filterBrand",
        brand
    );
}

function goHomeAndBusiness(business) {
    goHomeAndFilter(
        "filterBusiness",
        business
    );
}
function showQuote(id){
    alert("Chức năng nhận báo giá đang được cập nhật.");
}