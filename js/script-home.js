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
                Nhận báo giá
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

    renderProductList(filtered, category);
}
function filterByBrand(brand) {

    const products = getProducts();

    const filtered = brand
        ? products.filter(
            p =>
            p.brand?.trim().toUpperCase()
            ===
            brand.toUpperCase()
        )
        : products;

    renderProductList(filtered, brand);
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

function goHomeAndCategory(category){

    filterProducts(category);

}

function goHomeAndBrand(brand){

    filterByBrand(brand);

}

function goHomeAndBusiness(business) {
    goHomeAndFilter(
        "filterBusiness",
        business
    );
}
function goHomePage(){

    renderHomeByBrand();

    startBrandSlider();
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
startBrandSlider();
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

    const count = Math.min(3, items.length);

for(let i=0; i<count; i++){

    const p = items[index + i];

    if(!p) break;

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

    if(items.length <= 3){
    return;
}

index += 3 * direction;

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

        const items = JSON.parse(
            slider.dataset.items
        );

        // Nếu chỉ có 1-3 sản phẩm thì không tự chạy
        if(items.length <= 3){
            renderSliderPage(slider.id);
            return;
        }

        // Từ 4 sản phẩm trở lên mới chạy slider
        renderSliderPage(slider.id);

        setInterval(()=>{

            moveSlider(
                slider.id,
                1
            );

        },5000);

    });
}
function renderProductList(products, title){

    const container =
        document.getElementById(
            "homeContainer"
        );

    container.innerHTML = `

        <div class="list-header">

            <button onclick="goHomePage()">
                ← Trang chủ
            </button>

            <h2>
                ${formatBrandName(title)}
            </h2>

        </div>

        <div class="product-grid">

            ${products.map(p => `

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
                                Nhận báo giá
                            </button>

                        </div>

                    </div>

                </div>

            `).join("")}

        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function () {

    const category =
        sessionStorage.getItem("filterCategory");

    const brand =
        sessionStorage.getItem("filterBrand");

    if(category){

        const products =
            getProducts().filter(
                p => p.category === category
            );

        renderProductGrid(
            products,
            category
        );

        sessionStorage.removeItem(
            "filterCategory"
        );

        return;
    }

    if(brand){

        const products =
            getProducts().filter(
                p =>
                p.brand &&
                p.brand.toUpperCase() ===
                brand.toUpperCase()
            );

        renderProductGrid(
            products,
            brand
        );

        sessionStorage.removeItem(
            "filterBrand"
        );

        return;
    }

    renderHomeByBrand();

});