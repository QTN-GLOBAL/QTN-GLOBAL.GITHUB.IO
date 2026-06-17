
/* =========================
   BUY POPUP (FIXED VERSION)
========================= */

function openBuyPopup() {

    if (!window.currentProduct) return;

    const product = window.currentProduct;

    const popup = document.getElementById("buyPopup");
    if (popup) popup.style.display = "flex";

    document.getElementById("buyProductImg").src =
        `images/${product.category}/${product.folder}/main.jpg`;

    document.getElementById("buyProductName").innerText =
        product.name;

    let html = "";

    const temp = document.createElement("div");
    temp.innerHTML = product.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach((row, index) => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            const label = cols[0].innerText + " - " + cols[1].innerText;

            html += `
            <div class="buy-row"
                 data-index="${index}">

                <div class="buy-left">
                    <input type="checkbox" class="buy-check" checked>
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

    document.querySelectorAll("#buyCapacityList input[type='checkbox']")
        .forEach(cb => cb.checked = false);

    document.querySelectorAll("#buyCapacityList input[type='number']")
        .forEach(i => i.value = 1);

    // ✅ FIX I18N (THÊM ĐOẠN NÀY)
    setTimeout(() => {
        applyLanguage(localStorage.getItem("language") || "vi");
    }, 0);
}
/* =========================
   GET ORDER TEXT (FIXED - NO DOM DEPENDENCY)
========================= */

function getOrderText() {

    let text = "THÔNG TIN ĐẶT HÀNG\n\n";

    const name = document.getElementById("customerName")?.value || "";
    const phone = document.getElementById("customerPhone")?.value || "";
    const company = document.getElementById("customerCompany")?.value || "";
    const tax = document.getElementById("customerTax")?.value || "";
    const invoice = document.getElementById("customerInvoice")?.value || "";
    const address = document.getElementById("customerAddress")?.value || "";

    text += "Khách hàng: " + name + "\n";
    text += "SĐT: " + phone + "\n";
    text += "Công ty: " + company + "\n";
    text += "MST: " + tax + "\n";
    text += "Địa chỉ hóa đơn: " + invoice + "\n";
    text += "Địa chỉ giao hàng: " + address + "\n\n";

    const selectedRows = Array.from(
    document.querySelectorAll("#buyCapacityList .buy-row")
).filter(row => {
    const cb = row.querySelector("input[type='checkbox']");
    return cb && cb.checked;
});

selectedRows.forEach(row => {

    const label = row.querySelector(".buy-middle").innerText;
    const qty = row.querySelector("input[type='number']").value;

    text += "- " + label + " | SL: " + qty + "\n";
});
    return text;
}

/* =========================
   VALIDATE CUSTOMER (FIXED SAFE)
========================= */

function validateCustomerForm() {

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

        if (!field) return;

        field.classList.remove("input-error");

        if (!field.value || !field.value.trim()) {

            field.classList.add("input-error");
            valid = false;
        }
    });

    return valid;
}

/* =========================
   SEND ZALO
========================= */

function sendOrderZalo() {

    // Kiểm tra thông tin khách hàng
    if (!validateCustomerForm()) {
        alert(t("pleaseFillCustomerInfo"));
        return;
    }

    // Kiểm tra đã chọn sản phẩm chưa
    const checkedItems =
        document.querySelectorAll(
            "#buyCapacityList .buy-check:checked"
        );

    if (checkedItems.length === 0) {
        alert(t("pleaseSelectProduct"));
        return;
    }

    const text = getOrderText();

    navigator.clipboard.writeText(text).catch(() => {});

    const ok = confirm(
        t("copiedOrderOpenZalo")
    );

    closeBuyPopup();

    if (ok) {
        window.open(
            "https://zalo.me/0383598603",
            "_blank"
        );
    }
}

/* =========================
   SEND MESSENGER
========================= */

function sendOrderMessenger() {

    // Kiểm tra thông tin khách hàng
    if (!validateCustomerForm()) {
        alert(t("pleaseFillCustomerInfo"));
        return;
    }

    // Kiểm tra đã chọn sản phẩm chưa
    const checkedItems =
        document.querySelectorAll(
            "#buyCapacityList .buy-check:checked"
        );

    if (checkedItems.length === 0) {
        alert(t("pleaseSelectProduct"));
        return;
    }

    const text = getOrderText();

    navigator.clipboard.writeText(text).catch(() => {});

    const ok = confirm(
        t("copiedOrderOpenMessenger")
    );

    closeBuyPopup();

    if (ok) {
        window.open(
            "https://m.me/QTNSCALE",
            "_blank"
        );
    }
}

/* =========================
   CLOSE POPUP
========================= */

function closeBuyPopup() {
    const popup = document.getElementById("buyPopup");
    if (popup) popup.style.display = "none";
}