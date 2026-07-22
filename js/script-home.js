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
    "ONEKO",
    "FAITHFUL",
    "Shinko",
    "OKS",
    "HZ",
    "FUJI",
    "AMWAY"

];


/* =========================
   BRAND PAGINATION
   - 4 BRAND / PAGE
========================= */

const BRANDS_PER_PAGE = 4;

let currentBrandPage = 1;


/* =========================
   RENDER GRID (GENERIC)
========================= */

function renderProducts(productList = []) {

    const grid = document.getElementById("productGrid");

    if (!grid) return;

    grid.innerHTML = productList

        .filter(p => p && p.id && p.name)

        .map(p => {

            const product =
                getTranslatedProduct(p) || p;

            return `

<div class="product-card">

    <img src="images/${p.category}/${p.folder}/main.jpg">

    <div class="product-info">

        <h3>
            ${product.name}
        </h3>

        <div class="product-buttons">

            <a class="detail-btn"
               href="${p.brand === 'Amway'
                   ? 'amway.html'
                   : 'chitiet.html'}?id=${p.id}">

                ${t("detailBtn")}

            </a>


            <button class="quote-btn"
                onclick="${(p.brand || '').trim().toUpperCase() === 'AMWAY'
                    ? 'location.href=\\'amway-contact.html\\''
                    : 'showQuote(' + p.id + ')'}">

                ${(p.brand || '').trim().toUpperCase() === 'AMWAY'
                    ? 'Liên hệ tư vấn'
                    : t("quoteBtn")}

            </button>

        </div>

    </div>

</div>

`;

        })

        .join("");

}


/* =========================
   FILTER
========================= */

function filterProducts(category) {

    const products =
        getProducts();

    const filtered = category

        ? products.filter(
            p => p.category === category
        )

        : products;

    renderProductList(
        filtered,
        category
    );

}


function filterByBrand(brand) {

    const products =
        getProducts();

    const filtered = brand

        ? products.filter(
            p =>
                p.brand?.trim().toUpperCase()
                === brand.toUpperCase()
        )

        : products;

    renderProductList(
        filtered,
        brand
    );

}


/* =========================
   HOME RENDER BY BRAND
========================= */

function renderHomeByBrand(
    productList = null
) {

    const products =
        productList || getProducts();

    const brands = {};


    products.forEach(p => {

        if (!p.brand) return;

        const key =
            p.brand.trim().toUpperCase();


        if (!brands[key]) {

            brands[key] = [];

        }


        brands[key].push(p);

    });


    renderBrandPage(
        brands
    );

}


/* =========================
   RENDER BRAND PAGE
========================= */

function renderBrandPage(
    brands
) {

    const container =
        document.getElementById(
            "homeContainer"
        );

    if (!container) return;


    let html = "";


    /* =========================
       GET EXISTING BRANDS
    ========================= */

    const existBrands =
        brandOrder.filter(
            key => brands[key]
        );


    /* =========================
       CALCULATE TOTAL PAGE
    ========================= */

    const totalPages =
        Math.ceil(
            existBrands.length
            / BRANDS_PER_PAGE
        );


    /* =========================
       SAFE CURRENT PAGE
    ========================= */

    if (
        currentBrandPage < 1
        ||
        currentBrandPage > totalPages
    ) {

        currentBrandPage = 1;

    }


    /* =========================
       GET CURRENT PAGE BRANDS
    ========================= */

    const start =
        (currentBrandPage - 1)
        * BRANDS_PER_PAGE;


    const end =
        start + BRANDS_PER_PAGE;


    const currentBrands =
        existBrands.slice(
            start,
            end
        );


    /* =========================
       RENDER 4 BRAND SLIDERS
    ========================= */

    currentBrands.forEach(
        key => {

            html +=
                createBrandSection(
                    key,
                    brands[key]
                );

        }
    );


    /* =========================
       PAGINATION
    ========================= */

    if (
        totalPages > 1
    ) {

        html += `

<div class="brand-pagination">


    <!-- PREVIOUS -->

    <button
        class="brand-page-prev"
        onclick="changeBrandPage(-1)"
        ${currentBrandPage === 1
            ? "disabled"
            : ""}>

        ❮

    </button>


`;


        /* =========================
           PAGE NUMBERS
        ========================= */

        for (
            let i = 1;
            i <= totalPages;
            i++
        ) {

            html += `

<button
    class="${i === currentBrandPage
        ? "active"
        : ""}"

    onclick="changeBrandPage(${i})">

    ${i}

</button>

`;

        }


        /* =========================
           NEXT
        ========================= */

        html += `

    <button
        class="brand-page-next"
        onclick="changeBrandPage(-2)"
        ${currentBrandPage === totalPages
            ? "disabled"
            : ""}>

        ❯

    </button>


</div>

`;

    }


    /* =========================
       INSERT HTML
    ========================= */

    container.innerHTML =
        html;


    /* =========================
       INIT BRAND SLIDERS
    ========================= */

    initBrandSliders();

}


/* =========================
   CHANGE BRAND PAGE
========================= */

function changeBrandPage(
    page
) {

    const products =
        getProducts();

    const brands = {};


    /* =========================
       GROUP PRODUCTS BY BRAND
    ========================= */

    products.forEach(p => {

        if (!p.brand) return;

        const key =
            p.brand.trim().toUpperCase();


        if (!brands[key]) {

            brands[key] = [];

        }


        brands[key].push(p);

    });


    /* =========================
       CALCULATE TOTAL PAGE
    ========================= */

    const totalPages =
        Math.ceil(

            brandOrder.filter(
                b => brands[b]
            ).length

            /

            BRANDS_PER_PAGE

        );


    /* =========================
       PREVIOUS PAGE
    ========================= */

    if (
        page === -1
    ) {

        if (
            currentBrandPage > 1
        ) {

            currentBrandPage--;

        }

    }


    /* =========================
       NEXT PAGE
    ========================= */

    else if (
        page === -2
    ) {

        if (
            currentBrandPage < totalPages
        ) {

            currentBrandPage++;

        }

    }


    /* =========================
       DIRECT PAGE
    ========================= */

    else {

        if (
            page >= 1
            &&
            page <= totalPages
        ) {

            currentBrandPage =
                page;

        }

    }


    /* =========================
       RENDER AGAIN
    ========================= */

    renderBrandPage(
        brands
    );


    /* =========================
       SCROLL TO HOME
    ========================= */

    const homeContainer =
        document.getElementById(
            "homeContainer"
        );


    if (
        homeContainer
    ) {

        window.scrollTo({

            top:
                homeContainer.offsetTop
                - 20,

            behavior:
                "smooth"

        });

    }

}


/* =========================
   BRAND SECTION
   - ONLY HTML
========================= */

function createBrandSection(
    brandKey,
    items
) {

    const id =
        brandKey.toLowerCase();


    return `

<section class="brand-section">


    <div class="brand-wrapper">


        <button
            class="slider-btn left"

            onclick="moveBrand(
                '${id}',
                -1
            )">

            ❮

        </button>


        <div
            class="brand-track"

            id="${id}"

            data-index="0"

            data-items='${JSON.stringify(items)}'>

        </div>


        <button
            class="slider-btn right"

            onclick="moveBrand(
                '${id}',
                1
            )">

            ❯

        </button>


    </div>


</section>

`;

}


/* =========================
   SINGLE BRAND SLIDER
========================= */

function renderSingleSlider(
    products,
    title
) {

    const container =
        document.getElementById(
            "homeContainer"
        );

    if (!container) return;


    const id =
        "single-slider";


    container.innerHTML = `

<section
    class="brand-section">


    <h2
        class="brand-title">

        ${formatBrandName(title)}

    </h2>


    <div
        class="brand-wrapper">


        <button
            class="slider-btn left"

            onclick="moveBrand(
                '${id}',
                -1
            )">

            ❮

        </button>


        <div
            class="brand-track"

            id="${id}"

            data-index="0"

            data-items='${JSON.stringify(products)}'>

        </div>


        <button
            class="slider-btn right"

            onclick="moveBrand(
                '${id}',
                1
            )">

            ❯

        </button>


    </div>


</section>

`;

}


/* =========================
   HOME PAGE
========================= */

function goHomePage() {

    sessionStorage.removeItem(
        "searchKeyword"
    );

    sessionStorage.removeItem(
        "filterCategory"
    );

    sessionStorage.removeItem(
        "filterBrand"
    );

    sessionStorage.removeItem(
        "filterBusiness"
    );


    currentBrandPage = 1;


    renderHomeByBrand();


    initHeroSlider();

    initBrandSliders();

}


/* =========================
   PRODUCT LIST PAGE
========================= */

function renderProductList(
    products,
    title
) {

    const container =
        document.getElementById(
            "homeContainer"
        );

    if (!container) return;


    container.innerHTML = `

<div class="list-header">


    <button
        onclick="goHomePage()">

        ${t("home")}

    </button>


    <h2>

        ${formatBrandName(title)}

    </h2>


</div>


<div
    class="product-grid">


${products.map(p => {

    const product =
        getTranslatedProduct(p)
        || p;


    const brand =
        (p.brand || "").trim();


    return `

<div
    class="product-card">


    ${brand ? `

    <div
        class="brand-overlay">

        ${formatBrandName(
            brand
        )}

    </div>

    ` : ""}


    <img
        src="images/${p.category}/${p.folder}/main.jpg">


    <div
        class="product-info">


        <h3>

            ${product.name}

        </h3>


        <div
            class="product-buttons">


            <a
                class="detail-btn"

                href="${p.brand === 'Amway'
                    ? 'amway.html'
                    : 'chitiet.html'}?id=${p.id}">

                ${t("detailBtn")}

            </a>


            <button
                class="quote-btn"

                onclick="${(p.brand || '').trim().toUpperCase() === 'AMWAY'
                    ? 'location.href=\\'amway-contact.html\\''
                    : 'showQuote(' + p.id + ')'}">


                ${(p.brand || '').trim().toUpperCase() === 'AMWAY'

                    ? t(
                        "contactConsultationBtn"
                    )

                    : t(
                        "quoteBtn"
                    )

                }


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
   SESSION NAV
========================= */

function goHomeAndFilter(
    key,
    value
) {

    sessionStorage.setItem(
        key,
        value
    );

    window.location.href =
        "index.html";

}


function goHomeAndCategory(
    category
) {

    sessionStorage.setItem(
        "filterCategory",
        category
    );

    window.location.href =
        "index.html";

}


function goHomeAndBrand(
    brand
) {

    sessionStorage.setItem(
        "filterBrand",
        brand
    );

    window.location.href =
        "index.html";

}


function goHomeAndBusiness(
    business
) {

    console.log(
        "BUSINESS CLICK:",
        business
    );

    sessionStorage.setItem(
        "filterBusiness",
        business
    );

    window.location.href =
        "index.html";

}


/* =========================
   SHOW QUOTE
========================= */

function showQuote(
    id
) {

    const product =
        getProducts().find(
            p => p.id === id
        );


    if (!product) return;


    if (
        (product.brand || "")
            .trim()
            .toUpperCase()
        === "AMWAY"
    ) {

        location.href =
            "amway-contact.html?id="
            + id;

        return;

    }


    alert(
        "Chức năng nhận báo giá đang được cập nhật."
    );

}


/* =========================
   RENDER GRID WITH BRAND
========================= */

function renderGridWithBrand(
    products,
    title
) {

    const container =
        document.getElementById(
            "homeContainer"
        );

    if (!container) return;


    container.innerHTML = `

<div
    class="list-header">


    <button
        onclick="goHomePage()">

        ${t("home")}

    </button>


    <h2>

        ${formatBrandName(title)}

    </h2>


</div>


<div
    class="product-grid">


${products.map(p => {

    const product =
        getTranslatedProduct(p)
        || p;


    return `

<div
    class="product-card">


    <div
        class="brand-overlay">

        ${p.brand
            ? formatBrandName(
                p.brand
            )
            : ""}

    </div>


    <img
        src="images/${p.category}/${p.folder}/main.jpg">


    <div
        class="product-info">


        <h3>

            ${product.name}

        </h3>


        <div
            class="product-buttons">


            <a
                class="detail-btn"

                href="${p.brand === 'Amway'
                    ? 'amway.html'
                    : 'chitiet.html'}?id=${p.id}">

                ${t("detailBtn")}

            </a>


            <button
                class="quote-btn"

                onclick="${(p.brand || '').trim().toUpperCase() === 'AMWAY'
                    ? 'location.href=\\'amway-contact.html\\''
                    : 'showQuote(' + p.id + ')'}">


                ${(p.brand || '').trim().toUpperCase() === 'AMWAY'

                    ? t(
                        "contactConsultationBtn"
                    )

                    : t(
                        "quoteBtn"
                    )

                }


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
   DOM READY
========================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const field =
            params.get(
                "field"
            );


        if (field) {

            sessionStorage.setItem(
                "filterBusiness",
                field
            );


            goHomeAndBusiness(
                field
            );


            window.history.replaceState(
                {},
                "",
                "index.html"
            );

        }

    }
);