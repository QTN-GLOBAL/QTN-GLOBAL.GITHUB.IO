/* =========================
   ADD CART POPUP (FIXED VERSION)
========================= */

function openAddCartPopup() {

    if (!window.currentProduct) return;

    const product = window.currentProduct;
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

    rows.forEach((row, index) => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            const label = cols[0].innerText + " - " + cols[1].innerText;

            html += `
            <div class="addcart-row"
                 data-index="${index}">

                <div class="addcart-left">
                    <input type="checkbox" class="detail-check" checked>
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
}

/* =========================
   ADD TO CART (FIXED)
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

        // 🔥 FIX QUAN TRỌNG: luôn có id
        Cart.add({
            id: Date.now() + Math.random(), // unique id
            name: product.name,
            category: product.category,
            folder: product.folder,
            spec: label,
            quantity: qty,
            selected: false
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
    if (typeof renderHeaderCart === "function") renderHeaderCart();
}

/* =========================
   CLOSE POPUP
========================= */

function closeAddCart() {
    const popup = document.getElementById("addCartPopup");
    if (popup) popup.style.display = "none";
}

function confirmAddCart() {
    addSelectedToCart();
}

/* =========================
   QTY CHANGE
========================= */

function changeQty(btn, delta) {

    const input = btn.parentElement.querySelector("input");

    let val = parseInt(input.value || 1);

    val += delta;

    if (val < 1) val = 1;

    input.value = val;
}