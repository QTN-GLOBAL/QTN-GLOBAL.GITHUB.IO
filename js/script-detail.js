
/* =========================
   DETAIL PAGE
========================= */

function openAddCartPopup() {

    if (!window.currentProduct) return;

    window.selectedProduct = window.currentProduct;

    const popup = document.getElementById("addCartPopup");
    if (popup) popup.style.display = "flex";

    document.getElementById("popupCartName").innerText =
        window.selectedProduct.name;

    const imgEl = document.getElementById("popupCartImg");
    if (imgEl) {
        imgEl.src = `images/${window.selectedProduct.category}/${window.selectedProduct.folder}/main.jpg`;
    }

    let html = "";

    const temp = document.createElement("div");
    temp.innerHTML = window.selectedProduct.specs;

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

            <div class="cart-middle">${window.selectedProduct.name}</div>

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
                id: window.selectedProduct.id,
                name: window.selectedProduct.name,
                category: window.selectedProduct.category,
                folder: window.selectedProduct.folder,
                capacity: label,
                quantity: Number(qty.value)
            });
        }
    });

    saveCart();

    renderCart();
    renderHeaderCart();
    updateCartUI();

    closeAddCart();

    alert("Đã thêm vào giỏ");
}