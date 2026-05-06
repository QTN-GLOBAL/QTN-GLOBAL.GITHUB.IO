const list = document.getElementById("product-list");
const slides = document.getElementById("slides");

/* ===== RENDER PRODUCT ===== */
function renderProducts(data){
  list.innerHTML = "";
  data.forEach(p=>{
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <a href="chitiet.html?id=${p.id}" class="btn">Chi tiết</a>
      </div>
    `;
  });
}

/* ===== FILTER ===== */
function filterProduct(category){
  if(category==="all"){
    renderProducts(products);
  }else{
    renderProducts(products.filter(p=>p.category===category));
  }
}

/* ===== SLIDER ===== */
let index = 0;

function renderSlider(){
  slides.innerHTML = products.map(p=>
    `<img src="${p.image}" class="slide">`
  ).join("");
}

function autoSlide(){
  const all = document.querySelectorAll(".slide");
  all.forEach(s=>s.style.display="none");

  index++;
  if(index > all.length) index = 1;

  all[index-1].style.display = "block";
}

renderSlider();
setInterval(autoSlide, 2500);

/* LOAD */
renderProducts(products);
