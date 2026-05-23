let cart = JSON.parse(localStorage.getItem("cart")) || [];
if(!Array.isArray(cart)) cart = [];
let selectedProduct = null;

const getProducts = () => window.products || [];

function updateCartCount(){
    let total = 0;
    cart.forEach(item => total += item.quantity || 0);
    const cartCount = document.getElementById("cartCount");
    if(cartCount) cartCount.innerText = total;
}

function renderProducts(productList = getProducts()){
    const productGrid = document.getElementById("productGrid");
    if(!productGrid) return;
    productGrid.innerHTML = "";
    productList.forEach(product => {
        productGrid.innerHTML += `
        <div class="product-card">
            <img src="images/${product.category}/${product.folder}/main.jpg">
            <div class="product-info">
                <h3>${product.name}</h3>
                <a class="detail-btn" href="chitiet.html?id=${product.id}">Chi tiết</a>
            </div>
        </div>`;
    });
}

function filterProducts(category){
    const filtered = getProducts().filter(p=>p.category === category);
    renderProducts(filtered);
}

/* ===== CART ===== */
function openCart(){
    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");
    if(modal) modal.classList.add("active");
    if(overlay) overlay.style.display = "block";
    renderCart();
}

function closeCart(){
    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");
    if(modal) modal.classList.remove("active");
    if(overlay) overlay.style.display = "none";
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function addToCart(id, qty=1){
    const product = getProducts().find(p=>p.id==id);
    if(!product) return;
    const existing = cart.find(i=>i.id==id);
    if(existing) existing.quantity += qty;
    else cart.push({id:product.id, name:product.name, category:product.category, folder:product.folder, quantity:qty});
    saveCart();
}

/* ===== RENDER CART ===== */
function renderCart(){
    const cartBody = document.getElementById("cartBody");
    if(!cartBody) return;
    if(cart.length === 0){ cartBody.innerHTML="<p>Giỏ hàng trống</p>"; return;}
    cartBody.innerHTML = "";
    cart.forEach(item=>{
        cartBody.innerHTML += `
        <div class="cart-item">
            <img src="images/${item.category}/${item.folder}/main.jpg" width="70">
            <h4>${item.name}</h4>
            <div class="qty">
                <button onclick="decreaseQty(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${item.id})">+</button>
            </div>
            <div class="cart-actions">
                <label class="cart-check">
                    <input type="checkbox" class="cart-buy-check" value="${item.id}"> Chọn mua
                </label>
                <button onclick="removeCart(${item.id})">Xóa</button>
            </div>
        </div>`;
    });

    cartBody.innerHTML += `
    <div class="cart-footer">
        <button onclick="buySelectedCart()" class="btn-buy">MUA NGAY</button>
    </div>`;
}

/* ===== QTY ===== */
function increaseQty(id){const item=cart.find(i=>i.id==id);if(item)item.quantity++;saveCart();}
function decreaseQty(id){const item=cart.find(i=>i.id==id);if(!item) return; item.quantity--; if(item.quantity<=0) cart=cart.filter(i=>i.id!=id); saveCart();}
function removeCart(id){cart=cart.filter(i=>i.id!=id); saveCart();}

/* ===== BUY SELECTED ===== */
function buySelectedCart(){
    const checked = document.querySelectorAll(".cart-buy-check:checked");
    if(checked.length === 0){alert("Vui lòng chọn sản phẩm"); return;}
    let text = "";
    let html = "";
    checked.forEach(check=>{
        const id = Number(check.value);
        const item = cart.find(i=>i.id==id);
        const product = getProducts().find(p=>p.id==id);
        if(item) text += `${item.name}\nSố lượng: ${item.quantity}\n\n`;
        if(product){
            const temp = document.createElement("div");
            temp.innerHTML = product.specs;
            temp.querySelectorAll("tr").forEach(row=>{
                const cols = row.querySelectorAll("td");
                if(cols.length>=2){
                    html += `<option>${product.name} - ${cols[0].innerText.trim()} - ${cols[1].innerText.trim()}</option>`;
                }
            });
        }
    });
    const popup = document.getElementById("buyPopup");
    popup.style.display = "flex";
    document.getElementById("buyProductName").value = text;
    document.getElementById("buyCapacity").innerHTML = html;
    document.getElementById("buyQty").value = 1;
}

/* ===== BUY POPUP ===== */
function buyNow(){ openBuyPopup(); }
function openBuyPopup(){
    if(!window.currentProduct) return;
    selectedProduct = window.currentProduct;
    const popup = document.getElementById("buyPopup");
    popup.style.display = "flex";
    document.getElementById("buyProductName").value = selectedProduct.name;
    let html = "";
    const temp = document.createElement("div");
    temp.innerHTML = selectedProduct.specs;
    temp.querySelectorAll("tr").forEach(row=>{
        const cols = row.querySelectorAll("td");
        if(cols.length>=2) html += `<option>${cols[0].innerText.trim()} - ${cols[1].innerText.trim()}</option>`;
    });
    document.getElementById("buyCapacity").innerHTML = html;
}
function closeBuyPopup(){ const popup=document.getElementById("buyPopup"); if(popup) popup.style.display="none"; }

/* ===== CHANGE QTY ===== */
function changeQty(type,value){
    const input = type==="cart"?document.getElementById("popupCartQty"):document.getElementById("buyQty");
    if(!input) return;
    let qty = Number(input.value)+value;
    if(qty<1) qty=1;
    input.value = qty;
}

/* ===== ORDER TEXT ===== */
function buildOrderText(){
    return `===== ĐƠN ĐẶT HÀNG =====
Tên khách hàng: ${document.getElementById("customerName")?.value||""}
Số điện thoại: ${document.getElementById("customerPhone")?.value||""}
Tên công ty: ${document.getElementById("customerCompany")?.value||""}
Mã số thuế: ${document.getElementById("customerTax")?.value||""}
Địa chỉ xuất hóa đơn: ${document.getElementById("customerInvoice")?.value||""}
Địa chỉ giao hàng: ${document.getElementById("customerAddress")?.value||""}
Tên cân: ${document.getElementById("buyProductName")?.value||""}
Mức cân: ${document.getElementById("buyCapacity")?.value||""}
Số lượng: ${document.getElementById("buyQty")?.value||""}
========================`;
}

/* ===== SEND ORDER ===== */
function sendOrderZalo(){
    navigator.clipboard.writeText(buildOrderText());
    window.open("https://zalo.me/0383598603","_blank");
    closeBuyPopup();
}
function sendOrderMessenger(){
    navigator.clipboard.writeText(buildOrderText());
    window.open("https://m.me/QTNSCALE","_blank");
    closeBuyPopup();
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded",()=>{
    renderProducts();
    updateCartCount();
});