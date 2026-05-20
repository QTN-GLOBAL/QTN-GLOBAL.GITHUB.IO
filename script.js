/* =========================
   GIỎ HÀNG
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ĐẾM GIỎ HÀNG
========================= */

function updateCartCount(){

    const cartCount = document.getElementById("cartCount");

    if(cartCount){

        cartCount.innerText = cart.length;

    }

}

updateCartCount();

/* =========================
   LẤY MỨC CÂN TỪ TABLE
========================= */

function getLevelsFromSpecs(product){

    let levels = [];

    product.specs.forEach(spec=>{

        if(spec.includes("<table")){

            const temp = document.createElement("div");

            temp.innerHTML = spec;

            const rows = temp.querySelectorAll("tr");

            rows.forEach((row,index)=>{

                if(index === 0) return;

                const cols = row.querySelectorAll("td");

                if(cols.length > 0){

                    levels.push(cols[0].innerText);

                }

            });

        }

    });

    return levels;

}

/* =========================
   POPUP MUA NGAY
========================= */

function openOrderPopup(){

    document.getElementById("orderPopup").style.display = "flex";

    if(typeof product !== "undefined"){

        document.getElementById("orderProductName").value = product.name;

        const levels = getLevelsFromSpecs(product);

        const select = document.getElementById("orderLevel");

        select.innerHTML = "";

        levels.forEach(level=>{

            select.innerHTML += `
            <option value="${level}">
                ${level}
            </option>
            `;

        });

    }

}

function closeOrderPopup(){

    document.getElementById("orderPopup").style.display = "none";

}

/* =========================
   POPUP GIỎ HÀNG
========================= */

function openCartPopup(){

    document.getElementById("cartPopup").style.display = "flex";

    if(typeof product !== "undefined"){

        document.getElementById("cartProductName").value = product.name;

        const levels = getLevelsFromSpecs(product);

        const select = document.getElementById("cartLevel");

        select.innerHTML = "";

        levels.forEach(level=>{

            select.innerHTML += `
            <option value="${level}">
                ${level}
            </option>
            `;

        });

    }

}

function closeCartPopup(){

    document.getElementById("cartPopup").style.display = "none";

}

/* =========================
   THÊM GIỎ HÀNG
========================= */

function addToCart(){

    const level = document.getElementById("cartLevel").value;

    const qty = document.getElementById("cartQty").value;

    cart.push({

        id: product.id,

        name: product.name,

        level: level,

        qty: qty,

        image: `images/${product.category}/${product.folder}/1.jpg`

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Đã thêm vào giỏ hàng!");

    closeCartPopup();

}

/* =========================
   MỞ TRANG GIỎ HÀNG
========================= */

function openViewCartPopup(){

    window.location.href = "giohang.html";

}

/* =========================
   SLIDER ẢNH
========================= */

let currentSlide = 0;

let images = [];

function loadProductImages(product){

    const basePath =
    `images/${product.category}/${product.folder}`;

    images = [];

    for(let i = 1; i <= 5; i++){

        const img = new Image();

        img.src = `${basePath}/${i}.jpg`;

        img.onload = function(){

            if(!images.includes(img.src)){

                images.push(img.src);

                renderThumbs();

            }

        };

    }

}

function renderThumbs(){

    const mainImage =
    document.getElementById("mainImage");

    const thumbList =
    document.getElementById("thumbList");

    if(!mainImage || !thumbList) return;

    if(images.length === 0) return;

    mainImage.src = images[currentSlide];

    thumbList.innerHTML = "";

    images.forEach((img,index)=>{

        thumbList.innerHTML += `
        <img src="${img}"
             onclick="showSlide(${index})">
        `;

    });

}

function showSlide(index){

    currentSlide = index;

    document.getElementById("mainImage").src =
    images[index];

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= images.length){

        currentSlide = 0;

    }

    document.getElementById("mainImage").src =
    images[currentSlide];

}

function prevSlide(){

    currentSlide--;

    if(currentSlide < 0){

        currentSlide = images.length - 1;

    }

    document.getElementById("mainImage").src =
    images[currentSlide];

}

/* =========================
   AUTO SLIDE
========================= */

setInterval(()=>{

    if(images.length > 1){

        nextSlide();

    }

},3000);

/* =========================
   GỬI ZALO
========================= */

function sendToZalo(){

    const name =
    document.getElementById("customerName").value;

    const phone =
    document.getElementById("customerPhone").value;

    const company =
    document.getElementById("customerCompany").value;

    const tax =
    document.getElementById("customerTax").value;

    const bill =
    document.getElementById("customerBill").value;

    const address =
    document.getElementById("customerAddress").value;

    const level =
    document.getElementById("orderLevel").value;

    const qty =
    document.getElementById("orderQty").value;

    const message =
`ĐƠN ĐẶT HÀNG QTN GLOBAL

Tên KH: ${name}

SĐT: ${phone}

Công ty: ${company}

MST: ${tax}

Địa chỉ hóa đơn:
${bill}

Địa chỉ giao hàng:
${address}

Sản phẩm:
${product.name}

Mức cân:
${level}

Số lượng:
${qty}`;

    const zaloUrl =
`https://zalo.me/0383598603`;

    window.open(zaloUrl,"_blank");

}

/* =========================
   GỬI MESSENGER
========================= */

function sendToMessenger(){

    window.open(
        "https://m.me/QTNSCALE",
        "_blank"
    );

}