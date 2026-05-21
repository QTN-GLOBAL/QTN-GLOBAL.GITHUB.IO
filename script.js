/* =========================
   GIỎ HÀNG
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   CẬP NHẬT SỐ LƯỢNG CART
========================= */

function updateCartCount(){

    let total = 0;

    cart.forEach(item=>{
        total += item.quantity;
    });

    const cartCount = document.getElementById("cartCount");

    if(cartCount){
        cartCount.innerText = total;
    }

}

/* =========================
   HIỂN THỊ SẢN PHẨM
========================= */

const productGrid = document.getElementById("productGrid");

function renderProducts(productList = products){

    if(!productGrid) return;

    productGrid.innerHTML = "";

    productList.forEach(product=>{

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
   LỌC DANH MỤC
========================= */

function filterProducts(category){

    const filtered = products.filter(product =>
        product.category === category
    );

    renderProducts(filtered);

}


/* =========================
   MỞ GIỎ HÀNG
========================= */

function openCart(){

    const cartModal = document.getElementById("cartModal");
    const cartOverlay = document.getElementById("cartOverlay");

    if(cartModal){
        cartModal.classList.add("active");
    }

    if(cartOverlay){
        cartOverlay.style.display = "block";
    }

    renderCart();

}

/* =========================
   ĐÓNG GIỎ HÀNG
========================= */

function closeCart(){

    const cartModal = document.getElementById("cartModal");
    const cartOverlay = document.getElementById("cartOverlay");

    if(cartModal){
        cartModal.classList.remove("active");
    }

    if(cartOverlay){
        cartOverlay.style.display = "none";
    }

}

/* =========================
   THÊM VÀO GIỎ
========================= */

function addToCart(id){

    const product = products.find(p => p.id == id);

    if(!product) return;

    const existing = cart.find(item => item.id == id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({
            ...product,
            quantity:1
        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    openCart();

}

/* =========================
   HIỂN THỊ GIỎ HÀNG
========================= */

function renderCart(){

    const cartBody = document.getElementById("cartBody");

    if(!cartBody) return;

    if(cart.length === 0){

        cartBody.innerHTML = `
            <p>Chưa có sản phẩm nào</p>
        `;

        return;

    }

    cartBody.innerHTML = "";

    cart.forEach(item=>{

        cartBody.innerHTML += `

        <div class="cart-item">

            <img src="images/${item.category}/${item.folder}/main.jpg"
                 width="80">

            <h4>${item.name}</h4>

            <div class="qty">

                <button onclick="decreaseQty(${item.id})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQty(${item.id})">
                    +
                </button>

            </div>

            <button onclick="removeCart(${item.id})">
                Xóa
            </button>

        </div>

        `;

    });

}

/* =========================
   TĂNG SỐ LƯỢNG
========================= */

function increaseQty(id){

    const item = cart.find(i => i.id == id);

    if(item){
        item.quantity++;
    }

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();

    updateCartCount();

}

/* =========================
   GIẢM SỐ LƯỢNG
========================= */

function decreaseQty(id){

    const item = cart.find(i => i.id == id);

    if(item){

        item.quantity--;

        if(item.quantity <= 0){

            cart = cart.filter(i => i.id != id);

        }

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();

    updateCartCount();

}

/* =========================
   XÓA SẢN PHẨM
========================= */

function removeCart(id){

    cart = cart.filter(item => item.id != id);

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();

    updateCartCount();

}

/* =========================
   MUA NGAY
========================= */

function checkoutCart(){

    if(cart.length === 0){

        alert("Giỏ hàng đang trống");

        return;

    }

    alert("Chức năng đặt hàng sẽ nâng cấp tiếp");

}

/* =========================
   KHỞI CHẠY
========================= */

renderProducts();

updateCartCount();
/* =========================
   HERO SLIDER
========================= */

const bannerImage = document.getElementById("bannerImage");

if(bannerImage){

const banners = [

"images/can-ban/jwl/main.jpg",
"images/can-dem/jcl/main.jpg",
"images/can-treo/fj5/main.jpg",
"images/can-phan-tich/oks-dj/main.jpg",
"images/can-chong-nuoc/super-ss/main.jpg",
"images/can-in-tem-ma-vach/ind-pp/main.jpg"

];

let currentBanner = 0;

setInterval(()=>{

currentBanner++;

if(currentBanner >= banners.length){
currentBanner = 0;
}

bannerImage.src = banners[currentBanner];

},3000);

}
/* =========================
POPUP ADD CART
========================= */

let selectedProduct = null;

function addToCartDetail(){

if(!window.product) return;

selectedProduct = window.product;

document.getElementById("addCartPopup").style.display="flex";

document.getElementById("popupCartImg").src =
`images/${product.category}/${product.folder}/main.jpg`;

document.getElementById("popupCartName").innerText =
product.name;

let html = "";

const capSpec = product.specs.find(spec =>
spec.includes("Mức cân")
);

let capacities = [];

if(capSpec){

capacities = capSpec
.replace("Mức cân:","")
.split("/");

}

capacities.forEach(cap=>{

html += `<option>${cap.trim()}</option>`;

});

document.getElementById("popupCartCapacity").innerHTML =
html;

}

/* =========================
CLOSE ADD CART
========================= */

function closeAddCart(){

document.getElementById("addCartPopup").style.display="none";

}

/* =========================
CONFIRM ADD CART
========================= */

function confirmAddCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({

id:selectedProduct.id,

name:selectedProduct.name,

capacity:document.getElementById("popupCartCapacity").value,

qty:Number(document.getElementById("popupCartQty").value),

image:`images/${selectedProduct.category}/${selectedProduct.folder}/main.jpg`

});

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

closeAddCart();

alert("Đã thêm vào giỏ hàng");

}

/* =========================
BUY NOW
========================= */

function buyNow(){

selectedProduct = window.product;

document.getElementById("buyPopup").style.display="flex";

document.getElementById("buyProductName").value =
selectedProduct.name;

let html = "";

const capSpec = selectedProduct.specs.find(spec =>
spec.includes("Mức cân")
);

let capacities = [];

if(capSpec){

capacities = capSpec
.replace("Mức cân:","")
.split("/");

}

capacities.forEach(cap=>{

html += `<option>${cap.trim()}</option>`;

});

document.getElementById("buyCapacity").innerHTML =
html;

}

/* =========================
CLOSE BUY
========================= */

function closeBuyPopup(){

document.getElementById("buyPopup").style.display="none";

}

/* =========================
QTY
========================= */

function changeQty(type,amount){

let input;

if(type==="cart"){
input=document.getElementById("popupCartQty");
}else{
input=document.getElementById("buyQty");
}

let value = Number(input.value);

value += amount;

if(value<1) value=1;

input.value = value;

}

/* =========================
COPY ORDER
========================= */

function buildOrderText(){

return `
KHÁCH HÀNG: ${document.getElementById("customerName").value}

SĐT: ${document.getElementById("customerPhone").value}

CÔNG TY: ${document.getElementById("customerCompany").value}

MST: ${document.getElementById("customerTax").value}

ĐỊA CHỈ XUẤT HÓA ĐƠN:
${document.getElementById("customerInvoice").value}

ĐỊA CHỈ GIAO HÀNG:
${document.getElementById("customerAddress").value}

SẢN PHẨM:
${document.getElementById("buyProductName").value}

MỨC CÂN:
${document.getElementById("buyCapacity").value}

SỐ LƯỢNG:
${document.getElementById("buyQty").value}
`;

}

/* =========================
SEND ZALO
========================= */

function sendOrderZalo(){

const text = buildOrderText();

navigator.clipboard.writeText(text);

alert("Đã copy nội dung đơn hàng");

window.open("https://zalo.me/0383598603","_blank");

}

/* =========================
SEND MESS
========================= */

function sendOrderMessenger(){

const text = buildOrderText();

navigator.clipboard.writeText(text);

alert("Đã copy nội dung đơn hàng");

window.open("https://m.me/QTNSCALE","_blank");

}