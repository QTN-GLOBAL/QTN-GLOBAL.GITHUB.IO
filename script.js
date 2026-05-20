const productGrid = document.getElementById("productGrid");

if(productGrid){

products.forEach(product=>{

productGrid.innerHTML += `

<div class="product-card">

<img src="images/${product.category}/${product.folder}/main.jpg">

<div class="product-info">

<h3>${product.name}</h3>

<a class="detail-btn" href="chitiet.html?id=${product.id}">
Chi tiết
</a>

</div>

</div>

`;

});

}

const bannerImages = [

"images/can-ban/jwl/main.jpg",
"images/can-dem/vibra-alc/main.jpg"

];

let bannerIndex = 0;

const bannerImage = document.getElementById("bannerImage");

if(bannerImage){

setInterval(()=>{

bannerIndex++;

if(bannerIndex >= bannerImages.length){
bannerIndex = 0;
}

bannerImage.src = bannerImages[bannerIndex];

},3000);

}
function filterProducts(category){

    const productGrid =
    document.getElementById("productGrid");

    productGrid.innerHTML = "";

    const filteredProducts =
    products.filter(product =>
        product.category === category
    );

    filteredProducts.forEach(product=>{

        productGrid.innerHTML += `

        <div class="product-card">

            <img src="
            images/${product.category}/${product.folder}/main.jpg
            ">

            <h3>${product.name}</h3>

            <a href="
            chitiet.html?id=${product.id}
            " class="detail-btn">

                Chi tiết

            </a>

        </div>

        `;

    });

}
function openOrderPopup(){

    document
    .getElementById("orderPopup")
    .style.display = "flex";

}

function closeOrderPopup(){

    document
    .getElementById("orderPopup")
    .style.display = "none";

}

function openCartPopup(){

    document
    .getElementById("cartPopup")
    .style.display = "flex";

}

function closeCartPopup(){

    document
    .getElementById("cartPopup")
    .style.display = "none";

}
var cart = JSON.parse(localStorage.getItem("cart")) || [];
/* ===== OPEN / CLOSE ===== */
function openCart(){
    document.getElementById("cartModal").style.display = "flex";
    document.getElementById("cartOverlay").style.display = "block";
    renderCart();
}

function closeCart(){
    document.getElementById("cartModal").style.display = "none";
    document.getElementById("cartOverlay").style.display = "none";
}

/* ===== ADD TO CART ===== */
function addToCart(name, level, qty){

    const existed = cart.find(i =>
        i.name === name && i.level === level
    );

    if(existed){
        existed.qty += qty;
    }else{
        cart.push({name, level, qty});
    }

    saveCart();
    updateCartCount();
}

/* ===== RENDER CART ===== */
function renderCart(){

    const box = document.getElementById("cartBody");
    if(!box) return;

    box.innerHTML = "";

    if(cart.length === 0){
        box.innerHTML = "<p style='padding:15px'>Giỏ hàng trống</p>";
        return;
    }

    cart.forEach((item, index)=>{

        box.innerHTML += `
        <div class="cart-item">

            <h4>${item.name}</h4>
            <small>${item.level}</small>

            <div class="cart-row">
                <span>Số lượng: ${item.qty}</span>

                <button class="cart-remove"
                        onclick="removeItem(${index})">
                    Xóa
                </button>
            </div>

        </div>
        `;
    });
}

/* ===== REMOVE ===== */
function removeItem(index){
    cart.splice(index,1);
    saveCart();
    updateCartCount();
    renderCart();
}

/* ===== SAVE ===== */
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===== COUNT HEADER ===== */
function updateCartCount(){

    const total = cart.reduce((s,i)=>s+i.qty,0);

    const el = document.getElementById("cartCount");
    if(el) el.innerText = total;

    saveCart();
}

/* ===== CHECKOUT ===== */
function checkoutCart(){

    if(cart.length === 0){
        alert("Giỏ hàng trống");
        return;
    }

    let text = "ĐƠN HÀNG\n\n";

    cart.forEach(i=>{
        text += `- ${i.name} | ${i.level} | SL: ${i.qty}\n`;
    });

    navigator.clipboard.writeText(text);

    alert("Đã copy đơn hàng → dán Zalo/Messenger");

    window.open("https://zalo.me/0383598603");

}
updateCartCount();


      
          
        
   

