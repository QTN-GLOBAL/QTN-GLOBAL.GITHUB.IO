let cart = JSON.parse(localStorage.getItem("cart")) || [];

const SHEET_API = "YOUR_GOOGLE_SCRIPT_URL";
const ZALO_PHONE = "0383598603";

function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart));
    const el = document.getElementById("cart-count");
    if(el) el.innerText = cart.length;
}

function validate(name,phone,address){
    if(!name || !phone || !address) return "Vui lòng nhập đầy đủ thông tin";
    if(phone.length < 9) return "Số điện thoại không hợp lệ";
    return null;
}

function addToCart(id){
    const p = products.find(x=>x.id===id);
    cart.push(p);
    saveCart();
    alert("Đã thêm vào giỏ");
}

function addToCartDetail(){
    const id = new URLSearchParams(location.search).get("id");
    const p = products.find(x=>x.id==id);
    cart.push(p);
    saveCart();
    alert("Đã thêm vào giỏ");
}

if(document.getElementById("product-list")){
    const box = document.getElementById("product-list");
    products.forEach(p=>{
        box.innerHTML += `
        <div class="product">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>${p.price.toLocaleString()}đ</p>
            <a href="chitiet.html?id=${p.id}">Chi tiết</a>
            <button onclick="addToCart(${p.id})">Thêm giỏ</button>
        </div>`;
    });
    saveCart();
}

async function checkout(){

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const err = validate(name,phone,address);
    if(err){ alert(err); return; }

    if(cart.length===0){ alert("Giỏ hàng trống"); return; }

    let total = cart.reduce((s,i)=>s+i.price,0);
    let items = cart.map(i=>i.name).join(", ");

    const order = {name,phone,address,items,total};

    try{
        await fetch(SHEET_API,{method:"POST",body:JSON.stringify(order)});
    }catch(e){
        console.log("error",e);
    }

    const msg = `QTN ORDER\n${name}\n${phone}\n${address}\n${items}\n${total}`;
    window.open(`https://zalo.me/${ZALO_PHONE}?text=${encodeURIComponent(msg)}`);

    alert("Đặt hàng thành công");

    cart=[];
    saveCart();
}

if(document.getElementById("product-detail")){
    const id = new URLSearchParams(location.search).get("id");
    const p = products.find(x=>x.id==id);

    document.getElementById("product-detail").innerHTML = `
        <h2>${p.name}</h2>
        <img src="${p.image}" width="300">
        <p>${p.desc}</p>
        <h3>${p.price.toLocaleString()}đ</h3>
    `;
}

saveCart();
