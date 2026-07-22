/* =====================================================
   BEST SELLER SLIDER
   - HIỂN THỊ TOÀN BỘ SẢN PHẨM
   - KHÔNG PHỤ THUỘC BRAND
   - KHÔNG PHỤ THUỘC PHÂN TRANG BRAND
===================================================== */

let bestSellerIndex = 0;
let bestSellerTimer = null;


/* =====================================================
   GET PRODUCTS
===================================================== */

function getBestSellerProducts() {

    if (typeof getProducts === "function") {

        const products = getProducts();

        if (Array.isArray(products)) {

            return products.filter(
                p => p && p.id && p.name
            );

        }

    }


    /* =========================
       FALLBACK
    ========================= */

    if (
        typeof products !== "undefined"
        &&
        Array.isArray(products)
    ) {

        return products.filter(
            p => p && p.id && p.name
        );

    }


    return [];

}


/* =====================================================
   VISIBLE COUNT
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


    if (!track) {

        console.log(
            "BEST SELLER: TRACK NOT FOUND"
        );

        return;

    }


    const productList =
        getBestSellerProducts();


    console.log(
        "BEST SELLER PRODUCTS:",
        productList
    );


    if (
        !productList
        ||
        productList.length === 0
    ) {

        console.log(
            "BEST SELLER: NO PRODUCTS"
        );

        return;

    }


    bestSellerIndex = 0;


    renderBestSeller();


    /* =========================
       CLEAR TIMER
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

            function(){

                moveBestSeller(1);

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


    const productList =
        getBestSellerProducts();


    if (
        !productList
        ||
        productList.length === 0
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
                +
                i
            )
            %
            productList.length;


        const p =
            productList[index];


        if (!p) continue;


        const product =
            typeof getTranslatedProduct === "function"

            ?

            (
                getTranslatedProduct(p)
                ||
                p
            )

            :

            p;


        const brand =
            (
                p.brand
                ||
                ""
            )
            .trim();


        const brandUpper =
            brand.toUpperCase();


        html += `

<div class="best-seller-card">


    ${
        brand

        ?

        `

        <div class="best-seller-brand">

            ${formatBrandName(brand)}

        </div>

        `

        :

        ""
    }


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

                href="${
                    brandUpper === "AMWAY"

                    ?

                    "amway.html"

                    :

                    "chitiet.html"
                }?id=${p.id}">

                ${
                    typeof t === "function"

                    ?

                    t("detailBtn")

                    :

                    "Xem chi tiết"
                }

            </a>


            <button
                class="quote-btn"

                onclick="${
                    brandUpper === "AMWAY"

                    ?

                    "location.href='amway-contact.html'"

                    :

                    "showQuote(" + p.id + ")"
                }">


                ${
                    brandUpper === "AMWAY"

                    ?

                    (
                        typeof t === "function"

                        ?

                        t("contactConsultationBtn")

                        :

                        "Liên hệ tư vấn"
                    )

                    :

                    (
                        typeof t === "function"

                        ?

                        t("quoteBtn")

                        :

                        "Báo giá"
                    )
                }


            </button>


        </div>


    </div>


</div>

`;

    }


    track.innerHTML =
        html;


    console.log(
        "BEST SELLER RENDERED:",
        visible,
        "PRODUCTS"
    );

}


/* =====================================================
   MOVE
===================================================== */

function moveBestSeller(
    direction
) {

    const productList =
        getBestSellerProducts();


    if (
        !productList
        ||
        productList.length === 0
    ) {

        return;

    }


    bestSellerIndex +=
        direction;


    if (
        bestSellerIndex
        >=
        productList.length
    ) {

        bestSellerIndex = 0;

    }


    if (
        bestSellerIndex < 0
    ) {

        bestSellerIndex =
            productList.length - 1;

    }


    renderBestSeller();

}


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    function(){

        renderBestSeller();

    }
);


/* =====================================================
   DOM READY
===================================================== */

window.addEventListener(
    "DOMContentLoaded",
    function(){

        setTimeout(

            function(){

                initBestSellerSlider();

            },

            300

        );

    }
);