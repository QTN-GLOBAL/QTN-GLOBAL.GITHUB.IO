/* =========================
   GIỎ HÀNG (SHOPEE MINI CLEAN)
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   LẤY SẢN PHẨM
========================= */
function getProducts() {
    return window.products || [];
}

/* =========================
   LƯU GIỎ HÀNG
========================= */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

/* =========================
   ĐẾM GIỎ HÀNG
========================= */
function updateCartCount() {

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    const el = document.getElementById("cartCount");
    if (el) el.innerText = total;
}

/* =========================
   THÊM VÀO GIỎ
========================= */
function addToCart(id, qty = 1) {

    const product = getProducts().find(p => p.id == id);
    if (!product) return;

    const item = cart.find(i => i.id == id);

    if (item) {
        item.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            folder: product.folder,
            quantity: qty
        });
    }

    saveCart();
}

/* =========================
   MỞ GIỎ HÀNG
========================= */
function openCart() {

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (!modal || !overlay) return;

    modal.classList.add("active");
    overlay.style.display = "block";

    renderCart();
}

/* =========================
   ĐÓNG GIỎ HÀNG
========================= */
function closeCart() {

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (!modal || !overlay) return;

    modal.classList.remove("active");
    overlay.style.display = "none";
}

/* =========================
   HIỂN THỊ GIỎ HÀNG
========================= */
function renderCart() {

    const box = document.getElementById("cartBody");
    if (!box) return;

    if (cart.length === 0) {
        box.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    box.innerHTML = "";

    cart.forEach(item => {

        box.innerHTML += `
        <div class="cart-item">

            <h4>${item.name}</h4>

            <div>
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>

            <label>
                <input type="checkbox" class="cart-check" value="${item.id}">
                Chọn mua
            </label>

            <button onclick="removeItem(${item.id})">Xóa</button>

        </div>
        `;
    });

    box.innerHTML += `
        <button onclick="checkoutCart()" class="btn-buy">
            MUA NGAY
        </button>
    `;
}

/* =========================
   TĂNG GIẢM SỐ LƯỢNG
========================= */
function changeQty(id, value) {

    const item = cart.find(i => i.id == id);
    if (!item) return;

    item.quantity += value;

    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id != id);
    }

    saveCart();
}

/* =========================
   XÓA ITEM
========================= */
function removeItem(id) {

    cart = cart.filter(i => i.id != id);
    saveCart();
}

/* =========================
   CHECKOUT (MUA NGAY)
========================= */
function checkoutCart() {

    const checked = document.querySelectorAll(".cart-check:checked");

    if (checked.length === 0) {
        alert("Vui lòng chọn sản phẩm");
        return;
    }

    let text = "";
    let totalQty = 0;

    checked.forEach(el => {

        const id = Number(el.value);
        const item = cart.find(i => i.id == id);

        if (item) {
            text += item.name + " x " + item.quantity + "\n";
            totalQty += item.quantity;
        }
    });

    openBuyPopup(text, totalQty);
}

/* =========================
   MỞ POPUP MUA HÀNG
========================= */
function openBuyPopup(text, totalQty) {

    const popup = document.getElementById("buyPopup");
    if (!popup) {
        alert("Thiếu popup buyPopup trong HTML");
        return;
    }

    popup.style.display = "flex";

    const name = document.getElementById("buyProductName");
    const qty = document.getElementById("buyQty");
    const cap = document.getElementById("buyCapacity");

    if (name) name.value = "ĐƠN HÀNG GIỎ HÀNG";
    if (qty) qty.value = totalQty;

    if (cap) cap.innerHTML = `<option>${text}</option>`;
}

/* =========================
   ĐÓNG POPUP
========================= */
function closeBuyPopup() {
    const popup = document.getElementById("buyPopup");
    if (popup) popup.style.display = "none";
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();
});