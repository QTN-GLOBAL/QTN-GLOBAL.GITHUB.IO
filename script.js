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

let cart =
Number(localStorage.getItem("cart")) || 0;

const cartCount =
document.getElementById("cartCount");

if(cartCount){

    cartCount.innerText = cart;

}

function addToCart(){

    cart++;

    localStorage.setItem("cart", cart);

    if(cartCount){

    cartCount.innerText = cart;

}

    alert("Đã thêm vào giỏ hàng");

}

function confirmAddCart(){

    const inputs =
    document.querySelectorAll(
        "#cartLevels input"
    );

    let total = 0;

    inputs.forEach(input=>{

        total += Number(input.value);

    });

    if(total <= 0){

        alert("Vui lòng chọn số lượng");

        return;

    }

    cart += total;
    localStorage.setItem("cart", cart);

    if(cartCount){

    cartCount.innerText = cart;

}


cartItems.push({

    name: document
    .getElementById("productName")
    ?.innerText || "Sản phẩm",

    quantity: total

});

localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
);


    alert("Đã thêm vào giỏ hàng");

    closeCartPopup();

}
window.onclick = function(event){

    const orderPopup =
    document.getElementById("orderPopup");

    const cartPopup =
    document.getElementById("cartPopup");

    if(event.target === orderPopup){

        closeOrderPopup();

    }

    if(event.target === cartPopup){

        closeCartPopup();

    }

}
let cartItems =
JSON.parse(localStorage.getItem("cartItems")) || [];

function saveCart(){

    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

}

function renderCart(){

   const cartBox =
   document.getElementById("viewCartItems");

    if(!cartBox) return;

    cartBox.innerHTML = "";

    if(cartItems.length === 0){

        cartBox.innerHTML =
        "<p>Giỏ hàng trống</p>";

        return;

    }

    cartItems.forEach(item=>{

        cartBox.innerHTML += `
        <div class="cart-row">

            <span>${item.name}</span>

            <b>${item.quantity}</b>

        </div>
        `;

    });

}
renderCart();
function openViewCartPopup(){

    document
    .getElementById("viewCartPopup")
    .style.display = "flex";

}

function closeViewCartPopup(){

    document
    .getElementById("viewCartPopup")
    .style.display = "none";

}
