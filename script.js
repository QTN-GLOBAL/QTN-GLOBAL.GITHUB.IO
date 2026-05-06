const list = document.getElementById("product-list");
const slides = document.getElementById("slides");

/* PRODUCT */
function renderProducts(data){
  list.innerHTML="";
  data.forEach(p=>{
    list.innerHTML+=`
      <div class="card">
        <img src="${p.image}">
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

/* SLIDER FIX */
let i = 0;

function renderSlider(){
  slides.innerHTML = products.map(p =>
    `<img src="${p.image}" class="slide">`
  ).join("");

  const s = document.querySelectorAll(".slide");
  if(s.length > 0){
    s[0].style.opacity = 1;
  }
}

function autoSlide(){
  const s = document.querySelectorAll(".slide");

  s.forEach(x => x.style.opacity = 0);

  i++;
  if(i >= s.length) i = 0;

  s[i].style.opacity = 1;
}

renderSlider();
setInterval(autoSlide, 2500);

/* LOAD */
renderProducts(products);
