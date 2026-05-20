
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(c){
  localStorage.setItem("cart", JSON.stringify(c));
}

function openCart(){
  renderCart();
  document.getElementById("cartOverlay").style.display="block";
  document.getElementById("cartModal").style.display="block";
}

function closeCart(){
  document.getElementById("cartOverlay").style.display="none";
  document.getElementById("cartModal").style.display="none";
}

function addToCart(name, spec, price=""){

  let cart = getCart();

  let item = {name, spec, price, qty:1};

  let exist = cart.find(i=>i.name===name && i.spec===spec);

  if(exist){
    exist.qty++;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  updateCount();
}

function addToCartDetail(){
  addToCart(product.name, product.spec, product.price);
  alert("Đã thêm vào giỏ");
}

function renderCart(){

  let cart = getCart();
  let box = document.getElementById("cartBody");

  box.innerHTML="";

  if(cart.length===0){
    box.innerHTML="Giỏ hàng trống";
    return;
  }

  cart.forEach((i,index)=>{

    let div=document.createElement("div");
    div.className="cart-item";

    div.innerHTML=`
      <b>${i.name}</b>
      <div>${i.spec}</div>

      <div class="qty">
        <button onclick="changeQty(${index},-1)">-</button>
        <span>${i.qty}</span>
        <button onclick="changeQty(${index},1)">+</button>
      </div>

      <button onclick="removeItem(${index})">Xóa</button>
    `;

    box.appendChild(div);
  });

  updateCount();
}

function changeQty(i,v){
  let cart=getCart();
  cart[i].qty+=v;
  if(cart[i].qty<1) cart[i].qty=1;
  saveCart(cart);
  renderCart();
}

function removeItem(i){
  let cart=getCart();
  cart.splice(i,1);
  saveCart(cart);
  renderCart();
}

function updateCount(){
  let cart=getCart();
  let total=cart.reduce((s,i)=>s+i.qty,0);
  let el=document.getElementById("cartCount");
  if(el) el.innerText=total;
}

function buildOrder(){

  let cart=getCart();
  let text="📦 ĐƠN HÀNG\n\n";

  cart.forEach(i=>{
    text+=`- ${i.name} (${i.spec}) x${i.qty}\n`;
  });

  return text;
}

async function sendZalo(){
  await navigator.clipboard.writeText(buildOrder());
  window.open("https://zalo.me/0383598603");
  alert("Đơn đã copy, chỉ cần gửi");
}

async function sendMessenger(){
  await navigator.clipboard.writeText(buildOrder());
  window.open("https://m.me/QTNSCALE");
}

function updateCount(){
  let cart=getCart();
  let total=cart.reduce((s,i)=>s+i.qty,0);
  let el=document.getElementById("cartCount");
  if(el) el.innerText=total;
}

updateCount();
