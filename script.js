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
let cart = 0;

function addToCart(){

    cart++;

    document
    .getElementById("cartCount")
    .innerText = cart;

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

    document
    .getElementById("cartCount")
    .innerText = cart;

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
