
/* =========================
   DETAIL PAGE (ISOLATED SYSTEM)
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
            <div class="detail-row" data-value="${label}">

                <div class="detail-left">
                    <input type="checkbox" class="detail-check">
                </div>

                <div class="detail-middle">
                    ${label}
                </div>

                <div class="detail-right">
                    <button onclick="changeCartQty(this,-1)">-</button>
                    <input type="number" value="1">
                    <button onclick="changeCartQty(this,1)">+</button>
                </div>

            </div>`;
        }
    });

    if (html === "") {
        html = `
        <div class="detail-row" data-value="">

            <div class="detail-left">
                <input type="checkbox" class="detail-check" checked>
            </div>

            <div class="detail-middle">
                ${window.selectedProduct.name}
            </div>

            <div class="detail-right">
                <button onclick="changeCartQty(this,-1)">-</button>
                <input type="number" value="1">
                <button onclick="changeCartQty(this,1)">+</button>
            </div>

        </div>`;
    }

    document.getElementById("cartSpecList").innerHTML = html;
}

/* =========================
   BUY POPUP (DETAIL ONLY)
========================= */

function openBuyPopup(){

    const popup = document.getElementById("buyPopup");
    if(!popup || !window.currentProduct) return;

    popup.style.display = "flex";

    const img = document.getElementById("buyProductImg");
    if(img){
        img.src = `images/${window.currentProduct.category}/${window.currentProduct.folder}/main.jpg`;
    }

    const name = document.getElementById("buyProductName");
    if(name){
        name.innerText = window.currentProduct.name;
    }

    let html = "";

    const temp = document.createElement("div");
    temp.innerHTML = window.currentProduct.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if(cols.length >= 2){

            const label = cols[0].innerText + " - " + cols[1].innerText;

            html += `
            <div class="buy-row">

                <div class="buy-left">
                    <input type="checkbox">
                </div>

                <div class="buy-middle">
                    ${label}
                </div>

                <div class="buy-right">
                    <button onclick="changeCartQty(this,-1)">-</button>
                    <input type="number" value="1">
                    <button onclick="changeCartQty(this,1)">+</button>
                </div>

            </div>`;
        }
    });

    document.getElementById("buyCapacityList").innerHTML = html;
}

/* =========================
   ORDER TEXT
========================= */

function getOrderText(){

    let text = "";

    text += "THÔNG TIN ĐẶT HÀNG\n\n";

    text += "Khách hàng: " + document.getElementById("customerName").value + "\n";
    text += "SĐT: " + document.getElementById("customerPhone").value + "\n";
    text += "Công ty: " + document.getElementById("customerCompany").value + "\n";
    text += "MST: " + document.getElementById("customerTax").value + "\n";
    text += "Địa chỉ hóa đơn: " + document.getElementById("customerInvoice").value + "\n";
    text += "Địa chỉ giao hàng: " + document.getElementById("customerAddress").value + "\n\n";

    const rows = document.querySelectorAll("#buyCapacityList .buy-row");

    rows.forEach(row => {

        const check = row.querySelector("input[type='checkbox']");
        if(!check.checked) return;

        const label = row.querySelector(".buy-middle").innerText;
        const qty = row.querySelector("input[type='number']").value;

        text += "- " + label + " | SL: " + qty + "\n";
    });

    return text;
}

/* =========================
   SEND ZALO / MESSENGER
========================= */

function sendOrderZalo(){

    const text = getOrderText();

    navigator.clipboard.writeText(text);

    closeBuyPopup();

    window.open("https://zalo.me/0383598603", "_blank");

    alert("Đã copy đơn hàng");
}

function sendOrderMessenger(){

    const text = getOrderText();

    navigator.clipboard.writeText(text);

    closeBuyPopup();

    window.open("https://m.me/QTNSCALE", "_blank");

    alert("Đã copy đơn hàng");
}