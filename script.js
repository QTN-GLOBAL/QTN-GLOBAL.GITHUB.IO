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
   RENDER PRODUCTS (INDEX)
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

/* =========================
   FILTER CATEGORY
========================= */

function filterProducts(category) {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
}

/* =========================
   CART OPEN / CLOSE
========================= */

function openCart() {
    document.getElementById("cartModal")?.classList.add("active");
    document.getElementById("cartOverlay")?.style && (document.getElementById("cartOverlay").style.display = "block");
    renderCart();
}

function closeCart() {
    document.getElementById("cartModal")?.classList.remove("active");
    document.getElementById("cartOverlay")?.style && (document.getElementById("cartOverlay").style.display = "none");
}

/* =========================
   ADD TO CART (CORE)
========================= */

function addToCart(id, qty = 1) {
    const p = products.find(x => x.id == id);
    if (!p) return;

    const ex = cart.find(x => x.id == id);

    if (ex) {
        ex.quantity += qty;
    } else {
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

/* =========================
   SAVE CART
========================= */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
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

    body.innerHTML = "";

    cart.forEach(item => {
        body.innerHTML += `
        <div class="cart-item">
            <img src="images/${item.category}/${item.folder}/main.jpg" width="60">
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

/* =========================
   CART QTY
========================= */

function changeCartQty(id, n) {
    const item = cart.find(x => x.id == id);
    if (!item) return;

    item.quantity += n;
    if (item.quantity <= 0) {
        cart = cart.filter(x => x.id != id);
    }

    saveCart();
}

function removeCart(id) {
    cart = cart.filter(x => x.id != id);
    saveCart();
}

/* =========================
   DETAIL PAGE POPUP OPEN
========================= */

function openAddCartPopup() {
    addToCartDetail();
}

function addToCartDetail() {
    if (!window.product) return;

    selectedProduct = window.product;

    const popup = document.getElementById("addCartPopup");
    if (popup) popup.style.display = "flex";

    document.getElementById("popupCartImg").src =
        `images/${selectedProduct.category}/${selectedProduct.folder}/main.jpg`;

    document.getElementById("popupCartName").innerText =
        selectedProduct.name;

    // 👉 LẤY MỨC CÂN NGAY TRONG specs
    let html = "";

    const cap = selectedProduct.specs.find(s =>
        s.toLowerCase().includes("mức cân")
    );

    if (cap) {
        cap.split(":")[1]
            ?.split("/")
            .forEach(v => {
                html += `<option>${v.trim()}</option>`;
            });
    }

    document.getElementById("popupCartCapacity").innerHTML = html;
}

/* =========================
   CONFIRM ADD CART
========================= */

function confirmAddCart() {
    if (!selectedProduct) return;

    cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        folder: selectedProduct.folder,
        quantity: Number(document.getElementById("popupCartQty").value)
    });

    saveCart();
    closeAddCart();

    alert("Đã thêm vào giỏ");
}

function closeAddCart() {
    document.getElementById("addCartPopup").style.display = "none";
}

/* =========================
   BUY POPUP
========================= */

function openBuyPopup() {
    if (!window.product) return;

    selectedProduct = window.product;

    const popup = document.getElementById("buyPopup");
    if (popup) popup.style.display = "flex";

    document.getElementById("buyProductName").value =
        selectedProduct.name;

    let html = "";

    const cap = selectedProduct.specs.find(s =>
        s.toLowerCase().includes("mức cân")
    );

    if (cap) {
        cap.split(":")[1]
            ?.split("/")
            .forEach(v => {
                html += `<option>${v.trim()}</option>`;
            });
    }

    document.getElementById("buyCapacity").innerHTML = html;
}

function closeBuyPopup() {
    document.getElementById("buyPopup").style.display = "none";
}

/* =========================
   QTY
========================= */

function changeQty(type, n) {
    const id = type === "cart" ? "popupCartQty" : "buyQty";
    const input = document.getElementById(id);

    let val = Number(input.value) + n;
    if (val < 1) val = 1;

    input.value = val;
}

/* =========================
   ORDER
========================= */

function buildOrderText() {
    return `
KH: ${document.getElementById("customerName")?.value || ""}
SĐT: ${document.getElementById("customerPhone")?.value || ""}
SP: ${document.getElementById("buyProductName")?.value || ""}
SL: ${document.getElementById("buyQty")?.value || ""}
`;
}

function sendOrderZalo() {
    navigator.clipboard.writeText(buildOrderText());
    window.open("https://zalo.me/0383598603", "_blank");
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
});