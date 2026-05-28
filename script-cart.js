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

function renderCart() {

    const body = document.getElementById("cartBody");
    if (!body) return;

    if (cart.length === 0) {
        body.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    let html = "";

    cart.forEach(item => {

        html += `
        <div class="cart-row">
            <div class="cart-left">
                <input type="checkbox" class="cart-buy-check">
            </div>

            <div class="cart-middle">
                <img src="images/${item.category}/${item.folder}/main.jpg">
                <div>
                    <div>${item.name}</div>
                    <div>${item.capacity || ""}</div>
                </div>
            </div>

            <div class="cart-right">
                <button onclick="changeCartQty(this,-1)">-</button>
                <input value="${item.quantity}" readonly>
                <button onclick="changeCartQty(this,1)">+</button>
            </div>
        </div>`;
    });

    body.innerHTML = html;
}

/* =========================
   QTY
========================= */

function changeCartQty(btn, value) {

    const input = btn.parentElement.querySelector("input");
    let qty = Number(input.value);

    qty += value;
    if (qty < 1) qty = 1;

    input.value = qty;
}