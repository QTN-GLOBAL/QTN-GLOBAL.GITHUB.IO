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