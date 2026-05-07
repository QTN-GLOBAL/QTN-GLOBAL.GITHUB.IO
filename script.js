const productList = document.getElementById("product-list");

products.forEach(p => {

  const imagePath =
  `images/${p.category_folder}/${p.image_folder}/main.jpg`;

  productList.innerHTML += `

    <div class="card">

      <img
        src="${imagePath}"
        onerror="this.src='images/logo.png'"
      >

      <div class="card-content">

        <h3>${p.name}</h3>

        <a href="chitiet.html?id=${p.id}" class="btn">
          Chi tiết
        </a>

      </div>

    </div>

  `;
});