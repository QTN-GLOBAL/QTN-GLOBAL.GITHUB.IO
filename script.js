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
function renderWeightLevels(){

    const orderLevels =
    document.getElementById("orderLevels");

    const cartLevels =
    document.getElementById("cartLevels");

    if(!orderLevels || !cartLevels) return;

    orderLevels.innerHTML = "";
    cartLevels.innerHTML = "";

    let levels = [];

    product.specs.forEach(spec=>{

        if(spec.includes("kg") || spec.includes("tấn")){

            const splitLevels =
            spec.split(":");

            if(splitLevels.length > 1){

                levels =
                splitLevels[1]
                .split("/")
                .map(x=>x.trim());

            }

        }

    });

    levels.forEach(level=>{

        orderLevels.innerHTML += `
        <div class="cart-row">
            <span>${level}</span>
            <input type="number"
                   min="0"
                   value="0">
        </div>
        `;

        cartLevels.innerHTML += `
        <div class="cart-row">
            <span>${level}</span>
            <input type="number"
                   min="0"
                   value="0">
        </div>
        `;

    });

}

renderWeightLevels();