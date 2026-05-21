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
   SLIDER BANNER
========================= */

const bannerImages = [

    "images/can-ban/jadever-jwl/main.jpg",
    "images/can-dem/jcl/main.jpg",
    "images/can-ky-thuat/ohaus/main.jpg"

];

let currentBanner = 0;

function changeBanner(){

    const banner = document.getElementById("bannerImage");

    if(!banner) return;

    currentBanner++;

    if(currentBanner >= bannerImages.length){
        currentBanner = 0;
    }

    banner.src = bannerImages[currentBanner];

}

setInterval(changeBanner,5000);

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