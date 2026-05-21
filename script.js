// =========================
// SAFE PRODUCTS LOAD
// =========================
const products = window.products || [];

// =========================
// RENDER PRODUCTS
// =========================
const productGrid = document.getElementById("productGrid");

function renderProducts() {
    if (!productGrid || !Array.isArray(products)) return;

    productGrid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="images/${p.category}/${p.folder}/main.jpg"
                 alt="${p.name}"
                 onerror="this.src='images/default.jpg'">

            <div class="product-info">
                <h3>${p.name}</h3>
                <a href="chitiet.html?id=${p.id}">Chi tiết</a>
            </div>
        </div>
    `).join("");
}

// =========================
// CART SYSTEM (LOCALSTORAGE)
// =========================
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const el = document.getElementById("cartCount");
    if (!el) return;

    const cart = getCart();
    const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
    el.innerText = total;
}

// =========================
// ADD TO CART
// =========================
function addToCart(productId, qty = 1) {

    const product = (window.products || []).find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();

    const exist = cart.find(i => i.id === productId);

    if (exist) {
        exist.qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            qty: qty
        });
    }

    saveCart(cart);
    updateCartCount();
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
});