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
