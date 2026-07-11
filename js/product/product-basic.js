/* =====================================================
   PRODUCT BASIC
   STEP 1
   - Render Basic Information
===================================================== */

function renderProductBasic() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;

    body.innerHTML = `

        <div class="product-basic">

            <h3 class="product-step-title">

                Basic Information

            </h3>

            <!-- =========================
                 BUSINESS
            ========================== -->

            <div class="form-group">

                <label>

                    Business

                </label>

                <select id="productBusiness">

                    <option value="">

                        Select Business

                    </option>

                </select>

            </div>

            <!-- =========================
                 CATEGORY
            ========================== -->

            <div class="form-group">

                <label>

                    Category

                </label>

                <select id="productCategory">

                    <option value="">

                        Select Category

                    </option>

                </select>

            </div>

            <!-- =========================
                 BRAND
            ========================== -->

            <div class="form-group">

                <label>

                    Brand

                </label>

                <select id="productBrand">

                    <option value="">

                        Select Brand

                    </option>

                </select>

            </div>
 <!-- =========================
                Search Product
            ========================== -->
<div class="form-group">

    <label>

        🔍 Search Product

    </label>

    <input
        id="productSearch"
        type="text"
        placeholder="Nhập model, tên sản phẩm, thương hiệu..."
        autocomplete="off">

    <div id="productSearchResult"></div>

</div>
            <!-- =========================
                 PRODUCT NAME
            ========================== -->

            <div class="form-group">

                <label>

                    Product Name

                </label>

                <input
    id="productName"
    type="text"
    placeholder="Product Name"
    oninput="updateProductInfo()">

            </div>

            <!-- =========================
                 FOLDER
            ========================== -->

            <div class="form-group">

                <label>

                    Folder

                </label>

                <input
    id="productFolder"
    type="text"
    readonly>

            </div>

            <!-- =========================
                 PRODUCT ID
            ========================== -->

            <div class="form-group">

                <label>

                    Product ID

                </label>

                <input
    id="productId"
    type="text"
    readonly>

            </div>

            <!-- =========================
                 STATUS
            ========================== -->

            <div class="form-group">

                <label>

                    Status

                </label>

                <div class="status-group">

                    <label>

                        <input
                            type="radio"
                            name="productStatus"
                            value="draft"
                            checked>

                        Draft

                    </label>

                    <label>

                        <input
                            type="radio"
                            name="productStatus"
                            value="active">

                        Active

                    </label>

                    <label>

                        <input
                            type="radio"
                            name="productStatus"
                            value="hidden">

                        Hidden

                    </label>

                </div>

            </div>

        </div>

      `;

    initProductBasic();

}
/* =====================================================
   INIT PRODUCT BASIC
===================================================== */

function initProductBasic() {

    loadBusinessOptions();

    bindBasicEvents();

    const business =
        document.getElementById("productBusiness");

    if (business) {

        loadCategoryOptions(business.value);

    }

    generateProductId();
    initProductSearch();

}

/* =====================================================
   LOAD BUSINESS OPTIONS
===================================================== */

function loadBusinessOptions() {

    const select =
        document.getElementById("productBusiness");

    if (!select) return;

    select.innerHTML = "";

    const businesses = getBusinesses();

    businesses.forEach(business => {

        const option =
            document.createElement("option");

        option.value = business.id;

        option.textContent =
            `${business.icon} ${business.name}`;

        select.appendChild(option);

    });

}
/* =====================================================
   LOAD CATEGORY OPTIONS
===================================================== */

function loadCategoryOptions(businessId) {

    const select =
        document.getElementById("productCategory");

    if (!select) return;

    select.innerHTML = "";

    if (!businessId) {

        select.innerHTML =
            `<option value="">Select Category</option>`;

        return;

    }

    const categories =
        getCategories(businessId);

    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category.id;

        option.textContent =
            `${category.icon} ${category.name}`;

        select.appendChild(option);

    });

    /* Load Brand theo Category đầu tiên */

    if (categories.length > 0) {

        loadBrandOptions(categories[0].id);

    }

}
/* =====================================================
   LOAD BRAND
===================================================== */

function loadBrandOptions(categoryId) {

    const business =
        document.getElementById("productBusiness");

    const brand =
        document.getElementById("productBrand");

    if (!business || !brand) return;

    brand.innerHTML = "";

    const brands =
        getBrandsByBusiness(business.value);

    brands.forEach(item => {

        // Nếu có category thì chỉ hiện brand hỗ trợ category đó
        if (
            categoryId &&
            item.categories &&
            !item.categories.includes(categoryId)
        ) {
            return;
        }

        brand.innerHTML += `
            <option value="${item.name}">
                ${item.name}
            </option>
        `;

    });

}
/* =====================================================
   BIND EVENTS
===================================================== */

function bindBasicEvents() {

    const business =
        document.getElementById("productBusiness");

    const category =
        document.getElementById("productCategory");

    const productName =
        document.getElementById("productName");

    /* =========================
       BUSINESS
    ========================= */

    if (business) {

        business.addEventListener("change", function () {

            loadCategoryOptions(this.value);

            generateFolder();

            generateProductId();

        });

    }

    /* =========================
       CATEGORY
    ========================= */

    if (category) {

        category.addEventListener("change", function () {

            loadBrandOptions();

            generateFolder();

        });

    }

   /* =========================
   PRODUCT NAME
========================= */

if (productName) {

    function updateProduct() {

        generateFolder();

        generateProductId();

    }

    productName.addEventListener("input", updateProduct);

    productName.addEventListener("change", updateProduct);

    productName.addEventListener("keyup", updateProduct);

}

}
/* =====================================================
   GENERATE FOLDER
===================================================== */

function generateFolder() {

    const categorySelect =
        document.getElementById("productCategory");

    const productName =
        document.getElementById("productName");

    const folderInput =
        document.getElementById("productFolder");

    if (
        !categorySelect ||
        !productName ||
        !folderInput
    ) return;

    const category =
        getCategory(categorySelect.value);

    if (!category) {

        folderInput.value = "";

        return;

    }

    let slug =
        productName.value.trim();

    if (slug !== "") {

        slug = slug
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        folderInput.value =
            `${category.folder}/${slug}`;

    } else {

        folderInput.value =
            `${category.folder}/`;

    }

}
/* =====================================================
   BUSINESS PREFIX
===================================================== */

function getBusinessPrefix(businessId) {

    const map = {

        measure: "ME",

        industry: "IN",

        home: "HO",

        service: "SV",

        trade: "TR"

    };

    return map[businessId] || "PD";

}
/* =====================================================
   GENERATE PRODUCT ID
===================================================== */

function generateProductId() {

    const productName =
        document.getElementById("productName");

    const productId =
        document.getElementById("productId");

    if (!productName || !productId) return;

    const product =
        findProductByName(productName.value);

    if (product) {

    productId.value = product.id;

    updateBrandFromProduct(product);

    return;

}

    productId.value =
        getNextProductId();

}
/* =====================================================
   GET NEXT PRODUCT ID
===================================================== */

function getNextProductId() {

    if (!window.products || window.products.length === 0) {

        return 1;

    }

    let maxId = 0;

    window.products.forEach(product => {

        if (product.id > maxId) {

            maxId = product.id;

        }

    });

    return maxId + 1;

}
/* =====================================================
   FIND PRODUCT BY NAME
===================================================== */

function findProductByName(productName) {

    if (
        !window.products ||
        !Array.isArray(window.products)
    ) {

        return null;

    }

    const keyword = productName
        .trim()
        .toLowerCase();

    return window.products.find(product =>

        product.name &&
        product.name.trim().toLowerCase() === keyword

    ) || null;

}
/* =====================================================
   UPDATE BRAND FROM PRODUCT
===================================================== */

function updateBrandFromProduct(product) {

    if (!product) return;

    const brandSelect =
        document.getElementById("productBrand");

    if (!brandSelect) return;

    const brandName =
        String(product.brand || "").toLowerCase();

    for (const option of brandSelect.options) {

        if (
            option.value.toLowerCase() === brandName ||
            option.text.toLowerCase() === brandName
        ) {

            brandSelect.value = option.value;

            return;

        }

    }

}
/* =====================================================
   AUTO PRODUCT INFO
===================================================== */

function updateProductInfo(){

    const nameInput = document.getElementById("productName");
    const folderInput = document.getElementById("productFolder");
    const categorySelect = document.getElementById("productCategory");
    const brandSelect = document.getElementById("productBrand");

    if(!nameInput) return;

    const keyword =
        nameInput.value.trim().toLowerCase();

    if(keyword === ""){

        if(folderInput) folderInput.value = "";

        return;

    }

    // ============================================
    // TÌM TRONG products.js
    // ============================================

    const product = (window.products || []).find(item =>

        item.folder &&
        item.folder.toLowerCase() === keyword

    );

    if(product){

        // Hiện đầy đủ tên sản phẩm

        nameInput.value = product.name;

        // Folder

        if(folderInput){

            folderInput.value = product.folder;

        }

        // Category

        if(categorySelect){

            categorySelect.value = product.category;

            categorySelect.dispatchEvent(
                new Event("change")
            );

        }

        // Brand

        if(brandSelect){

            brandSelect.value = product.brand;

        }

        return;

    }

    // ============================================
    // KHÔNG TÌM THẤY
    // ============================================

    if(folderInput){

        folderInput.value = "";

    }

}
/* =====================================================
   PRODUCT SEARCH
===================================================== */

function initProductSearch() {

    const input = document.getElementById("productSearch");
    const result = document.getElementById("productSearchResult");

    if (!input || !result) return;

    input.addEventListener("input", function () {

        const keyword = this.value.trim().toLowerCase();

        result.innerHTML = "";

        if (keyword.length < 2) {

            result.style.display = "none";
            return;

        }

        const list = (window.products || []).filter(item => {

            return (
                item.name.toLowerCase().includes(keyword) ||
                item.folder.toLowerCase().includes(keyword) ||
                item.brand.toLowerCase().includes(keyword) ||
                item.category.toLowerCase().includes(keyword)
            );

        });

        if (!list.length) {

            result.style.display = "none";
            return;

        }

        list.slice(0, 10).forEach(item => {

            result.innerHTML += `

                <div
                    class="search-product-item"
                    onclick="selectProduct(${item.id})">

                    <div class="search-product-code">

                        ${item.folder}

                    </div>

                    <div class="search-product-name">

                        ${item.name}

                    </div>

                </div>

            `;

        });

        result.style.display = "block";

    });

}
/* =====================================================
   SELECT PRODUCT
===================================================== */

function selectProduct(productId){

    const product = (window.products || []).find(item =>

        item.id == productId

    );

    if(!product) return;

   // Business
const businessSelect = document.getElementById("productBusiness");
businessSelect.value = product.business;

// Load Category
loadCategoryOptions();

// Category
const categorySelect = document.getElementById("productCategory");
categorySelect.value = product.category;

// Load Brand theo Category mới
loadBrandOptions();

// Brand
const brandSelect = document.getElementById("productBrand");
brandSelect.value = product.brand;

    // Name
    document.getElementById("productName").value =
        product.name;

    // Folder
    document.getElementById("productFolder").value =
        product.folder;

    // Product ID
    document.getElementById("productId").value =
        product.id;

    // Đóng kết quả tìm kiếm
    document.getElementById("productSearchResult").style.display = "none";

    // Hiện đúng model
    document.getElementById("productSearch").value =
        product.folder;

}
