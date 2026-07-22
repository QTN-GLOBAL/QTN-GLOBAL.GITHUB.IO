/* =====================================================
   BEST SELLER
   INFINITE SMOOTH SLIDER
   - Chạy liên tục từ phải sang trái
   - Không giật
   - Không nhảy về đầu
   - Không nút điều hướng
   - Không tên sản phẩm
   - Không Brand
   - Click ảnh -> trang chi tiết
===================================================== */

let bestSellerAnimation = null;

let bestSellerPaused = false;


/* =====================================================
   RENDER
===================================================== */

function renderBestSeller() {

    const container =
        document.getElementById("bestSellerTrack");

    if (!container) return;


    const products =
        typeof getProducts === "function"
            ? getProducts()
            : [];


    if (
        !Array.isArray(products) ||
        products.length === 0
    ) {

        container.innerHTML = "";

        return;

    }


    /* =================================================
       TẠO 2 BỘ SẢN PHẨM GIỐNG NHAU

       Bộ 1: sản phẩm thật
       Bộ 2: bản sao

       Khi bộ 1 chạy hết,
       bộ 2 đã nối tiếp phía sau.
       Tạo cảm giác chạy vô hạn.
    ================================================= */

    const createItems = () => {

        return products
            .filter(p =>
                p &&
                p.id &&
                p.folder &&
                p.category
            )
            .map(p => {

                const brand =
                    (p.brand || "")
                        .trim()
                        .toUpperCase();


                const detailUrl =
                    brand === "AMWAY"
                        ? `amway.html?id=${p.id}`
                        : `chitiet.html?id=${p.id}`;


                return `

                    <a
                        class="best-seller-item"
                        href="${detailUrl}"
                    >

                        <img
                            src="images/${p.category}/${p.folder}/main.jpg"
                            alt=""
                            loading="lazy"
                        >

                    </a>

                `;

            })
            .join("");

    };


    const items =
        createItems();


    container.innerHTML =
        items + items;


    startBestSellerSlider();

}


/* =====================================================
   START SMOOTH SLIDER
===================================================== */

function startBestSellerSlider() {

    const track =
        document.getElementById(
            "bestSellerTrack"
        );

    if (!track) return;


    /* DỪNG ANIMATION CŨ */

    if (bestSellerAnimation) {

        cancelAnimationFrame(
            bestSellerAnimation
        );

    }


    let position = 0;

    let lastTime = null;


    /* ================================================
       TỐC ĐỘ

       Số càng nhỏ -> chạy chậm
       Số càng lớn -> chạy nhanh

       0.035 = chậm, mượt
    ================================================ */

    const speed = 0.035;


    /* ================================================
       CHIỀU RỘNG 1 BỘ SẢN PHẨM

       Vì chúng ta render 2 bộ giống nhau
       nên khi đi hết 1 bộ sẽ quay lại 0
    ================================================ */

    function getLoopWidth() {

        return track.scrollWidth / 2;

    }


    /* ================================================
       ANIMATION
    ================================================ */

    function animate(time) {

        if (!lastTime) {

            lastTime = time;

        }


        const delta =
            time - lastTime;


        lastTime = time;


        if (!bestSellerPaused) {

            position +=
                speed * delta;


            const loopWidth =
                getLoopWidth();


            if (
                loopWidth > 0 &&
                position >= loopWidth
            ) {

                position -= loopWidth;

            }


            track.style.transform =
                `translate3d(
                    ${-position}px,
                    0,
                    0
                )`;

        }


        bestSellerAnimation =
            requestAnimationFrame(
                animate
            );

    }


    bestSellerAnimation =
        requestAnimationFrame(
            animate
        );

}


/* =====================================================
   PAUSE KHI RÊ CHUỘT
===================================================== */

document.addEventListener(
    "mouseenter",
    function(event) {

        if (
            event.target.closest(
                ".best-seller-item"
            )
        ) {

            bestSellerPaused = true;

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
                ".best-seller-item"
            )
        ) {

            bestSellerPaused = false;

        }

    },
    true
);


/* =====================================================
   INIT
===================================================== */

function initBestSeller() {

    renderBestSeller();

}


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initBestSeller();

    }
);