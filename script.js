let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   SAFE DATA
========================= */
function getProducts() {
    return Array.isArray(products) ? products : [];
}

/* =========================
   RENDER INDEX PRODUCTS
========================= */
function renderProducts(list = getProducts()) {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = list.map(p => `
        <div class="product-card">
            <img src="images/${p.category}/${p.folder}/main.jpg"
                 onerror="this.src='images/logo.png'">

            <h3>${p.name}</h3>

            <a class="detail-btn" href="chitiet.html?id=${p.id}">
                Chi tiết
            </a>
        </div>
    `).join("");
}

/* =========================
   FILTER
========================= */
function filterProducts(cat) {
    renderProducts(getProducts().filter(p => p.category === cat));
}

function resetProducts() {
    renderProducts();
}

/* =========================
   CART CORE
========================= */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const el = document.getElementById("cartCount");
    if (!el) return;

    el.innerText = cart.reduce((t, i) => t + (i.qty || 1), 0);
}

/* =========================
   ADD CART (GLOBAL SAFE)
========================= */
function addToCart(product, qty = 1) {
    if (!product) return;

    const existing = cart.find(i => i.id === product.id);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            qty: qty
        });
    }

    saveCart();
    updateCartCount();
}

/* =========================
   CART UI
========================= */
function openCart() {
    document.getElementById("cartOverlay").style.display = "block";
    document.getElementById("cartModal").classList.add("active");
    renderCart();
}

function closeCart() {
    document.getElementById("cartOverlay").style.display = "none";
    document.getElementById("cartModal").classList.remove("active");
}

function renderCart() {
    const body = document.getElementById("cartBody");
    if (!body) return;

    body.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
            <p>${item.name}</p>
            <p>x${item.qty}</p>
            <button onclick="removeCart(${i})">Xóa</button>
        </div>
    `).join("");
}

function removeCart(i) {
    cart.splice(i, 1);
    saveCart();
    updateCartCount();
    renderCart();
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
});