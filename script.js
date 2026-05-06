const list = document.getElementById("product-list");

/* RENDER */
function renderProducts(data){
  list.innerHTML = "";
  data.forEach(p=>{
    list.innerHTML += `
      <div class="card">
        <img src="${p.images[0]}">
        <h3>${p.name}</h3>
        <a href="chitiet.html?id=${p.id}" class="btn">Chi tiết</a>
      </div>
    `;
  });
}

/* FILTER */
function filterProduct(c){
  if(c==="all") renderProducts(products);
  else renderProducts(products.filter(p=>p.category===c));
}

/* HERO SLIDER */
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
