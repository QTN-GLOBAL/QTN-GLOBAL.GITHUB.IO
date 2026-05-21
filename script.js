/* =========================
   GIỎ HÀNG
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedProduct = null;

/* =========================
   SAFE HELPERS
========================= */

function $(id) {
    return document.getElementById(id);
}

/* =========================
   SAVE CART
========================= */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

/* =========================
   CẬP NHẬT SỐ LƯỢNG
========================= */

function updateCartCount() {
    let total = 0;

    cart.forEach(item => {
        total += Number(item.quantity || 0);
    });

    const el = $("cartCount");
    if (el) el.innerText = total;
}

/* =========================
   HIỂN THỊ SẢN PHẨM
========================= */

function renderProducts(productList = products) {
    const productGrid = $("productGrid");
    if (!productGrid || !Array.isArray(productList)) return;

    productGrid.innerHTML = "";

    productList.forEach(p => {
        productGrid.innerHTML += `
        <div class="product-card">
            <img src="images/${p.category}/${p.folder}/main.jpg">

            <div class="product-info">
                <h3>${p.name}</h3>

                <button onclick="buyNow(${p.id})">Mua ngay</button>
                <button onclick="addToCart(${p.id})">Thêm giỏ</button>

                <a class="detail-btn" href="chitiet.html?id=${p.id}">
                    Chi tiết
                </a>
            </div>
        </div>`;
    });
}

/* =========================
   THÊM GIỎ HÀNG
========================= */

function addToCart(id, qty = 1) {
    const product = products.find(p => String(p.id) === String(id));
    if (!product) return;

    const item = cart.find(i => String(i.id) === String(id));

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
   MUA NGAY (POPUP)
========================= */

function buyNow(id) {
    const product = products.find(p => String(p.id) === String(id));
    if (!product) return;

    selectedProduct = product;

    const popup = $("buyPopup");
    if (popup) popup.style.display = "flex";

    const nameEl = $("buyProductName");
    if (nameEl) nameEl.value = product.name;

    const qtyEl = $("buyQty");
    if (qtyEl) qtyEl.value = 1;

    // capacity
    const capEl = $("buyCapacity");
    if (capEl && product.specs) {
        let html = "";

        const capSpec = product.specs.find(s => s.includes("Mức cân"));

        if (capSpec) {
            capSpec
                .replace("Mức cân:", "")
                .split("/")
                .forEach(c => {
                    html += `<option>${c.trim()}</option>`;
                });
        }

        capEl.innerHTML = html;
    }
}

/* =========================
   ĐÓNG POPUP MUA NGAY
========================= */

function closeBuyPopup() {
    const popup = $("buyPopup");
    if (popup) popup.style.display = "none";
}

/* =========================
   XÁC NHẬN MUA
========================= */

function confirmBuy() {
    if (!selectedProduct) return;

    const qty = Number($("buyQty")?.value || 1);

    cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        folder: selectedProduct.folder,
        quantity: qty
    });

    saveCart();
    closeBuyPopup();

    alert("Đã thêm vào giỏ hàng");
}

/* =========================
   CART UI
========================= */

function openCart() {
    const modal = $("cartModal");
    const overlay = $("cartOverlay");

    if (modal) modal.classList.add("active");
    if (overlay) overlay.style.display = "block";

    renderCart();
}

function closeCart() {
    const modal = $("cartModal");
    const overlay = $("cartOverlay");

    if (modal) modal.classList.remove("active");
    if (overlay) overlay.style.display = "none";
}

/* =========================
   RENDER CART
========================= */

function renderCart() {
    const cartBody = $("cartBody");
    if (!cartBody) return;

    if (cart.length === 0) {
        cartBody.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    cartBody.innerHTML = "";

    cart.forEach(item => {
        cartBody.innerHTML += `
        <div class="cart-item">
            <img src="images/${item.category}/${item.folder}/main.jpg" width="70">

            <h4>${item.name}</h4>

            <div>
                <button onclick="decreaseQty(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${item.id})">+</button>
            </div>

            <button onclick="removeCart(${item.id})">Xóa</button>
        </div>`;
    });
}

/* =========================
   UPDATE QTY
========================= */

function increaseQty(id) {
    const item = cart.find(i => String(i.id) === String(id));
    if (item) item.quantity++;

    saveCart();
}

function decreaseQty(id) {
    const item = cart.find(i => String(i.id) === String(id));

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
        cart = cart.filter(i => String(i.id) !== String(id));
    }

    saveCart();
}

function removeCart(id) {
    cart = cart.filter(i => String(i.id) !== String(id));
    saveCart();
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
});