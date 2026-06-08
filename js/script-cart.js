/* =========================
   CART UI + RENDER SYSTEM
   (USES CART ENGINE ONLY)
========================= */

/* =========================
   RENDER CART MODAL
========================= */

function renderCart() {

    const body = document.getElementById("cartBody");
    if (!body) return;

    const cart = Cart.get();

    if (cart.length === 0) {
        body.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    let html = "";

    cart.forEach((item, index) => {

        html += `
        <div class="cart-row">

            <div class="cart-left">
                <input type="checkbox" class="cart-check" data-index="${index}">
            </div>

            <div class="cart-middle">

                <img src="images/${item.category}/${item.folder}/main.jpg">

                <div class="cart-info">
                    <div class="cart-name">${item.name}</div>
                    <div class="cart-capacity">${item.spec || ""}</div>
                </div>

            </div>

            <div class="cart-right">

                <button onclick="updateCartQty(${index},-1)">-</button>
                <input value="${item.quantity}" readonly>
                <button onclick="updateCartQty(${index},1)">+</button>
                <button onclick="removeCartItem(${index})">✕</button>

            </div>

        </div>`;
    });

   

    body.innerHTML = html;

    updateCartUI();
}

/* =========================
   UPDATE QTY
========================= */

function updateCartQty(index, value) {

    let cart = Cart.get();

    if (!cart[index]) return;

    cart[index].quantity += value;

    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    Cart.set(cart);

    renderCart();
    renderHeaderCart();
    updateCartUI();
}

/* =========================
   REMOVE ITEM
========================= */

function removeCartItem(index) {

    Cart.remove(index);

    renderCart();
    renderHeaderCart();
    updateCartUI();
}

/* =========================
   HEADER CART
========================= */

function renderHeaderCart() {

    const box = document.getElementById("headerCartBox");
    if (!box) return;

    const cart = Cart.get();

    let html = "";

    cart.forEach((item, index) => {

        html += `
        <div class="header-cart-row">

            <img src="images/${item.category}/${item.folder}/main.jpg">

            <div class="info">
                <b>${item.name}</b><br>
                <small>${item.spec || ""}</small>
            </div>

            <div class="qty">
                <button onclick="updateCartQty(${index},-1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQty(${index},1)">+</button>
            </div>

            <button onclick="removeCartItem(${index})">X</button>

        </div>`;
    });

    html += `
    <button class="buy-now-btn" onclick="handleBuyNow()">
        MUA NGAY
    </button>`;

    box.innerHTML = html;
}

/* =========================
   CART COUNT UI
========================= */

function updateCartUI() {

    const el = document.getElementById("cartCount");
    if (!el) return;

    const cart = Cart.get();

    let total = 0;
    cart.forEach(i => total += i.quantity);

    el.innerText = total;
}

/* =========================
   OPEN / CLOSE CART
========================= */

function openCart() {

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (!modal) return;

    modal.classList.add("active");
    if (overlay) overlay.classList.add("active");

    renderCart();
}

function closeCart() {

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (modal) modal.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
}

/* =========================
   BUY NOW FROM CART
========================= */

function handleBuyNow() {

    const cart = Cart.get();

    const selectedItems = [];

    document
    .querySelectorAll(".cart-check")
    .forEach((cb,index)=>{

        if(cb.checked && cart[index]){

            selectedItems.push(cart[index]);
        }
    });

    if(selectedItems.length === 0){

        alert("Vui lòng chọn sản phẩm cần mua");

        return;
    }

    renderBuyNowForm(selectedItems);
}
/* =========================
   BUY FORM
========================= */

function renderBuyNowForm(items) {

    const popup =
        document.getElementById("buyPopup");

    if (!popup) return;

    popup.style.display = "flex";

    const box =
        document.getElementById("buyCapacityList");

    if (!box) return;

    let html = "";

    items.forEach(item => {

        html += `

        <div class="buy-item">

            <img
            src="images/${item.category}/${item.folder}/main.jpg"
            style="
            width:60px;
            height:60px;
            object-fit:contain;
            display:block;
            margin:auto;
            ">

            <h4 style="text-align:center">
                ${item.name}
            </h4>

            <div style="text-align:center">
                ${item.spec || ""}
            </div>

            <div style="text-align:center">
                SL: ${item.quantity}
            </div>

            <hr>

        </div>
        `;
    });

    box.innerHTML = html;
}
function getOrderText() {

    let text = "THÔNG TIN ĐẶT HÀNG\n\n";

    text += "Khách hàng: " + document.getElementById("customerName").value + "\n";
    text += "SĐT: " + document.getElementById("customerPhone").value + "\n";
    text += "Công ty: " + document.getElementById("customerCompany").value + "\n";
    text += "MST: " + document.getElementById("customerTax").value + "\n";
    text += "Địa chỉ hóa đơn: " + document.getElementById("customerInvoice").value + "\n";
    text += "Địa chỉ giao hàng: " + document.getElementById("customerAddress").value + "\n\n";

    const items = document.querySelectorAll("#buyCapacityList .buy-item");

    items.forEach(item => {

        const name = item.querySelector("h4")?.innerText || "";
        const divs = item.querySelectorAll("div");

        const spec = divs[0]?.innerText || "";
        const qty  = divs[1]?.innerText || "";

        text += "- " + name + " | " + spec + " | " + qty + "\n";
    });

    return text;
}
function sendOrderZalo() {

    const text = getOrderText();

    navigator.clipboard.writeText(text).catch(() => {});

    alert("Đã copy đơn hàng. Nhấn OK để mở Zalo.");

    const selected = getSelectedCartItems();

    removeSelectedFromCart(selected);

    closeBuyPopup();

    window.open("https://zalo.me/0383598603", "_blank");
}
function sendOrderMessenger() {

    const text = getOrderText();

    navigator.clipboard.writeText(text).catch(() => {});

    alert("Đã copy đơn hàng. Nhấn OK để mở Messenger.");

    const selected = getSelectedCartItems();

    removeSelectedFromCart(selected);

    closeBuyPopup();

    window.open("https://m.me/QTNSCALE", "_blank");
}
function closeBuyPopup() {
    const popup = document.getElementById("buyPopup");
    if (popup) popup.style.display = "none";
}
function getSelectedCartItems() {

    const cart = Cart.get();
    const selected = [];

    document.querySelectorAll(".cart-check").forEach((cb, index) => {

        if (cb.checked && cart[index]) {
            selected.push(index);
        }
    });

    return selected;
}
function removeSelectedFromCart(indexes) {

    let cart = Cart.get();

    // xoá từ cuối lên để không lệch index
    indexes.sort((a, b) => b - a);

    indexes.forEach(i => {
        cart.splice(i, 1);
    });

    Cart.set(cart);

    renderCart();
    renderHeaderCart();
    updateCartUI();
}