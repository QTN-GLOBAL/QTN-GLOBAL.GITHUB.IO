/* =========================
   CART DATA
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   SAFE PRODUCTS CHECK
========================= */

function safeProducts() {
    return Array.isArray(products) ? products : [];
}

/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(list = safeProducts()) {

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

        </div>
        `;
    });

    grid.innerHTML = html;
}

/* =========================
   FILTER CATEGORY
========================= */

function filterProducts(category) {

    const filtered = safeProducts().filter(p => p.category === category);

    renderProducts(filtered);
}

/* =========================
   RESET FILTER (optional click logo/home)
========================= */

function resetProducts() {
    renderProducts();
}

/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const el = document.getElementById("cartCount");
    if (!el) return;

    let total = 0;

    cart.forEach(i => {
        total += i.qty || 1;
    });

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

    let html = "";

    cart.forEach((item, index) => {

        html += `
        <div class="cart-item">

            <p>${item.name}</p>

            <p>Số lượng: ${item.qty}</p>

            <button onclick="removeCart(${index})">Xóa</button>

        </div>
        `;
    });

    body.innerHTML = html;
}

/* =========================
   REMOVE CART
========================= */

function removeCart(index) {

    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    renderCart();
}

/* =========================
   CHECKOUT (ZALO)
========================= */

function checkoutCart() {

    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    let msg = "Đơn hàng:\n\n";

    cart.forEach(i => {
        msg += `- ${i.name} x${i.qty}\n`;
    });

    const phone = "0383598603";

    window.open(`https://zalo.me/${phone}`);
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    renderProducts();
    updateCartCount();

});