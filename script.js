/* =========================
   GLOBAL STATE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedProduct = null;

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
    renderCart();
}

/* =========================
   RENDER PRODUCTS (INDEX)
========================= */

function renderProducts(productList = products) {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = "";

    productList.forEach(p => {
        grid.innerHTML += `
        <div class="product-card">
            <img src="images/${p.category}/${p.folder}/main.jpg">
            <div class="product-info">
                <h3>${p.name}</h3>
                <a class="detail-btn" href="chitiet.html?id=${p.id}">Chi tiết</a>
            </div>
        </div>`;
    });
}

/* =========================
   FILTER
========================= */

function filterProducts(category) {
    renderProducts(products.filter(p => p.category === category));
}

/* =========================
   CART
========================= */

function addToCart(id, qty = 1) {

    const p = products.find(x => x.id == id);
    if (!p) return;

    const exist = cart.find(x => x.id == id);

    if (exist) exist.quantity += qty;
    else {
        cart.push({
            id: p.id,
            name: p.name,
            category: p.category,
            folder: p.folder,
            quantity: qty
        });
    }

    saveCart();
}

function renderCart() {

    const body = document.getElementById("cartBody");
    if (!body) return;

    if (cart.length === 0) {
        body.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    body.innerHTML = "";

    cart.forEach(i => {
        body.innerHTML += `
        <div class="cart-item">
            <img src="images/${i.category}/${i.folder}/main.jpg" width="60">
            <h4>${i.name}</h4>
            <span>${i.quantity}</span>
            <button onclick="removeCart(${i.id})">X</button>
        </div>`;
    });
}

function removeCart(id) {
    cart = cart.filter(i => i.id != id);
    saveCart();
}

function openCart() {
    document.getElementById("cartModal")?.classList.add("active");
    document.getElementById("cartOverlay")?.style.display = "block";
    renderCart();
}

function closeCart() {
    document.getElementById("cartModal")?.classList.remove("active");
    document.getElementById("cartOverlay")?.style.display = "none";
}

/* =========================
   DETAIL POPUP FIX (QUAN TRỌNG)
========================= */

function openAddCartPopup() {

    const p = window.currentProduct;
    if (!p) return;

    selectedProduct = p;

    document.getElementById("addCartPopup").style.display = "flex";

    document.getElementById("popupCartImg").src =
        `images/${p.category}/${p.folder}/main.jpg`;

    document.getElementById("popupCartName").innerText = p.name;

    // 🔥 FIX LẤY MỨC CÂN
    let capText = (p.specs || []).find(s =>
        s.toLowerCase().includes("mức cân")
    );

    let html = "";

    if (capText) {
        let values = capText.split(":")[1] || capText;
        values.split("/").forEach(v => {
            html += `<option>${v.trim()}</option>`;
        });
    }

    document.getElementById("popupCartCapacity").innerHTML = html;
}

function closeAddCart() {
    document.getElementById("addCartPopup").style.display = "none";
}

function confirmAddCart() {

    if (!selectedProduct) return;

    cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        folder: selectedProduct.folder,
        quantity: Number(document.getElementById("popupCartQty").value || 1)
    });

    saveCart();
    closeAddCart();

    alert("Đã thêm vào giỏ");
}

/* =========================
   BUY POPUP FIX
========================= */

function openBuyPopup() {

    const p = window.currentProduct;
    if (!p) return;

    selectedProduct = p;

    document.getElementById("buyPopup").style.display = "flex";
    document.getElementById("buyProductName").value = p.name;
}

function closeBuyPopup() {
    document.getElementById("buyPopup").style.display = "none";
}

/* =========================
   QTY
========================= */

function changeQty(type, num) {
    const id = type === "cart" ? "popupCartQty" : "buyQty";
    let el = document.getElementById(id);

    let val = Number(el.value) + num;
    if (val < 1) val = 1;

    el.value = val;
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
});