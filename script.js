/* =========================
   CART DATA
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   GET PRODUCTS SAFE
========================= */
function getProducts() {
    return Array.isArray(window.products) ? window.products : [];
}

/* =========================
   SAVE CART
========================= */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   RENDER PRODUCTS
========================= */
function renderProducts(list = getProducts()) {

    const grid = document.getElementById("productGrid");
    if (!grid) return;

    let html = "";

    list.forEach(p => {
        if (!p || !p.id) return;

        const img = `images/${p.category}/${p.folder}/main.jpg`;

        html += `
        <div class="product-card">

            <img src="${img}" onerror="this.src='images/logo.png'">

            <h3>${p.name || ""}</h3>

            <a href="chitiet.html?id=${p.id}" class="detail-btn">
                Chi tiết
            </a>

            <button onclick="addToCart(${p.id})">
                Thêm giỏ
            </button>

            <button onclick="buyNow(${p.id})">
                Mua ngay
            </button>

        </div>
        `;
    });

    grid.innerHTML = html;
}

/* =========================
   FILTER CATEGORY
========================= */
function filterProducts(category) {
    const filtered = getProducts().filter(p => p.category === category);
    renderProducts(filtered);
}

/* =========================
   RESET
========================= */
function resetProducts() {
    renderProducts();
}

/* =========================
   ADD TO CART
========================= */
function addToCart(id) {

    const product = getProducts().find(p => p.id == id);
    if (!product) return;

    const item = cart.find(i => i.id == id);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            qty: 1
        });
    }

    saveCart();
    updateCartCount();
    renderCart();
}

/* =========================
   INCREASE QTY
========================= */
function increaseQty(id) {
    const item = cart.find(i => i.id == id);
    if (!item) return;

    item.qty += 1;

    saveCart();
    updateCartCount();
    renderCart();
}

/* =========================
   DECREASE QTY
========================= */
function decreaseQty(id) {
    const item = cart.find(i => i.id == id);
    if (!item) return;

    item.qty -= 1;

    if (item.qty <= 0) {
        cart = cart.filter(i => i.id != id);
    }

    saveCart();
    updateCartCount();
    renderCart();
}

/* =========================
   REMOVE ITEM
========================= */
function removeCart(index) {

    cart.splice(index, 1);

    saveCart();
    updateCartCount();
    renderCart();
}

/* =========================
   CART COUNT
========================= */
function updateCartCount() {

    const el = document.getElementById("cartCount");
    if (!el) return;

    const total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

    el.innerText = total;
}

/* =========================
   OPEN CART
========================= */
function openCart() {
    document.getElementById("cartOverlay").style.display = "block";
    document.getElementById("cartModal").style.display = "block";
    renderCart();
}

/* =========================
   CLOSE CART
========================= */
function closeCart() {
    document.getElementById("cartOverlay").style.display = "none";
    document.getElementById("cartModal").style.display = "none";
}

/* =========================
   RENDER CART
========================= */
function renderCart() {

    const body = document.getElementById("cartBody");
    if (!body) return;

    if (cart.length === 0) {
        body.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    let html = "";

    cart.forEach((item, index) => {

        html += `
        <div class="cart-item">

            <div class="cart-name">
                ${item.name}
            </div>

            <div class="cart-controls">
                <button onclick="decreaseQty(${item.id})">-</button>
                <span>${item.qty}</span>
                <button onclick="increaseQty(${item.id})">+</button>
            </div>

            <button onclick="removeCart(${index})">Xóa</button>

        </div>
        `;
    });

    body.innerHTML = html;
}

/* =========================
   BUY NOW
========================= */
function buyNow(id) {
    addToCart(id);
    openCart();
}

/* =========================
   CHECKOUT ZALO
========================= */
function checkoutCart() {

    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    let msg = "ĐƠN HÀNG:\n\n";

    cart.forEach(i => {
        msg += `- ${i.name} x${i.qty}\n`;
    });

    const phone = "0383598603";

    window.open(`https://zalo.me/${phone}`);
}

/* =========================
   INIT
========================= */
window.addEventListener("load", () => {
    renderProducts();
    updateCartCount();
    renderCart();
});