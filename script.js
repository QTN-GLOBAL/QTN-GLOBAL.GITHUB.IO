let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let currentSlide = 0;

let images = [];

let currentProduct = null;

/* =========================
   SAVE CART
========================= */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount(){

    const cartCount =
    document.getElementById("cartCount");

    if(!cartCount) return;

    let total = 0;

    cart.forEach(item=>{

        total += Number(item.qty);

    });

    cartCount.innerText = total;

}

updateCartCount();

/* =========================
   GET LEVELS
========================= */

function getLevelsFromSpecs(product){

    let levels = [];

    if(!product || !product.specs)
        return levels;

    product.specs.forEach(spec=>{

        if(spec.includes("<table")){

            const temp =
            document.createElement("div");

            temp.innerHTML = spec;

            const rows =
            temp.querySelectorAll("tr");

            rows.forEach((row,index)=>{

                if(index === 0) return;

                const cols =
                row.querySelectorAll("td");

                if(cols.length > 0){

                    levels.push(
                        cols[0].innerText
                    );

                }

            });

        }

    });

    return levels;

}

/* =========================
   ORDER POPUP
========================= */

function openOrderPopup(){

    const popup =
    document.getElementById("orderPopup");

    if(!popup || !currentProduct)
        return;

    popup.classList.add("active");

    document.getElementById(
        "orderProductName"
    ).value = currentProduct.name;

    const levels =
    getLevelsFromSpecs(currentProduct);

    const select =
    document.getElementById("orderLevel");

    select.innerHTML = "";

    if(levels.length === 0){

        select.innerHTML = `
        <option value="Liên hệ">
            Liên hệ
        </option>
        `;

    }else{

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

    const popup =
    document.getElementById("orderPopup");

    if(popup){

        popup.classList.remove("active");

    }

}

/* =========================
   CART POPUP
========================= */

function openCartPopup(){

    const popup =
    document.getElementById("cartPopup");

    if(!popup || !currentProduct)
        return;

    popup.classList.add("active");

    document.getElementById(
        "cartProductName"
    ).value = currentProduct.name;

    const levels =
    getLevelsFromSpecs(currentProduct);

    const select =
    document.getElementById("cartLevel");

    select.innerHTML = "";

    if(levels.length === 0){

        select.innerHTML = `
        <option value="Liên hệ">
            Liên hệ
        </option>
        `;

    }else{

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

    const popup =
    document.getElementById("cartPopup");

    if(popup){

        popup.classList.remove("active");

    }

}

/* =========================
   ADD TO CART
========================= */

function addToCart(){

    if(!currentProduct) return;

    const level =
    document.getElementById("cartLevel").value;

    const qty = parseInt(
        document.getElementById("cartQty").value
    ) || 1;

    const existingItem =
    cart.find(item=>

        item.id === currentProduct.id
        &&
        item.level === level

    );

    if(existingItem){

        existingItem.qty += qty;

    }else{

        cart.push({

            id: currentProduct.id,

            name: currentProduct.name,

            category: currentProduct.category,

            folder: currentProduct.folder,

            level,

            qty

        });

    }

    saveCart();

    updateCartCount();

    alert("Đã thêm vào giỏ hàng");

    closeCartPopup();

}

/* =========================
   LOAD PRODUCT IMAGES
========================= */

function loadProductImages(product){

    if(!product) return;

    currentProduct = product;

    currentSlide = 0;

    const basePath =
    `images/${product.category}/${product.folder}`;

    images = [];

    let loaded = 0;

    for(let i = 1; i <= 10; i++){

        const img = new Image();

        img.src = `${basePath}/${i}.jpg`;

        img.onload = function(){

            if(!images.includes(img.src)){

                images.push(img.src);

                loaded++;

                renderThumbs();

            }

        };

    }

}

/* =========================
   RENDER THUMBNAILS
========================= */

function renderThumbs(){

    const mainImage =
    document.getElementById("mainImage");

    const thumbList =
    document.getElementById("thumbList");

    if(!mainImage || !thumbList)
        return;

    if(images.length === 0){

        mainImage.src =
        "images/no-image.jpg";

        return;

    }

    mainImage.src = images[currentSlide];

    let html = "";

    images.forEach((img,index)=>{

        html += `

        <img src="${img}"
             loading="lazy"
             onclick="showSlide(${index})"
             onerror="
             this.src='images/no-image.jpg'
             ">

        `;

    });

    thumbList.innerHTML = html;

}

/* =========================
   SLIDER
========================= */

function showSlide(index){

    currentSlide = index;

    const mainImage =
    document.getElementById("mainImage");

    if(mainImage){

        mainImage.src = images[index];

    }

}

function nextSlide(){

    if(images.length === 0)
        return;

    currentSlide++;

    if(currentSlide >= images.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

function prevSlide(){

    if(images.length === 0)
        return;

    currentSlide--;

    if(currentSlide < 0){

        currentSlide =
        images.length - 1;

    }

    showSlide(currentSlide);

}

/* =========================
   AUTO SLIDE
========================= */

if(document.getElementById("mainImage")){

    setInterval(()=>{

        if(images.length > 1){

            nextSlide();

        }

    },3000);

}

/* =========================
   VIEW CART
========================= */

function openViewCartPopup(){

    const popup =
    document.getElementById("viewCartPopup");

    if(!popup) return;

    popup.classList.add("active");

    renderCart();

}

function closeViewCartPopup(){

    const popup =
    document.getElementById("viewCartPopup");

    if(popup){

        popup.classList.remove("active");

    }

}

/* =========================
   RENDER CART
========================= */

function renderCart(){

    const cartItems =
    document.getElementById("cartItems");

    if(!cartItems) return;

    let totalQty = 0;

    let html = "";

    if(cart.length === 0){

        html = `

        <p class="empty-cart">

            Chưa có sản phẩm nào
            trong giỏ hàng

        </p>

        `;

    }else{

        cart.forEach((item,index)=>{

            totalQty += Number(item.qty);

            html += `

            <div class="cart-item">

                <div class="cart-top">

                    <img src="
                    images/${item.category}/${item.folder}/1.jpg
                    "
                    class="cart-image"
                    loading="lazy"
                    onerror="
                    this.src='images/no-image.jpg'
                    ">

                    <div class="cart-info">

                        <h4>${item.name}</h4>

                        <p>

                            <b>Mức cân:</b>

                            ${item.level}

                        </p>

                    </div>

                </div>

                <div class="cart-actions">

                    <button onclick="
                    decreaseQty(${index})
                    ">
                        -
                    </button>

                    <span>${item.qty}</span>

                    <button onclick="
                    increaseQty(${index})
                    ">
                        +
                    </button>

                    <button class="remove-btn"
                            onclick="
                            removeCart(${index})
                            ">
                        Xóa
                    </button>

                </div>

            </div>

            `;

        });

    }

    cartItems.innerHTML = html;

    const totalEl =
    document.getElementById("cartTotalQty");

    if(totalEl){

        totalEl.innerText = totalQty;

    }

}

/* =========================
   CART FUNCTIONS
========================= */

function increaseQty(index){

    cart[index].qty++;

    saveCart();

    renderCart();

    updateCartCount();

}

function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }

    saveCart();

    renderCart();

    updateCartCount();

}

function removeCart(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

    updateCartCount();

}

function clearCart(){

    if(confirm(
        "Xóa toàn bộ giỏ hàng?"
    )){

        cart = [];

        localStorage.removeItem("cart");

        renderCart();

        updateCartCount();

    }

}

/* =========================
   SEND CART
========================= */

function sendCartToZalo(){

    if(cart.length === 0){

        alert("Giỏ hàng đang trống");

        return;

    }

    window.open(
        "https://zalo.me/0383598603",
        "_blank"
    );

}

function sendCartToMessenger(){

    if(cart.length === 0){

        alert("Giỏ hàng đang trống");

        return;

    }

    window.open(
        "https://m.me/QTNSCALE",
        "_blank"
    );

}

/* =========================
   CLOSE POPUP CLICK OUTSIDE
========================= */

window.onclick = function(event){

    document
    .querySelectorAll(".popup-overlay")
    .forEach(popup=>{

        if(event.target === popup){

            popup.classList.remove("active");

        }

    });

};