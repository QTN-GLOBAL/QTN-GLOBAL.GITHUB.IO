/* =========================
   CART STATE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   UPDATE COUNT
========================= */

function updateCartCount() {
    const el = document.getElementById("cartCount");
    if (!el) return;

    let total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    el.innerText = total;
}

/* =========================
   ADD TO CART (GLOBAL)
========================= */

function addToCart(productId, qty = 1) {

    const product = products.find(p => p.id === productId);
    if (!product) return;

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

    saveCart();
    updateCartCount();
}

/* =========================
   OPEN CART
========================= */

function openCart() {
    const overlay = document.getElementById("cartOverlay");
    const modal = document.getElementById("cartModal");

    if (!overlay || !modal) return;

    overlay.style.display = "block";
    modal.classList.add("active");

    renderCart();
}

/* =========================
   CLOSE CART
========================= */

function closeCart() {
    const overlay = document.getElementById("cartOverlay");
    const modal = document.getElementById("cartModal");

    if (!overlay || !modal) return;

    overlay.style.display = "none";
    modal.classList.remove("active");
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

    body.innerHTML = cart.map((i, index) => `
        <div class="cart-item">
            <p>${i.name}</p>
            <p>Số lượng: ${i.qty}</p>
            <button onclick="removeCart(${index})">Xóa</button>
        </div>
    `).join("");
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
   CHECKOUT ZALO
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

    window.open("https://zalo.me/0383598603");
}

/* =========================
   INIT SAFE
========================= */

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});