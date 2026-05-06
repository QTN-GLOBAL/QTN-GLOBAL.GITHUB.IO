const list = document.getElementById("product-list");

/* render */
function renderProducts(data){
  list.innerHTML = "";
  data.forEach(p=>{
    list.innerHTML += `
      <div class="card">
        <img src="${p.images[0]}" onerror="this.src='images/no-image.png'">
        <h3>${p.name}</h3>
        <a href="chitiet.html?id=${p.id}" class="btn">Chi tiết</a>
      </div>
    `;
  });
}

/* hero slider */
let i = 0;
const heroImg = document.getElementById("hero-img");

function runHero(){
  setInterval(()=>{
    i++;
    if(i >= products.length) i = 0;

    heroImg.src = products[i].images[0];
  },2500);
}

heroImg.src = products[0].images[0];
runHero();

renderProducts(products);
