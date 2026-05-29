
/* =========================
   BASE STATE + HELPERS
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
   CART COUNT
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
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    if (typeof renderCart === "function") {
        renderCart();
    }
}
function goHomeAndCategory(category){

    sessionStorage.setItem(
        "filterCategory",
        category
    );

    window.location.href = "index.html";
}

function goHomeAndBrand(brand){

    sessionStorage.setItem(
        "filterBrand",
        brand
    );

    window.location.href = "index.html";
}

window.goHomeAndCategory = goHomeAndCategory;
window.goHomeAndBrand = goHomeAndBrand;