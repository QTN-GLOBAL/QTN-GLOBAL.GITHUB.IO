/* =========================
   GIỎ HÀNG
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (!Array.isArray(cart)) {
    cart = [];
}

let selectedProduct = null;

/* =========================
   PRODUCTS
========================= */

const getProducts = () => window.products || [];

/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    let total = 0;

    cart.forEach(item => {
        total += item.quantity || 0;
    });

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = total;
    }
}

/* =========================
   PRODUCTS HOME
========================= */

function renderProducts(productList = getProducts()) {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    productGrid.innerHTML = "";

    productList.forEach(product => {

        productGrid.innerHTML += `
        <div class="product-card">

            <img src="images/${product.category}/${product.folder}/main.jpg">

            <div class="product-info">

                <h3>${product.name}</h3>

                <a class="detail-btn"
                   href="chitiet.html?id=${product.id}">
                   Chi tiết
                </a>

            </div>

        </div>
        `;
    });
}

/* =========================
   FILTER
========================= */

function filterProducts(category) {

    const filtered =
        getProducts().filter(p => p.category === category);

    renderProducts(filtered);
}

/* =========================
   OPEN CART
========================= */

function openCart() {

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (!modal || !overlay) return; // FIX

    modal.classList.add("active");
    overlay.style.display = "block";

    renderCart();
}

function closeCart() {

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (modal) modal.classList.remove("active");

    if (overlay) {
        overlay.style.display = "none";
    }
}

/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    renderCart();
}

/* =========================
   ADD TO CART
========================= */

function addToCart(id, qty = 1) {

    const product =
        getProducts().find(p => p.id == id);

    if (!product) return;

    const existing =
        cart.find(i => i.id == id);

    if (existing) {

        existing.quantity += qty;

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

    const cartBody = document.getElementById("cartBody");

    if (!cartBody) return;

    if (cart.length === 0) {

        cartBody.innerHTML = `
        <p>Giỏ hàng trống</p>
        `;

        return;
    }

    cartBody.innerHTML = "";

    cart.forEach(item => {

        cartBody.innerHTML += `

        <div class="cart-item">

            <img
            src="images/${item.category}/${item.folder}/main.jpg"
            width="70">

            <h4>${item.name}</h4>

            <div class="qty">

                <button onclick="decreaseQty(${item.id})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQty(${item.id})">+</button>

            </div>

            <div class="cart-actions">

                <label class="cart-check">

                    <input
                    type="checkbox"
                    class="cart-buy-check"
                    value="${item.id}">

                    Chọn mua

                </label>

                <button onclick="removeCart(${item.id})">
                    Xóa
                </button>

            </div>

        </div>
        `;
    });

    cartBody.innerHTML += `

    <div class="cart-footer">

        <button
        onclick="buySelectedCart()"
        class="btn-buy">

            MUA NGAY

        </button>

    </div>
    `;
}

/* =========================
   UPDATE QTY
========================= */

function increaseQty(id) {

    const item =
        cart.find(i => i.id == id);

    if (item) {
        item.quantity++;
    }

    saveCart();
}

function decreaseQty(id) {

    const item =
        cart.find(i => i.id == id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart =
            cart.filter(i => i.id != id);
    }

    saveCart();
}

function removeCart(id) {

    cart =
        cart.filter(i => i.id != id);

    saveCart();
}

/* =========================
   BUY SELECTED CART
========================= */

function buySelectedCart(){

    const checked =
        document.querySelectorAll(".cart-buy-check:checked");

    if(checked.length === 0){
        alert("Vui lòng chọn sản phẩm");
        return;
    }

    let html = "";
    let totalQty = 0;
    let productNames = [];

    checked.forEach(check => {

        const id = Number(check.value);

        const item = cart.find(i => i.id == id);

        const product =
            getProducts().find(p => p.id == id);

        if(item && product){

            totalQty += item.quantity;

            productNames.push(product.name);

            const temp = document.createElement("div");

            temp.innerHTML = product.specs;

            const rows = temp.querySelectorAll("tr");

            rows.forEach(row => {

                const cols = row.querySelectorAll("td");

                if(cols.length >= 2){

                    html += `
<option>
${product.name} - ${cols[0].innerText.trim()} - ${cols[1].innerText.trim()}
</option>
`;
                }
            });
        }
    });

    const popup = document.getElementById("buyPopup");

    if(!popup) return;

    popup.style.display = "flex";
    document.getElementById("buyProductName").value =
        productNames.join(", ");

    document.getElementById("buyCapacity").innerHTML = html;

    document.getElementById("buyQty").value = totalQty;
}
/* =========================
   ADD CART POPUP
========================= */

function openAddCartPopup() {

    addToCartDetail();
}

function addToCartDetail() {

    if (!window.currentProduct) return;

    selectedProduct = window.currentProduct;

    const popup =
        document.getElementById("addCartPopup");

    if (popup) {
        popup.style.display = "flex";
    }

    document.getElementById("popupCartImg").src =
        `images/${selectedProduct.category}/${selectedProduct.folder}/main.jpg`;

    document.getElementById("popupCartName").innerText =
        selectedProduct.name;

    let html = "";

    const temp = document.createElement("div");

    temp.innerHTML = selectedProduct.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            html += `
            <option>
                ${cols[0].innerText.trim()}
                -
                ${cols[1].innerText.trim()}
            </option>
            `;
        }
    });

    document.getElementById(
        "popupCartCapacity"
    ).innerHTML = html;
}

function closeAddCart() {

    const popup =
        document.getElementById("addCartPopup");

    if (popup) {
        popup.style.display = "none";
    }
}

function confirmAddCart() {

    if (!selectedProduct) return;

    const qty = Number(
        document.getElementById("popupCartQty").value
    );

    cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        folder: selectedProduct.folder,
        quantity: qty
    });

    saveCart();

    document.getElementById("popupCartQty").value = 1;

    closeAddCart();

    alert("Đã thêm vào giỏ");
}

/* =========================
   BUY POPUP
========================= */

function buyNow() {

    openBuyPopup();
}

function openBuyPopup() {

    if (!window.currentProduct) return;

    selectedProduct = window.currentProduct;

    document.getElementById("buyPopup").style.display = "flex";

    document.getElementById("buyProductName").value =
        selectedProduct.name;

    let html = "";

    const temp = document.createElement("div");

    temp.innerHTML = selectedProduct.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            html += `
            <option>
                ${cols[0].innerText.trim()}
                -
                ${cols[1].innerText.trim()}
            </option>
            `;
        }
    });

    document.getElementById("buyCapacity").innerHTML = html;
}

function closeBuyPopup() {

    const popup =
        document.getElementById("buyPopup");

    if (popup) {
        popup.style.display = "none";
    }
}

/* =========================
   CHANGE QTY
========================= */

function changeQty(type, value) {

    let input;

    if (type === "cart") {

        input =
            document.getElementById("popupCartQty");

    } else {

        input =
            document.getElementById("buyQty");
    }

    if (!input) return;

    let qty = Number(input.value);

    qty += value;

    if (qty < 1) {
        qty = 1;
    }

    input.value = qty;
}

/* =========================
   ORDER TEXT
========================= */

function buildOrderText() {

    return `
===== ĐƠN ĐẶT HÀNG =====

Tên khách hàng:
${document.getElementById("customerName")?.value || ""}

Số điện thoại:
${document.getElementById("customerPhone")?.value || ""}

Tên công ty:
${document.getElementById("customerCompany")?.value || ""}

Mã số thuế:
${document.getElementById("customerTax")?.value || ""}

Địa chỉ xuất hóa đơn:
${document.getElementById("customerInvoice")?.value || ""}

Địa chỉ giao hàng:
${document.getElementById("customerAddress")?.value || ""}

Sản phẩm:
${document.getElementById("buyProductName")?.value || ""}

Chi tiết:
${document.getElementById("buyCapacity")?.innerText || ""}

Số lượng:
${document.getElementById("buyQty")?.value || ""}

========================
`;
}

/* =========================
   SEND ORDER
========================= */

function sendOrderZalo() {

    navigator.clipboard.writeText(
        buildOrderText()
    );

    window.open(
        "https://zalo.me/0383598603",
        "_blank"
    );

    closeBuyPopup();
}

function sendOrderMessenger() {

    navigator.clipboard.writeText(
        buildOrderText()
    );

    window.open(
        "https://m.me/QTNSCALE",
        "_blank"
    );

    closeBuyPopup();
}

/* =========================
   INIT
========================= */

document.addEventListener("click", function(e) {

    if (e.target.id === "btnAddCart") {

        confirmAddCart();
    }
});

document.addEventListener("DOMContentLoaded", () => {

    renderProducts();

    updateCartCount();
});
