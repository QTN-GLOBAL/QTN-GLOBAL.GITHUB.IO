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

                Step 1 / 6 - Basic Information

            </h3>
<div class="draft-panel">

    <label>Draft Products</label>

    <div id="draftProductList">

    </div>

</div>

            <div class="form-group">

                <label>Business</label>

                <select id="productBusiness">

                    <option value="">

                        Select Business

                    </option>

                </select>

            </div>

            <div class="form-group">

                <label>Category</label>

                <select id="productCategory">

                    <option value="">

                        Select Category

                    </option>

                </select>

            </div>

            <div class="form-group">

                <label>Brand</label>

                <select id="productBrand">

                    <option value="">

                        Select Brand

                    </option>

                </select>

            </div>

            <div class="form-group">

                <label>Origin</label>

                <input
                    id="productOrigin"
                    type="text"
                    readonly
                    placeholder="Auto from Brand">

            </div>

            <div class="form-group">

                <label>🔍 Search Product</label>

                <input
                    id="productSearch"
                    type="text"
                    placeholder="Nhập model, tên sản phẩm, thương hiệu..."
                    autocomplete="off">

                <div id="productSearchResult"></div>

            </div>

            <div class="form-group">

                <label>Product Name</label>

                <input
                    id="productName"
                    type="text"
                    placeholder="Product Name"
                    oninput="updateProductInfo()">

            </div>

            <div class="form-group">

                <label>Folder</label>

                <input
                    id="productFolder"
                    type="text"
                    readonly>

            </div>

            <div class="form-group">

                <label>Product ID</label>

                <input
                    id="productId"
                    type="text"
                    readonly>

            </div>

            <div class="form-group">

                <label>Status</label>

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

            <div class="step-buttons">

               <button
    type="button"
    onclick="nextProductBasic()">

    Next →

</button>

            </div>

        </div>

    `;

   initProductBasic();

loadProductBasic();

renderDraftList();

}
/* ==========================================
   INIT PRODUCT BASIC
========================================== */

function initProductBasic() {

    // Load Business trước
    loadBusinessOptions();

    // Bind Events
    bindBasicEvents();

    // Khởi tạo Search
    initProductSearch();

    // Đồng bộ Product Name -> Folder
    bindProductSync();

    // Chỉ sinh ID khi chưa có
    if (!window.currentProduct.id) {

        generateProductId();

    }

}
/* =====================================================
   LOAD BUSINESS OPTIONS
===================================================== */

function loadBusinessOptions() {

    const select =
        document.getElementById("productBusiness");

    if (!select) return;

    // Lưu giá trị đang chọn
    const currentValue = window.currentProduct.business || "";

    // Xóa danh sách cũ
    select.innerHTML = "";

    // Option mặc định
    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Select Business";

    select.appendChild(defaultOption);

    // Load dữ liệu
    const businesses = getBusinesses();

    businesses.forEach(business => {

        const option =
            document.createElement("option");

        option.value = business.id;

        option.textContent =
            `${business.icon} ${business.name}`;

        select.appendChild(option);

    });

    // Khôi phục giá trị cũ
    select.value = currentValue;

}
/* =====================================================
   LOAD CATEGORY OPTIONS
===================================================== */

function loadCategoryOptions(businessId) {

    const select =
        document.getElementById("productCategory");

    if (!select) return;

    // Xóa danh sách cũ
    select.innerHTML = "";

    // Option mặc định
    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Select Category";

    select.appendChild(defaultOption);

    if (!businessId) {

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

    // Xóa danh sách cũ
    brand.innerHTML = "";

    // Option mặc định
    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Select Brand";

    brand.appendChild(defaultOption);

    const brands =
        getBrandsByBusiness(business.value);

    brands.forEach(item => {

        // Chỉ hiện Brand hỗ trợ Category
        if (
            categoryId &&
            item.categories &&
            !item.categories.includes(categoryId)
        ) {
            return;
        }

        const option =
            document.createElement("option");

        option.value = item.name;

        option.textContent = item.name;

        brand.appendChild(option);

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

    const brand =
        document.getElementById("productBrand");

    const productName =
        document.getElementById("productName");

    /* =========================
       BUSINESS
    ========================= */

    if (business) {

        business.addEventListener("change", function () {

            loadCategoryOptions(this.value);
        });

    }

    /* =========================
       CATEGORY
    ========================= */

    if (category) {

        category.addEventListener("change", function () {

            loadBrandOptions(this.value);

        });

    }

    /* =========================
       BRAND
    ========================= */

    if (brand) {

        brand.addEventListener("change", function () {

            updateOrigin();

        });

    }

    /* =========================
       PRODUCT NAME
    ========================= */

    if (productName) {

        function updateProduct() {

            generateFolder();

            // Chỉ tạo ID khi chưa có
            if (!window.currentProduct.id) {

                generateProductId();

            }

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

    const productName =
        document.getElementById("productName");

    const folderInput =
        document.getElementById("productFolder");

    if (!productName || !folderInput) return;

    // Nếu đã có Folder thì giữ nguyên
    if (window.currentProduct.folder) {

        folderInput.value =
            window.currentProduct.folder;

        return;

    }

    // Nếu sản phẩm đã tồn tại
    const product =
        findProductByName(productName.value);

    if (product) {

        folderInput.value = product.folder;

        return;

    }

    // Nếu là sản phẩm mới
    folderInput.value =
        createProductFolder(productName.value);

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

    // Nếu currentProduct đã có ID thì giữ nguyên
    if (window.currentProduct.id) {

        productId.value =
            window.currentProduct.id;

        return;

    }

    // Nếu sản phẩm đã tồn tại
    const product =
        findProductByName(productName.value);

    if (product) {

        productId.value = product.id;

        updateBrandFromProduct(product);

        return;

    }

    // Chỉ sinh ID cho sản phẩm mới
    productId.value =
        getNextProductId();

}
/* ========================================
=============
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

function updateProductInfo() {

    const nameInput =
        document.getElementById("productName");

    const folderInput =
        document.getElementById("productFolder");

    const idInput =
        document.getElementById("productId");

    const categorySelect =
        document.getElementById("productCategory");

    const brandSelect =
        document.getElementById("productBrand");

    if (!nameInput) return;

    const keyword =
        nameInput.value.trim();

    if (keyword === "") {

        return;

    }

    /* ==========================================
       TÌM SẢN PHẨM ĐÃ TỒN TẠI
    ========================================== */

    const product =
        findProductByName(keyword);

    if (product) {

        // Tên
        nameInput.value = product.name;

        // Folder
        if (folderInput) {

            folderInput.value = product.folder || "";

        }

        // Product ID
        if (idInput) {

            idInput.value = product.id || "";

        }

        // Category
        if (categorySelect) {

            categorySelect.value =
                product.category || "";

            loadBrandOptions(product.category);

        }

        // Brand
        if (brandSelect) {

            brandSelect.value =
                product.brand || "";

        }

        // Origin
        updateOrigin();

        return;

    }

    /* ==========================================
       SẢN PHẨM MỚI
    ========================================== */

    if (
        folderInput &&
        !window.currentProduct.folder
    ) {

        folderInput.value =
            createProductFolder(keyword);

    }

    if (
        idInput &&
        !window.currentProduct.id
    ) {

        idInput.value =
            getNextProductId();

    }

}
/* =====================================================
   PRODUCT SEARCH
===================================================== */

function initProductSearch() {

    const input =
        document.getElementById("productSearch");

    const result =
        document.getElementById("productSearchResult");

    if (!input || !result) return;

    input.oninput = function () {

        const keyword =
            this.value.trim().toLowerCase();

        result.innerHTML = "";

        if (keyword.length < 2) {

            result.style.display = "none";

            return;

        }

        const products =
            window.products || [];

        const list = products.filter(product => {

            return (

                String(product.name || "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                String(product.folder || "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                String(product.brand || "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                String(product.category || "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                String(product.origin || "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                String(product.business || "")
                    .toLowerCase()
                    .includes(keyword)

            );

        });

        if (!list.length) {

            result.style.display = "none";

            return;

        }

        list.slice(0,10).forEach(product => {

            const item =
                document.createElement("div");

            item.className =
                "search-product-item";

            item.onclick = function () {

                selectProduct(product.id);

            };

            item.innerHTML = `

                <div class="search-product-code">

                    ${product.folder}

                </div>

                <div class="search-product-name">

                    ${product.name}

                </div>

            `;

            result.appendChild(item);

        });

        result.style.display = "block";

    };

}
/* =====================================================
   SELECT PRODUCT
===================================================== */

function selectProduct(productId) {

    const product =
        (window.products || []).find(item =>

            item.id == productId

        );

    if (!product) return;

    /* =========================
       BUSINESS
    ========================= */

    const businessSelect =
        document.getElementById("productBusiness");

    businessSelect.value =
        product.business || "";

    loadCategoryOptions(product.business);

    /* =========================
       CATEGORY
    ========================= */

    const categorySelect =
        document.getElementById("productCategory");

    categorySelect.value =
        product.category || "";

    loadBrandOptions(product.category);

    /* =========================
       BRAND
    ========================= */

    const brandSelect =
        document.getElementById("productBrand");

    brandSelect.value =
        product.brand || "";

    updateOrigin();

    /* =========================
       PRODUCT NAME
    ========================= */

    document.getElementById("productName").value =
        product.name || "";

    /* =========================
       FOLDER
    ========================= */

    document.getElementById("productFolder").value =
        product.folder || "";

    /* =========================
       PRODUCT ID
    ========================= */

    document.getElementById("productId").value =
        product.id || "";

    /* =========================
       STATUS
    ========================= */

    if (product.status) {

        const radio =
            document.querySelector(

                `input[name="productStatus"][value="${product.status}"]`

            );

        if (radio) {

            radio.checked = true;

        }

    }

    /* =========================
       SAVE SESSION
    ========================= */

    window.currentProduct = {

        ...window.currentProduct,

        business: product.business || "",

        category: product.category || "",

        brand: product.brand || "",

        origin: product.origin || "",

        folder: product.folder || "",

        id: product.id || "",

        name: product.name || "",

        status: product.status || "draft"

    };

    /* =========================
       SEARCH
    ========================= */

    document.getElementById("productSearch").value =
        product.folder || "";

    document.getElementById("productSearchResult").style.display =
        "none";

}
/* =====================================================
   UPDATE ORIGIN
===================================================== */

function updateOrigin() {

    const brandSelect =
        document.getElementById("productBrand");

    const originInput =
        document.getElementById("productOrigin");

    if (!brandSelect || !originInput) return;

    const brandName =
        brandSelect.value;

    const brand =
        Object.values(BRAND_CONFIG).find(item =>

            item.name.toLowerCase() ===
            brandName.toLowerCase()

        );

    originInput.value =
        brand ? brand.origin : "";

}

/* =====================================================
   NEXT PRODUCT ID
===================================================== */

function getNextProductId() {

    const products = window.products || [];

    if (products.length === 0) {

        return 1;

    }

    const maxId = Math.max(

        ...products.map(item => Number(item.id) || 0)

    );

    return maxId + 1;

}
/* ==========================================
   SAVE PRODUCT BASIC
========================================== */

function saveProductBasic() {

    if (!window.currentProduct) {

        resetCurrentProduct();

    }

    currentProduct.business =
        document.getElementById("productBusiness")?.value || "";

    currentProduct.category =
        document.getElementById("productCategory")?.value || "";

    currentProduct.brand =
        document.getElementById("productBrand")?.value || "";

    currentProduct.origin =
        document.getElementById("productOrigin")?.value || "";

    currentProduct.folder =
        document.getElementById("productFolder")?.value || "";

    currentProduct.id =
        document.getElementById("productId")?.value || "";

    currentProduct.name =
        document.getElementById("productName")?.value || "";

    const status =
        document.querySelector(
            'input[name="productStatus"]:checked'
        );

    currentProduct.status =
        status ? status.value : "draft";

    return currentProduct;

}

/* ==========================================
   LOAD PRODUCT BASIC
========================================== */

function loadProductBasic() {

    if (!window.currentProduct) return;

    /* =========================
       BUSINESS
    ========================= */

    const business =
        document.getElementById("productBusiness");

    if (business) {

        business.value =
            currentProduct.business || "";

    }

    /* =========================
       CATEGORY LIST
    ========================= */

    loadCategoryOptions(
        currentProduct.business
    );

    const category =
        document.getElementById("productCategory");

    if (category) {

        category.value =
            currentProduct.category || "";

    }

    /* =========================
       BRAND LIST
    ========================= */

    loadBrandOptions(
        currentProduct.category
    );

    const brand =
        document.getElementById("productBrand");

    if (brand) {

        brand.value =
            currentProduct.brand || "";

    }

    /* =========================
       ORIGIN
    ========================= */

    updateOrigin();

    /* =========================
       PRODUCT NAME
    ========================= */

    const name =
        document.getElementById("productName");

    if (name) {

        name.value =
            currentProduct.name || "";

    }

    /* =========================
       FOLDER
    ========================= */

    const folder =
        document.getElementById("productFolder");

    if (folder) {

        folder.value =
            currentProduct.folder || "";

    }

    /* =========================
       PRODUCT ID
    ========================= */

    const id =
        document.getElementById("productId");

    if (id) {

        id.value =
            currentProduct.id || "";

    }

    /* =========================
       STATUS
    ========================= */

    const radio =
        document.querySelector(

            `input[name="productStatus"][value="${currentProduct.status || "draft"}"]`

        );

    if (radio) {

        radio.checked = true;

    }

}
/* ==========================================
   VALIDATE PRODUCT BASIC
========================================== */

function validateProductBasic() {

    const business =
        document.getElementById("productBusiness");

    const category =
        document.getElementById("productCategory");

    const brand =
        document.getElementById("productBrand");

    const productName =
        document.getElementById("productName");

    if (!business || !business.value) {

        alert("Vui lòng chọn Business");

        business?.focus();

        return false;

    }

    if (!category || !category.value) {

        alert("Vui lòng chọn Category");

        category?.focus();

        return false;

    }

    if (!brand || !brand.value) {

        alert("Vui lòng chọn Brand");

        brand?.focus();

        return false;

    }

    if (!productName || !productName.value.trim()) {

        alert("Vui lòng nhập tên sản phẩm");

        productName?.focus();

        return false;

    }

    return true;

}
/* ==========================================
   NEXT STEP
========================================== */

function nextProductBasic() {

    if (!validateProductBasic()) {

        return;

    }

    saveProductBasic();

    saveProductDraft();

    renderProductImages();

}