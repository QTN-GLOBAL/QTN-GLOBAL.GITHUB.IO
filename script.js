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

let cartItems =
JSON.parse(localStorage.getItem("cartItems")) || [];


function updateCartCount(){

    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount = document.getElementById("cartCount");

    if(cartCount){
        cartCount.innerText = total;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}


let cartItems =
JSON.parse(localStorage.getItem("cartItems")) || [];

updateCartCount();


   function confirmAddCart(){

    const inputs = document.querySelectorAll("#cartLevels input");

    let hasQty = false;

    inputs.forEach(input => {

        const qty = Number(input.value);

        if(qty > 0){
            hasQty = true;

            const level =
            input.parentElement.querySelector("span").innerText;

            const existed = cartItems.find(i =>
    i.name === document.getElementById("productName")?.innerText &&
    i.level === level
);

if(existed){
    existed.quantity += qty;
}else{
    cartItems.push({
        name: document.getElementById("productName")?.innerText || "Sản phẩm",
        level: level,
        quantity: qty
    });
}
    });

    if(!hasQty){
        alert("Vui lòng chọn số lượng");
        return;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartCount();
    renderCart();

    alert("Đã thêm vào giỏ hàng");

inputs.forEach(input => input.value = 0);

    closeCartPopup();
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

    cartItems.splice(index, 1);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartCount();
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

