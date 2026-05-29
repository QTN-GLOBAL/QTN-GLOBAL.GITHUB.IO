/* =========================
   CART STATE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   ADD TO CART (GIỮ NGUYÊN LOGIC CŨ)
========================= */

function addToCart(id, capacity, qty = 1) {

    const product = getProducts().find(p => p.id == id);
    if (!product) return;

    const existing = cart.find(i =>
        i.id == id && i.capacity == capacity
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
            quantity: qty
        });
    }

    saveCart();
    updateCartUI();
}

/* =========================
   RENDER CART
========================= */

function renderCart(){

    const body = document.getElementById("cartBody");
    if(!body) return;

    if(cart.length === 0){
        body.innerHTML = "<p style='text-align:center;padding:20px'>Giỏ hàng trống</p>";
        return;
    }

    body.innerHTML = cart.map((item,index)=>`
        <div class="cart-row">

            <div class="cart-left">
                <input type="checkbox" class="cart-check" data-index="${index}">
            </div>

            <div class="cart-middle">
                <img class="cart-product-img"
                src="images/${item.category}/${item.folder}/main.jpg">

                <div class="cart-info">
                    <div class="cart-name">${item.name}</div>
                    <div class="cart-capacity">${item.capacity}</div>
                </div>
            </div>

            <div class="cart-right">
                <button onclick="updateCartQty(${index},-1)">-</button>
                <input value="${item.quantity}" readonly>
                <button onclick="updateCartQty(${index},1)">+</button>
            </div>

        </div>
    `).join("") +

    `
    <div class="cart-bottom">
        <button class="buy-now-btn" onclick="handleBuyNow()">
            MUA NGAY
        </button>
    </div>
    `;
}

/* =========================
   QTY UPDATE
========================= */

function updateCartQty(index,value){

    if(!cart[index]) return;

    cart[index].quantity += value;

    if(cart[index].quantity < 1){
        cart[index].quantity = 1;
    }

    saveCart();

    renderCart();
    renderHeaderCart();
    updateCartUI();
}

/* =========================
   BUY NOW (RESTORE VERSION)
========================= */

function handleBuyNow() {

    const selectedItems = [];

    document.querySelectorAll(".cart-check").forEach(cb => {

        if(cb.checked){

            const index = cb.getAttribute("data-index");

            if(cart[index]){
                selectedItems.push(cart[index]);
            }

        }

    });

    if(selectedItems.length === 0){
        alert("Vui lòng chọn sản phẩm cần mua");
        return;
    }

    renderBuyNowForm(selectedItems);
}

/* =========================
   BUY FORM
========================= */

function renderBuyNowForm(items){

    const box = document.getElementById("buyProductList");
    if(!box) return;

    box.innerHTML = items.map(item => `
        <div class="buy-item">
            <h4>${item.name}</h4>
            <div>Mức cân: ${item.capacity}</div>
            <div>Số lượng: ${item.quantity}</div>
        </div>
    `).join("");

    const modal = document.getElementById("buyNowModal");
    if(modal) modal.style.display = "block";
}

/* =========================
   HEADER CART
========================= */

function renderHeaderCart(){

    const box = document.getElementById("headerCartBox");
    if(!box) return;

    box.innerHTML = cart.map((item,index)=>`
        <div class="header-cart-row">

            <img src="images/${item.category}/${item.folder}/main.jpg">

            <div class="info">
                <b>${item.name}</b><br>
                <small>${item.capacity}</small>
            </div>

            <div class="qty">
                <button onclick="updateCartQty(${index},-1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQty(${index},1)">+</button>
            </div>

            <button onclick="removeCartItem(${index})">X</button>

        </div>
    `).join("") +

    `
    <button class="buy-now-btn" onclick="handleBuyNow()">
        MUA NGAY
    </button>
    `;
}

/* =========================
   REMOVE ITEM
========================= */

function removeCartItem(index){

    if(!cart[index]) return;

    cart.splice(index,1);

    saveCart();

    renderCart();
    renderHeaderCart();
    updateCartUI();
}

/* =========================
   CART UI COUNT
========================= */

function updateCartUI(){

    const el = document.getElementById("cartCount");
    if(!el) return;

    let total = 0;
    cart.forEach(i => total += i.quantity);

    el.innerText = total;
}

/* =========================
   OPEN CART
========================= */

function openCart(){

    document.getElementById("cartModal")?.classList.add("active");
    renderCart();
}

function closeCart(){
    document.getElementById("cartModal")?.classList.remove("active");
}