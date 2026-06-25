/* =========================
   HOME PAGE (CLEAN RENDER LAYER)
   - UI ONLY
   - NO CART LOGIC
========================= */

let allProductsCache = [];   


/* =========================
   BRAND ORDER (HOME PAGE)
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
   RENDER PRODUCTS
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
        <h3>${p.name}</h3>

        <div class="product-buttons">
            <a class="detail-btn" href="chitiet.html?id=${p.id}">
                Chi tiết
            </a>

            <button class="quote-btn" onclick="showQuote(${p.id})">
                Báo giá
            </button>
        </div>
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
        ? products.filter(p => p.brand?.trim().toUpperCase() === brand.toUpperCase())
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
function renderHomeByBrand() {

    const container = document.getElementById("homeContainer");
    if (!container) {
        console.error("homeContainer not found");
        return;
    }

    const products = getProducts();

    const brands = {};

    products.forEach(p => {
        if (!p.brand) return;

        const brandKey = p.brand.trim().toUpperCase();
if (!brands[brandKey]) {
    brands[brandKey] = [];
}
brands[brandKey].push(p);
    });

    let html = "";

    brandOrder.forEach(brandKey => {

    const items = brands[brandKey];

        if (!items || items.length === 0) return;

       html += createBrandSection(brandKey, items);
    });

    container.innerHTML = html;
}
function createBrandSection(brandKey, items) {

    const id = brandKey.toLowerCase();

    return `
    <section class="brand-section">

        <h2 class="brand-title">
            ${formatBrandName(brandKey)}
        </h2>

        <div class="brand-wrapper">

            <button class="slider-btn left"
                    onclick="moveSlider('${id}',-1)">
                ❮
            </button>

            <div class="brand-track"
                 id="${id}"
                 data-index="0"
                 data-items='${JSON.stringify(items)}'>
            </div>

            <button class="slider-btn right"
                    onclick="moveSlider('${id}',1)">
                ❯
            </button>

        </div>

    </section>
    `;
}
function scrollBrand(id, direction) {

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollBy({
        left: direction * 260,
        behavior: "smooth"
    });
}
function formatBrandName(name) {
    return name
        .toLowerCase()
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

function renderSliderPage(id){

    const slider =
        document.getElementById(id);

    const items =
        JSON.parse(slider.dataset.items);

    let index =
        Number(slider.dataset.index);

    let html = "";

    for(let i=0;i<3;i++){

        const p =
            items[(index+i)%items.length];

        html += `
        <div class="product-card">

            <img src="images/${p.category}/${p.folder}/main.jpg">

            <div class="product-info">

                <h3>${p.name}</h3>

                <div class="product-buttons">

                    <a class="detail-btn"
                       href="chitiet.html?id=${p.id}">
                        Chi tiết
                    </a>

                    <button class="quote-btn"
                            onclick="showQuote(${p.id})">
                        Báo giá
                    </button>

                </div>

            </div>

        </div>
        `;
    }

    slider.innerHTML = html;
}
function moveSlider(id,direction){

    const slider =
        document.getElementById(id);

    const items =
        JSON.parse(slider.dataset.items);

    let index =
        Number(slider.dataset.index);

    index += direction * 3;

    if(index >= items.length)
        index = 0;

    if(index < 0)
        index = Math.max(items.length - 3,0);

    slider.dataset.index = index;

    renderSliderPage(id);
}
function startBrandSlider(){

    document
    .querySelectorAll(".brand-track")
    .forEach(slider=>{

        renderSliderPage(slider.id);

        setInterval(()=>{

            moveSlider(
                slider.id,
                1
            );

        },5000);

    });
}

document.addEventListener(
    "DOMContentLoaded",
    function(){

        renderHomeByBrand();

        startBrandSlider();

    }
);