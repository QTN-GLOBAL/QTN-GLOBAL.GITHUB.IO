const list = document.getElementById("list");

function render(data){
  list.innerHTML="";
  data.forEach(p=>{
    list.innerHTML+=`
    <div class="card">
      <img src="${p.images[0]}" onerror="this.src='images/no-image.png'">
      <h3>${p.name}</h3>
      <a href="chitiet.html?id=${p.id}">Chi tiết</a>
    </div>`;
  });
}

function filter(cat){
  if(cat==="all") render(products);
  else render(products.filter(p=>p.category===cat));
}

/* slider */
const hero=document.getElementById("hero-img");
let i=0;

if(hero){
  hero.src=products[0].images[0];
  setInterval(()=>{
    i=(i+1)%products.length;
    hero.src=products[i].images[0];
  },2500);
}

render(products);