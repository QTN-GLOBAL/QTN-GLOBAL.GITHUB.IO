/* =========================================================
   PRODUCT SPECIFICATION
   STEP 4 / 6

   SINGLE DATA SOURCE

       currentProduct.product.specs

   FINAL PRODUCT STRUCTURE

       specs: [

           "<table>...</table>",

           "Độ phân giải nội 1/30.000",

           "Màn hình LCD...",

           "Nguồn AC 220V..."

       ]

   KHÔNG SỬ DỤNG:

       specification

   ========================================================= */


/* =========================================================
   RENDER STEP 4
========================================================= */

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


        <!-- =====================================
             PRODUCT INFORMATION
        ====================================== -->

        ${renderProductInformation()}


        <!-- =====================================
             DESCRIPTION
        ====================================== -->

        ${renderDescriptionEditor()}


        <!-- =====================================
             TECHNICAL SPECIFICATION
        ====================================== -->

        <div class="ai-block">

            <h4>
                Technical Specification
            </h4>


            <p class="specification-help">

                Dữ liệu được lấy từ Website và Free Parser.
                Bạn có thể kiểm tra và chỉnh sửa trước
                khi chuyển sang bước Preview.

            </p>


            <div id="specsEditor">

            </div>


            <div class="spec-add-buttons">

                <button
                    type="button"
                    onclick="addTextSpec()">

                    + Add Specification

                </button>


                <button
                    type="button"
                    onclick="addTableSpec()">

                    + Add Specification Table

                </button>

            </div>

        </div>


        <!-- =====================================
             BUTTONS
        ====================================== -->

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


    renderSpecsEditor();

}


/* =========================================================
   PRODUCT INFORMATION
========================================================= */

function renderProductInformation() {

    const product =
        window.currentProduct?.product || {};


    return `

    <div class="ai-block">

        <h4>
            Product Information
        </h4>


        <div>

            <strong>
                Product Name
            </strong>

            <div>
                ${escapeSpecificationHTML(
                    product.name || ""
                )}
            </div>

        </div>


        <div>

            <strong>
                Business:
            </strong>

            ${escapeSpecificationHTML(
                product.business || ""
            )}

        </div>


        <div>

            <strong>
                Category:
            </strong>

            ${escapeSpecificationHTML(
                product.category || ""
            )}

        </div>


        <div>

            <strong>
                Brand:
            </strong>

            ${escapeSpecificationHTML(
                product.brand || ""
            )}

        </div>


        <div>

            <strong>
                Origin:
            </strong>

            ${escapeSpecificationHTML(
                product.origin || ""
            )}

        </div>

    </div>

    `;

}


/* =========================================================
   DESCRIPTION EDITOR
========================================================= */

function renderDescriptionEditor() {

    const product =
        window.currentProduct?.product || {};


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


/* =========================================================
   RENDER SPECS EDITOR
========================================================= */

function renderSpecsEditor() {

    const box =
        document.getElementById(
            "specsEditor"
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


    /* =====================================
       ENSURE SPECS
    ====================================== */

    if (
        !Array.isArray(
            product.specs
        )
    ) {

        product.specs = [];

    }


    let html = "";


    product.specs.forEach(

        (spec, index) => {

            html +=
                renderSpecEditorItem(

                    spec,

                    index

                );

        }

    );


    if (!html) {

        html = `

            <div class="import-status">

                Chưa có Technical Specification.

                <br><br>

                Bạn có thể thêm Specification
                hoặc Specification Table.

            </div>

        `;

    }


    box.innerHTML =
        html;

}


/* =========================================================
   RENDER ONE SPEC
========================================================= */

function renderSpecEditorItem(

    spec,

    index

) {

    /* =====================================
       HTML TABLE
    ====================================== */

    if (
        isHTMLTableSpec(spec)
    ) {

        return `

        <div
            class="spec-editor-item"
            data-index="${index}">


            <div class="spec-editor-header">

                <strong>

                    Specification Table ${index + 1}

                </strong>


                <button

                    type="button"

                    onclick="removeSpec(${index})">

                    ❌

                </button>

            </div>


            <textarea

                class="spec-table-editor"

                data-index="${index}"

                style="
                    width:100%;
                    min-height:220px;
                    resize:vertical;
                    font-family:monospace;
                "

            >${escapeSpecificationHTML(
                spec
            )}</textarea>


            <div class="spec-table-preview">

                <strong>
                    Table Preview
                </strong>

                <div>

                    ${spec}

                </div>

            </div>

        </div>

        `;

    }


    /* =====================================
       TEXT SPEC
    ====================================== */

    return `

    <div
        class="spec-editor-item"
        data-index="${index}">


        <div class="spec-editor-header">

            <strong>

                Specification ${index + 1}

            </strong>


            <button

                type="button"

                onclick="removeSpec(${index})">

                ❌

            </button>

        </div>


        <textarea

            class="spec-text-editor"

            data-index="${index}"

            style="
                width:100%;
                min-height:70px;
                resize:vertical;
            "

        >${escapeSpecificationHTML(
            spec
        )}</textarea>


    </div>

    `;

}


/* =========================================================
   DETECT HTML TABLE
========================================================= */

function isHTMLTableSpec(
    spec
) {

    if (
        typeof spec !== "string"
    ) {

        return false;

    }


    return (
        /<table[\s>]/i.test(
            spec
        )
    );

}


/* =========================================================
   ADD TEXT SPEC
========================================================= */

function addTextSpec() {

    ensureProductSpecs();


    saveSpecificationStep();


    window.currentProduct.product.specs.push(
        ""
    );


    renderSpecsEditor();

}


/* =========================================================
   ADD TABLE SPEC
========================================================= */

function addTableSpec() {

    ensureProductSpecs();


    saveSpecificationStep();


    const table = `

<table class="spec-table">

<tr>

    <th>Thông số</th>

    <th>Giá trị</th>

</tr>

<tr>

    <td></td>

    <td></td>

</tr>

</table>

`;


    window.currentProduct.product.specs.push(
        table.trim()
    );


    renderSpecsEditor();

}


/* =========================================================
   REMOVE SPEC
========================================================= */

function removeSpec(
    index
) {

    ensureProductSpecs();


    saveSpecificationStep();


    if (
        index < 0 ||
        index >=
        window.currentProduct.product.specs.length
    ) {

        return;

    }


    window.currentProduct.product.specs.splice(
        index,
        1
    );


    renderSpecsEditor();


    scheduleSpecificationSave();

}


/* =========================================================
   ENSURE SPECS
========================================================= */

function ensureProductSpecs() {

    if (
        !window.currentProduct
    ) {

        window.currentProduct = {};

    }


    if (
        !window.currentProduct.product
    ) {

        window.currentProduct.product = {};

    }


    if (
        !Array.isArray(
            window.currentProduct.product.specs
        )
    ) {

        window.currentProduct.product.specs = [];

    }


    /* =====================================
       REMOVE LEGACY FIELD
    ====================================== */

    delete window.currentProduct.product.specification;

}


/* =========================================================
   SAVE STEP 4
========================================================= */

function saveSpecificationStep() {

    if (
        !window.currentProduct?.product
    ) {

        return;

    }


    const product =
        window.currentProduct.product;


    /* =====================================
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


    /* =====================================
       TEXT SPECS
    ====================================== */

    document
        .querySelectorAll(
            ".spec-text-editor"
        )
        .forEach(

            textarea => {

                const index =
                    Number(
                        textarea.dataset.index
                    );


                if (
                    product.specs[index] !==
                    undefined
                ) {

                    product.specs[index] =
                        textarea.value.trim();

                }

            }

        );


    /* =====================================
       TABLE SPECS
    ====================================== */

    document
        .querySelectorAll(
            ".spec-table-editor"
        )
        .forEach(

            textarea => {

                const index =
                    Number(
                        textarea.dataset.index
                    );


                if (
                    product.specs[index] !==
                    undefined
                ) {

                    product.specs[index] =
                        textarea.value.trim();

                }

            }

        );


    /* =====================================
       CLEAN SPECS
    ====================================== */

    product.specs =
        product.specs

            .map(
                normalizeStep4Spec
            )

            .filter(
                item => item !== ""
            );


    /* =====================================
       REMOVE LEGACY
    ====================================== */

    delete product.specification;

}


/* =========================================================
   NORMALIZE STEP 4 SPEC
========================================================= */

function normalizeStep4Spec(
    spec
) {

    if (
        spec === null ||
        spec === undefined
    ) {

        return "";

    }


    if (
        typeof spec === "string"
    ) {

        return spec.trim();

    }


    /* =====================================
       SAFETY

       Nếu vẫn còn Object từ dữ liệu cũ,
       chuyển thành text.

       Không bao giờ để:

           [object Object]
    ====================================== */

    if (
        typeof spec === "object"
    ) {

        const name =
            spec.name !== undefined

                ? String(
                    spec.name
                ).trim()

                : "";


        const value =
            spec.value !== undefined

                ? String(
                    spec.value
                ).trim()

                : "";


        if (
            name &&
            value
        ) {

            return `${name}: ${value}`;

        }


        if (name) {

            return name;

        }


        if (value) {

            return value;

        }


        return "";

    }


    return String(spec).trim();

}


/* =========================================================
   BACK
========================================================= */

function backToContentImport() {

    saveSpecificationStep();


    if (
        typeof saveProductDraft === "function"
    ) {

        saveProductDraft();

    }


    renderProductContentImport();

}


/* =========================================================
   NEXT → STEP 5
========================================================= */

function nextProductPreview() {

    /* =====================================
       SAVE
    ====================================== */

    saveSpecificationStep();


    /* =====================================
       CLEAN LEGACY
    ====================================== */

    if (
        window.currentProduct?.product
    ) {

        delete
            window.currentProduct.product
                .specification;

    }


    /* =====================================
       SAVE DRAFT
    ====================================== */

    if (
        typeof saveProductDraft === "function"
    ) {

        saveProductDraft();

    }


    /* =====================================
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
        "PRODUCT SPECS:"
    );


    console.log(
        window.currentProduct?.product?.specs
    );


    console.log(
        "====================================="
    );


    /* =====================================
       GO STEP 5
    ====================================== */

    renderProductPreview();

}


/* =========================================================
   AUTO SAVE
========================================================= */

var specificationAutoSaveTimer = null;


function scheduleSpecificationSave() {

    clearTimeout(
        specificationAutoSaveTimer
    );


    specificationAutoSaveTimer =

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


/* =========================================================
   AUTO BIND
========================================================= */

document.addEventListener(

    "input",

    function(event) {

        if (

            event.target.id ===
            "productDescription" ||

            event.target.classList.contains(
                "spec-text-editor"
            ) ||

            event.target.classList.contains(
                "spec-table-editor"
            )

        ) {

            scheduleSpecificationSave();

        }

    }

);


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeSpecificationHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =

        value === null ||

        value === undefined

            ? ""

            : String(value);


    return div.innerHTML;

}