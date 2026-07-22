/* =====================================================
   BRAND SLIDER
   SMOOTH INFINITE SLIDER
   - Chạy liên tục từ phải sang trái
   - Không giật cục
   - Không nhảy từng sản phẩm
   - Không mất sản phẩm
   - Giữ nút điều hướng
   - Giữ tên sản phẩm
   - Giữ Brand
   - Giữ Chi tiết / Nhận báo giá
===================================================== */


let brandAnimations = [];

let brandPaused = false;


/* =====================================================
   VISIBLE COUNT
===================================================== */

function getVisibleCount(){

    const w = window.innerWidth;

    if(w <= 480) return 1;

    if(w <= 768) return 2;

    if(w <= 992) return 3;

    return 4;

}


/* =====================================================
   INIT
===================================================== */

function initBrandSliders() {

    const mode =
        window.APP_MODE ?
        window.APP_MODE.mode :
        "home";


    /* =========================
       KHÓA Ở PRODUCT GRID
    ========================= */

    if (
        mode === "search-grid" ||
        mode === "category-grid" ||
        mode === "brand-grid"
    ) {

        return;

    }


    /* =========================
       DỪNG ANIMATION CŨ
    ========================= */

    brandAnimations.forEach(
        animation => {

            cancelAnimationFrame(
                animation
            );

        }
    );


    brandAnimations = [];


    /* =========================
       INIT TỪNG BRAND
    ========================= */

    document
        .querySelectorAll(".brand-track")
        .forEach(track => {

            let items = [];

            try {

                items =
                    JSON.parse(
                        track.dataset.items || "[]"
                    );

            } catch (e) {

                items = [];

            }


            if (
                !Array.isArray(items) ||
                items.length === 0
            ) {

                return;

            }


            renderBrand(
                track.id
            );

        });

}


/* =====================================================
   RENDER BRAND
===================================================== */

function renderBrand(id) {

    const el =
        document.getElementById(id);

    if (!el) return;


    let items = [];

    try {

        items =
            JSON.parse(
                el.dataset.items || "[]"
            );

    } catch (e) {

        items = [];

    }


    if (
        !Array.isArray(items) ||
        items.length === 0
    ) {

        return;

    }


    /* =================================================
       NẾU KHÔNG ĐỦ SẢN PHẨM
       HIỂN THỊ BÌNH THƯỜNG
    ================================================= */

    if (
        items.length <=
        getVisibleCount()
    ) {

        renderBrandStatic(
            el,
            items
        );

        return;

    }


    /* =================================================
       TẠO 2 BỘ SẢN PHẨM

       Bộ 1
       Bộ 2

       Chạy hết bộ 1
       -> nối tiếp bộ 2
       -> quay lại đầu
       -> không nhìn thấy điểm lặp
    ================================================= */

    const createItems =
        list => {

            return list
                .map(p => {

                    if (!p) return "";


                    const product =
                        getTranslatedProduct(p)
                        || p;


                    const brand =
                        (p.brand || "")
                            .trim()
                            .toUpperCase();


                    const detailUrl =
                        brand === "AMWAY"
                            ? "amway.html"
                            : "chitiet.html";


                    const quoteAction =
                        brand === "AMWAY"
                            ? "location.href='amway-contact.html'"
                            : "showQuote(" + p.id + ")";


                    const quoteText =
                        brand === "AMWAY"
                            ? t("contactConsultationBtn")
                            : t("quoteBtn");


                    return `

                    <div class="product-card">

                        <div class="brand-overlay">

                            ${formatBrandName(
                                p.brand || ""
                            )}

                        </div>


                        <img
                            src="images/${p.category}/${p.folder}/main.jpg"
                        >


                        <div class="product-info">

                            <h3>
                                ${product.name}
                            </h3>


                            <div class="product-buttons">


                                <a
                                    class="detail-btn"
                                    href="${detailUrl}?id=${p.id}"
                                >

                                    ${t("detailBtn")}

                                </a>


                                <button
                                    class="quote-btn"
                                    onclick="${quoteAction}"
                                >

                                    ${quoteText}

                                </button>


                            </div>

                        </div>

                    </div>

                    `;

                })
                .join("");

        };


    const html =
        createItems(items);


    /* =================================================
       NHÂN ĐÔI DANH SÁCH
    ================================================= */

    el.innerHTML =
        html + html;


    /* =================================================
       START ANIMATION
    ================================================= */

    startBrandSlider(
        el.id
    );

}


/* =====================================================
   STATIC BRAND
===================================================== */

function renderBrandStatic(
    el,
    items
) {

    let html = "";


    const visible =
        getVisibleCount();


    for (
        let i = 0;
        i < Math.min(
            visible,
            items.length
        );
        i++
    ) {

        const p =
            items[i];


        if (!p) continue;


        const product =
            getTranslatedProduct(p)
            || p;


        const brand =
            (p.brand || "")
                .trim()
                .toUpperCase();


        const detailUrl =
            brand === "AMWAY"
                ? "amway.html"
                : "chitiet.html";


        const quoteAction =
            brand === "AMWAY"
                ? "location.href='amway-contact.html'"
                : "showQuote(" + p.id + ")";


        const quoteText =
            brand === "AMWAY"
                ? t("contactConsultationBtn")
                : t("quoteBtn");


        html += `

        <div class="product-card">

            <div class="brand-overlay">

                ${formatBrandName(
                    p.brand || ""
                )}

            </div>


            <img
                src="images/${p.category}/${p.folder}/main.jpg"
            >


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>


                <div class="product-buttons">

                    <a
                        class="detail-btn"
                        href="${detailUrl}?id=${p.id}"
                    >

                        ${t("detailBtn")}

                    </a>


                    <button
                        class="quote-btn"
                        onclick="${quoteAction}"
                    >

                        ${quoteText}

                    </button>

                </div>

            </div>

        </div>

        `;

    }


    el.innerHTML =
        html;

}


/* =====================================================
   START SMOOTH SLIDER
===================================================== */

function startBrandSlider(id) {

    const track =
        document.getElementById(id);

    if (!track) return;


    let position = 0;

    let lastTime = null;


    /* =================================================
       TỐC ĐỘ

       0.035 = chậm
       0.05  = trung bình
       0.07  = nhanh
    ================================================= */

    const speed =
        0.035;


    /* =================================================
       WIDTH CỦA 1 BỘ

       Vì HTML có 2 bộ giống nhau
       nên scrollWidth / 2
       chính là chiều rộng 1 bộ
    ================================================= */

    function getLoopWidth() {

        return track.scrollWidth / 2;

    }


    /* =================================================
       ANIMATION
    ================================================= */

    function animate(time) {

        if (!lastTime) {

            lastTime =
                time;

        }


        const delta =
            time - lastTime;


        lastTime =
            time;


        if (!brandPaused) {

            position +=
                speed * delta;


            const loopWidth =
                getLoopWidth();


            if (
                loopWidth > 0 &&
                position >= loopWidth
            ) {

                position -=
                    loopWidth;

            }


            track.style.transform =
                `translate3d(
                    ${-position}px,
                    0,
                    0
                )`;

        }


        const animation =
            requestAnimationFrame(
                animate
            );


        brandAnimations.push(
            animation
        );

    }


    const animation =
        requestAnimationFrame(
            animate
        );


    brandAnimations.push(
        animation
    );

}


/* =====================================================
   MOVE BRAND
   - GIỮ NÚT ĐIỀU HƯỚNG CŨ
===================================================== */

function moveBrand(
    id,
    dir
) {

    const el =
        document.getElementById(id);

    if (!el) return;


    /*
       Nút trái / phải vẫn giữ lại
       nhưng thay vì nhảy từng item,
       chúng ta cho slider chạy nhanh
       theo hướng được chọn.
    */


    const amount =
        250;


    let currentTransform =
        el.style.transform;


    let currentX = 0;


    const match =
        currentTransform.match(
            /translate3d\((-?[\d.]+)px/
        );


    if (match) {

        currentX =
            Number(
                match[1]
            );

    }


    currentX +=
        dir * amount;


    el.style.transition =
        "transform .6s ease";


    el.style.transform =
        `translate3d(
            ${currentX}px,
            0,
            0
        )`;


    setTimeout(
        () => {

            el.style.transition =
                "";

        },
        600
    );

}


/* =====================================================
   FORMAT BRAND NAME
===================================================== */

function formatBrandName(
    name
) {

    return (name || "")
        .toLowerCase()
        .split(" ")
        .map(
            w =>
                w.charAt(0)
                .toUpperCase()
                +
                w.slice(1)
        )
        .join(" ");

}


/* =====================================================
   PAUSE KHI RÊ CHUỘT
===================================================== */

document.addEventListener(

    "mouseenter",

    function(event) {

        if (
            event.target.closest(
                ".brand-track .product-card"
            )
        ) {

            brandPaused =
                true;

        }

    },

    true

);


/* =====================================================
   CHẠY LẠI KHI RỜI CHUỘT
===================================================== */

document.addEventListener(

    "mouseleave",

    function(event) {

        if (
            event.target.closest(
                ".brand-track .product-card"
            )
        ) {

            brandPaused =
                false;

        }

    },

    true

);


/* =====================================================
   RESPONSIVE
===================================================== */

window.addEventListener(

    "resize",

    () => {

        document
            .querySelectorAll(
                ".brand-track"
            )
            .forEach(
                track => {

                    /*
                       Không render lại khi đang chạy
                       để tránh slider bị giật.
                    */

                    if (
                        !track.innerHTML
                    ) {

                        renderBrand(
                            track.id
                        );

                    }

                }
            );

    }

);