const products = window.products || [];

// =========================
// GET ID FROM URL
// =========================
function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

// =========================
// RENDER DETAIL
// =========================
function loadProductDetail() {

    const id = getProductId();
    const product = products.find(p => p.id === id);

    if (!product) {
        document.body.innerHTML = "<h2>Không tìm thấy sản phẩm</h2>";
        return;
    }

    // NAME
    const nameEl = document.getElementById("productName");
    if (nameEl) nameEl.innerText = product.name;

    // IMAGE
    const imgEl = document.getElementById("productImage");
    if (imgEl) {
        imgEl.src = `images/${product.category}/${product.folder}/main.jpg`;
    }

    // DESCRIPTION
    const descEl = document.getElementById("productDesc");
    if (descEl) descEl.innerText = product.description;

    // SPECS
    const specEl = document.getElementById("productSpecs");

    if (specEl) {
        specEl.innerHTML = product.specs.map(s =>
            s.includes("<table") ? s : `<p>${s}</p>`
        ).join("");
    }
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", loadProductDetail);