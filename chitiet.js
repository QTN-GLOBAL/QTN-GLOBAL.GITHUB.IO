let cart = JSON.parse(localStorage.getItem("cart")) || [];

function getProducts() {
    return Array.isArray(products) ? products : [];
}

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const product = getProducts().find(p => p.id === id);

window.currentProduct = product;

function renderDetail() {
    if (!product) {
        document.body.innerHTML = "<h2>Sản phẩm không tồn tại</h2>";
        return;
    }

    document.getElementById("productName").innerText = product.name;
    document.getElementById("productBrand").innerText = product.brand;
    document.getElementById("productOrigin").innerText = product.origin;
    document.getElementById("productDesc").innerText = product.description;

    document.getElementById("mainImage").src =
        `images/${product.category}/${product.folder}/main.jpg`;

    let thumbs = "";
    for (let i = 1; i <= 5; i++) {
        thumbs += `
        <img src="images/${product.category}/${product.folder}/${i}.jpg"
             onclick="changeImage(this.src)"
             onerror="this.remove()">
        `;
    }

    document.getElementById("thumbList").innerHTML = thumbs;

    let specHTML = "<ul>";
    (product.specs || []).forEach(s => {
        specHTML += `<li>${s}</li>`;
    });
    specHTML += "</ul>";

    document.getElementById("productSpecs").innerHTML = specHTML;
}

/* =========================
   IMAGE SWITCH
========================= */
function changeImage(src) {
    document.getElementById("mainImage").src = src;
}

/* =========================
   CART FROM DETAIL
========================= */
function addToCartDetail() {
    if (!product) return;

    cart.push({
        id: product.id,
        name: product.name,
        qty: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Đã thêm vào giỏ!");
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", renderDetail);