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

let cartItems =
JSON.parse(localStorage.getItem("cartItems")) || [];


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


inputs.forEach(input=>{

    const qty = Number(input.value);

    if(qty > 0){

        const level =
        input.parentElement
        .querySelector("span")
        .innerText;

        cartItems.push({

    name: document
    .getElementById("productName")
    ?.innerText || "Sản phẩm",

    level: level,

    quantity: qty

});
    }

});

localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
);

renderCart();

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

    cartItems.forEach((item,index)=>{

    cartBox.innerHTML += `

    <div class="cart-row">

        <div class="cart-left">

            <span>${item.name}</span><br>

            <small>${item.level}</small>

        </div>

        <div class="cart-right">

            <b>${item.quantity}</b>

            <button onclick="removeCartItem(${index})"
                    class="remove-cart">

                Xóa

            </button>

        </div>

    </div>

    `;

});
}

function removeCartItem(index){

    // trừ số lượng
    cart -= Number(cartItems[index].quantity);

    // nếu âm thì về 0
    if(cart < 0){

        cart = 0;

    }

    // cập nhật localStorage
    localStorage.setItem("cart", cart);

    // cập nhật số trên icon giỏ
    if(cartCount){

        cartCount.innerText = cart;

    }

    // xóa sản phẩm
    cartItems.splice(index, 1);

    // lưu lại giỏ hàng
    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );

    // render lại
    renderCart();

}
window.onload = function(){

    renderCart();

}

function openViewCartPopup(){

    renderCart();

    document
    .getElementById("viewCartPopup")
    .style.display = "flex";

}


function closeViewCartPopup(){

    document
    .getElementById("viewCartPopup")
    .style.display = "none";

}