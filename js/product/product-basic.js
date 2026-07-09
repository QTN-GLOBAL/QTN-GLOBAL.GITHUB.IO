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
                 PRODUCT NAME
            ========================== -->

            <div class="form-group">

                <label>

                    Product Name

                </label>

                <input
                    id="productName"
                    type="text"
                    placeholder="Product Name">

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
                    type="text">

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
                    type="number"
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
   LOAD BRAND OPTIONS
===================================================== */

function loadBrandOptions(categoryId) {

    const select =
        document.getElementById("productBrand");

    if (!select) return;

    select.innerHTML = "";

    if (!categoryId) {

        select.innerHTML =
            `<option value="">Select Brand</option>`;

        return;

    }

    const brands =
        getBrands(categoryId);

    brands.forEach(brand => {

        const option =
            document.createElement("option");

        option.value = brand.id;

        option.textContent = brand.name;

        select.appendChild(option);

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

    if (business) {

        business.addEventListener("change", function () {

            loadCategoryOptions(this.value);

        });

    }

    if (category) {

        category.addEventListener("change", function () {

            loadBrandOptions(this.value);

        });

    }

}