/* =========================================================
   PRODUCT SPECIFICATION
   STEP 4 / 6

   PURPOSE
   ---------------------------------------------------------
   Step 4 xử lý:

   1. Product Description

   2. Specification Table

   3. Specification Text


   DATA STRUCTURE
   ---------------------------------------------------------

   currentProduct.product = {

       name: "",

       description: "",

       specs: {

           table: {

               headers: [],

               rows: []

           },

           text: []

       }

   }


   DATA FLOW
   ---------------------------------------------------------

   STEP 3
       ↓
   product-content-import.js
       ↓
   normalizeImportedProduct()
       ↓
   currentProduct.product
       ↓
   STEP 4
       ↓
   product-specification.js
       ↓
   currentProduct.product
       ↓
   STEP 5 Preview


   IMPORTANT
   ---------------------------------------------------------

   CHỈ SỬ DỤNG:

       product.description

       product.specs.table

       product.specs.text


   KHÔNG SỬ DỤNG:

       product.specification


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

        return;

    }


    const product =
        window.currentProduct?.product || {};


    const specs =
        normalizeStep4Specs(
            product.specs
        );


    body.innerHTML = `

    <div class="product-specification">


        <!-- =========================================
             STEP TITLE
        ========================================== -->

        <h3 class="product-step-title">

            Step 4 / 6 - Product Specification

        </h3>


        <!-- =========================================
             PRODUCT INFORMATION
        ========================================== -->

        <div class="product-specification-section">

            <h4>

                Product Information

            </h4>


            <div class="product-info-grid">


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

                        readonly

                    >

                </div>


                <!-- BUSINESS -->

                <div class="form-group">

                    <label>

                        Business

                    </label>


                    <input

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

                        type="text"

                        value="${escapeSpecificationHTML(

                            product.origin || ""

                        )}"

                        readonly

                    >

                </div>


            </div>

        </div>


        <!-- =========================================
             PRODUCT DESCRIPTION
        ========================================== -->

        <div class="product-specification-section">

            <h4>

                Product Description

            </h4>


            <textarea

                id="specProductDescription"

                rows="7"

                placeholder="Nhập mô tả sản phẩm..."

            >${escapeSpecificationHTML(

                product.description || ""

            )}</textarea>


            <small>

                Mô tả sản phẩm được hiển thị riêng
                với Technical Specification.

            </small>

        </div>


        <!-- =========================================
             TECHNICAL SPECIFICATION
        ========================================== -->

        <div class="product-specification-section">

            <h4>

                Technical Specification

            </h4>


            <p class="specification-help">

                Dữ liệu được lấy từ Website và Free Parser.
                Bạn có thể kiểm tra, chỉnh sửa hoặc nhập thủ công
                trước khi chuyển sang bước Preview.

            </p>


            <!-- =====================================
                 SPECIFICATION TABLE
            ====================================== -->

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

                    id="specificationTableContainer"

                >

                    ${renderSpecificationTableHTML(

                        specs.table

                    )}

                </div>


            </div>


            <!-- =====================================
                 SPECIFICATION TEXT
            ====================================== -->

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

                >

                    ${renderSpecificationTextHTML(

                        specs.text

                    )}

                </div>


            </div>


        </div>


        <!-- =========================================
             BUTTONS
        ========================================== -->

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


    initProductSpecification();

}


/* =========================================================
   INIT
========================================================= */

function initProductSpecification() {

    console.log(

        "STEP 4 READY"

    );


    console.log(

        "PRODUCT DESCRIPTION:",

        window.currentProduct?.product?.description

    );


    console.log(

        "PRODUCT SPECS:",

        window.currentProduct?.product?.specs

    );

}


/* =========================================================
   NORMALIZE STEP 4 SPECS
========================================================= */

function normalizeStep4Specs(

    specs

) {

    const result = {

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

        return result;

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

            result.table.headers =

                specs.table.headers.map(

                    value =>

                        String(

                            value ?? ""

                        ).trim()

                );

        }


        if (

            Array.isArray(

                specs.table.rows

            )

        ) {

            result.table.rows =

                specs.table.rows.map(

                    row =>

                        Array.isArray(row)

                            ? row.map(

                                value =>

                                    String(

                                        value ?? ""

                                    ).trim()

                            )

                            : []

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

        result.text =

            specs.text

                .map(

                    value =>

                        String(

                            value ?? ""

                        ).trim()

                )

                .filter(Boolean);

    }


    return result;

}


/* =========================================================
   RENDER SPECIFICATION TABLE
========================================================= */

function renderSpecificationTableHTML(

    table

) {

    if (

        !table ||

        !Array.isArray(

            table.headers

        ) ||

        !table.headers.length

    ) {

        return `

            <div class="empty-specification-table">

                <p>

                    Chưa có bảng thông số kỹ thuật.

                </p>

                <small>

                    Bạn có thể thêm bảng thủ công
                    hoặc dữ liệu sẽ được nạp từ Step 3.

                </small>

            </div>

        `;

    }


    const headers =

        table.headers;


    const rows =

        Array.isArray(

            table.rows

        )

            ? table.rows

            : [];


    return `

        <div

            class="specification-table-wrapper"

        >

            <table

                class="product-specification-table"

            >

                <thead>

                    <tr>

                        ${headers.map(

                            (header, index) => `

                            <th>

                                <input

                                    type="text"

                                    value="${escapeSpecificationHTML(

                                        header

                                    )}"

                                    data-spec-header="${index}"

                                    onchange="updateSpecificationTableHeader(

                                        ${index},

                                        this.value

                                    )"

                                >

                            </th>

                        `

                        ).join("")}


                        <th

                            class="specification-action-column"

                        >

                            Action

                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${rows.map(

                        (row, rowIndex) => `

                        <tr>

                            ${headers.map(

                                (_, columnIndex) => `

                                <td>

                                    <input

                                        type="text"

                                        value="${escapeSpecificationHTML(

                                            row[columnIndex] || ""

                                        )}"

                                        onchange="updateSpecificationTableCell(

                                            ${rowIndex},

                                            ${columnIndex},

                                            this.value

                                        )"

                                    >

                                </td>

                            ).join("")}


                            <td

                                class="specification-action-column"

                            >

                                <button

                                    type="button"

                                    onclick="removeSpecificationRow(

                                        ${rowIndex}

                                    )"

                                >

                                    ✕

                                </button>

                            </td>

                        </tr>

                    `

                    ).join("")}

                </tbody>

            </table>


            <div

                class="specification-table-actions"

            >

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


            <button

                type="button"

                class="remove-specification-table"

                onclick="removeSpecificationTable()"

            >

                ✕

                Remove Table

            </button>

        </div>

    `;

}


/* =========================================================
   RENDER SPECIFICATION TEXT
========================================================= */

function renderSpecificationTextHTML(

    textList

) {

    if (

        !Array.isArray(

            textList

        ) ||

        !textList.length

    ) {

        return `

            <div class="empty-specification-text">

                <p>

                    Chưa có thông số kỹ thuật dạng text.

                </p>

                <small>

                    Bạn có thể thêm thủ công.

                </small>

            </div>

        `;

    }


    return textList.map(

        (text, index) => `

        <div

            class="specification-text-item"

            data-spec-text-index="${index}"

        >

            <textarea

                rows="4"

                onchange="updateSpecificationText(

                    ${index},

                    this.value

                )"

                placeholder="Nhập thông số kỹ thuật..."

            >${escapeSpecificationHTML(

                text

            )}</textarea>


            <button

                type="button"

                onclick="removeSpecificationText(

                    ${index}

                )"

            >

                ✕

                Remove

            </button>

        </div>

    `

    ).join("");

}


/* =========================================================
   ADD SPECIFICATION TABLE
========================================================= */

function addSpecificationTable() {

    ensureProductSpecificationData();


    const table =

        window.currentProduct.product.specs.table;


    if (

        table.headers.length

    ) {

        alert(

            "Sản phẩm đã có Specification Table."

        );


        return;

    }


    table.headers = [

        "Mức cân",

        "Bước nhảy",

        "Đĩa cân inox",

        "Kích thước cân",

        "Đơn vị cân"

    ];


    table.rows = [

        [

            "",

            "",

            "",

            "",

            ""

        ]

    ];


    renderProductSpecification();

}


/* =========================================================
   REMOVE SPECIFICATION TABLE
========================================================= */

function removeSpecificationTable() {

    if (

        !confirm(

            "Bạn có chắc muốn xóa toàn bộ bảng thông số kỹ thuật?"

        )

    ) {

        return;

    }


    ensureProductSpecificationData();


    window.currentProduct.product.specs.table = {

        headers: [],

        rows: []

    };


    renderProductSpecification();

}


/* =========================================================
   ADD SPECIFICATION COLUMN
========================================================= */

function addSpecificationColumn() {

    ensureProductSpecificationData();


    const table =

        window.currentProduct.product.specs.table;


    table.headers.push(

        "Thông số mới"

    );


    table.rows =

        table.rows.map(

            row => {

                const newRow =

                    Array.isArray(row)

                        ? [

                            ...row

                        ]

                        : [];


                newRow.push(

                    ""

                );


                return newRow;

            }

        );


    renderProductSpecification();

}


/* =========================================================
   ADD SPECIFICATION ROW
========================================================= */

function addSpecificationRow() {

    ensureProductSpecificationData();


    const table =

        window.currentProduct.product.specs.table;


    if (

        !table.headers.length

    ) {

        addSpecificationTable();


        return;

    }


    table.rows.push(

        table.headers.map(

            () => ""

        )

    );


    renderProductSpecification();

}


/* =========================================================
   REMOVE SPECIFICATION ROW
========================================================= */

function removeSpecificationRow(

    rowIndex

) {

    ensureProductSpecificationData();


    const table =

        window.currentProduct.product.specs.table;


    if (

        rowIndex < 0 ||

        rowIndex >= table.rows.length

    ) {

        return;

    }


    table.rows.splice(

        rowIndex,

        1

    );


    renderProductSpecification();

}


/* =========================================================
   UPDATE TABLE HEADER
========================================================= */

function updateSpecificationTableHeader(

    columnIndex,

    value

) {

    ensureProductSpecificationData();


    const table =

        window.currentProduct.product.specs.table;


    if (

        columnIndex < 0 ||

        columnIndex >= table.headers.length

    ) {

        return;

    }


    table.headers[columnIndex] =

        value.trim();


    normalizeSpecificationTableRows();


}


/* =========================================================
   UPDATE TABLE CELL
========================================================= */

function updateSpecificationTableCell(

    rowIndex,

    columnIndex,

    value

) {

    ensureProductSpecificationData();


    const table =

        window.currentProduct.product.specs.table;


    if (

        !table.rows[rowIndex]

    ) {

        return;

    }


    if (

        !Array.isArray(

            table.rows[rowIndex]

        )

    ) {

        table.rows[rowIndex] = [];

    }


    table.rows[rowIndex][columnIndex] =

        value.trim();

}


/* =========================================================
   NORMALIZE TABLE ROWS
========================================================= */

function normalizeSpecificationTableRows() {

    ensureProductSpecificationData();


    const table =

        window.currentProduct.product.specs.table;


    const columnCount =

        table.headers.length;


    table.rows =

        table.rows.map(

            row => {

                const normalized =

                    Array.isArray(row)

                        ? [

                            ...row

                        ]

                        : [];


                while (

                    normalized.length <

                    columnCount

                ) {

                    normalized.push("");

                }


                if (

                    normalized.length >

                    columnCount

                ) {

                    normalized.length =

                        columnCount;

                }


                return normalized;

            }

        );

}


/* =========================================================
   ADD SPECIFICATION TEXT
========================================================= */

function addSpecificationText() {

    ensureProductSpecificationData();


    window.currentProduct.product.specs.text.push(

        ""

    );


    renderProductSpecification();

}


/* =========================================================
   UPDATE SPECIFICATION TEXT
========================================================= */

function updateSpecificationText(

    index,

    value

) {

    ensureProductSpecificationData();


    const text =

        window.currentProduct.product.specs.text;


    if (

        index < 0 ||

        index >= text.length

    ) {

        return;

    }


    text[index] =

        value.trim();

}


/* =========================================================
   REMOVE SPECIFICATION TEXT
========================================================= */

function removeSpecificationText(

    index

) {

    ensureProductSpecificationData();


    const text =

        window.currentProduct.product.specs.text;


    if (

        index < 0 ||

        index >= text.length

    ) {

        return;

    }


    text.splice(

        index,

        1

    );


    renderProductSpecification();

}


/* =========================================================
   ENSURE PRODUCT SPECIFICATION DATA
========================================================= */

function ensureProductSpecificationData() {

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


    if (

        !product.specs ||

        typeof product.specs !== "object"

    ) {

        product.specs = {};

    }


    if (

        !product.specs.table ||

        typeof product.specs.table !== "object"

    ) {

        product.specs.table = {};

    }


    if (

        !Array.isArray(

            product.specs.table.headers

        )

    ) {

        product.specs.table.headers = [];

    }


    if (

        !Array.isArray(

            product.specs.table.rows

        )

    ) {

        product.specs.table.rows = [];

    }


    if (

        !Array.isArray(

            product.specs.text

        )

    ) {

        product.specs.text = [];

    }


    normalizeSpecificationTableRows();

}


/* =========================================================
   SAVE STEP 4
========================================================= */

function saveProductSpecification() {

    ensureProductSpecificationData();


    const product =

        window.currentProduct.product;


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
       REMOVE LEGACY FIELD
    ========================================== */

    delete product.specification;


    /* =========================================
       CLEAN TABLE
    ========================================== */

    const table =

        product.specs.table;


    table.headers =

        table.headers.map(

            value =>

                String(

                    value ?? ""

                ).trim()

        );


    table.rows =

        table.rows.map(

            row => {

                const normalized =

                    Array.isArray(row)

                        ? [

                            ...row

                        ]

                        : [];


                while (

                    normalized.length <

                    table.headers.length

                ) {

                    normalized.push("");

                }


                if (

                    normalized.length >

                    table.headers.length

                ) {

                    normalized.length =

                        table.headers.length;

                }


                return normalized.map(

                    value =>

                        String(

                            value ?? ""

                        ).trim()

                );

            }

        );


    /* =========================================
       CLEAN TEXT
    ========================================== */

    product.specs.text =

        product.specs.text

            .map(

                value =>

                    String(

                        value ?? ""

                    ).trim()

            )

            .filter(Boolean);


    /* =========================================
       DEBUG
    ========================================== */

    console.log("");

    console.log(

        "========== STEP 4 SAVED =========="

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


/* =========================================================
   NEXT
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

        typeof saveProductDraft === "function"

    ) {

        saveProductDraft();

    }


    /* =========================================
       DEBUG
    ========================================== */

    console.log("");

    console.log(

        "========== PRODUCT BEFORE STEP 5 =========="

    );


    console.log(

        window.currentProduct?.product

    );


    console.log(

        "==========================================="

    );


    /* =========================================
       STEP 5
    ========================================== */

    if (

        typeof renderProductPreview === "function"

    ) {

        renderProductPreview();

        return;

    }


    /* =========================================
       FALLBACK

       Nếu tên hàm Step 5 khác,
       báo lỗi rõ ràng.
    ========================================== */

    console.warn(

        "renderProductPreview() chưa được định nghĩa."

    );


    alert(

        "Đã lưu Step 4. Chưa tìm thấy hàm mở Step 5."

    );

}


/* =========================================================
   BACK TO STEP 3
========================================================= */

function backToProductContentImport() {

    /* =========================================
       SAVE CURRENT STEP
    ========================================== */

    saveProductSpecification();


    /* =========================================
       SAVE DRAFT
    ========================================== */

    if (

        typeof saveProductDraft === "function"

    ) {

        saveProductDraft();

    }


    /* =========================================
       BACK
    ========================================== */

    if (

        typeof renderProductContentImport ===

        "function"

    ) {

        renderProductContentImport();

        return;

    }


    console.warn(

        "renderProductContentImport() chưa được định nghĩa."

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


/* =========================================================
   OPTIONAL:

   SAVE ON MODAL CLOSE / OUTSIDE CONTROL
========================================================= */

function getProductSpecificationData() {

    ensureProductSpecificationData();


    saveProductSpecification();


    return (

        window.currentProduct.product

    );

}


/* =========================================================
   DEBUG HELPER
========================================================= */

function debugProductSpecification() {

    console.log("");

    console.log(

        "========== PRODUCT SPECIFICATION DEBUG =========="

    );


    console.log(

        JSON.stringify(

            window.currentProduct?.product || {},

            null,

            4

        )

    );


    console.log(

        "================================================="

    );

}