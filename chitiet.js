let product = null;

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    product = products.find(p => p.id === id);

    if (!product) {
        document.body.innerHTML = "<h2>Không tìm thấy sản phẩm</h2>";
        return;
    }

    renderProductDetail();
});

/* =========================
   RENDER DETAIL
========================= */

function renderProductDetail() {

    document.getElementById("productName").innerText = product.name || "";
    document.getElementById("productBrand").innerText = product.brand || "";
    document.getElementById("productOrigin").innerText = product.origin || "";
    document.getElementById("productDesc").innerText = product.description || "";

    document.getElementById("mainImage").src =
        `images/${product.category}/${product.folder}/main.jpg`;

    /* THUMB */
    const thumb = document.getElementById("thumbList");
    if (thumb) {
        thumb.innerHTML = "";

        for (let i = 1; i <= 5; i++) {
            thumb.innerHTML += `
                <img src="images/${product.category}/${product.folder}/${i}.jpg"
                     onclick="changeImage(this.src)"
                     onerror="this.style.display='none'">
            `;
        }
    }

    /* SPECS */
    const specs = document.getElementById("productSpecs");
    if (specs && product.specs) {
        specs.innerHTML = "<ul>" +
            product.specs.map(s => `<li>${s}</li>`).join("") +
            "</ul>";
    }
}

/* =========================
   CHANGE IMAGE
========================= */

function changeImage(src) {
    document.getElementById("mainImage").src = src;
}

/* =========================
   ADD TO CART (DETAIL ONLY)
========================= */

function addToCartDetail() {
    if (!product) return;

    if (typeof addToCart === "function") {
        addToCart(product.id, 1);
        alert("Đã thêm vào giỏ!");
    }
}

/* =========================
   BUY NOW (simple fix)
========================= */

function buyNow() {
    if (!product) return;
    alert("Chức năng đặt hàng sẽ mở popup ở bản nâng cấp tiếp theo.");
}