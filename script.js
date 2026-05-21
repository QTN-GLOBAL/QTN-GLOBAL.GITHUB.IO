/* =========================
   GLOBAL STATE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedProduct = null;

/* =========================
   HELPER: SAVE CART
========================= */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

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
   PRODUCT GRID (INDEX)
========================= */

function renderProducts(list = products) {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = "";

    list.forEach(p => {
        grid.innerHTML += `
        <div class="product-card">
            <img src="images/${p.category}/${p.folder}/main.jpg">
            <div class="product-info">
                <h3>${p.name}</h3>
                <a class="detail-btn" href="chitiet.html?id=${p.id}">
                    Chi tiết
                </a>
            </div>
        </div>`;
    });
}

function filterProducts(cat) {
    renderProducts(products.filter(p => p.category === cat));
}

/* =========================
   CART OPEN / CLOSE
========================= */

function openCart() {
    document.getElementById("cartModal")?.classList.add("active");
    document.getElementById("cartOverlay").style.display = "block";
    renderCart();
}

function closeCart() {
    document.getElementById("cartModal")?.classList.remove("active");
    document.getElementById("cartOverlay").style.display = "none";
}

/* =========================
   ADD TO CART CORE
========================= */

function addToCart(id, qty = 1) {
    const product = products.find(p => p.id == id);
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
            <img src="images/${item.category}/${item.folder}/main.jpg">
            <h4>${item.name}</h4>

            <div class="qty">
                <button onclick="changeCartQty(${item.id},-1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeCartQty(${item.id},1)">+</button>
            </div>

            <button onclick="removeCart(${item.id})">X</button>
        </div>`;
    });
}

function changeCartQty(id, n) {
    const item = cart.find(i => i.id == id);
    if (!item) return;

    item.quantity += n;

    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id != id);
    }

    saveCart();
}

function removeCart(id) {
    cart = cart.filter(i => i.id != id);
    saveCart();
}

/* =========================
   🔥 FIX QUAN TRỌNG: DETAIL PRODUCT GLOBAL
========================= */

function setCurrentProduct(product) {
    selectedProduct = product;
    window.currentProduct = product; // fallback an toàn
}

/* =========================
   ADD CART POPUP (FIX MỨC CÂN)
========================= */

function openAddCartPopup() {
    const p = window.currentProduct || selectedProduct;
    if (!p) return;

    selectedProduct = p;

    const popup = document.getElementById("addCartPopup");
    if (popup) popup.style.display = "flex";

    document.getElementById("popupCartImg").src =
        `images/${p.category}/${p.folder}/main.jpg`;

    document.getElementById("popupCartName").innerText = p.name;

    /* 👉 FIX: lấy mức cân đúng từ specs */
    let options = "";

    const spec = (p.specs || []).find(s =>
        s.toLowerCase().includes("mức cân")
    );

    if (spec) {
        const value = spec.split(":")[1] || "";
        value.split("/").forEach(v => {
            options += `<option>${v.trim()}</option>`;
        });
    }

    document.getElementById("popupCartCapacity").innerHTML = options;
}

/* =========================
   CONFIRM ADD CART
========================= */

function confirmAddCart() {
    const qty = Number(document.getElementById("popupCartQty").value);

    cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        folder: selectedProduct.folder,
        quantity: qty
    });

    saveCart();

    document.getElementById("addCartPopup").style.display = "none";
    alert("Đã thêm vào giỏ hàng");
}

/* =========================
   BUY POPUP
========================= */

function openBuyPopup() {
    const p = window.currentProduct || selectedProduct;
    if (!p) return;

    selectedProduct = p;

    const popup = document.getElementById("buyPopup");
    if (popup) popup.style.display = "flex";

    document.getElementById("buyProductName").value = p.name;
}

/* =========================
   QTY
========================= */

function changeQty(type, n) {
    const id = type === "cart" ? "popupCartQty" : "buyQty";
    const el = document.getElementById(id);

    let v = Number(el.value) + n;
    if (v < 1) v = 1;

    el.value = v;
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
});