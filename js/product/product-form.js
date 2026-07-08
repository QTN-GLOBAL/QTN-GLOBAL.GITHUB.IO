/* =====================================================
   PRODUCT FORM
===================================================== */

function renderProductBasicForm() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;

    body.innerHTML = `

        <div class="product-form">

            <h3>Basic Information</h3>

            <div class="form-group">

                <label>Business</label>

                <select id="productBusiness"></select>

            </div>

            <div class="form-group">

                <label>Category</label>

                <select id="productCategory"></select>

            </div>

            <div class="form-group">

                <label>Brand</label>

                <select id="productBrand">

                    <option>
                        Chọn Business trước...
                    </option>

                </select>

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
                    type="number">

            </div>

        </div>

    `;

    loadBusinessOptions();

}

/* =====================================================
   LOAD BUSINESS
===================================================== */

function loadBusinessOptions() {

    const select =
        document.getElementById("productBusiness");

    if (!select) return;

    select.innerHTML = "";

    const businesses = getBusinesses();

    businesses.forEach(item => {

        select.innerHTML += `

            <option value="${item.id}">

                ${item.icon} ${item.name}

            </option>

        `;

    });

    select.addEventListener(
        "change",
        onBusinessChange
    );

    onBusinessChange();

}

/* =====================================================
   BUSINESS CHANGE
===================================================== */

function onBusinessChange() {

    const business =
        document.getElementById("productBusiness").value;

    loadCategoryOptions(business);

}

/* =====================================================
   LOAD CATEGORY
===================================================== */

function loadCategoryOptions(businessId) {

    const select =
        document.getElementById("productCategory");

    if (!select) return;

    select.innerHTML = "";

    const categories =
        getCategories(businessId);

    if (categories.length === 0) {

        select.innerHTML = `

            <option>

                Chưa có Category

            </option>

        `;

        document.getElementById("productFolder").value = "";

        return;

    }

    categories.forEach(item => {

        select.innerHTML += `

            <option value="${item.id}">

                ${item.icon} ${item.name}

            </option>

        `;

    });

    select.addEventListener(
        "change",
        onCategoryChange
    );

    onCategoryChange();

}

/* =====================================================
   CATEGORY CHANGE
===================================================== */

function onCategoryChange() {

    const categoryId =
        document.getElementById("productCategory").value;

    const category =
        getCategory(categoryId);

    const folder =
        document.getElementById("productFolder");

    if (folder && category) {

        folder.value = category.folder;

    }

    // Bước tiếp theo
    // loadBrandOptions(categoryId);

}
