const list = document.getElementById("product-list");

// load tất cả
function renderProducts(data){
  list.innerHTML = "";

  data.forEach(p => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <a href="chitiet.html?id=${p.id}" class="btn">Chi tiết</a>
      </div>
    `;
  });
}

// lọc
function filterProduct(category){
  if(category === "all"){
    renderProducts(products);
  }else{
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// load lần đầu
renderProducts(products);
