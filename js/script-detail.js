/* =========================
   DETAIL PAGE (CLEAN SYSTEM)
   USES CART ENGINE ONLY
========================= */

/* =========================
   OPEN ADD CART POPUP
========================= */

function openAddCartPopup() {

    if (!window.currentProduct) return;

    const product = window.currentProduct;

    window.selectedProduct = product;

    const popup = document.getElementById("addCartPopup");
    if (popup) popup.style.display = "flex";

    const nameEl = document.getElementById("popupCartName");
    if (nameEl) nameEl.innerText = product.name;

    const imgEl = document.getElementById("popupCartImg");
    if (imgEl) {
        imgEl.src = `images/${product.category}/${product.folder}/main.jpg`;
    }

    let html = "";

    const temp = document.createElement("div");
    temp.innerHTML = product.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            const label = cols[0].innerText + " - " + cols[1].innerText;

            html += `
            <div class="detail-row" data-value="${label}">

                <div class="detail-left">
                    <input type="checkbox" class="detail-check">
                </div>

                <div class="detail-middle">
                    ${label}
                </div>

                <div class="detail-right">
                    <button onclick="changeQty(this,-1)">-</button>
                    <input type="number" value="1">
                    <button onclick="changeQty(this,1)">+</button>
                </div>

            </div>`;
        }
    });

    if (html === "") {

        html = `
        <div class="detail-row" data-value="${product.name}">

            <div class="detail-left">
                <input type="checkbox" class="detail-check" checked>
            </div>

            <div class="detail-middle">
                ${product.name}
            </div>

            <div class="detail-right">
                <button onclick="changeQty(this,-1)">-</button>
                <input type="number" value="1">
                <button onclick="changeQty(this,1)">+</button>
            </div>

        </div>`;
    }

    document.getElementById("cartSpecList").innerHTML = html;
}

/* =========================
   ADD SELECTED TO CART
========================= */

function addSelectedToCart() {

    if (!window.currentProduct) return;

    const product = window.currentProduct;

    const popup = document.getElementById("addCartPopup");
    const rows = popup.querySelectorAll(".detail-row");

    let added = false;

    rows.forEach(row => {

        const check = row.querySelector(".detail-check");
        if (!check || !check.checked) return;

        const label = row.querySelector(".detail-middle").innerText;
        const qty = parseInt(row.querySelector("input").value || 1);

        Cart.add({
            name: product.name,
            category: product.category,
            folder: product.folder,
            spec: label,
            quantity: qty
        });

        added = true;
    });

    if (!added) {
        alert("Vui lòng chọn sản phẩm");
        return;
    }

    popup.style.display = "none";

    alert("Đã thêm vào giỏ");

    if (typeof renderCart === "function") renderCart();
    if (typeof updateCartUI === "function") updateCartUI();
}

/* =========================
   BUY POPUP
========================= */

function openBuyPopup() {

    if (!window.currentProduct) return;

    const product = window.currentProduct;

    const popup = document.getElementById("buyPopup");
    if (popup) popup.style.display = "flex";

    const img = document.getElementById("buyProductImg");
    if (img) {
        img.src = `images/${product.category}/${product.folder}/main.jpg`;
    }

    const name = document.getElementById("buyProductName");
    if (name) {
        name.innerText = product.name;
    }

    let html = "";

    const temp = document.createElement("div");
    temp.innerHTML = product.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            const label = cols[0].innerText + " - " + cols[1].innerText;

            html += `
            <div class="buy-row">

                <div class="buy-left">
                    <input type="checkbox" checked>
                </div>

                <div class="buy-middle">
                    ${label}
                </div>

                <div class="buy-right">
                    <button onclick="changeQty(this,-1)">-</button>
                    <input type="number" value="1">
                    <button onclick="changeQty(this,1)">+</button>
                </div>

            </div>`;
        }
    });

    document.getElementById("buyCapacityList").innerHTML = html;

    // auto check all
    document.querySelectorAll("#buyCapacityList input[type='checkbox']")
        .forEach(cb => cb.checked = true);
}

/* =========================
   CHANGE QTY (DETAIL)
========================= */

function changeQty(btn, delta) {

    const input = btn.parentElement.querySelector("input");

    let val = parseInt(input.value || 1);

    val += delta;

    if (val < 1) val = 1;

    input.value = val;
}

/* =========================
   ORDER TEXT
========================= */

function getOrderText() {

    let text = "THÔNG TIN ĐẶT HÀNG\n\n";

    text += "Khách hàng: " + document.getElementById("customerName").value + "\n";
    text += "SĐT: " + document.getElementById("customerPhone").value + "\n";
    text += "Công ty: " + document.getElementById("customerCompany").value + "\n";
    text += "MST: " + document.getElementById("customerTax").value + "\n";
    text += "Địa chỉ hóa đơn: " + document.getElementById("customerInvoice").value + "\n";
    text += "Địa chỉ giao hàng: " + document.getElementById("customerAddress").value + "\n\n";

    const rows = document.querySelectorAll("#buyCapacityList .buy-row");

    rows.forEach(row => {

        const check = row.querySelector("input[type='checkbox']");
        if (!check.checked) return;

        const label = row.querySelector(".buy-middle").innerText;
        const qty = row.querySelector("input[type='number']").value;

        text += "- " + label + " | SL: " + qty + "\n";
    });

    return text;
}

/* =========================
   SEND ZALO / MESSENGER
========================= */

function sendOrderZalo() {

    const text = getOrderText();

    navigator.clipboard.writeText(text);

    closeBuyPopup();

    window.open("https://zalo.me/0383598603", "_blank");

    alert("Đã copy đơn hàng");
}

function sendOrderMessenger() {

    const text = getOrderText();

    navigator.clipboard.writeText(text);

    closeBuyPopup();

    window.open("https://m.me/QTNSCALE", "_blank");

    alert("Đã copy đơn hàng");
}