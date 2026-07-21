/* =====================================================
   PRODUCT SPECIFICATION
   STEP 4 / 6

   MỤC TIÊU:

   - Hiển thị thông tin sản phẩm
   - Hiển thị Description
   - Hiển thị Technical Specification
   - Dùng DUY NHẤT trường:

        specs

   - Đồng bộ trực tiếp với products.js

   CẤU TRÚC:

   {
       business: "measure",
       id: 10,
       name: "Cân điện tử đếm ALH4",
       category: "can-dem",
       folder: "alh4",
       brand: "EXCELL",
       origin: "Đài Loan",

       description: "...",

       specs: [

           `<table>...</table>`,

           "Độ phân giải nội 1/30.000",

           "Tiêu chuẩn chính xác cấp III theo OIML",

           "Màn hình LCD 3 cửa sổ đèn nền xanh"

       ]
   }

   IMPORTANT:

   KHÔNG SỬ DỤNG:

       specification

       features

       applications

       accessories

   CHỈ DÙNG:

       specs
===================================================== */


/* =====================================================
   GLOBAL TIMER
===================================================== */

/*
   Dùng var để tránh lỗi:

   Identifier 'specificationTimer'
   has already been declared

   Nếu file bị load lại cũng không gây lỗi
   khai báo let / const.
*/

var specificationTimer =
    window.specificationTimer || null;


/* =====================================================
   RENDER STEP 4
===================================================== */

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


    renderSpecificationContent();

}


/* =====================================================
   RENDER CONTENT
===================================================== */

function renderSpecificationContent() {

    const box =
        document.getElementById(
            "specificationContent"
        );

    if (!box) return;


    const product =
        window.currentProduct?.product;


    if (!product) {

        box.innerHTML = `

        <div class="import-status">

            Không có dữ liệu sản phẩm.

        </div>

        `;

        return;

    }


    /*
       Đảm bảo chỉ sử dụng specs
    */

    if (!Array.isArray(product.specs)) {

        product.specs = [];

    }


    box.innerHTML = `

        ${renderProductInformation(product)}

        ${renderDescriptionEditor(product)}

        ${renderSpecsEditor(product)}

    `;

}


/* =====================================================
   PRODUCT INFORMATION
===================================================== */

function renderProductInformation(product) {

    return `

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

                    value="${escapeSpecificationHTML(
                        product.name || ""
                    )}"

                >

            </div>


            <div class="product-info-meta">

                <div>

                    <strong>Business:</strong>

                    ${escapeSpecificationHTML(
                        product.business || ""
                    )}

                </div>


                <div>

                    <strong>Category:</strong>

                    ${escapeSpecificationHTML(
                        product.category || ""
                    )}

                </div>


                <div>

                    <strong>Brand:</strong>

                    ${escapeSpecificationHTML(
                        product.brand || ""
                    )}

                </div>


                <div>

                    <strong>Origin:</strong>

                    ${escapeSpecificationHTML(
                        product.origin || ""
                    )}

                </div>

            </div>

        </div>

    </div>

    `;

}


/* =====================================================
   DESCRIPTION EDITOR
===================================================== */

function renderDescriptionEditor(product) {

    return `

    <div class="ai-block">

        <h4>

            Product Description

        </h4>


        <textarea

            id="productDescription"

            class="form-control"

            style="
                width:100%;
                min-height:180px;
                resize:vertical;
            "

        >${escapeSpecificationHTML(
            product.description || ""
        )}</textarea>

    </div>

    `;

}


/* =====================================================
   SPECS EDITOR
===================================================== */

function renderSpecsEditor(product) {

    let rows = "";


    /*
       DUYỆT product.specs

       Mỗi item có thể là:

       1. HTML table

       hoặc

       2. Text specification
    */

    product.specs.forEach(

        (item, index) => {

            const isHTML =
                typeof item === "string" &&
                item.trim().startsWith("<");


            if (isHTML) {

                rows += `

                <div
                    class="spec-item spec-html-item"
                    data-index="${index}"
                >

                    <div class="spec-item-header">

                        <strong>

                            Technical Specification Table

                        </strong>


                        <button

                            type="button"

                            onclick="
                                removeSpecItem(${index})
                            "

                        >

                            ❌

                        </button>

                    </div>


                    <textarea

                        class="spec-html-editor"

                        data-index="${index}"

                        style="
                            width:100%;
                            min-height:260px;
                            resize:vertical;
                            font-family:monospace;
                        "

                    >${escapeSpecificationHTML(
                        item
                    )}</textarea>


                    <div class="spec-preview-title">

                        Preview

                    </div>


                    <div
                        class="spec-html-preview"
                        data-preview-index="${index}"
                    >

                        ${item}

                    </div>

                </div>

                `;

            }


            else {

                rows += `

                <div
                    class="spec-item spec-text-item"
                    data-index="${index}"
                >

                    <div class="spec-item-header">

                        <strong>

                            Specification ${index + 1}

                        </strong>


                        <button

                            type="button"

                            onclick="
                                removeSpecItem(${index})
                            "

                        >

                            ❌

                        </button>

                    </div>


                    <input

                        type="text"

                        class="spec-text-editor"

                        data-index="${index}"

                        value="${escapeSpecificationHTML(
                            item || ""
                        )}"

                        placeholder="
                            Nhập thông số kỹ thuật...
                        "

                    >

                </div>

                `;

            }

        }

    );


    return `

    <div class="ai-block">

        <h4>

            Technical Specification

        </h4>


        <p class="spec-description">

            Dữ liệu được lấy từ Website và Free Parser.

            Bạn có thể kiểm tra và chỉnh sửa trước khi
            chuyển sang bước Preview.

        </p>


        <div id="specsEditor">

            ${rows}

        </div>


        <div class="spec-add-buttons">

            <button

                type="button"

                onclick="addSpecText()"

            >

                + Add Specification

            </button>


            <button

                type="button"

                onclick="addSpecTable()"

            >

                + Add Specification Table

            </button>

        </div>

    </div>

    `;

}


/* =====================================================
   ADD TEXT SPEC
===================================================== */

function addSpecText() {

    saveSpecificationStep();


    if (
        !window.currentProduct ||
        !window.currentProduct.product
    ) {

        return;

    }


    if (
        !Array.isArray(
            window.currentProduct.product.specs
        )
    ) {

        window.currentProduct.product.specs = [];

    }


    window.currentProduct.product.specs.push(

        ""

    );


    renderSpecificationContent();

}


/* =====================================================
   ADD HTML TABLE
===================================================== */

function addSpecTable() {

    saveSpecificationStep();


    if (
        !window.currentProduct ||
        !window.currentProduct.product
    ) {

        return;

    }


    if (
        !Array.isArray(
            window.currentProduct.product.specs
        )
    ) {

        window.currentProduct.product.specs = [];

    }


    window.currentProduct.product.specs.push(

`<table class="spec-table">

<tr>

<th>Mức cân</th>

<th>Bước nhảy</th>

<th>Kích thước</th>

</tr>

<tr>

<td></td>

<td></td>

<td></td>

</tr>

</table>`

    );


    renderSpecificationContent();

}


/* =====================================================
   REMOVE SPEC
===================================================== */

function removeSpecItem(index) {

    if (
        !window.currentProduct ||
        !window.currentProduct.product
    ) {

        return;

    }


    if (
        !Array.isArray(
            window.currentProduct.product.specs
        )
    ) {

        return;

    }


    window.currentProduct.product.specs.splice(

        index,

        1

    );


    renderSpecificationContent();


    scheduleSpecificationSave();

}


/* =====================================================
   SAVE STEP 4
===================================================== */

function saveSpecificationStep() {

    if (
        !window.currentProduct ||
        !window.currentProduct.product
    ) {

        return;

    }


    const product =
        window.currentProduct.product;


    /* =================================================
       PRODUCT NAME
    ================================================= */

    const nameInput =
        document.getElementById(
            "productName"
        );


    if (nameInput) {

        product.name =
            nameInput.value.trim();

    }


    /* =================================================
       DESCRIPTION
    ================================================= */

    const description =
        document.getElementById(
            "productDescription"
        );


    if (description) {

        product.description =
            description.value.trim();

    }


    /* =================================================
       SAVE SPECS
    ================================================= */

    const specs = [];


    /*
       TEXT SPEC
    */

    document
        .querySelectorAll(
            ".spec-text-editor"
        )
        .forEach(

            input => {

                specs.push(

                    input.value.trim()

                );

            }

        );


    /*
       HTML TABLE SPEC

       Giữ nguyên HTML
    */

    document
        .querySelectorAll(
            ".spec-html-editor"
        )
        .forEach(

            textarea => {

                specs.push(

                    textarea.value.trim()

                );

            }

        );


    /*
       QUAN TRỌNG:

       Cách trên sẽ làm thay đổi thứ tự.

       Vì vậy ta dùng lại DOM order
       để lưu đúng thứ tự specs.
    */

    const orderedSpecs = [];


    document
        .querySelectorAll(
            ".spec-item"
        )
        .forEach(

            item => {

                const textInput =
                    item.querySelector(
                        ".spec-text-editor"
                    );


                const htmlInput =
                    item.querySelector(
                        ".spec-html-editor"
                    );


                if (textInput) {

                    orderedSpecs.push(

                        textInput.value.trim()

                    );

                }


                else if (htmlInput) {

                    orderedSpecs.push(

                        htmlInput.value.trim()

                    );

                }

            }

        );


    /*
       GHI DUY NHẤT VÀO:

           product.specs
    */

    product.specs =
        orderedSpecs;


    /*
       XÓA CẤU TRÚC CŨ NẾU CÒN

       Không cho specification
       tồn tại song song với specs.
    */

    if (
        Object.prototype.hasOwnProperty.call(
            product,
            "specification"
        )
    ) {

        delete product.specification;

    }


    /*
       XÓA CÁC FIELD AI CŨ

       Vì products.js chính thức
       không sử dụng các field này.
    */

    if (
        Object.prototype.hasOwnProperty.call(
            product,
            "features"
        )
    ) {

        delete product.features;

    }


    if (
        Object.prototype.hasOwnProperty.call(
            product,
            "applications"
        )
    ) {

        delete product.applications;

    }


    if (
        Object.prototype.hasOwnProperty.call(
            product,
            "accessories"
        )
    ) {

        delete product.accessories;

    }


    /*
       XÓA FIELD AI TẠM
    */

    if (
        Object.prototype.hasOwnProperty.call(
            product,
            "_aiFeatures"
        )
    ) {

        delete product._aiFeatures;

    }


    if (
        Object.prototype.hasOwnProperty.call(
            product,
            "_aiApplications"
        )
    ) {

        delete product._aiApplications;

    }


    if (
        Object.prototype.hasOwnProperty.call(
            product,
            "_aiAccessories"
        )
    ) {

        delete product._aiAccessories;

    }


    /*
       DEBUG
    */

    console.log("");

    console.log(

        "========== STEP 4 SAVED =========="

    );


    console.log(

        "PRODUCT NAME:",

        product.name

    );


    console.log(

        "DESCRIPTION:",

        product.description

    );


    console.log(

        "SPECS:",

        product.specs

    );


    console.log(

        "================================="

    );

}


/* =====================================================
   NEXT → STEP 5
===================================================== */

function nextProductPreview() {

    /*
       SAVE STEP 4
    */

    saveSpecificationStep();


    /*
       NORMALIZE
    */

    normalizeProductSpecs();


    /*
       SAVE DRAFT
    */

    if (
        typeof saveProductDraft ===
        "function"
    ) {

        saveProductDraft();

    }


    /*
       DEBUG
    */

    console.log("");

    console.log(

        "========== STEP 4 → STEP 5 =========="

    );


    console.log(

        "PRODUCT DATA:",

        window.currentProduct?.product

    );


    console.log(

        "====================================="

    );


    /*
       GO STEP 5
    */

    if (
        typeof renderProductPreview ===
        "function"
    ) {

        renderProductPreview();

    }

}


/* =====================================================
   BACK
===================================================== */

function backToContentImport() {

    /*
       Lưu trước khi quay lại Step 3
    */

    saveSpecificationStep();


    if (
        typeof saveProductDraft ===
        "function"
    ) {

        saveProductDraft();

    }


    renderProductContentImport();

}


/* =====================================================
   NORMALIZE SPECS
===================================================== */

function normalizeProductSpecs() {

    const product =
        window.currentProduct?.product;


    if (!product) return;


    if (
        !Array.isArray(
            product.specs
        )
    ) {

        product.specs = [];

        return;

    }


    product.specs =

        product.specs

            .map(

                item => {

                    if (
                        typeof item ===
                        "string"
                    ) {

                        return item.trim();

                    }


                    /*
                       Nếu dữ liệu cũ vô tình
                       có dạng object:

                       {
                           name: "...",
                           value: "..."
                       }

                       KHÔNG dùng name làm tên sản phẩm.

                       name/value ở đây chỉ được
                       chuyển tạm thành text spec.

                       Nhưng cấu trúc chính thức
                       sau cùng vẫn là:

                           specs: ["..."]

                       */

                    if (
                        item &&
                        typeof item ===
                        "object"
                    ) {

                        const key =
                            item.name ||
                            item.key ||
                            "";


                        const value =
                            item.value ||
                            "";


                        if (
                            key &&
                            value
                        ) {

                            return (

                                key +

                                ": " +

                                value

                            );

                        }


                        return (

                            key ||

                            value ||

                            ""

                        );

                    }


                    return "";

                }

            )

            .filter(

                item => item !== ""

            );

}


/* =====================================================
   AUTO SAVE
===================================================== */

function scheduleSpecificationSave() {

    clearTimeout(

        specificationTimer

    );


    specificationTimer =

        setTimeout(

            function() {

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


    window.specificationTimer =

        specificationTimer;

}


/* =====================================================
   AUTO BIND
===================================================== */

if (
    !window.productSpecificationInputBound
) {

    document.addEventListener(

        "input",

        function(e) {

            if (

                e.target.id ===
                "productName" ||

                e.target.id ===
                "productDescription" ||

                e.target.classList.contains(
                    "spec-text-editor"
                ) ||

                e.target.classList.contains(
                    "spec-html-editor"
                )

            ) {

                scheduleSpecificationSave();

            }

        }

    );


    window.productSpecificationInputBound =
        true;

}


/* =====================================================
   ESCAPE HTML
===================================================== */

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