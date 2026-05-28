let selectedProduct = null;
/* =========================
   DETAIL PAGE
========================= */

function openAddCartPopup() {

    if (!window.currentProduct) return;

    selectedProduct = window.currentProduct;
window.selectedProduct = selectedProduct;

    const popup = document.getElementById("addCartPopup");
    if (popup) popup.style.display = "flex";

    document.getElementById("popupCartName").innerText =
        selectedProduct.name;

    setTimeout(() => {

        const imgEl = document.getElementById("popupCartImg");

        if (imgEl && selectedProduct) {
            imgEl.src = `images/${selectedProduct.category}/${selectedProduct.folder}/main.jpg`;
        }

    }, 0);

    let html = "";

    const temp = document.createElement("div");
    temp.innerHTML = selectedProduct.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            const label = cols[0].innerText + " - " + cols[1].innerText;

            html += `
            <div class="cart-row" data-value="${label}">
                <div class="cart-left">
                    <input type="checkbox" class="cart-check">
                </div>

                <div class="cart-middle">${label}</div>

                <div class="cart-right">
                    <button onclick="changeCartQty(this,-1)">-</button>
                    <input type="number" value="1">
                    <button onclick="changeCartQty(this,1)">+</button>
                </div>
            </div>`;
        }
    });

    if (html === "") {
        html = `
        <div class="cart-row" data-value="">
            <div class="cart-left">
                <input type="checkbox" class="cart-check" checked>
            </div>

            <div class="cart-middle">${selectedProduct.name}</div>

            <div class="cart-right">
                <button onclick="changeCartQty(this,-1)">-</button>
                <input type="number" value="1">
                <button onclick="changeCartQty(this,1)">+</button>
            </div>
        </div>`;
    }

    document.getElementById("cartSpecList").innerHTML = html;
}
function confirmAddCart(){

    const rows = document.querySelectorAll("#cartSpecList .cart-row");

    rows.forEach(row => {

        const check = row.querySelector(".cart-check");
        const qty = row.querySelector("input[type='number']");
        const label = row.getAttribute("data-value") || "";

        if(check && check.checked){

            cart.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                category: selectedProduct.category,
                folder: selectedProduct.folder,
                capacity: label,
                quantity: Number(qty.value)
            });
        }
    });

    saveCart();

    renderCart();        // 🔥 bắt buộc
    renderHeaderCart();  // 🔥 bắt buộc
    updateCartUI();      // 🔥 bắt buộc

    closeAddCart();
}