let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedProduct = null;

/* =========================
   SAFE CHECK PRODUCTS
========================= */

function getProducts() {
    return window.products || [];
}

/* =========================
   CART COUNT
========================= */

function updateCartCount() {
    let total = 0;

    cart.forEach(i => {
        total += i.quantity || 0;
    });

    const el = document.getElementById("cartCount");
    if (el) el.innerText = total;
}

/* =========================
   RENDER PRODUCTS SAFE
========================= */

function renderProducts(list) {

    const grid = document.getElementById("productGrid");
    if (!grid) return;

    const productsData = list || getProducts();

    if (!Array.isArray(productsData)) return;

    grid.innerHTML = "";

    productsData.forEach(p => {

        if (!p) return;

        grid.innerHTML += `
        <div class="product-card">
            <img src="images/${p.category}/${p.folder}/main.jpg">
            <div class="product-info">
                <h3>${p.name || ""}</h3>
                <a href="chitiet.html?id=${p.id}">Chi tiết</a>
            </div>
        </div>`;
    });
}

/* =========================
   FILTER SAFE
========================= */

function filterProducts(cat) {
    const list = getProducts().filter(p => p.category === cat);
    renderProducts(list);
}

/* =========================
   CART SAFE
========================= */

function addToCart(id, qty = 1) {

    const p = getProducts().find(x => x.id == id);
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

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

/* =========================
   CART OPEN/CLOSE SAFE
========================= */

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
   RENDER CART SAFE
========================= */

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
        <div>
            <h4>${i.name}</h4>
            <span>${i.quantity}</span>
        </div>`;
    });
}

/* =========================
   DETAIL SAFE GLOBAL FIX
========================= */

function openAddCartPopup() {

    const p = window.currentProduct;
    if (!p) return;

    selectedProduct = p;

    document.getElementById("addCartPopup").style.display = "flex";

    document.getElementById("popupCartImg").src =
        `images/${p.category}/${p.folder}/main.jpg`;

    document.getElementById("popupCartName").innerText = p.name;

    let html = "";

    const cap = (p.specs || []).find(s =>
        s.toLowerCase().includes("mức cân")
    );

    if (cap) {
        let val = cap.split(":")[1] || "";
        val.split("/").forEach(v => {
            html += `<option>${v.trim()}</option>`;
        });
    }

    document.getElementById("popupCartCapacity").innerHTML = html;
}

/* =========================
   BUY POPUP SAFE
========================= */

function openBuyPopup() {
    const p = window.currentProduct;
    if (!p) return;

    selectedProduct = p;

    document.getElementById("buyPopup").style.display = "flex";
    document.getElementById("buyProductName").value = p.name;
}

/* =========================
   INIT SAFE
========================= */

document.addEventListener("DOMContentLoaded", () => {
    try {
        renderProducts();
        updateCartCount();
    } catch (e) {
        console.error("SCRIPT ERROR:", e);
    }
});