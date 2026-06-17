/* =========================
   CART UI + RENDER SYSTEM
   CLEAN VERSION (FIX SELECT + BUY NOW + DELETE)
========================= */

/* =========================
   RENDER CART
========================= */

function renderCart() {

    const body = document.getElementById("cartBody");
    if (!body) return;

    const cart = Cart.get();

    if (!cart.length) {
       body.innerHTML = `<p>${t("cartEmpty")}</p>`;
        updateCartUI();
        return;
    }

    body.innerHTML = cart.map(item => {

        return `
        <div class="cart-row">

            <div class="cart-left">
                <input type="checkbox"
                       class="cart-check"
                       data-id="${item.id}"
                       ${item.selected ? "checked" : ""}>
            </div>

            <div class="cart-middle">

                <img src="images/${item.category}/${item.folder}/main.jpg">

                <div class="cart-info">
                    <div class="cart-name">${item.name}</div>
                    <div class="cart-capacity">${item.spec || ""}</div>
                </div>

            </div>

            <div class="cart-right">

                <button onclick="updateCartQty('${item.id}', -1)">-</button>
                <input value="${item.quantity}" readonly>
                <button onclick="updateCartQty('${item.id}', 1)">+</button>
                <button onclick="removeCartItem('${item.id}')">✕</button>

            </div>

        </div>
        `;
    }).join("");

    updateCartUI();

    syncCheckboxState();
}

/* =========================
   SYNC CHECKBOX STATE
========================= */

function syncCheckboxState() {

    const cart = Cart.get();

    document.querySelectorAll(".cart-check").forEach(cb => {

        const id = cb.getAttribute("data-id");

        const item = cart.find(i => String(i.id) === String(id));

        cb.checked = item ? !!item.selected : false;
    });
}

/* =========================
   SELECT ITEM (EVENT DELEGATION)
========================= */

document.addEventListener("change", function (e) {

    if (!e.target.classList.contains("cart-check")) return;

    const id = e.target.getAttribute("data-id");
    const checked = e.target.checked;

    let cart = Cart.get();

    cart = cart.map(item => {
        if (String(item.id) === String(id)) {
            return { ...item, selected: checked };
        }
        return item;
    });

    Cart.set(cart);
});

/* =========================
   UPDATE QTY
========================= */

function updateCartQty(id, value) {

    let cart = Cart.get();

    const item = cart.find(i => String(i.id) === String(id));
    if (!item) return;

    item.quantity += value;

    if (item.quantity < 1) item.quantity = 1;

    Cart.set(cart);

    renderCart();
    renderHeaderCart();
}

/* =========================
   REMOVE ITEM
========================= */

function removeCartItem(id) {

    let cart = Cart.get();

    cart = cart.filter(i => String(i.id) !== String(id));

    Cart.set(cart);

    renderCart();
    renderHeaderCart();
}

/* =========================
   HEADER CART
========================= */

function renderHeaderCart() {

    const box = document.getElementById("headerCartBody");
    if (!box) return;

    const cart = Cart.get();

    box.innerHTML = cart.map(item => {

        return `
        <div class="header-cart-row">

            <img src="images/${item.category}/${item.folder}/main.jpg">

            <div class="info">
                <b>${item.name}</b><br>
                <small>${item.spec || ""}</small>
            </div>

            <div class="qty">
                <button onclick="updateCartQty('${item.id}',-1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQty('${item.id}',1)">+</button>
            </div>

            <button onclick="removeCartItem('${item.id}')">X</button>

        </div>
        `;
    }).join("");
}

/* =========================
   CART COUNT UI
========================= */

function updateCartUI() {

    const el = document.getElementById("cartCount");
    if (!el) return;

    const cart = Cart.get();

    el.innerText = cart.reduce((sum, i) => sum + i.quantity, 0);
}

/* =========================
   OPEN / CLOSE CART
========================= */

function openCart() {

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (modal) modal.classList.add("active");
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
   BUY NOW
========================= */

function handleBuyNow() {

    const selectedItems = Cart.get().filter(i => i.selected === true);

    if (!selectedItems.length) {
        alert("Vui lòng chọn sản phẩm cần mua");
        return;
    }

    renderBuyNowForm(selectedItems);
}

/* =========================
   BUY FORM
========================= */

function renderBuyNowForm(items) {

    const popup = document.getElementById("buyPopup");
    const box = document.getElementById("buyCapacityList");

    if (!popup || !box) return;

    popup.style.display = "flex";

    box.innerHTML = items.map(item => `
        <div class="buy-item"
     data-id="${item.id}">

            <img src="images/${item.category}/${item.folder}/main.jpg"
                 style="width:60px;height:60px;object-fit:contain;display:block;margin:auto;">

            <h4 style="text-align:center">${item.name}</h4>

            <div style="text-align:center">${item.spec || ""}</div>

            <div style="text-align:center">SL: ${item.quantity}</div>

            <hr>

        </div>
    `).join("");
}

/* =========================
   CLOSE BUY POPUP
========================= */

function closeBuyPopup() {
    const popup = document.getElementById("buyPopup");
    if (popup) popup.style.display = "none";
}

/* =========================
   SEND ORDER HELPERS (GIỮ NGUYÊN LOGIC CỦA BẠN)
========================= */

function getSelectedIds() {
    return Cart.get()
        .filter(i => i.selected)
        .map(i => String(i.id));
}

function removeSelectedFromCart(ids) {

    let cart = Cart.get();

    cart = cart.filter(i => !ids.includes(String(i.id)));

    Cart.set(cart);

    renderCart();
    renderHeaderCart();
    updateCartUI();
}
function getBuyPopupIds() {

    return Array.from(
        document.querySelectorAll("#buyCapacityList .buy-item")
    ).map(item => String(item.dataset.id));

}
function sendCartOrderZalo() {

    if (!validateCustomerForm()) return;

    const text = getOrderText();

    navigator.clipboard.writeText(text).catch(() => {});

    const selectedIds = getBuyPopupIds();

    removeSelectedFromCart(selectedIds);

    closeBuyPopup();

    window.open("https://zalo.me/0383598603", "_blank");
}

function sendCartOrderMessenger() {

    if (!validateCustomerForm()) return;

    const text = getOrderText();

    navigator.clipboard.writeText(text).catch(() => {});

    const selectedIds = getBuyPopupIds();
    removeSelectedFromCart(selectedIds);

    closeBuyPopup();

    window.open("https://m.me/QTNSCALE", "_blank");
}