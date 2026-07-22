/* =====================================================
   BEST SELLER SLIDER
   - HIỂN THỊ TOÀN BỘ SẢN PHẨM
   - KHÔNG PHỤ THUỘC BRAND
   - KHÔNG PHỤ THUỘC PHÂN TRANG BRAND
===================================================== */

let bestSellerIndex = 0;
let bestSellerTimer = null;


/* =====================================================
   SỐ SẢN PHẨM HIỂN THỊ
===================================================== */

function getBestSellerVisibleCount() {

    const width =
        window.innerWidth;

    if (width <= 480) {

        return 1;

    }

    if (width <= 768) {

        return 2;

    }

    if (width <= 992) {

        return 3;

    }

    return 4;

}


/* =====================================================
   INIT
===================================================== */

function initBestSellerSlider() {

    const track =
        document.getElementById(
            "bestSellerTrack"
        );

    if (!track) return;


    const products =
        getProducts();


    if (
        !products
        ||
        products.length === 0
    ) {

        return;

    }


    bestSellerIndex = 0;


    renderBestSeller();


    /* =========================
       CLEAR OLD TIMER
    ========================= */

    if (
        bestSellerTimer
    ) {

        clearInterval(
            bestSellerTimer
        );

    }


    /* =========================
       AUTO SLIDE
    ========================= */

    bestSellerTimer =
        setInterval(

            () => {

                moveBestSeller(
                    1
                );

            },

            5000

        );

}


/* =====================================================
   RENDER
===================================================== */

function renderBestSeller() {

    const track =
        document.getElementById(
            "bestSellerTrack"
        );

    if (!track) return;


    const products =
        getProducts();


    if (
        !products
        ||
        products.length === 0
    ) {

        track.innerHTML = "";

        return;

    }


    const visible =
        getBestSellerVisibleCount();


    let html = "";


    for (
        let i = 0;
        i < visible;
        i++
    ) {

        const index =
            (
                bestSellerIndex
                + i
            )
            %
            products.length;


        const p =
            products[index];


        if (!p) continue;


        const product =
            getTranslatedProduct(p)
            ||
            p;


        const brand =
            (
                p.brand
                ||
                ""
            )
            .trim();


        html += `

<div class="best-seller-card">


    ${brand ? `

    <div class="best-seller-brand">

        ${formatBrandName(
            brand
        )}

    </div>

    ` : ""}


    <img
        src="images/${p.category}/${p.folder}/main.jpg"
        alt="${product.name}">


    <div class="best-seller-info">


        <h3>

            ${product.name}

        </h3>


        <div class="best-seller-buttons">


            <a
                class="detail-btn"

                href="${brand.toUpperCase() === 'AMWAY'
                    ? 'amway.html'
                    : 'chitiet.html'}?id=${p.id}">

                ${t("detailBtn")}

            </a>


            <button
                class="quote-btn"

                onclick="${brand.toUpperCase() === 'AMWAY'
                    ? 'location.href=\\'amway-contact.html\\''
                    : 'showQuote(' + p.id + ')'}">


                ${brand.toUpperCase() === 'AMWAY'
                    ? t("contactConsultationBtn")
                    : t("quoteBtn")}


            </button>


        </div>


    </div>


</div>

`;

    }


    track.innerHTML =
        html;

}


/* =====================================================
   MOVE
===================================================== */

function moveBestSeller(
    direction
) {

    const products =
        getProducts();


    if (
        !products
        ||
        products.length === 0
    ) {

        return;

    }


    bestSellerIndex +=
        direction;


    /* =========================
       LOOP FORWARD
    ========================= */

    if (
        bestSellerIndex
        >=
        products.length
    ) {

        bestSellerIndex = 0;

    }


    /* =========================
       LOOP BACKWARD
    ========================= */

    if (
        bestSellerIndex < 0
    ) {

        bestSellerIndex =
            products.length - 1;

    }


    renderBestSeller();

}


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        renderBestSeller();

    }
);


/* =====================================================
   DOM READY
===================================================== */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        initBestSellerSlider();

    }
);