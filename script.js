/* =========================
   GIỎ HÀNG
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function getExcellImages() {

    let images = [];

    window.products.forEach(p => {

        if (
            p.brand &&
            p.brand.toLowerCase().includes("excell")
        ) {

            images.push(
                `images/${p.category}/${p.folder}/main.jpg`
            );

        }

    });

    return images;
}

if (!Array.isArray(cart)) {
    cart = [];
}

let selectedProduct = null;

/* =========================
   PRODUCTS
========================= */

const getProducts = () => window.products || [];

/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    let total = 0;

    cart.forEach(item => {
        total += item.quantity || 0;
    });

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = total;
    }
}
let excellSlides = [];
let indexSlide = 0;
let sliderImg = document.getElementById("slider-img");

/* =========================
   PRODUCTS HOME
========================= */

function renderProducts(productList) {

    if (!Array.isArray(productList)) {
        productList = getProducts();
    }

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    productGrid.innerHTML = "";

    productList.forEach(product => {

        productGrid.innerHTML += `
        <div class="product-card">

            <img src="images/${product.category}/${product.folder}/main.jpg">

            <div class="product-info">

                <h3>${product.name}</h3>

                <a class="detail-btn"
                   href="chitiet.html?id=${product.id}">
                   Chi tiết
                </a>

            </div>

        </div>
        `;
    });
}

/* =========================
   FILTER
========================= */

function filterProducts(category) {

    const filtered =
        getProducts().filter(p => p.category === category);

    renderProducts(filtered);
}

/* =========================
   OPEN CART
========================= */

function openCart() {

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (!modal || !overlay) return; // FIX

    modal.classList.add("active");
    overlay.style.display = "block";

    renderCart();
}

function closeCart() {

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (modal) modal.classList.remove("active");

    if (overlay) {
        overlay.style.display = "none";
    }
}

/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    renderCart();
}

/* =========================
   ADD TO CART
========================= */

function addToCart(id, capacity, qty = 1) {

    const product =
        getProducts().find(p => p.id == id);

    if (!product) return;

    const existing =
        cart.find(i =>
            i.id == id &&
            i.capacity == capacity
        );

    if (existing) {

        existing.quantity += qty;

    } else {

        cart.push({
    id: product.id,
    name: product.name,
    category: product.category,
    folder: product.folder,
    capacity: capacity,

    // THÊM DÒNG NÀY
division: getDivisionFromCapacity(product, capacity),
    quantity: qty
});
    }

    saveCart();
}

/* =========================
   RENDER CART
========================= */

function renderCart() {

    const cartBody = document.getElementById("cartBody");

    if (!cartBody) return;

    if (cart.length === 0) {

        cartBody.innerHTML = `
        <p>Giỏ hàng trống</p>
        `;

        return;
    }

    cartBody.innerHTML = "";

    cart.forEach(item => {

        cartBody.innerHTML += `

        <div class="cart-item">

            <img
            src="images/${item.category}/${item.folder}/main.jpg"
            width="70">

            <h4 class="cart-name">${item.name}</h4>

<p class="cart-capacity">
    ${item.capacity || ""}
</p>

<p class="cart-division">
    ${item.division || ""}
</p>

<div class="cart-qty">

    <button onclick="decreaseQty(${item.id})">-</button>

    <span>${item.quantity}</span>

    <button onclick="increaseQty(${item.id})">+</button>
            </div>

            <div class="cart-actions">

                <label class="cart-check">

                    <input
                    type="checkbox"
                    class="cart-buy-check"
                    value="${item.id}_${item.capacity}">

                    Chọn mua

                </label>

                <button onclick="removeCart(${item.id})">
                    Xóa
                </button>

            </div>

        </div>
        `;
    });

    cartBody.innerHTML += `

    <div class="cart-footer">

        <button
        onclick="buyNowCart()"
        class="btn-buy">

            MUA NGAY

        </button>

    </div>
    `;
}

/* =========================
   UPDATE QTY
========================= */

function increaseQty(id) {

    const item =
        cart.find(i => i.id == id);

    if (item) {
        item.quantity++;
    }

    saveCart();
}

function decreaseQty(id) {

    const item =
        cart.find(i => i.id == id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart =
            cart.filter(i => i.id != id);
    }

    saveCart();
}

function removeCart(id) {

    cart =
        cart.filter(i => i.id != id);

    saveCart();
}

/* =========================
   BUY SELECTED CART
========================= */

function buySelectedCart(){

    const checked =
        document.querySelectorAll(".cart-buy-check:checked");

    if(checked.length === 0){
        alert("Vui lòng chọn sản phẩm");
        return;
    }

    let text = "";
    let html = "";
    let totalQty = 0;

    checked.forEach(check => {

        const id = Number(check.value);

        const item = cart.find(i => i.id == id);

        if(item){
            totalQty += item.quantity;

            text += `
${item.name}
Số lượng: ${item.quantity}
-----------------
`;
        }

        const product = getProducts().find(p => p.id == id);

        if(product){

            const temp = document.createElement("div");
            temp.innerHTML = product.specs;

            const rows = temp.querySelectorAll("tr");

            rows.forEach(row => {

                const cols = row.querySelectorAll("td");

                if(cols.length >= 2){

                    html += `
<option>
${product.name} - ${cols[0].innerText.trim()} - ${cols[1].innerText.trim()}
</option>
`;
                }
            });
        }
    });

    const popup = document.getElementById("buyPopup");

    popup.style.display = "flex";

    document.getElementById("buyProductName").value =
        "ĐƠN HÀNG GIỎ HÀNG (" + totalQty + " sản phẩm)";

    document.getElementById("buyCapacity").innerHTML = html;

    document.getElementById("buyQty").value = totalQty;
}
function buyNowCart(){

    const checked =
        document.querySelectorAll(".cart-buy-check:checked");

    if(checked.length === 0){
        alert("Vui lòng chọn sản phẩm");
        return;
    }

    let html = "";
    let totalQty = 0;

    checked.forEach(check => {

        const values = check.value.split("_");

        const id = Number(values[0]);

        const capacity = values[1] || "";

        const item = cart.find(i =>
            i.id == id &&
            i.capacity == capacity
        );
        if(item){

            totalQty += item.quantity;

            const label =
                item.capacity || "";

            html += `

            <div class="buy-row" data-value="${label}">

                <label style="display:none">
                    <input type="checkbox"
                           class="buy-check"
                           checked>
                </label>

                <div class="buy-cart-left">

                    <img
                    src="images/${item.category}/${item.folder}/main.jpg"
                    class="buy-cart-img">

                </div>

                <div class="buy-cart-center">

                    <div class="buy-cart-name">
                        ${item.name}
                    </div>

                    <div class="buy-cart-capacity">
                        ${label}
                    </div>

                </div>

                <div class="buy-cart-right">

                    <input type="number"
                           value="${item.quantity}"
                           readonly>

                </div>

            </div>

            `;
        }
    });

    const popup =
        document.getElementById("buyPopup");

    if(!popup) return;

    popup.style.display = "flex";

    document.getElementById("buyProductName").style.display =
    "none";

    document.getElementById("buyCapacityList").innerHTML =
        html;

    
}
/* =========================
   ADD CART POPUP
========================= */

function openAddCartPopup() {

    addToCartDetail();
}

function addToCartDetail() {

    if (!window.currentProduct) return;

    selectedProduct = getProducts().find(p => p.id == window.currentProduct.id);
    const popup = document.getElementById("addCartPopup");

    if (popup) popup.style.display = "flex";

    document.getElementById("popupCartImg").src =
        `images/${selectedProduct.category}/${selectedProduct.folder}/main.jpg`;

    document.getElementById("popupCartName").innerText =
        selectedProduct.name;

    let html = "";

    const temp = document.createElement("div");
    temp.innerHTML = selectedProduct.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row => {

    const cols = row.querySelectorAll("td");

    if (cols.length >= 2) {

        const label =
            cols[0].innerText.trim() + " - " +
            cols[1].innerText.trim();

        html += `
        <div class="cart-row" data-value="${label}">

            <div class="cart-left">
                <input type="checkbox" class="cart-check">
            </div>

            <div class="cart-center">
                ${label}
            </div>

            <div class="cart-right">
                <button onclick="changeCartQty(this,-1)">-</button>
                <input type="number" value="1" min="1">
                <button onclick="changeCartQty(this,1)">+</button>
            </div>

        </div>
        `;
    }
});

/* =========================
   NẾU KHÔNG CÓ MỨC CÂN
========================= */

if(html === ""){

    html = `
    <div class="cart-row" data-value="">

        <div class="cart-left">
            <input type="checkbox" class="cart-check" checked>
        </div>

        <div class="cart-center">
            ${selectedProduct.name}
        </div>

        <div class="cart-right">
            <button onclick="changeCartQty(this,-1)">-</button>
            <input type="number" value="1" min="1">
            <button onclick="changeCartQty(this,1)">+</button>
        </div>

    </div>
    `;
}

document.getElementById("cartSpecList").innerHTML = html;
}
function closeAddCart() {

    const popup =
        document.getElementById("addCartPopup");

    if (popup) {
        popup.style.display = "none";
    }
}

function confirmAddCart() {

    const rows = document.querySelectorAll(".cart-row");

    rows.forEach(row => {

        const check = row.querySelector(".cart-check");
        const input = row.querySelector("input[type='number']");
        const label = row.dataset.value;

        if (check && check.checked) {

            cart.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                category: selectedProduct.category,
                folder: selectedProduct.folder,

                capacity: label,
                quantity: Number(input.value)
            });
        }
    });

    saveCart();

    closeAddCart();

    alert("Đã thêm vào giỏ");
}
/* =========================
   BUY POPUP
========================= */

function buyNow() {

    openBuyPopup();
}

function openBuyPopup() {

    if (!window.currentProduct) return;

    selectedProduct = window.currentProduct;

    const popup = document.getElementById("buyPopup");

    if (!popup) return;

    popup.style.display = "flex";

    document.getElementById("buyProductName").style.display =
    "block";

    let html = `

    <div class="buy-product-top">

        <img
        src="images/${selectedProduct.category}/${selectedProduct.folder}/main.jpg"
        class="buy-product-img">

        <div class="buy-product-info">
            <h3>${selectedProduct.name}</h3>
        </div>

    </div>
    `;

    const temp = document.createElement("div");

    temp.innerHTML = selectedProduct.specs[0] || "";

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            const label =
                cols[0].innerText.trim() + " - " +
                cols[1].innerText.trim();

            html += `

            <div class="buy-row" data-value="${label}">

                <label>
                    <input type="checkbox"
                           class="buy-check"
                           
                </label>

                <div class="label-text">
                    ${label}
                </div>

                <div class="buy-qty">

                    <button onclick="changeBuyQty(this,-1)">-</button>

                    <input type="number"
                           value="1"
                           min="1">

                    <button onclick="changeBuyQty(this,1)">+</button>

                </div>

            </div>
            `;
        }
    });

    if(rows.length === 0){

        html += `

        <div class="buy-row"
             data-value="${selectedProduct.name}">

            <label>
                <input type="checkbox"
                       class="buy-check"
                       checked>
            </label>

            <div class="label-text">
                ${selectedProduct.name}
            </div>

            <div class="buy-qty">

                <button onclick="changeBuyQty(this,-1)">-</button>

                <input type="number"
                       value="1"
                       min="1">

                <button onclick="changeBuyQty(this,1)">+</button>

            </div>

        </div>
        `;
    }

    document.getElementById("buyCapacityList").innerHTML = html;
}
/* =========================
   CHANGE QTY
========================= */

function changeQty(type, value) {

    let input;

    if (type === "cart") {

        input =
            document.getElementById("popupCartQty");

    } else {

        input =
            document.getElementById("buyQty");
    }

    if (!input) return;

    let qty = Number(input.value);

    qty += value;

    if (qty < 1) {
        qty = 1;
    }

    input.value = qty;
}

/* =========================
   ORDER TEXT
========================= */

function buildOrderText() {

    return `
===== ĐƠN ĐẶT HÀNG =====

Tên khách hàng:
${document.getElementById("customerName")?.value || ""}

Số điện thoại:
${document.getElementById("customerPhone")?.value || ""}

Tên công ty:
${document.getElementById("customerCompany")?.value || ""}

Mã số thuế:
${document.getElementById("customerTax")?.value || ""}

Địa chỉ xuất hóa đơn:
${document.getElementById("customerInvoice")?.value || ""}

Địa chỉ giao hàng:
${document.getElementById("customerAddress")?.value || ""}

Sản phẩm:
${document.getElementById("buyProductName")?.value || ""}

Chi tiết:
${Array.from(document.querySelectorAll(".buy-row"))
    .map(row => {

        const check = row.querySelector(".buy-check");
        const input = row.querySelector("input[type='number']");
        const label = row.dataset.value;

        if (check && check.checked) {
            return `
${label}
Số lượng: ${input.value}
-----------------`;
        }

        return "";
    })
    .join("")}


========================
`;
}

/* =========================
   SEND ORDER
========================= */
function sendOrderZalo() {

    closeBuyPopup();

    navigator.clipboard.writeText(buildOrderText());

    setTimeout(() => {
        window.open("https://zalo.me/0383598603", "_blank");
    }, 100);
}

function sendOrderMessenger() {

    closeBuyPopup();

    navigator.clipboard.writeText(buildOrderText());

    setTimeout(() => {
        window.open("https://m.me/QTNSCALE", "_blank");
    }, 100);
}

/* =========================
   INIT
========================= */

document.addEventListener("click", function(e) {

    if (e.target.id === "btnAddCart") {

        confirmAddCart();
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const products = getProducts();

    renderProducts(getProducts());
    updateCartCount();
    initExcellSlider();

    // =========================
    // GIỎ HÀNG
    // =========================
    if (sessionStorage.getItem("openCart") === "1") {

        sessionStorage.removeItem("openCart");

        openCart();
    }

    // =========================
    // CATEGORY FILTER
    // =========================
    const category = sessionStorage.getItem("filterCategory");

    if (category) {

        sessionStorage.removeItem("filterCategory");

        renderProducts(
            products.filter(p => p.category === category)
        );
    }

    // =========================
    // BRAND FILTER
    // =========================
    const brand = sessionStorage.getItem("filterBrand");

    if (brand) {

        sessionStorage.removeItem("filterBrand");

        renderProducts(
            products.filter(p => p.brand === brand)
        );
    }
});

/* =========================
   FILTER BY BRAND
========================= */

function filterByBrand(brand) {

    const filtered = getProducts().filter(p => p.brand === brand);

    renderProducts(filtered);
}
function initExcellSlider() {
    excellSlides = getExcellImages();

    if (!sliderImg) return;

    function showSlide() {
        if (excellSlides.length === 0) return;

        sliderImg.src = excellSlides[indexSlide];

        indexSlide++;
        if (indexSlide >= excellSlides.length) {
            indexSlide = 0;
        }
    }

    showSlide();
    setInterval(showSlide, 3000);
}
function getDivisionFromCapacity(product, capacity) {

    if (!product || !product.specs) return "";

    const temp = document.createElement("div");
    temp.innerHTML = product.specs;

    const rows = temp.querySelectorAll("tr");

    for (let row of rows) {

        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {

            const cap = cols[0].innerText.trim();
            const div = cols[1].innerText.trim();

            if (capacity.includes(cap)) {
                return div;
            }
        }
    }

    return "";
}
function goHomeOpenCart() {

    sessionStorage.setItem("openCart", "1");

    return true;
}
function goHomeAndCategory(category) {
    sessionStorage.setItem("filterCategory", category);
    window.location.href = "index.html";
}

function goHomeAndBrand(brand) {
    sessionStorage.setItem("filterBrand", brand);
    window.location.href = "index.html";
}
function changeBuyQty(btn, value) {

    const input =
        btn.parentElement.querySelector("input");

    let qty = Number(input.value);

    qty += value;

    if (qty < 1) qty = 1;

    input.value = qty;
}
function closeBuyPopup() {

    const popup = document.getElementById("buyPopup");

    if (!popup) return;

    popup.style.display = "none";
}
function changeCartQty(btn, value) {

    const input = btn.parentElement.querySelector("input");

    let qty = Number(input.value);

    qty += value;

    if (qty < 1) qty = 1;

    input.value = qty;
}
function parseSpecTable(htmlString){

    let temp = document.createElement("div");

    temp.innerHTML = htmlString;

    let rows = temp.querySelectorAll("tr");

    let data = [];

    rows.forEach((row,index)=>{

        let cols = row.querySelectorAll("th,td");

        if(cols.length >= 2 && index > 0){

            data.push({
                level: cols[0].innerText.trim(),
                step: cols[1].innerText.trim()
            });

        }

    });

    return data;
}


function renderAddCart(product){

    let container = document.getElementById("cartSpecList");

    let specs = parseSpecTable(product.specs[0]);

    container.innerHTML = "";

    specs.forEach((s,i)=>{

        container.innerHTML += `

        <div class="cart-row">

            <div class="cart-left">
                <input type="checkbox" class="cart-buy-check">
            </div>

            <div class="cart-middle">
                <div class="level-text">${s.level}</div>
                <div class="step-text">${s.step}</div>
            </div>

            <div class="cart-right">

                <button onclick="changeQty(${i},-1)">-</button>

                <input id="qty-${i}" value="1">

                <button onclick="changeQty(${i},1)">+</button>

            </div>

        </div>

        `;

    });

}


function changeQty(i,val){

    let input = document.getElementById("qty-" + i);

    let current = parseInt(input.value) || 1;

    current += val;

    if(current < 1) current = 1;

    input.value = current;

}