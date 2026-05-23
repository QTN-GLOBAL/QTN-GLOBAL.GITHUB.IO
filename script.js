/* =========================
   GIỎ HÀNG
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedProduct = null;

/* =========================
   PRODUCTS SAFE ACCESS
========================= */

// luôn lấy từ window.products (tránh undefined)
const getProducts = () => window.products || [];

/* =========================
   CẬP NHẬT GIỎ HÀNG
========================= */

function updateCartCount() {
    let total = 0;

    cart.forEach(item => {
        total += item.quantity || 0;
    });

    const cartCount = document.getElementById("cartCount");
    if (cartCount) cartCount.innerText = total;
}

/* =========================
   HIỂN THỊ SẢN PHẨM
========================= */

function renderProducts(productList = getProducts()) {
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
        </div>`;
    });
}

/* =========================
   FILTER
========================= */

function filterProducts(category) {
    const filtered = getProducts().filter(p => p.category === category);
    renderProducts(filtered);
}

/* =========================
   CART OPEN / CLOSE
========================= */

function openCart() {
    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (modal) modal.classList.add("active");
    if (overlay) overlay.style.display = "block";

    renderCart();
}

function closeCart() {
    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if (modal) modal.classList.remove("active");
    if (overlay) overlay.style.display = "none";
}

/* =========================
   THÊM VÀO GIỎ
========================= */

function addToCart(id, qty = 1) {

    const product = getProducts().find(p => p.id == id);
    if (!product) return;

    const existing = cart.find(i => i.id == id);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            folder: product.folder,
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
        cartBody.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    cartBody.innerHTML = "";

    cart.forEach(item => {

        cartBody.innerHTML += `
        <div class="cart-item">
            <img src="images/${item.category}/${item.folder}/main.jpg" width="70">

            <h4>${item.name}</h4>

            <div class="qty">
                <button onclick="decreaseQty(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${item.id})">+</button>
            </div>

            <button onclick="removeCart(${item.id})">Xóa</button>
        </div>`;
    });
}

/* =========================
   UPDATE CART
========================= */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function increaseQty(id) {
    const item = cart.find(i => i.id == id);
    if (item) item.quantity++;
    saveCart();
}

function decreaseQty(id) {
    const item = cart.find(i => i.id == id);

    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id != id);
        }
    }

    saveCart();
}

function removeCart(id) {
    cart = cart.filter(i => i.id != id);
    saveCart();
}

/* =========================
   POPUP CHI TIẾT
========================= */

function addToCartDetail() {
    if (!window.currentProduct) return;

    selectedProduct = window.currentProduct;

    const popup = document.getElementById("addCartPopup");
    if(popup){
    popup.style.display = "flex";
    popup.classList.add("active");
}

    document.getElementById("popupCartImg").src =
        `images/${selectedProduct.category}/${selectedProduct.folder}/main.jpg`;

    document.getElementById("popupCartName").innerText =
        selectedProduct.name;

    let html = "";

const temp = document.createElement("div");

temp.innerHTML = selectedProduct.specs;

const rows = temp.querySelectorAll("tr");

rows.forEach(row=>{

    const cols = row.querySelectorAll("td");

    if(cols.length >= 2){

        const mucCan = cols[0].innerText.trim();
        const doChia = cols[1].innerText.trim();

        html += `
        <option>
            ${mucCan} - ${doChia}
        </option>
        `;
    }

});

    const capSelect = document.getElementById("popupCartCapacity");
    if (capSelect) capSelect.innerHTML = html;
}

function confirmAddCart(){

    if(!selectedProduct) return;

    const qty = Number(
        document.getElementById("popupCartQty").value
    );

    const level =
        document.getElementById("popupCartCapacity").value;

    cart.push({
        id:selectedProduct.id,
        name:selectedProduct.name,
        category:selectedProduct.category,
        folder:selectedProduct.folder,
        level:level,
        quantity:qty
    });

    saveCart();

    // reset qty
    document.getElementById("popupCartQty").value = 1;

    // đóng popup
    const popup = document.getElementById("addCartPopup");

    popup.style.display = "none";
    popup.classList.remove("active");

    
}

/* =========================
   BUY NOW
========================= */

function openBuyPopup(){

    if(!window.currentProduct) return;

    selectedProduct = window.currentProduct;

    document.getElementById("buyPopup").style.display = "flex";

    document.getElementById("buyProductName").value =
        selectedProduct.name;

    let html = "";

    // lấy tất cả td trong bảng
    const temp = document.createElement("div");

    temp.innerHTML = selectedProduct.specs;

    const rows = temp.querySelectorAll("tr");

    rows.forEach(row=>{

        const cols = row.querySelectorAll("td");

        if(cols.length >= 2){

            const mucCan = cols[0].innerText.trim();
            const doChia = cols[1].innerText.trim();

            html += `
            <option>
                ${mucCan} - ${doChia}
            </option>
            `;
        }

    });

    document.getElementById("buyCapacity").innerHTML = html;
}
/* =========================
   QTY POPUP
========================= */

function changeQty(type, value){

    let input;

    if(type === "cart"){
        input = document.getElementById("popupCartQty");
    }else{
        input = document.getElementById("buyQty");
    }

    if(!input) return;

    let qty = Number(input.value);

    qty += value;

    if(qty < 1){
        qty = 1;
    }

    input.value = qty;
}
/* =========================
   ORDER TEXT
========================= */

function buildOrderText(){

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

Tên cân:
${document.getElementById("buyProductName")?.value || ""}

Mức cân:
${document.getElementById("buyCapacity")?.value || ""}

Số lượng:
${document.getElementById("buyQty")?.value || ""}

========================
`;
}

/* =========================
   ZALO / MESS
========================= */

function sendOrderZalo(){

    navigator.clipboard.writeText(buildOrderText());

    alert("Đã copy đơn hàng");

    window.open("https://zalo.me/0383598603","_blank");
}

function sendOrderMessenger(){

    navigator.clipboard.writeText(buildOrderText());

    alert("Đã copy đơn hàng");

    window.open("https://m.me/QTNSCALE","_blank");
}
function openAddCartPopup() {
    addToCartDetail();
}
function closeAddCart(){

    const popup = document.getElementById("addCartPopup");

    if(!popup) return;

    popup.style.display = "none";
    popup.classList.remove("active");
}
/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartCount();
});