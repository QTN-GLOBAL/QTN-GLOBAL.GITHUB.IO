/* =========================================================
   PRODUCT SPECIFICATION
   STEP 4 / 6

   PURPOSE
   ---------------------------------------------------------
   Step 4 quản lý:

   1. Product Information
      - name
      - business
      - category
      - brand
      - origin

   2. Product Description
      - product.description

   3. Technical Specification
      - product.specs.table
      - product.specs.text


   DATA STRUCTURE
   ---------------------------------------------------------

   currentProduct.product = {

       name: "",

       business: "",

       category: "",

       brand: "",

       origin: "",

       description: "",

       specs: {

           table: {

               headers: [],

               rows: []

           },

           text: []

       }

   }


   IMPORTANT
   ---------------------------------------------------------

   CHỈ SỬ DỤNG:

       product.specs

   KHÔNG SỬ DỤNG:

       product.specification


   STEP 4 KHÔNG TẠO:

       Specification 1
       Specification 2
       Specification 3

   ========================================================= */


/* =========================================================
   RENDER STEP 4
========================================================= */

function renderProductSpecification() {

    const body =
        document.getElementById(
            "productModalBody"
        );


    if (!body) {

        console.error(
            "productModalBody not found."
        );

        return;

    }


    const product =
        window.currentProduct?.product || {};


    /* =========================================
       NORMALIZE DATA
    ========================================== */

    const normalizedSpecs =
        normalizeStep4Specs(
            product.specs
        );


    /* =========================================
       SAVE NORMALIZED SPECS
    ========================================== */

    if (
        window.currentProduct &&
        window.currentProduct.product
    ) {

        window.currentProduct.product.specs =
            normalizedSpecs;

    }


    /* =========================================
       RENDER
    ========================================== */

    body.innerHTML = `

        <div class="product-specification">

            <!-- =====================================
                 STEP TITLE
            ====================================== -->

            <h3 class="product-step-title">

                Step 4 / 6 - Product Specification

            </h3>


            <!-- =====================================
                 PRODUCT INFORMATION
            ====================================== -->

            <div class="product-information-section">

                <h4>

                    Product Information

                </h4>


                <!-- PRODUCT NAME -->

                <div class="form-group">

                    <label>

                        Product Name

                    </label>


                    <input

                        id="specProductName"

                        type="text"

                        value="${escapeSpecificationHTML(
                            product.name || ""
                        )}"

                    >

                </div>


                <!-- BUSINESS -->

                <div class="form-group">

                    <label>

                        Business

                    </label>


                    <input

                        id="specProductBusiness"

                        type="text"

                        value="${escapeSpecificationHTML(
                            product.business || ""
                        )}"

                        readonly

                    >

                </div>


                <!-- CATEGORY -->

                <div class="form-group">

                    <label>

                        Category

                    </label>


                    <input

                        id="specProductCategory"

                        type="text"

                        value="${escapeSpecificationHTML(
                            product.category || ""
                        )}"

                        readonly

                    >

                </div>


                <!-- BRAND -->

                <div class="form-group">

                    <label>

                        Brand

                    </label>


                    <input

                        id="specProductBrand"

                        type="text"

                        value="${escapeSpecificationHTML(
                            product.brand || ""
                        )}"

                        readonly

                    >

                </div>


                <!-- ORIGIN -->

                <div class="form-group">

                    <label>

                        Origin

                    </label>


                    <input

                        id="specProductOrigin"

                        type="text"

                        value="${escapeSpecificationHTML(
                            product.origin || ""
                        )}"

                        readonly

                    >

                </div>

            </div>


            <!-- =====================================
                 PRODUCT DESCRIPTION
            ====================================== -->

            <div class="product-description-section">

                <h4>

                    Product Description

                </h4>


                <textarea

                    id="specProductDescription"

                    rows="8"

                    placeholder="Nhập mô tả sản phẩm..."

                >${escapeSpecificationHTML(
                    product.description || ""
                )}</textarea>


                <small>

                    Mô tả sản phẩm được hiển thị riêng
                    với Technical Specification.

                </small>

            </div>


            <!-- =====================================
                 TECHNICAL SPECIFICATION
            ====================================== -->

            <div class="technical-specification-section">

                <h4>

                    Technical Specification

                </h4>


                <p class="specification-description">

                    Dữ liệu được lấy từ Website và Free Parser.
                    Bạn có thể kiểm tra, chỉnh sửa hoặc nhập thủ công
                    trước khi chuyển sang bước Preview.

                </p>


                <!-- =================================
                     SPECIFICATION TABLE
                ================================== -->

                <div class="specification-table-section">

                    <div class="specification-section-header">

                        <h5>

                            Specification Table

                        </h5>


                        <button

                            type="button"

                            onclick="addSpecificationTable()"

                        >

                            + Add Specification Table

                        </button>

                    </div>


                    <div

                        id="specificationTablesContainer"

                    ></div>

                </div>


                <!-- =================================
                     SPECIFICATION TEXT
                ================================== -->

                <div class="specification-text-section">

                    <div class="specification-section-header">

                        <h5>

                            Specification Text

                        </h5>


                        <button

                            type="button"

                            onclick="addSpecificationText()"

                        >

                            + Add Specification Text

                        </button>

                    </div>


                    <div

                        id="specificationTextContainer"

                    ></div>

                </div>

            </div>


            <!-- =====================================
                 STEP BUTTONS
            ====================================== -->

            <div class="step-buttons">


                <button

                    type="button"

                    onclick="backToProductContentImport()"

                >

                    ← Back

                </button>


                <button

                    type="button"

                    onclick="nextProductSpecification()"

                >

                    Next →

                </button>


            </div>


        </div>

    `;


    /* =========================================
       RENDER TABLES
    ========================================== */

    renderSpecificationTables();


    /* =========================================
       RENDER TEXT
    ========================================== */

    renderSpecificationTexts();

}


/* =========================================================
   NORMALIZE STEP 4 SPECS
========================================================= */

function normalizeStep4Specs(
    specs
) {

    const normalized = {

        table: {

            headers: [],

            rows: []

        },

        text: []

    };


    if (
        !specs ||
        typeof specs !== "object"
    ) {

        return normalized;

    }


    /* =========================================
       TABLE
    ========================================== */

    if (
        specs.table &&
        typeof specs.table === "object"
    ) {

        if (
            Array.isArray(
                specs.table.headers
            )
        ) {

            normalized.table.headers =

                specs.table.headers.map(

                    header =>

                        String(
                            header ?? ""
                        ).trim()

                );

        }


        if (
            Array.isArray(
                specs.table.rows
            )
        ) {

            normalized.table.rows =

                specs.table.rows.map(

                    row => {

                        if (
                            !Array.isArray(row)
                        ) {

                            return [];

                        }


                        return row.map(

                            value =>

                                String(
                                    value ?? ""
                                ).trim()

                        );

                    }

                );

        }

    }


    /* =========================================
       TEXT
    ========================================== */

    if (
        Array.isArray(
            specs.text
        )
    ) {

        normalized.text =

            specs.text

                .map(

                    item => {

                        if (
                            item === null ||
                            item === undefined
                        ) {

                            return "";

                        }


                        if (
                            typeof item === "string"
                        ) {

                            return item.trim();

                        }


                        if (
                            typeof item === "object"
                        ) {

                            const name =

                                item.name !== undefined

                                    ? String(
                                        item.name
                                    ).trim()

                                    : "";


                            const value =

                                item.value !== undefined

                                    ? String(
                                        item.value
                                    ).trim()

                                    : "";


                            if (
                                name &&
                                value
                            ) {

                                return (

                                    name +

                                    ": " +

                                    value

                                );

                            }


                            return (

                                name ||

                                value ||

                                ""

                            );

                        }


                        return String(
                            item
                        ).trim();

                    }

                )

                .filter(Boolean);

    }


    return normalized;

}


/* =========================================================
   RENDER SPECIFICATION TABLES
========================================================= */

function renderSpecificationTables() {

    const container =
        document.getElementById(
            "specificationTablesContainer"
        );


    if (!container) {

        return;

    }


    const specs =
        window.currentProduct?.product?.specs || {};


    const table =
        specs.table || {};


    const headers =

        Array.isArray(
            table.headers
        )

            ? table.headers

            : [];


    const rows =

        Array.isArray(
            table.rows
        )

            ? table.rows

            : [];


    /* =========================================
       NO TABLE
    ========================================== */

    if (
        headers.length === 0 &&
        rows.length === 0
    ) {

        container.innerHTML = "";

        return;

    }


    renderSingleSpecificationTable(

        container,

        headers,

        rows

    );

}


/* =========================================================
   RENDER SINGLE TABLE
========================================================= */

function renderSingleSpecificationTable(

    container,

    headers,

    rows

) {

    const safeHeaders =

        Array.isArray(headers)

            ? headers

            : [];


    const safeRows =

        Array.isArray(rows)

            ? rows

            : [];


    container.innerHTML = `

        <div class="specification-table-card">


            <div class="specification-table-card-header">

                <strong>

                    Technical Specification Table

                </strong>


                <button

                    type="button"

                    onclick="removeSpecificationTable()"

                >

                    ✕ Remove Table

                </button>

            </div>


            <div class="specification-table-wrapper">

                <table

                    class="product-specification-table"

                >

                    <thead>

                        <tr>

                            ${safeHeaders.map(

                                (header, index) => `

                                    <th>

                                        <div class="specification-header-cell">

                                            <input

                                                type="text"

                                                class="specification-header-input"

                                                data-column-index="${index}"

                                                value="${escapeSpecificationHTML(
                                                    header
                                                )}"

                                                placeholder="Tên thông số"

                                                onchange="updateSpecificationTable()"

                                            >


                                            <button

                                                type="button"

                                                class="specification-remove-column"

                                                onclick="removeSpecificationColumn(${index})"

                                            >

                                                ✕

                                            </button>

                                        </div>

                                    </th>

                                `

                            ).join("")}

                        </tr>

                    </thead>


                    <tbody>

                        ${safeRows.map(

                            (row, rowIndex) => `

                                <tr>

                                    ${safeHeaders.map(

                                        (_, columnIndex) => `

                                            <td>

                                                <input

                                                    type="text"

                                                    class="specification-cell-input"

                                                    data-row-index="${rowIndex}"

                                                    data-column-index="${columnIndex}"

                                                    value="${escapeSpecificationHTML(
                                                        row?.[columnIndex] || ""
                                                    )}"

                                                    placeholder="Giá trị"

                                                    onchange="updateSpecificationTable()"

                                                >

                                            </td>

                                        `

                                    ).join("")}


                                    <td class="specification-row-action">

                                        <button

                                            type="button"

                                            onclick="removeSpecificationRow(${rowIndex})"

                                        >

                                            ✕

                                        </button>

                                    </td>

                                </tr>

                            `

                        ).join("")}

                    </tbody>

                </table>

            </div>


            <div class="specification-table-actions">


                <button

                    type="button"

                    onclick="addSpecificationColumn()"

                >

                    + Cột

                </button>


                <button

                    type="button"

                    onclick="addSpecificationRow()"

                >

                    + Add Row

                </button>


            </div>


        </div>

    `;

}


/* =========================================================
   ADD SPECIFICATION TABLE
========================================================= */

function addSpecificationTable() {

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


    window.currentProduct.product.specs = {

        table: {

            headers: [

                "Mức cân",

                "Bước nhảy",

                "Đĩa cân inox",

                "Kích thước cân",

                "Đơn vị cân"

            ],

            rows: [

                [

                    "",

                    "",

                    "",

                    "",

                    ""

                ]

            ]

        },

        text:

            Array.isArray(

                window.currentProduct.product

                    .specs

                    ?.text

            )

                ? [

                    ...window.currentProduct.product

                        .specs

                        .text

                ]

                : []

    };


    renderSpecificationTables();

}


/* =========================================================
   REMOVE SPECIFICATION TABLE
========================================================= */

function removeSpecificationTable() {

    if (
        !window.currentProduct?.product
    ) {

        return;

    }


    window.currentProduct.product.specs = {

        table: {

            headers: [],

            rows: []

        },


        text:

            Array.isArray(

                window.currentProduct.product

                    .specs

                    ?.text

            )

                ? [

                    ...window.currentProduct.product

                        .specs

                        .text

                ]

                : []

    };


    renderSpecificationTables();

}


/* =========================================================
   ADD SPECIFICATION COLUMN
========================================================= */

function addSpecificationColumn() {

    const specs =
        window.currentProduct?.product?.specs;


    if (!specs) {

        return;

    }


    if (
        !specs.table
    ) {

        specs.table = {

            headers: [],

            rows: []

        };

    }


    specs.table.headers.push(

        "Thông số mới"

    );


    specs.table.rows =

        specs.table.rows.map(

            row => [

                ...row,

                ""

            ]

        );


    renderSpecificationTables();

}


/* =========================================================
   REMOVE SPECIFICATION COLUMN
========================================================= */

function removeSpecificationColumn(

    columnIndex

) {

    const specs =
        window.currentProduct?.product?.specs;


    if (
        !specs?.table
    ) {

        return;

    }


    if (
        specs.table.headers.length <= 1
    ) {

        alert(

            "Bảng phải có ít nhất một cột."

        );


        return;

    }


    specs.table.headers.splice(

        columnIndex,

        1

    );


    specs.table.rows =

        specs.table.rows.map(

            row => {

                const newRow = [

                    ...row

                ];


                newRow.splice(

                    columnIndex,

                    1

                );


                return newRow;

            }

        );


    renderSpecificationTables();

}


/* =========================================================
   ADD SPECIFICATION ROW
========================================================= */

function addSpecificationRow() {

    const specs =
        window.currentProduct?.product?.specs;


    if (
        !specs?.table
    ) {

        return;

    }


    const columnCount =

        specs.table.headers.length;


    if (
        columnCount === 0
    ) {

        return;

    }


    specs.table.rows.push(

        new Array(
            columnCount
        ).fill("")

    );


    renderSpecificationTables();

}


/* =========================================================
   REMOVE SPECIFICATION ROW
========================================================= */

function removeSpecificationRow(

    rowIndex

) {

    const specs =
        window.currentProduct?.product?.specs;


    if (
        !specs?.table
    ) {

        return;

    }


    specs.table.rows.splice(

        rowIndex,

        1

    );


    renderSpecificationTables();

}


/* =========================================================
   UPDATE SPECIFICATION TABLE
========================================================= */

function updateSpecificationTable() {

    const specs =
        window.currentProduct?.product?.specs;


    if (
        !specs?.table
    ) {

        return;

    }


    const headerInputs =

        document.querySelectorAll(

            ".specification-header-input"

        );


    specs.table.headers =

        Array.from(

            headerInputs

        ).map(

            input =>

                input.value.trim()

        );


    const rowInputs =

        document.querySelectorAll(

            ".specification-cell-input"

        );


    const columnCount =

        specs.table.headers.length;


    const rowCount =

        columnCount > 0

            ? Math.ceil(

                rowInputs.length /

                columnCount

            )

            : 0;


    const newRows = [];


    for (

        let rowIndex = 0;

        rowIndex < rowCount;

        rowIndex++

    ) {

        const row = [];


        for (

            let columnIndex = 0;

            columnIndex < columnCount;

            columnIndex++

        ) {

            const input =

                document.querySelector(

                    `.specification-cell-input[data-row-index="${rowIndex}"][data-column-index="${columnIndex}"]`

                );


            row.push(

                input

                    ? input.value.trim()

                    : ""

            );

        }


        newRows.push(

            row

        );

    }


    specs.table.rows =

        newRows;

}


/* =========================================================
   RENDER SPECIFICATION TEXTS
========================================================= */

function renderSpecificationTexts() {

    const container =
        document.getElementById(
            "specificationTextContainer"
        );


    if (!container) {

        return;

    }


    const specs =
        window.currentProduct?.product?.specs || {};


    const texts =

        Array.isArray(
            specs.text
        )

            ? specs.text

            : [];


    container.innerHTML =

        texts.map(

            (text, index) => `

                <div

                    class="specification-text-item"

                    data-text-index="${index}"

                >


                    <textarea

                        class="specification-text-input"

                        rows="4"

                        placeholder="Nhập thông số kỹ thuật..."

                        onchange="updateSpecificationTexts()"

                    >${escapeSpecificationHTML(
                        text
                    )}</textarea>


                    <button

                        type="button"

                        onclick="removeSpecificationText(${index})"

                    >

                        ✕ Remove

                    </button>


                </div>

            `

        ).join("");

}


/* =========================================================
   ADD SPECIFICATION TEXT
========================================================= */

function addSpecificationText(

    value = ""

) {

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
        !window.currentProduct.product.specs
    ) {

        window.currentProduct.product.specs = {

            table: {

                headers: [],

                rows: []

            },

            text: []

        };

    }


    if (
        !Array.isArray(

            window.currentProduct.product

                .specs

                .text

        )
    ) {

        window.currentProduct.product.specs.text = [];

    }


    window.currentProduct.product.specs.text.push(

        value

    );


    renderSpecificationTexts();

}


/* =========================================================
   REMOVE SPECIFICATION TEXT
========================================================= */

function removeSpecificationText(

    index

) {

    const specs =
        window.currentProduct?.product?.specs;


    if (
        !Array.isArray(
            specs?.text
        )
    ) {

        return;

    }


    specs.text.splice(

        index,

        1

    );


    renderSpecificationTexts();

}


/* =========================================================
   UPDATE SPECIFICATION TEXTS
========================================================= */

function updateSpecificationTexts() {

    const inputs =

        document.querySelectorAll(

            ".specification-text-input"

        );


    if (
        !window.currentProduct?.product
    ) {

        return;

    }


    if (
        !window.currentProduct.product.specs
    ) {

        window.currentProduct.product.specs = {

            table: {

                headers: [],

                rows: []

            },

            text: []

        };

    }


    window.currentProduct.product.specs.text =

        Array.from(

            inputs

        ).map(

            input =>

                input.value.trim()

        );

}


/* =========================================================
   SAVE STEP 4
========================================================= */

function saveProductSpecification() {

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


    const product =

        window.currentProduct.product;


    /* =========================================
       UPDATE TABLE
    ========================================== */

    updateSpecificationTable();


    /* =========================================
       UPDATE TEXT
    ========================================== */

    updateSpecificationTexts();


    /* =========================================
       PRODUCT NAME
    ========================================== */

    const nameInput =

        document.getElementById(

            "specProductName"

        );


    if (nameInput) {

        product.name =

            nameInput.value.trim();

    }


    /* =========================================
       DESCRIPTION
    ========================================== */

    const descriptionInput =

        document.getElementById(

            "specProductDescription"

        );


    if (descriptionInput) {

        product.description =

            descriptionInput.value.trim();

    }


    /* =========================================
       ENSURE SPECS STRUCTURE
    ========================================== */

    if (
        !product.specs
    ) {

        product.specs = {

            table: {

                headers: [],

                rows: []

            },

            text: []

        };

    }


    /* =========================================
       REMOVE LEGACY FIELD
    ========================================== */

    delete product.specification;


    /* =========================================
       DEBUG
    ========================================== */

    console.log("");

    console.log(

        "========== STEP 4 SAVED =========="

    );

    console.log(

        product

    );

    console.log(

        "=================================="

    );


    return product;

}


/* =========================================================
   BACK TO STEP 3
========================================================= */

function backToProductContentImport() {

    saveProductSpecification();


    if (
        typeof renderProductContentImport ===
        "function"
    ) {

        renderProductContentImport();

        return;

    }


    console.error(

        "renderProductContentImport is not defined."

    );

}


/* =========================================================
   NEXT STEP
========================================================= */

function nextProductSpecification() {

    /* =========================================
       SAVE STEP 4
    ========================================== */

    saveProductSpecification();


    /* =========================================
       SAVE DRAFT
    ========================================== */

    if (
        typeof saveProductDraft ===
        "function"
    ) {

        saveProductDraft();

    }


    /* =========================================
       DEBUG
    ========================================== */

    console.log("");

    console.log(

        "========== NEXT STEP =========="

    );

    console.log(

        window.currentProduct?.product

    );

    console.log(

        "=============================="

    );


    /* =========================================
       STEP 5
       
       IMPORTANT

       Nếu hệ thống của bạn đã có
       renderProductPreview()
       thì gọi nó.

       Nếu tên hàm Step 5 khác,
       thay đúng tên hàm tại đây.
    ========================================== */

    if (
        typeof renderProductPreview ===
        "function"
    ) {

        renderProductPreview();

        return;

    }


    /* =========================================
       FALLBACK

       Không làm mất dữ liệu.
    ========================================== */

    alert(

        "Đã lưu Step 4. Hàm chuyển sang Step 5 chưa được kết nối."

    );

}


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