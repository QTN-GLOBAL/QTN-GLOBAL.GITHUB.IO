/* =====================================================
   WEBSITE
   BRANDS
===================================================== */

function renderWebsiteBrands() {

    const workspace =
        document.getElementById("websiteWorkspace");

    if (!workspace) return;

    workspace.innerHTML = `

        <div class="website-page">

            <div class="page-header">

                <h2>🏷 Brand Manager</h2>

                <button
                    class="primary-btn"
                    id="addBrandBtn">

                    + Add Brand

                </button>

            </div>

            <table class="brands-table">

                <thead>

                    <tr>

                        <th width="60">#</th>

                        <th width="70">Logo</th>

                        <th>Brand</th>

                        <th width="120">Origin</th>

                        <th width="100">Category</th>

                        <th width="100">Products</th>

                        <th width="90">Status</th>

                        <th width="120">Action</th>

                    </tr>

                </thead>

                <tbody id="brandList">

                </tbody>

            </table>
<div id="brandEditorContainer"></div>
        </div>

    `;

    renderBrandList();

}

/* =====================================================
   BRAND LIST
===================================================== */

function renderBrandList() {

    const tbody =
        document.getElementById("brandList");

    if (!tbody) return;

    tbody.innerHTML = "";

    const brands =
        Object.values(BRAND_CONFIG);

    brands.forEach((brand, index) => {

        const totalCategory =
            brand.categories
                ? brand.categories.length
                : 0;

        const totalProduct =
            (window.products || []).filter(item =>

                item.brand &&
                item.brand.toLowerCase() ===
                brand.name.toLowerCase()

            ).length;

        tbody.innerHTML += `

            <tr>

                <td>

                    ${index + 1}

                </td>

                <td>

    <img
        src="${getBrandImage(brand.name)}"
        class="brand-image"
        onerror="this.src='images/no-image.jpg'">

</td>

                <td>

                    <strong>

                        ${brand.name}

                    </strong>

                </td>

                <td>

                    ${brand.origin}

                </td>

                <td>

                    ${totalCategory}

                </td>

                <td>

                    ${totalProduct}

                </td>

                <td>

                   <span class="${brand.active ? "status-active" : "status-hidden"}">

    ${brand.active ? "Active" : "Hidden"}

</span>

                </td>

                <td>

                   <button
    class="edit-btn"
    onclick="openBrandEditor('${brand.name}')">

    ✏ Edit

</button>

                    <button
                        class="delete-btn">

                        🗑

                    </button>

                </td>

            </tr>

        `;

    });

}
/* =====================================================
   GET CATEGORY FOLDER
===================================================== */

function getCategoryFolder(categoryId){

    const category = getCategory(categoryId);

    if(!category) return "";

    return category.folder;

}

/* =====================================================
   GET BRAND IMAGE
===================================================== */

function getBrandImage(brandName){

    const product = (window.products || []).find(item =>

        item.brand &&
        item.brand.toLowerCase() === brandName.toLowerCase()

    );

    if(!product){

        return "images/no-image.jpg";

    }

    return `images/${product.category}/${product.folder}/main.jpg`;
}
