let currentProduct = null;
let currentIndex = 0;

/* INDEX RENDER */
function renderProducts(){
const grid = document.getElementById("productGrid");
if(!grid) return;

grid.innerHTML = products.map(p => `
<div class="card" onclick="goDetail(${p.id})">
<h3>${p.name}</h3>
<p>${p.brand}</p>
</div>
`).join("");
}

function goDetail(id){
location.href = "chitiet.html?id=" + id;
}

/* LOAD DETAIL */
function loadDetail(){
if(!location.pathname.includes("chitiet")) return;

const id = new URLSearchParams(location.search).get("id");
currentProduct = products.find(p => p.id == id);

document.getElementById("name").innerText = currentProduct.name;
document.getElementById("desc").innerText = currentProduct.description;

/* LEVELS */
const levels = extractLevels(currentProduct.specs[0]);
document.getElementById("levelSelect").innerHTML =
levels.map(l => `<option>${l}</option>`).join("");

/* SLIDER */
loadImages(currentProduct);
}

/* EXTRACT LEVEL */
function extractLevels(html){
let div = document.createElement("div");
div.innerHTML = html;
return [...div.querySelectorAll("tr td:first-child")]
.map(e => e.innerText);
}

/* SLIDER */
function loadImages(p){
let imgs = [];
for(let i=1;i<=5;i++){
imgs.push(`images/${p.category}/${p.folder}/${i}.jpg`);
}
document.getElementById("mainImage").src = imgs[0];

window.images = imgs;
}

function nextSlide(){
currentIndex = (currentIndex+1)%images.length;
document.getElementById("mainImage").src = images[currentIndex];
}

function prevSlide(){
currentIndex = (currentIndex-1+images.length)%images.length;
document.getElementById("mainImage").src = images[currentIndex];
}

/* CART */
function addToCart(){
addItem(currentProduct, levelSelect.value, qty.value);
}

/* BUY NOW */
function buyNow(){
openCheckoutSingle(currentProduct);
}

renderProducts();
loadDetail();