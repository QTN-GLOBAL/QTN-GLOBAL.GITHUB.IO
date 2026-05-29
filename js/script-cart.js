
/* =========================
   CART FUNCTIONS
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
}

/* =========================
   CART RENDER
========================= */

/* =========================
   CART RENDER
========================= */

function renderCart(){

    const body = document.getElementById("cartBody");
    if(!body) return;

    

    if(cart.length === 0){
        body.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    let html = "";

    cart.forEach((item,index) => {

        html += `
        <div class="cart-row">

            <div class="cart-left">
                <input type="checkbox">
            </div>

           <div class="cart-middle">

    <img class="cart-product-img"
    src="images/${item.category}/${item.folder}/main.jpg">

    <div class="cart-info">

        <div class="cart-name">
            ${item.name}
        </div>

        <div class="cart-capacity">
            ${item.capacity}
        </div>

    </div>

</div>

           <div class="cart-right">

    <button onclick="updateCartQty(${index},-1)">-</button>

    <input value="${item.quantity}" readonly>

    <button onclick="updateCartQty(${index},1)">+</button>

    <button onclick="removeCartItem(${index})">
        ✕
    </button>

</div>

        </div>`;
    });

   html += `

<div class="cart-bottom">

    <button class="buy-now-btn"
    onclick="openBuyPopup()">

        MUA NGAY

    </button>

</div>

`;

body.innerHTML = html;
}
/* =========================
   CHANGE QTY POPUP
========================= */

function changeCartQty(btn, value) {

    const input =
        btn.parentElement.querySelector("input");

    let qty = Number(input.value);

    qty += value;

    if (qty < 1) qty = 1;

    input.value = qty;
}
/* =========================
   UPDATE CART QTY
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
   CLOSE POPUP
========================= */

function closeAddCart(){

    const popup =
        document.getElementById("addCartPopup");

    if(popup){
        popup.style.display = "none";
    }
}

function closeBuyPopup(){

    const popup =
        document.getElementById("buyPopup");

    if(popup){
        popup.style.display = "none";
    }
}
/* =========================
   CONFIRM ADD CART
========================= */
function confirmAddCart(){

    const rows =
    document.querySelectorAll("#cartSpecList .cart-row");

    let added = false;

    rows.forEach(row => {

        const check =
        row.querySelector(".cart-check");

        if(!check || !check.checked) return;

        const qtyInput =
        row.querySelector("input[type='number']");

        const label =
        row.dataset.value || "";

        cart.push({

            id: window.selectedProduct.id,

            name: window.selectedProduct.name,

            category: window.selectedProduct.category,

            folder: window.selectedProduct.folder,

            capacity: label,

            quantity: Number(qtyInput.value)

        });

        added = true;

    });

    if(!added){
        alert("Vui lòng tick sản phẩm");
        return;
    }

    saveCart();

renderCart();

updateCartUI();

closeAddCart();

alert("Đã thêm vào giỏ");
}
function renderHeaderCart(){

    const box = document.getElementById("headerCartBox");
    if(!box) return;

    let html = "";

    cart.forEach((item,index) => {

        html += `
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

        </div>`;
    });

    html += `
    <button class="buy-now-btn" onclick="openBuyPopup()">
        MUA NGAY
    </button>`;

    box.innerHTML = html;
}
function updateCartUI(){

    const el = document.getElementById("cartCount");
    if(!el) return;

    let total = 0;
    cart.forEach(i => total += i.quantity);

    el.innerText = total;
}
function removeCartItem(index){

    if(!cart[index]) return;

    cart.splice(index, 1);

    saveCart();

    renderCart();        // cập nhật giỏ chính
    renderHeaderCart();  // cập nhật giỏ header
    updateCartUI();      // cập nhật số lượng icon
}
function openCart(){

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if(!modal){
        console.log("cartModal not found");
        return;
    }

    modal.classList.add("active");

    if(overlay){
        overlay.classList.add("active");
    }

    renderCart();
}
function closeCart(){

    const modal = document.getElementById("cartModal");
    const overlay = document.getElementById("cartOverlay");

    if(modal){
        modal.classList.remove("active");
    }

    if(overlay){
        overlay.classList.remove("active");
    }
}