/* =========================
   BASE STATE + HELPERS (DATA LAYER)
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (!Array.isArray(cart)) {
    cart = [];
}

let selectedProduct = null;

/* =========================
   PRODUCTS
========================= */

function getProducts() {
    return window.products || [];
}

/* =========================
   CART COUNT (UI sync nhẹ)
========================= */

function updateCartCount() {

    let total = 0;

    cart.forEach(item => {
        total += item.quantity || 0;
    });

    const el = document.getElementById("cartCount");
    if (el) el.innerText = total;
}

/* =========================
   SAVE CART (SOURCE OF TRUTH)
========================= */

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    // 🔒 KHÓA CỨNG: chỉ bắn event, KHÔNG gọi UI trực tiếp
    document.dispatchEvent(new Event("cartUpdated"));
}

/* =========================
   NAVIGATION HELPERS
========================= */

function goHomeAndCategory(category) {

    sessionStorage.setItem("filterCategory", category);
    window.location.href = "index.html";
}

function goHomeAndBrand(brand) {

    sessionStorage.setItem("filterBrand", brand);
    window.location.href = "index.html";
}

function goHomeOpenCart() {

    sessionStorage.setItem("openCart", "1");
    window.location.href = "index.html";
}

/* =========================
   EXPOSE GLOBAL
========================= */

window.goHomeAndCategory = goHomeAndCategory;
window.goHomeAndBrand = goHomeAndBrand;
window.goHomeOpenCart = goHomeOpenCart;