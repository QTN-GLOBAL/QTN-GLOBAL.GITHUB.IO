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

    html += `
    <div class="cart-bottom">
        <button class="buy-now-btn" onclick="handleBuyNow()">
            MUA NGAY
        </button>
    </div>`;

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

    const rows = document.querySelectorAll("#cartBody .cart-row");

    rows.forEach((row, index) => {

        const cb = row.querySelector(".cart-check");

        if (cb && cb.checked && cart[index]) {
            selectedItems.push(cart[index]);
        }
    });

    if (selectedItems.length === 0) {
        alert("Vui lòng chọn sản phẩm cần mua");
        return;
    }

    renderBuyNowForm(selectedItems);
}

/* =========================
   BUY FORM
========================= */

function renderBuyNowForm(items) {

    const box = document.getElementById("buyProductList");

    if (!box) return;

    box.innerHTML = items.map(item => `
        <div class="buy-item">
            <h4>${item.name}</h4>
            <div>${item.spec || ""}</div>
            <div>SL: ${item.quantity}</div>
        </div>
    `).join("");

    document.getElementById("buyNowModal").style.display = "block";
}