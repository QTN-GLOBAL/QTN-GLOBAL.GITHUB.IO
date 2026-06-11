
/* =========================
   BUY POPUP
========================= */
function openBuyPopup() {

    if (!window.currentProduct) return;

    const product = getTranslatedProduct(window.currentProduct);

    const popup = document.getElementById("buyPopup");
    if (popup) popup.style.display = "flex";

    document.getElementById("buyProductImg").src =
        `images/${product.category}/${product.folder}/main.jpg`;

    document.getElementById("buyProductName").innerText =
        product.name;

    let html = "";

    const temp = document.createElement("div");
    temp.innerHTML = product.specs;

    temp.querySelectorAll("tr").forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            html += `
            <div class="buy-row">
                <div class="buy-left">
                    <input type="checkbox">
                </div>

                <div class="buy-middle">
                    ${cols[0].innerText} - ${cols[1].innerText}
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
/* =========================
   VALIDATE CUSTOMER
========================= */

function validateCustomerForm(){

    const fields = [

        document.getElementById("customerName"),
        document.getElementById("customerPhone"),
        document.getElementById("customerCompany"),
        document.getElementById("customerTax"),
        document.getElementById("customerInvoice"),
        document.getElementById("customerAddress")

    ];

    let valid = true;

    fields.forEach(field => {

        field.classList.remove("input-error");

        if(!field.value.trim()){

            field.classList.add("input-error");

            valid = false;
        }
    });

    if(!valid){

        alert("Vui lòng điền đầy đủ thông tin khách hàng.");

        return false;
    }

    return true;
}
function sendOrderZalo() {
if(!validateCustomerForm()) return;

    const text = getOrderText();

    navigator.clipboard.writeText(text).catch(() => {});

    const ok = confirm("Đã copy đơn hàng.\nBấm OK để mở Zalo.");

    closeBuyPopup();

    if (ok) {
        window.open("https://zalo.me/0383598603", "_blank");
    }
}

function sendOrderMessenger() {
if(!validateCustomerForm()) return;

    const text = getOrderText();

    navigator.clipboard.writeText(text).catch(() => {});

    const ok = confirm("Đã copy đơn hàng.\nBấm OK để mở Messenger.");

    closeBuyPopup();

    if (ok) {
        window.open("https://m.me/QTNSCALE", "_blank");
    }
}

/* =========================
   CLOSE BUY POPUP
========================= */

function closeBuyPopup() {
    document.getElementById("buyPopup").style.display = "none";
}