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
