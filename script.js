/* =========================
   CART COUNT
========================= */

function updateCartCount(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item=>{

        total += Number(item.qty);

    });

    const cartCount =
    document.getElementById("cartCount");

    if(cartCount){

        cartCount.innerText = total;

    }

}

updateCartCount();

/* =========================
   IMAGE SLIDER
========================= */

function changeMainImage(src){

    const mainImage =
    document.getElementById("mainProductImage");

    if(mainImage){

        mainImage.src = src;

    }

}

/* =========================
   CHECK IMAGE EXISTS
========================= */

function checkImage(url){

    return new Promise((resolve)=>{

        const img = new Image();

        img.onload = ()=>resolve(true);

        img.onerror = ()=>resolve(false);

        img.src = url;

    });

}

/* =========================
   LOAD PRODUCT IMAGES
========================= */

async function loadProductImages(product){

    const thumbnailList =
    document.getElementById("thumbnailList");

    const mainImage =
    document.getElementById("mainProductImage");

    if(!thumbnailList || !mainImage) return;

    thumbnailList.innerHTML = "";

    let firstImage = "";

    for(let i = 1; i <= 5; i++){

        const imagePath =
        `images/${product.category}/${product.folder}/${i}.jpg`;

        const exists =
        await checkImage(imagePath);

        if(exists){

            if(firstImage === ""){

                firstImage = imagePath;

                mainImage.src = imagePath;

            }

            thumbnailList.innerHTML += `

            <img src="${imagePath}"
                 onclick="changeMainImage('${imagePath}')">

            `;

        }

    }

}

/* =========================
   OPEN BUY NOW POPUP
========================= */

function openBuyPopup(){

    const popup =
    document.getElementById("buyNowPopup");

    if(popup){

        popup.classList.add("active");

    }

}

/* =========================
   CLOSE BUY NOW POPUP
========================= */

function closeBuyPopup(){

    const popup =
    document.getElementById("buyNowPopup");

    if(popup){

        popup.classList.remove("active");

    }

}

/* =========================
   OPEN ADD CART POPUP
========================= */

function openAddCartPopup(){

    const popup =
    document.getElementById("addCartPopup");

    if(popup){

        popup.classList.add("active");

    }

}

/* =========================
   CLOSE ADD CART POPUP
========================= */

function closeAddCartPopup(){

    const popup =
    document.getElementById("addCartPopup");

    if(popup){

        popup.classList.remove("active");

    }

}

/* =========================
   OPEN VIEW CART
========================= */

function openViewCartPopup(){

    const popup =
    document.getElementById("viewCartPopup");

    if(popup){

        popup.classList.add("active");

        renderCart();

    }

}

/* =========================
   CLOSE VIEW CART
========================= */

function closeViewCartPopup(){

    const popup =
    document.getElementById("viewCartPopup");

    if(popup){

        popup.classList.remove("active");

    }

}

/* =========================
   ADD TO CART
========================= */

function addToCart(){

    const productName =
    document.getElementById("cartProductName").value;

    const productLevel =
    document.getElementById("cartProductLevel").value;

    const productQty =
    document.getElementById("cartQty").value;

    const productCategory =
    document.getElementById("cartProductCategory").value;

    const productFolder =
    document.getElementById("cartProductFolder").value;

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const existing =
    cart.find(item=>

        item.name === productName &&
        item.level === productLevel

    );

    if(existing){

        existing.qty += Number(productQty);

    }else{

        cart.push({

            name:productName,

            level:productLevel,

            qty:Number(productQty),

            category:productCategory,

            folder:productFolder

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert("Đã thêm vào giỏ hàng");

    closeAddCartPopup();

}

/* =========================
   RENDER CART
========================= */

function renderCart(){

    const cartItems =
    document.getElementById("cartItems");

    const cartTotalQty =
    document.getElementById("cartTotalQty");

    if(!cartItems) return;

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let html = "";

    let totalQty = 0;

    if(cart.length === 0){

        html = `

        <p class="empty-cart">
            Chưa có sản phẩm nào trong giỏ hàng
        </p>

        `;

    }else{

        cart.forEach((item,index)=>{

            totalQty += Number(item.qty);

            html += `

            <div class="cart-item">

                <div class="cart-top">

                    <img src="
                    images/${item.category}/${item.folder}/1.jpg
                    "
                    class="cart-image">

                    <div class="cart-info">

                        <h4>${item.name}</h4>

                        <p>
                            <b>Mức cân:</b>
                            ${item.level}
                        </p>

                    </div>

                </div>

                <div class="cart-actions">

                    <div class="qty-box">

                        <button onclick="
                        decreaseQty(${index})
                        ">
                            -
                        </button>

                        <span>${item.qty}</span>

                        <button onclick="
                        increaseQty(${index})
                        ">
                            +
                        </button>

                    </div>

                    <button class="buy-cart-btn"
                            onclick="
                            openCartBuyNow(${index})
                            ">

                        MUA NGAY

                    </button>

                </div>

            </div>

            `;

        });

    }

    cartItems.innerHTML = html;

    if(cartTotalQty){

        cartTotalQty.innerText = totalQty;

    }

}

/* =========================
   INCREASE QTY
========================= */

function increaseQty(index){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

    updateCartCount();

}

/* =========================
   DECREASE QTY
========================= */

function decreaseQty(index){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

    updateCartCount();

}

/* =========================
   OPEN BUY FROM CART
========================= */

function openCartBuyNow(index){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const item = cart[index];

    openBuyPopup();

    document.getElementById("customerProduct")
            .value = item.name;

    document.getElementById("customerLevel")
            .value = item.level;

    document.getElementById("customerQty")
            .value = item.qty;

}

/* =========================
   SEND ORDER ZALO
========================= */

function sendOrderToZalo(){

    const customerName =
    document.getElementById("customerName").value;

    const customerPhone =
    document.getElementById("customerPhone").value;

    const customerCompany =
    document.getElementById("customerCompany").value;

    const customerTax =
    document.getElementById("customerTax").value;

    const customerInvoice =
    document.getElementById("customerInvoice").value;

    const customerAddress =
    document.getElementById("customerAddress").value;

    const product =
    document.getElementById("customerProduct").value;

    const level =
    document.getElementById("customerLevel").value;

    const qty =
    document.getElementById("customerQty").value;

    if(customerName === "" || customerPhone === ""){

        alert("Vui lòng nhập tên và số điện thoại");

        return;

    }

    const message =

`ĐƠN HÀNG QTN GLOBAL

Tên khách hàng: ${customerName}

Số điện thoại: ${customerPhone}

Công ty: ${customerCompany}

Mã số thuế: ${customerTax}

Địa chỉ hóa đơn:
${customerInvoice}

Địa chỉ giao hàng:
${customerAddress}

Tên sản phẩm:
${product}

Mức cân:
${level}

Số lượng:
${qty}
`;

    window.open(
        "https://zalo.me/0383598603",
        "_blank"
    );

}

/* =========================
   SEND ORDER MESSENGER
========================= */

function sendOrderToMessenger(){

    window.open(
        "https://m.me/QTNSCALE",
        "_blank"
    );

}

/* =========================
   CLOSE POPUP CLICK OUTSIDE
========================= */

window.onclick = function(e){

    document.querySelectorAll(".popup-overlay")
    .forEach(popup=>{

        if(e.target === popup){

            popup.classList.remove("active");

        }

    });

}