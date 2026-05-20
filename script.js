/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if(menuToggle){

    menuToggle.onclick = () => {

        navbar.classList.toggle("active");

    };

}

/* =========================================
   SLIDER TRANG CHỦ
========================================= */

let slideIndex = 0;

const slides = document.querySelectorAll(".slide");

function showSlide(index){

    slides.forEach(slide=>{

        slide.style.display = "none";

    });

    if(slides[index]){

        slides[index].style.display = "block";

    }

}

function nextSlide(){

    slideIndex++;

    if(slideIndex >= slides.length){

        slideIndex = 0;

    }

    showSlide(slideIndex);

}

if(slides.length > 0){

    showSlide(slideIndex);

    setInterval(nextSlide,4000);

}

/* =========================================
   GIỎ HÀNG
========================================= */

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

}

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

updateCartCount();

/* =========================================
   THÊM VÀO GIỎ
========================================= */

function addToCart(productId){

    const product =
    products.find(
        p => p.id == productId
    );

    if(!product) return;

    const weight =
    document.getElementById("weightSelect")
    ? document.getElementById("weightSelect").value
    : "";

    const quantity =
    document.getElementById("qtyInput")
    ? parseInt(document.getElementById("qtyInput").value)
    : 1;

    const existingItem = cart.find(
        item =>
        item.id == productId &&
        item.weight == weight
    );

    if(existingItem){

        existingItem.quantity += quantity;

    }else{

        cart.push({

            id:product.id,
            name:product.name,
            image:`images/${product.category}/${product.folder}/1.jpg`,
            weight:weight,
            quantity:quantity

        });

    }

    saveCart();

    closeCartPopup();

    alert("Đã thêm vào giỏ hàng");

}

/* =========================================
   POPUP THÊM GIỎ HÀNG
========================================= */

function openAddCartPopup(productId){

    const popup =
    document.getElementById("cartPopup");

    if(!popup) return;

    const product =
    products.find(
        p => p.id == productId
    );

    let options = "";

    if(product.specs[0]){

        const parser =
        new DOMParser();

        const doc =
        parser.parseFromString(
            product.specs[0],
            "text/html"
        );

        const rows =
        doc.querySelectorAll("tr");

        rows.forEach((row,index)=>{

            if(index === 0) return;

            const firstTd =
            row.querySelector("td");

            if(firstTd){

                options += `
                <option value="${firstTd.innerText}">
                    ${firstTd.innerText}
                </option>
                `;

            }

        });

    }

    popup.innerHTML = `

    <div class="popup-box">

        <span class="close-popup"
              onclick="closeCartPopup()">

            ✕

        </span>

        <h2>
            THÊM VÀO GIỎ HÀNG
        </h2>

        <p class="popup-product-name">
            ${product.name}
        </p>

        <label>
            Mức cân
        </label>

        <select id="weightSelect">

            ${options}

        </select>

        <label>
            Số lượng
        </label>

        <div class="qty-box">

            <button onclick="changeQty(-1)">
                -
            </button>

            <input type="number"
                   id="qtyInput"
                   value="1"
                   min="1">

            <button onclick="changeQty(1)">
                +
            </button>

        </div>

        <button class="popup-btn"
                onclick="addToCart(${product.id})">

            THÊM VÀO GIỎ

        </button>

    </div>

    `;

    popup.style.display = "flex";

}

function closeCartPopup(){

    const popup =
    document.getElementById("cartPopup");

    if(popup){

        popup.style.display = "none";

    }

}

function changeQty(value){

    const qtyInput =
    document.getElementById("qtyInput");

    if(!qtyInput) return;

    let qty =
    parseInt(qtyInput.value);

    qty += value;

    if(qty < 1){

        qty = 1;

    }

    qtyInput.value = qty;

}

/* =========================================
   GIỎ HÀNG HEADER
========================================= */

function openViewCartPopup(){

    const popup =
    document.getElementById("cartPopup");

    if(!popup) return;

    let html = `

    <div class="popup-box cart-view-popup">

        <span class="close-popup"
              onclick="closeCartPopup()">

            ✕

        </span>

        <h2>
            GIỎ HÀNG CỦA BẠN
        </h2>

    `;

    if(cart.length === 0){

        html += `
        <p>
            Chưa có sản phẩm nào
        </p>
        `;

    }else{

        cart.forEach((item,index)=>{

            html += `

            <div class="cart-item-popup">

                <img src="${item.image}">

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Mức cân:
                        ${item.weight}
                    </p>

                    <div class="qty-box">

                        <button onclick="updateCartQty(${index},-1)">
                            -
                        </button>

                        <input type="text"
                               value="${item.quantity}"
                               readonly>

                        <button onclick="updateCartQty(${index},1)">
                            +
                        </button>

                    </div>

                </div>

            </div>

            `;

        });

        html += `

        <button class="popup-btn"
                onclick="openCheckoutPopup()">

            MUA NGAY

        </button>

        `;

    }

    html += `</div>`;

    popup.innerHTML = html;

    popup.style.display = "flex";

}

function updateCartQty(index,value){

    cart[index].quantity += value;

    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }

    saveCart();

    openViewCartPopup();

}

/* =========================================
   FORM MUA NGAY
========================================= */

function openBuyNow(productId){

    const product =
    products.find(
        p => p.id == productId
    );

    let options = "";

    if(product.specs[0]){

        const parser =
        new DOMParser();

        const doc =
        parser.parseFromString(
            product.specs[0],
            "text/html"
        );

        const rows =
        doc.querySelectorAll("tr");

        rows.forEach((row,index)=>{

            if(index === 0) return;

            const firstTd =
            row.querySelector("td");

            if(firstTd){

                options += `
                <option value="${firstTd.innerText}">
                    ${firstTd.innerText}
                </option>
                `;

            }

        });

    }

    const popup =
    document.getElementById("cartPopup");

    popup.innerHTML = `

    <div class="popup-box checkout-popup">

        <span class="close-popup"
              onclick="closeCartPopup()">

            ✕

        </span>

        <h2>
            ĐẶT HÀNG
        </h2>

        <input type="text"
               id="customerName"
               placeholder="Tên khách hàng">

        <input type="text"
               id="customerPhone"
               placeholder="Số điện thoại">

        <input type="text"
               id="customerCompany"
               placeholder="Công ty">

        <input type="text"
               id="customerTax"
               placeholder="Mã số thuế">

        <textarea id="customerInvoice"
                  placeholder="Địa chỉ viết hóa đơn"></textarea>

        <textarea id="customerAddress"
                  placeholder="Địa chỉ giao hàng"></textarea>

        <input type="text"
               value="${product.name}"
               id="productName"
               readonly>

        <select id="weightSelect">

            ${options}

        </select>

        <input type="number"
               id="buyQty"
               value="1"
               min="1">

        <div class="checkout-buttons">

            <button onclick="sendToZalo()">
                GỬI ZALO
            </button>

            <button onclick="sendToMessenger()">
                GỬI MESSENGER
            </button>

        </div>

    </div>

    `;

    popup.style.display = "flex";

}

function openCheckoutPopup(){

    const popup =
    document.getElementById("cartPopup");

    popup.innerHTML = `

    <div class="popup-box checkout-popup">

        <span class="close-popup"
              onclick="closeCartPopup()">

            ✕

        </span>

        <h2>
            ĐẶT HÀNG
        </h2>

        <input type="text"
               id="customerName"
               placeholder="Tên khách hàng">

        <input type="text"
               id="customerPhone"
               placeholder="Số điện thoại">

        <input type="text"
               id="customerCompany"
               placeholder="Công ty">

        <input type="text"
               id="customerTax"
               placeholder="Mã số thuế">

        <textarea id="customerInvoice"
                  placeholder="Địa chỉ viết hóa đơn"></textarea>

        <textarea id="customerAddress"
                  placeholder="Địa chỉ giao hàng"></textarea>

        <div class="checkout-buttons">

            <button onclick="sendCartToZalo()">
                GỬI ZALO
            </button>

            <button onclick="sendCartToMessenger()">
                GỬI MESSENGER
            </button>

        </div>

    </div>

    `;

    popup.style.display = "flex";

}

/* =========================================
   GỬI ZALO / MESSENGER
========================================= */

function sendToZalo(){

    const text = createOrderText();

    window.open(
        `https://zalo.me/0383598603?text=${encodeURIComponent(text)}`,
        "_blank"
    );

}

function sendToMessenger(){

    const text = createOrderText();

    window.open(
        `https://m.me/QTNSCALE`,
        "_blank"
    );

    alert(
        "Messenger đã mở.\nVui lòng gửi nội dung:\n\n" + text
    );

}

function createOrderText(){

    return `
Tên KH: ${document.getElementById("customerName").value}

SĐT: ${document.getElementById("customerPhone").value}

Công ty: ${document.getElementById("customerCompany").value}

MST: ${document.getElementById("customerTax").value}

Địa chỉ HĐ:
${document.getElementById("customerInvoice").value}

Địa chỉ giao hàng:
${document.getElementById("customerAddress").value}

Sản phẩm:
${document.getElementById("productName").value}

Mức cân:
${document.getElementById("weightSelect").value}

Số lượng:
${document.getElementById("buyQty").value}
`;

}

function sendCartToZalo(){

    let text = `
ĐƠN HÀNG QTN GLOBAL
`;

    cart.forEach(item=>{

        text += `

${item.name}
Mức cân: ${item.weight}
Số lượng: ${item.quantity}

`;

    });

    window.open(
        `https://zalo.me/0383598603?text=${encodeURIComponent(text)}`,
        "_blank"
    );

}

function sendCartToMessenger(){

    window.open(
        `https://m.me/QTNSCALE`,
        "_blank"
    );

    alert(
        "Messenger đã mở.\nVui lòng gửi đơn hàng."
    );

}