/* =====================================================
   BEST SELLER
   - Hiển thị toàn bộ sản phẩm
   - Không hiển thị tên
   - Không hiển thị Brand
   - Không hiển thị nút Chi tiết
   - Không hiển thị nút Báo giá
   - Không có nút điều hướng
   - Bấm ảnh mở trang chi tiết
===================================================== */


/* =====================================================
   RENDER BEST SELLER
===================================================== */

function renderBestSeller() {

    const container =
        document.getElementById("bestSellerTrack");

    if (!container) return;


    /* =========================
       LẤY TOÀN BỘ SẢN PHẨM
    ========================= */

    const products =
        typeof getProducts === "function"
            ? getProducts()
            : [];


    if (!Array.isArray(products) ||
        products.length === 0) {

        container.innerHTML = "";

        return;

    }


    /* =========================
       RENDER SẢN PHẨM
    ========================= */

    container.innerHTML = products
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


            /* =========================
               LINK CHI TIẾT
            ========================= */

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

}


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