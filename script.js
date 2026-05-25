/* =========================
   CART STATE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (!Array.isArray(cart)) cart = [];

let selectedProduct = null;

/* =========================
   PRODUCTS SOURCE
========================= */

const getProducts = () => window.products || [];

/* =========================
   CART COUNT
========================= */

function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    let total = 0;
    cart.forEach(item => total += item.quantity || 0);

    cartCount.innerText = total;
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
   PRODUCT RENDER (INDEX)
========================= */

function renderProducts(list = getProducts()) {

    const box = document.getElementById("productGrid");
    if (!box) return;

    box.innerHTML = "";

    list.forEach(p => {
        box.innerHTML += `
        <div class="product-card">
            <img src="images/${p.category}/${p.folder}/main.jpg">
            <div class="product-info">
                <h3>${p.name}</h3>
                <a class="detail-btn" href="chitiet.html?id=${p.id}">
                    Chi tiết
                </a>
            </div>
        </div>
        `;
    });
}

/* =========================
   FILTER CATEGORY
========================= */

function filterProducts(category) {
    const filtered = getProducts().filter(p => p.category === category);
    renderProducts(filtered);
}

/* =========================
   CART OPEN / CLOSE
========================= */

function openCart() {
    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (!modal || !overlay) return;

    modal.classList.add("active");
    overlay.style.display = "block";

    renderCart();
}

function closeCart() {
    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (modal) modal.classList.remove("active");
    if (overlay) overlay.style.display = "none";
}

/* =========================
   ADD TO CART
========================= */

function addToCart(id, qty = 1, level = "") {

    const product = getProducts().find(p => p.id == id);
    if (!product) return;

    const exist = cart.find(i =>
        i.id == id && i.level == level
    );

    if (exist) {
        exist.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            folder: product.folder,
            quantity: qty,
            level: level
        });
    }

    saveCart();
}

/* =========================
   REMOVE / QTY CART
========================= */

function increaseQty(id, level) {
    const item = cart.find(i => i.id == id && i.level == level);
    if (item) item.quantity++;
    saveCart();
}

function decreaseQty(id, level) {
    const item = cart.find(i => i.id == id && i.level == level);
    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
        cart = cart.filter(i => !(i.id == id && i.level == level));
    }

    saveCart();
}

function removeCart(id, level) {
    cart = cart.filter(i => !(i.id == id && i.level == level));
    saveCart();
}

/* =========================
   RENDER CART
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

            <img src="images/${item.category}/${item.folder}/main.jpg" width="70">

            <h4>${item.name}</h4>

            <p>${item.level || ""}</p>

            <div class="qty">
                <button onclick="decreaseQty(${item.id},'${item.level || ""}')">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${item.id},'${item.level || ""}')">+</button>
            </div>

            <div class="cart-actions">

                <label>
                    <input type="checkbox"
                           class="cart-buy-check"
                           value="${item.id}|||${item.level || ""}">
                    Chọn mua
                </label>

                <button onclick="removeCart(${item.id},'${item.level || ""}')">
                    Xóa
                </button>

            </div>

        </div>
        `;
    });

    box.innerHTML += `
    <div class="cart-footer">
        <button onclick="buySelectedCart()" class="btn-buy">
            MUA NGAY
        </button>
    </div>`;
}

/* =========================
   BUY SELECTED CART
========================= */

function buySelectedCart() {

    const checked = document.querySelectorAll(".cart-buy-check:checked");

    if (checked.length === 0) {
        alert("Vui lòng chọn sản phẩm");
        return;
    }

    let html = "";

    checked.forEach(c => {

        const [id, level] = c.value.split("|||");

        const item = cart.find(i =>
            i.id == id && i.level == level
        );

        if (item) {
            html += `
            <div class="order-item">
                <h4>${item.name}</h4>
                <p><b>Mức cân:</b> ${item.level || ""}</p>
                <p><b>Số lượng:</b> ${item.quantity}</p>
            </div>
            <hr>`;
        }
    });

    document.getElementById("buyPopup").style.display = "flex";
    document.getElementById("cartOrderList").innerHTML = html;

    const qtyBox = document.getElementById("buyQtyBox");
    if (qtyBox) qtyBox.style.display = "none";
}

/* =========================
   DETAIL PAGE SUPPORT
========================= */

function openAddCartPopup() {
    if (!window.currentProduct) return;
    selectedProduct = window.currentProduct;
    document.getElementById("addCartPopup").style.display = "flex";
}

function closeAddCart() {
    const p = document.getElementById("addCartPopup");
    if (p) p.style.display = "none";
}

function confirmAddCart() {

    if (!selectedProduct) return;

    const qty = Number(document.getElementById("popupCartQty").value);
    const level = document.getElementById("popupCartCapacity").value;

    addToCart(selectedProduct.id, qty, level);

    document.getElementById("popupCartQty").value = 1;

    closeAddCart();

    alert("Đã thêm vào giỏ");
}

/* =========================
   BUY POPUP DETAIL
========================= */

function openBuyPopup() {

    if (!window.currentProduct) return;

    selectedProduct = window.currentProduct;

    document.getElementById("buyPopup").style.display = "flex";
}

/* =========================
   CHANGE QTY
========================= */

function changeQty(type, val) {

    const input = type === "cart"
        ? document.getElementById("popupCartQty")
        : document.getElementById("buyQty");

    if (!input) return;

    let v = Number(input.value) + val;
    if (v < 1) v = 1;

    input.value = v;
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(location.search);
    const category = urlParams.get("category");

    if (category) {
        renderProducts(getProducts().filter(p => p.category === category));
    } else {
        renderProducts();
    }

    updateCartCount();

    document.addEventListener("click", e => {
        if (e.target.id === "btnAddCart") {
            confirmAddCart();
        }
    });
});