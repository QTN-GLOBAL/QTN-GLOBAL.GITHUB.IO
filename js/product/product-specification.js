/* ==========================================
   PRODUCT SPECIFICATION
   STEP 4 / 6

   PURPOSE:

   - Hiển thị dữ liệu sản phẩm sau Step 3
   - Chuẩn hóa dữ liệu theo cấu trúc products.js
   - Hiển thị đúng specification dạng:
       { name, value }

   - Hỗ trợ:
       product.specification
       product.specs

   - Không hiển thị [object Object]
   - Cho phép chỉnh sửa trước Step 5
   - Khi lưu ưu tiên cấu trúc:
       product.specs

   - Giữ nguyên:
       currentProduct
       saveProductDraft()
       renderProductPreview()

========================================== */


/* ==========================================
   STEP 4
========================================== */

function renderProductSpecification() {

    const body =
        document.getElementById(
            "productModalBody"
        );

    if (!body) return;


    body.innerHTML = `

    <div class="product-specification">

        <h3 class="product-step-title">

            Step 4 / 6 - Product Specification

        </h3>


        <div id="specificationContent"></div>


        <div class="step-buttons">

            <button
                type="button"
                onclick="backToContentImport()">

                ← Back

            </button>


            <button
                type="button"
                onclick="nextProductPreview()">

                Next →

            </button>

        </div>

    </div>

    `;


    /* ======================================
       CHUẨN HÓA DỮ LIỆU TRƯỚC KHI RENDER
    ====================================== */

    normalizeProductSpecificationData();


    renderSpecificationContent();

}


/* ==========================================
   RENDER CONTENT
========================================== */

function renderSpecificationContent() {

    const box =
        document.getElementById(
            "specificationContent"
        );

    if (!box) return;


    const current =
        window.currentProduct;


    const product =
        current?.product;


    if (!product) {

        box.innerHTML = `

        <div class="import-status">

            Không có dữ liệu sản phẩm.

        </div>

        `;

        return;

    }


    /* ======================================
       PRODUCT INFORMATION
    ====================================== */

    const productName =
        escapeSpecificationHTML(
            product.name || ""
        );


    const business =
        escapeSpecificationHTML(
            product.business || ""
        );


    const category =
        escapeSpecificationHTML(
            product.category || ""
        );


    const brand =
        escapeSpecificationHTML(
            product.brand || ""
        );


    const origin =
        escapeSpecificationHTML(
            product.origin || ""
        );


    /* ======================================
       DESCRIPTION
    ====================================== */

    const description =
        product.description || "";


    /* ======================================
       SPECS
    ====================================== */

    const specs =
        Array.isArray(product.specs)

            ? product.specs

            : [];


    box.innerHTML = `

    <!-- ==================================
         PRODUCT INFORMATION
    ================================== -->

    <div class="ai-block">

        <h4>

            Product Information

        </h4>


        <div class="product-info-grid">


            <div class="form-group">

                <label>

                    Product Name

                </label>


                <input

                    type="text"

                    id="productName"

                    class="form-control"

                    value="${productName}"

                >

            </div>


            <div>

                <strong>

                    Business:

                </strong>

                ${business}

            </div>


            <div>

                <strong>

                    Category:

                </strong>

                ${category}

            </div>


            <div>

                <strong>

                    Brand:

                </strong>

                ${brand}

            </div>


            <div>

                <strong>

                    Origin:

                </strong>

                ${origin}

            </div>


        </div>

    </div>


    <!-- ==================================
         DESCRIPTION
    ================================== -->

    <div class="ai-block">

        <h4>

            Product Description

        </h4>


        <textarea

            id="productDescription"

            class="form-control"

            style="width:100%;
                   min-height:180px;
                   resize:vertical;"

        >${escapeSpecificationHTML(
            description
        )}</textarea>

    </div>


    <!-- ==================================
         SPECIFICATION
    ================================== -->

    <div class="ai-block">

        <h4>

            Technical Specification

        </h4>


        <p style="margin-bottom:15px;">

            Dữ liệu được lấy từ Website và
            Free Parser. Bạn có thể kiểm tra
            và chỉnh sửa trước khi chuyển sang
            bước Preview.

        </p>


        <div id="specificationTableWrapper">

            ${renderSpecsTable(specs)}

        </div>


        <br>


        <button

            type="button"

            onclick="addSpecification()">

            + Add Specification

        </button>

    </div>

    `;

}


/* ==========================================
   RENDER SPECS TABLE
========================================== */

function renderSpecsTable(specs) {

    let rows = "";


    if (!Array.isArray(specs)) {

        specs = [];

    }


    specs.forEach(

        (item, index) => {


            /* ==============================
               CHUẨN HÓA ITEM
            ============================== */

            const normalized =
                normalizeSpecificationItem(
                    item
                );


            const name =
                escapeSpecificationHTML(
                    normalized.name
                );


            const value =
                escapeSpecificationHTML(
                    normalized.value
                );


            rows += `

            <tr>


                <td>

                    <input

                        type="text"

                        class="spec-name"

                        data-index="${index}"

                        value="${name}"

                    >

                </td>


                <td>

                    <textarea

                        class="spec-value"

                        data-index="${index}"

                        rows="2"

                    >${value}</textarea>

                </td>


                <td>

                    <button

                        type="button"

                        onclick="
                            removeSpecification(
                                ${index}
                            )
                        "

                    >

                        ❌

                    </button>

                </td>


            </tr>

            `;

        }

    );


    return `

    <table

        class="spec-table"

        style="width:100%;"

    >

        <thead>

            <tr>

                <th>

                    Name

                </th>


                <th>

                    Value

                </th>


                <th>

                </th>

            </tr>

        </thead>


        <tbody>

            ${

                rows ||

                `

                <tr>

                    <td

                        colspan="3"

                        style="
                            text-align:center;
                            padding:20px;
                        "

                    >

                        Chưa có thông số kỹ thuật.

                    </td>

                </tr>

                `

            }

        </tbody>

    </table>

    `;

}


/* ==========================================
   NORMALIZE PRODUCT DATA

   Ưu tiên:

   1. product.specification
   2. product.specs

   Sau đó chuẩn hóa thành:

   product.specs

========================================== */

function normalizeProductSpecificationData() {

    const product =
        window.currentProduct?.product;


    if (!product) return;


    /* ======================================
       NẾU ĐÃ CÓ SPECS
    ====================================== */

    if (

        Array.isArray(product.specs) &&

        product.specs.length > 0

    ) {

        product.specs =

            product.specs.map(

                normalizeSpecificationItem

            );

        return;

    }


    /* ======================================
       NẾU CÓ SPECIFICATION TỪ AI
    ====================================== */

    if (

        Array.isArray(
            product.specification
        )

    ) {

        product.specs =

            product.specification.map(

                normalizeSpecificationItem

            );

        return;

    }


    /* ======================================
       KHÔNG CÓ DỮ LIỆU
    ====================================== */

    product.specs = [];

}


/* ==========================================
   NORMALIZE SPECIFICATION ITEM
========================================== */

function normalizeSpecificationItem(item) {


    /* ======================================
       ITEM LÀ OBJECT
    ====================================== */

    if (

        item &&

        typeof item === "object" &&

        !Array.isArray(item)

    ) {

        return {

            name:

                item.name !== undefined

                    ? String(item.name)

                    : "",


            value:

                item.value !== undefined

                    ? convertSpecificationValue(
                        item.value
                    )

                    : ""

        };

    }


    /* ======================================
       ITEM LÀ STRING
    ====================================== */

    if (

        typeof item === "string"

    ) {

        return {

            name: "",

            value: item

        };

    }


    /* ======================================
       ITEM KHÁC
    ====================================== */

    return {

        name: "",

        value:

            item === null ||

            item === undefined

                ? ""

                : String(item)

    };

}


/* ==========================================
   CONVERT SPECIFICATION VALUE

   Ngăn [object Object]
========================================== */

function convertSpecificationValue(value) {


    if (

        value === null ||

        value === undefined

    ) {

        return "";

    }


    if (

        typeof value === "string"

    ) {

        return value;

    }


    if (

        typeof value === "number" ||

        typeof value === "boolean"

    ) {

        return String(value);

    }


    /* ======================================
       OBJECT

       Nếu object có value
    ====================================== */

    if (

        typeof value === "object"

    ) {

        if (

            value.value !== undefined

        ) {

            return convertSpecificationValue(

                value.value

            );

        }


        if (

            value.name !== undefined

        ) {

            return convertSpecificationValue(

                value.name

            );

        }


        try {

            return JSON.stringify(

                value,

                null,

                2

            );

        }

        catch (error) {

            return "";

        }

    }


    return String(value);

}


/* ==========================================
   ADD SPECIFICATION
========================================== */

function addSpecification() {

    if (!window.currentProduct) {

        return;

    }


    if (!window.currentProduct.product) {

        return;

    }


    if (

        !Array.isArray(

            window.currentProduct.product.specs

        )

    ) {

        window.currentProduct.product.specs = [];

    }


    window.currentProduct.product.specs.push({

        name: "",

        value: ""

    });


    renderSpecificationContent();

}


/* ==========================================
   REMOVE SPECIFICATION
========================================== */

function removeSpecification(index) {

    const product =
        window.currentProduct?.product;


    if (!product) return;


    if (

        !Array.isArray(product.specs)

    ) {

        return;

    }


    product.specs.splice(

        index,

        1

    );


    renderSpecificationContent();

}


/* ==========================================
   SAVE STEP 4
========================================== */

function saveSpecificationStep() {

    const current =
        window.currentProduct;


    if (!current) return;


    if (!current.product) {

        current.product = {};

    }


    const product =
        current.product;


    /* ======================================
       PRODUCT NAME
    ====================================== */

    const nameInput =
        document.getElementById(
            "productName"
        );


    if (nameInput) {

        product.name =
            nameInput.value.trim();

    }


    /* ======================================
       DESCRIPTION
    ====================================== */

    const description =
        document.getElementById(
            "productDescription"
        );


    if (description) {

        product.description =
            description.value.trim();

    }


    /* ======================================
       SPECS
    ====================================== */

    if (

        !Array.isArray(product.specs)

    ) {

        product.specs = [];

    }


    const names =

        document.querySelectorAll(

            ".spec-name"

        );


    const values =

        document.querySelectorAll(

            ".spec-value"

        );


    const specs = [];


    names.forEach(

        (nameInput, index) => {


            const valueInput =

                values[index];


            const name =

                nameInput.value.trim();


            const value =

                valueInput

                    ? valueInput.value.trim()

                    : "";


            /* ==========================
               BỎ DÒNG TRỐNG HOÀN TOÀN
            ========================== */

            if (

                !name &&

                !value

            ) {

                return;

            }


            specs.push({

                name: name,

                value: value

            });

        }

    );


    product.specs = specs;


    /* ======================================
       GIỮ ĐỒNG BỘ specification

       Để các module cũ không bị lỗi
    ====================================== */

    product.specification =

        product.specs.map(

            item => ({

                name: item.name,

                value: item.value

            })

        );


    /* ======================================
       DEBUG
    ====================================== */

    console.log("");

    console.log(

        "========== STEP 4 SAVED =========="

    );


    console.log(

        "PRODUCT NAME:",

        product.name

    );


    console.log(

        "PRODUCT SPECS:",

        product.specs

    );


    console.log(

        "=================================="

    );

}


/* ==========================================
   BACK
========================================== */

function backToContentImport() {

    /* ======================================
       LƯU TRƯỚC KHI QUAY LẠI
    ====================================== */

    saveSpecificationStep();


    if (

        typeof saveProductDraft ===

        "function"

    ) {

        saveProductDraft();

    }


    renderProductContentImport();

}


/* ==========================================
   NEXT → STEP 5
========================================== */

function nextProductPreview() {


    /* ======================================
       SAVE STEP 4
    ====================================== */

    saveSpecificationStep();


    /* ======================================
       SAVE DRAFT
    ====================================== */

    if (

        typeof saveProductDraft ===

        "function"

    ) {

        saveProductDraft();

    }


    /* ======================================
       DEBUG
    ====================================== */

    console.log("");

    console.log(

        "========== STEP 4 → STEP 5 =========="

    );


    console.log(

        "PRODUCT DATA:"

    );


    console.log(

        window.currentProduct?.product

    );


    console.log(

        "====================================="

    );


    /* ======================================
       STEP 5
    ====================================== */

    if (

        typeof renderProductPreview ===

        "function"

    ) {

        renderProductPreview();

    }

}


/* ==========================================
   AUTO SAVE
========================================== */

let specificationTimer = null;


function scheduleSpecificationSave() {


    clearTimeout(

        specificationTimer

    );


    specificationTimer =

        setTimeout(

            () => {


                saveSpecificationStep();


                if (

                    typeof saveProductDraft ===

                    "function"

                ) {

                    saveProductDraft();

                }


            },

            500

        );

}


/* ==========================================
   AUTO BIND INPUT
========================================== */

document.addEventListener(

    "input",

    function(event) {


        if (

            event.target.id ===

            "productName"

        ) {

            scheduleSpecificationSave();

            return;

        }


        if (

            event.target.id ===

            "productDescription"

        ) {

            scheduleSpecificationSave();

            return;

        }


        if (

            event.target.classList.contains(

                "spec-name"

            )

        ) {

            scheduleSpecificationSave();

            return;

        }


        if (

            event.target.classList.contains(

                "spec-value"

            )

        ) {

            scheduleSpecificationSave();

            return;

        }

    }

);


/* ==========================================
   NORMALIZE SPECIFICATION
========================================== */

function normalizeSpecification() {

    const product =
        window.currentProduct?.product;


    if (!product) return;


    normalizeProductSpecificationData();


    if (

        !Array.isArray(product.specs)

    ) {

        return;

    }


    product.specs =

        product.specs.map(

            item => {


                const normalized =

                    normalizeSpecificationItem(

                        item

                    );


                return {

                    name:

                        normalized.name

                            .trim(),


                    value:

                        normalized.value

                            .replace(

                                /\s+/g,

                                " "

                            )

                            .replace(

                                /KG/g,

                                "kg"

                            )

                            .replace(

                                /Kg/g,

                                "kg"

                            )

                            .trim()

                };

            }

        );

}


/* ==========================================
   VALIDATE
========================================== */

function validateSpecification() {

    const product =
        window.currentProduct?.product;


    if (!product) {

        return false;

    }


    const specs =

        product.specs || [];


    for (

        const item of specs

    ) {


        if (

            !item.name &&

            !item.value

        ) {

            continue;

        }


        if (

            !item.name ||

            !item.value

        ) {

            alert(

                "Specification không được để trống."

            );


            return false;

        }

    }


    return true;

}


/* ==========================================
   ESCAPE HTML
========================================== */

function escapeSpecificationHTML(value) {

    if (

        value === null ||

        value === undefined

    ) {

        return "";

    }


    const div =

        document.createElement(

            "div"

        );


    div.textContent =

        String(value);


    return div.innerHTML;

}