
/* =========================
   ADD CART POPUP
========================= */

function openAddCartPopup() {

    if (!window.currentProduct) return;

    const product = getTranslatedProduct(window.currentProduct);

    window.selectedProduct = product;

    const popup = document.getElementById("addCartPopup");
    if (popup) popup.style.display = "flex";

    document.getElementById("popupCartName").innerText = product.name;

    document.getElementById("popupCartImg").src =
        `images/${product.category}/${product.folder}/main.jpg`;

    let html = "";

    const temp = document.createElement("div");
    temp.innerHTML = product.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            const label = cols[0].innerText + " - " + cols[1].innerText;

            html += `
            <div class="addcart-row">

                <div class="addcart-left">
                    <input type="checkbox" class="detail-check">
                </div>

                <div class="addcart-middle">
                    ${label}
                </div>

                <div class="addcart-right">
                    <button onclick="changeQty(this,-1)">-</button>
                    <input type="number" value="1">
                    <button onclick="changeQty(this,1)">+</button>
                </div>

            </div>`;
        }
    });

    document.getElementById("cartSpecList").innerHTML = html;

    if (window.reApplyI18n) window.reApplyI18n();
}

/* =========================
   ADD TO CART
========================= */

function addSelectedToCart() {

    if (!window.currentProduct) return;

    const product = window.currentProduct;
    const popup = document.getElementById("addCartPopup");

    const rows = popup.querySelectorAll(".addcart-row");

    let added = false;

    rows.forEach(row => {

        const check = row.querySelector(".detail-check");
        if (!check || !check.checked) return;

       const label = row.querySelector(".addcart-middle").innerText;

        const qty = parseInt(
            row.querySelector("input[type='number']").value
        ) || 1;

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
   CLOSE ADD CART
========================= */

function closeAddCart() {
    document.getElementById("addCartPopup").style.display = "none";
}

function confirmAddCart() {
    addSelectedToCart();
}

/* =========================
   QTY
========================= */

function changeQty(btn, delta) {

    const input = btn.parentElement.querySelector("input");

    let val = parseInt(input.value || 1);

    val += delta;

    if (val < 1) val = 1;

    input.value = val;
}
