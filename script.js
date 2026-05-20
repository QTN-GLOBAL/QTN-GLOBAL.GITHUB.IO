/* =========================
   MENU MOBILE
========================= */

const menuToggle =
document.getElementById("menuToggle");

const navbar =
document.getElementById("navbar");

if(menuToggle){

    menuToggle.onclick = () => {

        navbar.classList.toggle("active");

    };

}

/* =========================
   GIỎ HÀNG
========================= */

let cart = JSON.parse(
localStorage.getItem("cart")
) || [];

/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount(){

    const cartCount =
    document.getElementById("cartCount");

    if(!cartCount) return;

    let total = 0;

    cart.forEach(item=>{

        total += item.quantity;

    });

    cartCount.innerText = total;

}

/* =========================
   SAVE CART
========================= */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

}

/* =========================
   THÊM GIỎ HÀNG
========================= */

function addToCart(product){

    const weight =
    document.getElementById("weightSelect")
    ? document.getElementById("weightSelect").value
    : "Mặc định";

    const qty =
    document.getElementById("qtyInput")
    ? parseInt(
        document.getElementById("qtyInput").value
      )
    : 1;

    const existing =
    cart.find(item=>

        item.id === product.id &&
        item.weight === weight

    );

    if(existing){

        existing.quantity += qty;

    }else{

        cart.push({

            id:product.id,
            name:product.name,
            image:`images/${product.category}/${product.folder}/1.jpg`,
            weight:weight,
            quantity:qty

        });

    }

    saveCart();

    alert("Đã thêm vào giỏ hàng");

}

/* =========================
   POPUP GIỎ HÀNG
========================= */

function openViewCartPopup(){

    renderCartPopup();

    document.getElementById(
        "cartPopup"
    ).style.display = "flex";

}

function closeCartPopup(){

    document.getElementById(
        "cartPopup"
    ).style.display = "none";

}

/* =========================
   RENDER GIỎ HÀNG
========================= */

function renderCartPopup(){

    const cartItems =
    document.getElementById("cartItems");

    const cartTotal =
    document.getElementById("cartTotal");

    if(!cartItems) return;

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML =
        `
        <p class="empty-cart">
            Giỏ hàng đang trống
        </p>
        `;

        if(cartTotal){

            cartTotal.innerText = "";

        }

        return;

    }

    let totalQty = 0;

    cart.forEach((item,index)=>{

        totalQty += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>Mức cân:
                ${item.weight}</p>

            </div>

            <div class="cart-qty">

                <button onclick="
                decreaseQty(${index})
                ">-</button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="
                increaseQty(${index})
                ">+</button>

            </div>

        </div>

        `;

    });

    if(cartTotal){

        cartTotal.innerHTML = `

        <div class="cart-bottom">

            <p>
                Tổng sản phẩm:
                <b>${totalQty}</b>
            </p>

            <button
            class="buy-now-btn"
            onclick="openCheckoutPopup()">

                MUA NGAY

            </button>

        </div>

        `;

    }

}

/* =========================
   TĂNG GIẢM SỐ LƯỢNG
========================= */

function increaseQty(index){

    cart[index].quantity++;

    saveCart();

    renderCartPopup();

}

function decreaseQty(index){

    cart[index].quantity--;

    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }

    saveCart();

    renderCartPopup();

}

/* =========================
   POPUP MUA NGAY
========================= */

function openCheckoutPopup(){

    document.getElementById(
        "checkoutPopup"
    ).style.display = "flex";

}

function closeCheckoutPopup(){

    document.getElementById(
        "checkoutPopup"
    ).style.display = "none";

}

/* =========================
   GỬI ĐƠN ZALO
========================= */

function sendOrderZalo(){

    const name =
    document.getElementById("customerName").value;

    const phone =
    document.getElementById("customerPhone").value;

    const company =
    document.getElementById("customerCompany").value;

    const tax =
    document.getElementById("customerTax").value;

    const invoice =
    document.getElementById("invoiceAddress").value;

    const shipping =
    document.getElementById("shippingAddress").value;

    let productText = "";

    cart.forEach(item=>{

        productText +=
        `• ${item.name}
Mức cân: ${item.weight}
SL: ${item.quantity}

`;

    });

    const message = `

ĐƠN ĐẶT HÀNG QTN GLOBAL

Tên khách hàng:
${name}

Số điện thoại:
${phone}

Công ty:
${company}

Mã số thuế:
${tax}

Địa chỉ hóa đơn:
${invoice}

Địa chỉ giao hàng:
${shipping}

SẢN PHẨM:

${productText}

`;

    const zaloUrl =
`https://zalo.me/0383598603?text=${
encodeURIComponent(message)
}`;

    window.open(zaloUrl,"_blank");

}

/* =========================
   GỬI MESSENGER
========================= */

function sendOrderMessenger(){

    window.open(
"https://m.me/QTNSCALE",
"_blank"
    );

}

/* =========================
   SLIDER ẢNH
========================= */

let currentSlide = 0;

function changeSlide(direction){

    const slides =
    document.querySelectorAll(
        ".detail-slider img"
    );

    if(slides.length === 0) return;

    slides[currentSlide]
    .classList.remove("active");

    currentSlide += direction;

    if(currentSlide < 0){

        currentSlide =
        slides.length - 1;

    }

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    slides[currentSlide]
    .classList.add("active");

}

/* =========================
   LOAD ẢNH DETAIL
========================= */

function renderDetailImages(product){

    const slider =
    document.getElementById(
        "detailSlider"
    );

    if(!slider) return;

    let images = "";

    for(let i=1;i<=5;i++){

        images += `

        <img
        src="
images/${product.category}/${product.folder}/${i}.jpg
        "
        class="
        ${i===1 ? "active" : ""}
        "
        onerror="this.style.display='none'"
        >

        `;

    }

    slider.innerHTML = images;

}

/* =========================
   INIT
========================= */

updateCartCount();
renderCartPopup();