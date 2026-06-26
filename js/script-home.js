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

let sliderIndex = 0;
let sliderTimer = null;

function initExcellSlider(){

    const track =
        document.getElementById("slider-track");

    const dots =
        document.getElementById("slider-dots");

    if(!track || !dots) return;

    excellSlides = getExcellImages();

    track.innerHTML = "";
    dots.innerHTML = "";

    excellSlides.forEach((src,index)=>{

        const img =
            document.createElement("img");

        img.src = src;

        if(index === 0){
            img.classList.add("active");
        }

        track.appendChild(img);

        const dot =
            document.createElement("div");

        dot.className = "slider-dot";

        if(index === 0){
            dot.classList.add("active");
        }

        dot.onclick = () => {
            showSlide(index);
        };

        dots.appendChild(dot);
    });

    function showSlide(index){

        const images =
            track.querySelectorAll("img");

        const dotList =
            dots.querySelectorAll(".slider-dot");

        images.forEach(img =>
            img.classList.remove("active")
        );

        dotList.forEach(dot =>
            dot.classList.remove("active")
        );

        images[index].classList.add("active");
        dotList[index].classList.add("active");

        sliderIndex = index;
    }

    sliderTimer = setInterval(() => {

        sliderIndex++;

        if(sliderIndex >= excellSlides.length){
            sliderIndex = 0;
        }

        showSlide(sliderIndex);

    },5000);
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
let brandSliderIntervals = [];

function renderHomeByBrand() {

    const container = document.getElementById("homeContainer");
    if (!container) {
        console.error("homeContainer not found");
        return;
    }

    // ❗ clear old intervals để tránh chạy chồng khi đổi ngôn ngữ
    brandSliderIntervals.forEach(clearInterval);
    brandSliderIntervals = [];

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

    // re-init slider sau khi render
    startBrandSlider();
}
function createBrandSection(brandKey, items) {

    const id = brandKey.toLowerCase();

    return `
    <section class="brand-section">

        <div class="brand-wrapper">

            <button class="slider-btn left"
                    onclick="moveSlider('${id}', -1)">
                ❮
            </button>

            <div class="brand-track"
                 id="${id}"
                 data-index="0"
                 data-items='${JSON.stringify(items)}'>

            </div>

            <button class="slider-btn right"
                    onclick="moveSlider('${id}', 1)">
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

    const slider = document.getElementById(id);
    if (!slider) return;

    const items =
        JSON.parse(slider.dataset.items || "[]");

    if(items.length === 0){
        slider.innerHTML = "";
        return;
    }

    const index =
        Number(slider.dataset.index || 0);

    const count =
        Math.min(3, items.length);

    let html = "";

    for(let i = 0; i < count; i++){

        // chạy vòng tròn hết danh sách
        const p =
            items[(index + i) % items.length];

        if(!p) continue;

        const product =
            getTranslatedProduct(p) || p;

        html += `
        <div class="product-card">

            <div class="brand-overlay">
                ${p.brand
                    ? formatBrandName(p.brand)
                    : ""}
            </div>

            <img src="images/${p.category}/${p.folder}/main.jpg"
                 alt="${product.name}">

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
    }

    slider.innerHTML = html;
}
function moveSlider(id, direction){

    const slider =
        document.getElementById(id);

    if (!slider) return;

    const items =
        JSON.parse(
            slider.dataset.items || "[]"
        );

    if(items.length <= 3){
        return;
    }

    let index =
        Number(
            slider.dataset.index || 0
        );

    // Di chuyển từng nhóm 3 sản phẩm
    index += 3 * direction;

    // Chạy vòng tròn
    if(index >= items.length){
        index = 0;
    }

    if(index < 0){

        if(items.length % 3 === 0){
            index = items.length - 3;
        } else {
            index = items.length - (items.length % 3);
        }

        if(index >= items.length){
            index = Math.max(items.length - 3, 0);
        }
    }

    slider.dataset.index = index;

    renderSliderPage(id);
}
function startBrandSlider(){

    document
    .querySelectorAll(".brand-track")
    .forEach(slider => {

        const items = JSON.parse(
            slider.dataset.items || "[]"
        );

        // Không có sản phẩm
        if(items.length === 0){
            return;
        }

        // Render lần đầu
        renderSliderPage(slider.id);

        // 1-3 sản phẩm thì không auto chạy
        if(items.length <= 3){
            return;
        }

        // Auto slider
        const interval = setInterval(() => {

            moveSlider(
                slider.id,
                1
            );

        }, 7000);

        // Lưu interval để clear khi render lại
        brandSliderIntervals.push(interval);

    });
}
function renderProductList(products, title){

    const container = document.getElementById("homeContainer");
    if (!container) return;

    container.innerHTML = `

        <div class="list-header">

            <button onclick="goHomePage()">
                ${t("home")}
            </button>

            <h2>
                ${formatBrandName(title)}
            </h2>

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
initExcellSlider();

});