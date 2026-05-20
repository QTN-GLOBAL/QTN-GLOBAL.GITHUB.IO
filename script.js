/* =========================
   HIỂN THỊ SẢN PHẨM
========================= */

const productGrid = document.getElementById("productGrid");

function renderProducts(list){

    if(!productGrid) return;

    productGrid.innerHTML = "";

    list.forEach(product => {

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

/* LOAD TOÀN BỘ */
if(productGrid){

    renderProducts(products);

}

/* =========================
   FILTER DANH MỤC
========================= */

function filterProducts(category){

    const filtered = products.filter(product =>
        product.category === category
    );

    renderProducts(filtered);

}

/* =========================
   BANNER SLIDER
========================= */

const bannerImages = [

    "images/can-ban/jadever-jwl/main.jpg",
    "images/can-dem/vibra-alc/main.jpg"

];

let bannerIndex = 0;

const bannerImage =
document.getElementById("bannerImage");

if(bannerImage){

    setInterval(()=>{

        bannerIndex++;

        if(bannerIndex >= bannerImages.length){

            bannerIndex = 0;

        }

        bannerImage.src =
        bannerImages[bannerIndex];

    },3000);

}

/* =========================
   GIỎ HÀNG PRO
========================= */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

/* ===== OPEN ===== */

function openCart(){

    const modal =
    document.getElementById("cartModal");

    const overlay =
    document.getElementById("cartOverlay");

    if(modal) modal.style.display = "flex";

    if(overlay) overlay.style.display = "block";

    renderCart();

}

/* ===== CLOSE ===== */

function closeCart(){

    const modal =
    document.getElementById("cartModal");

    const overlay =
    document.getElementById("cartOverlay");

    if(modal) modal.style.display = "none";

    if(overlay) overlay.style.display = "none";

}

/* ===== ADD ===== */

function addToCart(name, level, qty){

    qty = Number(qty);

    if(qty <= 0) return;

    const existed = cart.find(item =>

        item.name === name &&
        item.level === level

    );

    if(existed){

        existed.qty += qty;

    }else{

        cart.push({
            name,
            level,
            qty
        });

    }

    saveCart();

    updateCartCount();

    alert("Đã thêm vào giỏ hàng");

}

/* ===== REMOVE ===== */

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    updateCartCount();

    renderCart();

}

/* ===== RENDER ===== */

function renderCart(){

    const cartBody =
    document.getElementById("cartBody");

    if(!cartBody) return;

    cartBody.innerHTML = "";

    if(cart.length === 0){

        cartBody.innerHTML = `
        <p class="empty-cart">
            Giỏ hàng đang trống
        </p>
        `;

        return;

    }

    cart.forEach((item,index)=>{

        cartBody.innerHTML += `

        <div class="cart-item">

            <h4>${item.name}</h4>

            <p>${item.level}</p>

            <div class="cart-row">

                <span>
                    SL: ${item.qty}
                </span>

                <button
                    class="cart-remove"
                    onclick="removeItem(${index})">

                    Xóa

                </button>

            </div>

        </div>

        `;

    });

}

/* ===== SAVE ===== */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

/* ===== HEADER COUNT ===== */

function updateCartCount(){

    const total = cart.reduce(
        (sum,item)=>sum + item.qty,
        0
    );

    const count =
    document.getElementById("cartCount");

    if(count){

        count.innerText = total;

    }

}

/* ===== CHECKOUT ===== */

function checkoutCart(){

    if(cart.length === 0){

        alert("Giỏ hàng đang trống");

        return;

    }

    let message =
`ĐƠN HÀNG QTN GLOBAL

`;

    cart.forEach(item=>{

        message +=
`- ${item.name}
${item.level}
SL: ${item.qty}

`;

    });

    navigator.clipboard.writeText(message);

    alert(
        "Đã copy đơn hàng.\nHãy dán vào Zalo để gửi."
    );

    window.open(
        "https://zalo.me/0383598603",
        "_blank"
    );

}

/* ===== LOAD ===== */

updateCartCount();