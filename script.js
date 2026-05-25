let cart = JSON.parse(localStorage.getItem("cart")) || [];
if (!Array.isArray(cart)) cart = [];

let selectedProduct = null;

/* =========================
   GET PRODUCTS
========================= */
const getProducts = () => window.products || [];

/* =========================
   CART COUNT
========================= */
function updateCartCount() {
    const el = document.getElementById("cartCount");
    if (!el) return;

    let total = 0;
    cart.forEach(i => total += i.quantity || 0);

    el.innerText = total;
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
   RENDER PRODUCTS (INDEX + DETAIL GRID)
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
                <a href="chitiet.html?id=${p.id}" class="detail-btn">
                    Chi tiết
                </a>
            </div>
        </div>`;
    });
}

/* =========================
   FILTER CATEGORY
========================= */
function filterProducts(cat) {
    renderProducts(getProducts().filter(p => p.category === cat));
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

    const p = getProducts().find(x => x.id == id);
    if (!p) return;

    const exist = cart.find(i => i.id == id && i.level == level);

    if (exist) {
        exist.quantity += qty;
    } else {
        cart.push({
            id: p.id,
            name: p.name,
            category: p.category,
            folder: p.folder,
            quantity: qty,
            level: level
        });
    }

    saveCart();
}

/* =========================
   RENDER CART (FIX CHECKBOX + UI)
========================= */
function renderCart() {

    const box = document.getElementById("cartBody");
    if (!box) return;

    if (cart.length === 0) {
        box.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    box.innerHTML = "";

    cart.forEach(i => {

        box.innerHTML += `
        <div class="cart-item">

            <img src="images/${i.category}/${i.folder}/main.jpg" width="70">

            <h4>${i.name}</h4>

            <p>${i.level || ""}</p>

            <div class="qty">
                <button onclick="changeQtyCart(${i.id},'${i.level}',-1)">-</button>
                <span>${i.quantity}</span>
                <button onclick="changeQtyCart(${i.id},'${i.level}',1)">+</button>
            </div>

            <div class="cart-actions">
                <label class="cart-check">
                    <input type="checkbox"
                           class="cart-buy-check"
                           value="${i.id}|||${i.level}">
                    Chọn mua
                </label>

                <button onclick="removeCart(${i.id},'${i.level}')">
                    Xóa
                </button>
            </div>

        </div>`;
    });

    box.innerHTML += `
    <div class="cart-footer">
        <button onclick="buySelectedCart()" class="btn-buy">
            MUA NGAY
        </button>
    </div>`;
}

/* =========================
   QTY CART FIX
========================= */
function changeQtyCart(id, level, delta) {

    const item = cart.find(i => i.id == id && i.level == level);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        cart = cart.filter(i => !(i.id == id && i.level == level));
    }

    saveCart();
}

/* =========================
   REMOVE
========================= */
function removeCart(id, level) {
    cart = cart.filter(i => !(i.id == id && i.level == level));
    saveCart();
}

/* =========================
   BUY SELECTED CART
========================= */
function buySelectedCart() {

    const checked = document.querySelectorAll(".cart-buy-check:checked");

    if (!checked.length) {
        alert("Chọn sản phẩm");
        return;
    }

    let html = "";

    checked.forEach(c => {

        const [id, level] = c.value.split("|||");

        const i = cart.find(x => x.id == id && x.level == level);

        if (i) {
            html += `
            <div class="order-item">
                <h4>${i.name}</h4>
                <p>${i.level}</p>
                <p>Số lượng: ${i.quantity}</p>
            </div><hr>`;
        }
    });

    document.getElementById("buyPopup").style.display = "flex";
    document.getElementById("cartOrderList").innerHTML = html;
}

/* =========================
   DETAIL POPUP FIX
========================= */
function openAddCartPopup() {
    if (!window.currentProduct) return;
    selectedProduct = window.currentProduct;
    const p = document.getElementById("addCartPopup");
if (p) {
    p.style.display = "flex";
}

function closeAddCart() {
    const p = document.getElementById("addCartPopup");
    if (p) p.style.display = "none";
}

function confirmAddCart() {

    if (!selectedProduct) return;

    const qty = Number(document.getElementById("popupCartQty")?.value || 1);
    const level = document.getElementById("popupCartCapacity")?.value || "";

    addToCart(selectedProduct.id, qty, level);

    closeAddCart();
    alert("Đã thêm vào giỏ");
}

/* =========================
   BUY POPUP
========================= */
function openBuyPopup() {

    if (!window.currentProduct) return;

    selectedProduct = window.currentProduct;
    const p = document.getElementById("buyPopup");
if (p) {
    p.style.display = "flex";
}

/* =========================
   QTY INPUT
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

    const url = new URLSearchParams(location.search);
    const cat = url.get("category");

    if (cat) {
        renderProducts(getProducts().filter(p => p.category === cat));
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
function closeBuyPopup() {
    const p = document.getElementById("buyPopup");
    if (p) p.style.display = "none";
}
function sendOrderZalo() {
    const name = document.getElementById("customerName")?.value || "";
    const phone = document.getElementById("customerPhone")?.value || "";
    const addr = document.getElementById("customerAddress")?.value || "";

    const text =
`🛒 ĐƠN HÀNG
👤 Tên: ${name}
📞 SĐT: ${phone}
📍 Địa chỉ: ${addr}`;

    const zaloPhone = "0383598603"; // số shop của bạn

    window.open(
        `https://zalo.me/${zaloPhone}`,
        "_blank"
    );

    alert("Đã mở Zalo — bạn hãy gửi nội dung thủ công");
}

function sendOrderMessenger() {
    const name = document.getElementById("customerName")?.value || "";
    const phone = document.getElementById("customerPhone")?.value || "";

    const text = `Đơn hàng: ${name} - ${phone}`;

    window.open(
        "https://m.me/QTNSCALE",
        "_blank"
    );

    alert("Đã mở Messenger — gửi nội dung thủ công");
}