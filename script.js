let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= CART ================= */

function updateCartCount(){
    const el = document.getElementById("cartCount");
    if(!el) return;
    let total = 0;
    cart.forEach(i => total += i.qty || 1);
    el.innerText = total;
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= CART UI ================= */

function openCart(){
    document.getElementById("cartOverlay").style.display = "block";
    document.getElementById("cartModal").style.display = "block";
    renderCart();
}

function closeCart(){
    document.getElementById("cartOverlay").style.display = "none";
    document.getElementById("cartModal").style.display = "none";
}

function renderCart(){
    const body = document.getElementById("cartBody");
    if(!body) return;

    let html = "";

    cart.forEach((i, index) => {
        html += `
        <div>
            ${i.name} x${i.qty}
            <button onclick="removeCart(${index})">Xóa</button>
        </div>`;
    });

    body.innerHTML = html;
}

function removeCart(index){
    cart.splice(index,1);
    saveCart();
    updateCartCount();
    renderCart();
}

/* ================= ADD CART ================= */

function openAddCartPopup(){
    const p = window.currentProduct;
    if(!p) return;

    document.getElementById("popupCartImg").src =
        `images/${p.category}/${p.folder}/main.jpg`;

    document.getElementById("popupCartName").innerText = p.name;
    document.getElementById("addCartPopup").style.display = "block";
}

function closeAddCart(){
    document.getElementById("addCartPopup").style.display = "none";
}

function confirmAddCart(){
    const p = window.currentProduct;

    cart.push({
        id: p.id,
        name: p.name,
        qty: Number(document.getElementById("popupCartQty").value)
    });

    saveCart();
    updateCartCount();
    closeAddCart();
}

/* ================= BUY ================= */

function openBuyPopup(){
    document.getElementById("buyPopup").style.display = "block";
}

function closeBuyPopup(){
    document.getElementById("buyPopup").style.display = "none";
}

function sendOrder(){
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;

    const p = window.currentProduct;

    let msg =
`ĐƠN HÀNG
- SP: ${p.name}
- KH: ${name}
- SĐT: ${phone}
- DC: ${address}`;

    window.open("https://zalo.me/0383598603");
    alert(msg);
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});