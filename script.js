let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
updateCartCount();
}

function updateCartCount(){
document.querySelectorAll("#cartCount").forEach(e=>{
e.innerText = cart.length;
});
}

function addToCart(product){
cart.push(product);
saveCart();
}

function openCart(){
document.getElementById("cartModal").style.display="block";
renderCart();
}

function closeCart(){
document.getElementById("cartModal").style.display="none";
}

function renderCart(){
let html="";
cart.forEach((p,i)=>{
html+=`
<div>
<p>${p.name}</p>
<button onclick="removeItem(${i})">X</button>
</div>
`;
});
document.getElementById("cartBody").innerHTML=html;
}

function removeItem(i){
cart.splice(i,1);
saveCart();
renderCart();
}

function renderProducts(){
let grid=document.getElementById("productGrid");
if(!grid) return;

grid.innerHTML=products.map(p=>`
<div onclick="openDetail(${p.id})">
<h4>${p.name}</h4>
</div>
`).join("");
}

function openDetail(id){
location.href="chitiet.html?id="+id;
}

function loadDetail(){
let id=new URLSearchParams(location.search).get("id");
if(!id) return;

let p=products.find(x=>x.id==id);

document.getElementById("pName").innerText=p.name;
document.getElementById("pDesc").innerText=p.description;
document.getElementById("pSpecs").innerHTML=p.specs[0];

document.getElementById("mainImg").src=
"images/"+p.category+"/"+p.folder+"/1.jpg";
}

function buyNow(){
alert("Tạo form gửi Zalo/Messenger (bản sau mình nâng cấp tiếp)");
}

updateCartCount();
renderProducts();
loadDetail();