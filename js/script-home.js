/* =========================
   HOME PAGE (RENDER LAYER)
========================= */

function renderProducts(productList) {

    const list = productList || getProducts();
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = "";

    list.forEach(product => {

        grid.innerHTML += `
        <div class="product-card">
            <img src="images/${product.category}/${product.folder}/main.jpg">

            <div class="product-info">
                <h3>${product.name}</h3>

                <a class="detail-btn"
                   href="chitiet.html?id=${product.id}">
                    Chi tiết
                </a>
            </div>
        </div>`;
    });
}

/* =========================
   FILTER (UI ONLY)
========================= */

function filterProducts(category) {

    const filtered = getProducts().filter(p => p.category === category);
    renderProducts(filtered);
}

function filterByBrand(brand) {

    const filtered = getProducts().filter(p => p.brand === brand);
    renderProducts(filtered);
}

/* =========================
   SLIDER EXCELL (UI ONLY)
========================= */

let excellSlides = [];
let indexSlide = 0;

function getExcellImages() {

    let images = [];

    const products = getProducts();

    products.forEach(p => {

        if (p.brand && p.brand.toLowerCase().includes("excell")) {
            images.push(`images/${p.category}/${p.folder}/main.jpg`);
        }

    });

    return images;
}

function initExcellSlider() {

    const sliderImg = document.getElementById("slider-img");
    if (!sliderImg) return;

    excellSlides = getExcellImages();

    function showSlide() {

        if (!excellSlides.length) return;

        sliderImg.src = excellSlides[indexSlide];

        indexSlide++;

        if (indexSlide >= excellSlides.length) {
            indexSlide = 0;
        }
    }

    showSlide();
    setInterval(showSlide, 3000);
}

/* =========================
   NAVIGATION HELPERS (SESSION LAYER)
========================= */

function goHomeAndCategory(category) {

    sessionStorage.setItem("filterCategory", category);
    window.location.href = "index.html";
}

function goHomeAndBrand(brand) {

    sessionStorage.setItem("filterBrand", brand);
    window.location.href = "index.html";
}