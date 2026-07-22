/* =========================================================
   PRODUCT SPECIFICATION
   STEP 4 / 6

   PURPOSE
   ---------------------------------------------------------
   Step 4 xử lý:

   1. Product Information
   2. Product Description
   3. Technical Specification Table
   4. Technical Specification Text

   DATA STRUCTURE
   ---------------------------------------------------------

   window.currentProduct.product

   {

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


   IMPORTANT
   ---------------------------------------------------------

   CHỈ SỬ DỤNG:

       product.description

       product.specs

   KHÔNG SỬ DỤNG:

       product.specification


   STEP 3 IMPORT
          ↓
   product.description
          ↓
   product.specs.table
          ↓
   product.specs.text
          ↓
   STEP 4 EDIT
          ↓
   STEP 5 PREVIEW


   ========================================================= */


/* =========================================================
   RENDER STEP 4
========================================================= */

function renderProductSpecification() {

    console.log(
        "STEP 4 - PRODUCT SPECIFICATION"
    );


    const body =
        document.getElementById(
            "productModalBody"
        );


    if (!body) {

        console.error(
            "productModalBody không tồn tại."
        );

        return;

    }


    /* =========================================
       ĐẢM BẢO PRODUCT STRUCTURE
    ========================================== */

    ensureProductSpecificationStructure();


    const product =
        window.currentProduct.product;


    const specs =
        product.specs;


    const table =
        specs.table;


    const text =
        specs.text;


    /* =========================================
       RENDER
    ========================================== */

    body.innerHTML = `

        <div class="product-specification">

            <!-- =================================
                 TITLE
            ================================== -->

            <h3 class="product-step-title">

                Step 4 / 6 - Product Specification

            </h3>


            <!-- =================================
                 PRODUCT INFORMATION
            ================================== -->

            <div class="product-info-section">

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
                            id="specProductName"
                            value="${escapeProductSpecificationHTML(
                                product.name || ""
                            )}"
                        >

                    </div>


                    <div class="form-group">

                        <label>

                            Business

                        </label>

                        <input
                            type="text"
                            value="${escapeProductSpecificationHTML(
                                product.business || ""
                            )}"
                            readonly
                        >

                    </div>


                    <div class="form-group">

                        <label>

                            Category

                        </label>

                        <input
                            type="text"
                            value="${escapeProductSpecificationHTML(
                                product.category || ""
                            )}"
                            readonly
                        >

                    </div>


                    <div class="form-group">

                        <label>

                            Brand

                        </label>

                        <input
                            type="text"
                            value="${escapeProductSpecificationHTML(
                                product.brand || ""
                            )}"
                            readonly
                        >

                    </div>


                    <div class="form-group">

                        <label>

                            Origin

                        </label>

                        <input
                            type="text"
                            value="${escapeProductSpecificationHTML(
                                product.origin || ""
                            )}"
                            readonly
                        >

                    </div>


                </div>

            </div>


            <!-- =================================
                 PRODUCT DESCRIPTION
            ================================== -->

            <div class="product-description-section">

                <h4>

                    Product Description

                </h4>


                <textarea
                    id="specProductDescription"
                    rows="7"
                    placeholder="Nhập mô tả sản phẩm..."
                >${escapeProductSpecificationHTML(
                    product.description || ""
                )}</textarea>


                <small>

                    Mô tả sản phẩm được hiển thị riêng
                    với Technical Specification.

                </small>

            </div>


            <!-- =================================
                 TECHNICAL SPECIFICATION
            ================================== -->

            <div class="technical-specification-section">

                <h4>

                    Technical Specification

                </h4>


                <p class="specification-description">

                    Dữ liệu được lấy từ Website và Free Parser.
                    Bạn có thể kiểm tra, chỉnh sửa hoặc nhập thủ công
                    trước khi chuyển sang bước Preview.

                </p>


                <!-- =============================
                     SPECIFICATION TABLE
                ============================== -->

                <div class="specification-table-section">


                    <div class="specification-section-header">

                        <h5>

                            Specification Table

                        </h5>


                        <button
                            type="button"
                            class="spec-add-button"
                            onclick="addSpecificationTable()"
                        >

                            + Add Specification Table

                        </button>

                    </div>


                    <div
                        id="specificationTablesContainer"
                    ></div>


                </div>


                <!-- =============================
                     SPECIFICATION TEXT
                ============================== -->

                <div class="specification-text-section">


                    <div class="specification-section-header">

                        <h5>

                            Specification Text

                        </h5>


                        <button
                            type="button"
                            class="spec-add-button"
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


            <!-- =================================
                 STEP BUTTONS
            ================================== -->

            <div class="step-buttons">


                <button
                    type="button"
                    onclick="backToProductImages()"
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
       RENDER TABLE
    ========================================== */

    renderSpecificationTable();


    /* =========================================
       RENDER TEXT
    ========================================== */

    renderSpecificationText();

}


/* =========================================================
   ENSURE PRODUCT STRUCTURE
========================================================= */

function ensureProductSpecificationStructure() {

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
       SPECS
    ========================================== */

    if (
        !product.specs ||
        typeof product.specs !== "object" ||
        Array.isArray(product.specs)
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
       TABLE
    ========================================== */

    if (
        !product.specs.table ||
        typeof product.specs.table !== "object"
    ) {

        product.specs.table = {

            headers: [],

            rows: []

        };

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


    /* =========================================
       TEXT
    ========================================== */

    if (
        !Array.isArray(
            product.specs.text
        )
    ) {

        product.specs.text = [];

    }


    /* =========================================
       REMOVE LEGACY
    ========================================== */

    delete product.specification;

}


/* =========================================================
   RENDER SPECIFICATION TABLE
========================================================= */

function renderSpecificationTable() {

    const container =
        document.getElementById(
            "specificationTablesContainer"
        );


    if (!container) {

        return;

    }


    ensureProductSpecificationStructure();


    const table =
        window.currentProduct.product.specs.table;


    container.innerHTML = "";


    /* =========================================
       KHÔNG CÓ TABLE
    ========================================== */

    if (
        !table.headers.length
    ) {

        return;

    }


    const tableBlock =
        document.createElement(
            "div"
        );


    tableBlock.className =
        "specification-table-block";


    tableBlock.innerHTML = `

        <div class="specification-table-header">

            <strong>

                Technical Specification Table

            </strong>


            <button
                type="button"
                class="spec-remove-table"
                onclick="removeSpecificationTable()"
            >

                ✕ Remove Table

            </button>

        </div>


        <div class="specification-table-wrapper">

            <table>

                <thead>

                    <tr
                        id="specificationTableHeaderRow"
                    ></tr>

                </thead>


                <tbody
                    id="specificationTableBody"
                ></tbody>

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

    `;


    container.appendChild(
        tableBlock
    );


    renderSpecificationTableHeader();


    renderSpecificationTableRows();

}


/* =========================================================
   RENDER TABLE HEADER
========================================================= */

function renderSpecificationTableHeader() {

    const headerRow =
        document.getElementById(
            "specificationTableHeaderRow"
        );


    if (!headerRow) {

        return;

    }


    const headers =
        window.currentProduct.product.specs.table.headers;


    headerRow.innerHTML = "";


    headers.forEach(

        (
            header,
            index
        ) => {


            const th =
                document.createElement(
                    "th"
                );


            th.innerHTML = `

                <input
                    type="text"
                    value="${escapeProductSpecificationHTML(
                        header
                    )}"
                    placeholder="Tên thông số"
                    onchange="updateSpecificationHeader(
                        ${index},
                        this.value
                    )"
                >


                <button
                    type="button"
                    onclick="removeSpecificationColumn(
                        ${index}
                    )"
                >

                    ✕

                </button>

            `;


            headerRow.appendChild(
                th
            );

        }

    );

}


/* =========================================================
   RENDER TABLE ROWS
========================================================= */

function renderSpecificationTableRows() {

    const body =
        document.getElementById(
            "specificationTableBody"
        );


    if (!body) {

        return;

    }


    const table =
        window.currentProduct.product.specs.table;


    body.innerHTML = "";


    table.rows.forEach(

        (
            row,
            rowIndex
        ) => {


            const tr =
                document.createElement(
                    "tr"
                );


            table.headers.forEach(

                (
                    header,
                    columnIndex
                ) => {


                    const value =
                        Array.isArray(row)

                            ? row[columnIndex] || ""

                            : "";


                    const td =
                        document.createElement(
                            "td"
                        );


                    td.innerHTML = `

                        <input
                            type="text"
                            value="${escapeProductSpecificationHTML(
                                value
                            )}"
                            placeholder="Giá trị"
                            onchange="updateSpecificationCell(
                                ${rowIndex},
                                ${columnIndex},
                                this.value
                            )"
                        >

                    `;


                    tr.appendChild(
                        td
                    );

                }

            );


            const removeCell =
                document.createElement(
                    "td"
                );


            removeCell.innerHTML = `

                <button
                    type="button"
                    onclick="removeSpecificationRow(
                        ${rowIndex}
                    )"
                >

                    ✕

                </button>

            `;


            tr.appendChild(
                removeCell
            );


            body.appendChild(
                tr
            );

        }

    );

}


/* =========================================================
   ADD SPECIFICATION TABLE
========================================================= */

function addSpecificationTable() {

    ensureProductSpecificationStructure();


    const table =
        window.currentProduct.product.specs.table;


    /* =========================================
       NẾU ĐÃ CÓ TABLE
    ========================================== */

    if (
        table.headers.length
    ) {

        return;

    }


    /* =========================================
       DEFAULT COLUMNS

       Dành cho sản phẩm cân
    ========================================== */

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


    renderSpecificationTable();

}


/* =========================================================
   REMOVE SPECIFICATION TABLE
========================================================= */

function removeSpecificationTable() {

    ensureProductSpecificationStructure();


    window.currentProduct.product.specs.table = {

        headers: [],

        rows: []

    };


    renderSpecificationTable();

}


/* =========================================================
   ADD SPECIFICATION COLUMN
========================================================= */

function addSpecificationColumn() {

    ensureProductSpecificationStructure();


    const table =
        window.currentProduct.product.specs.table;


    const newColumnName =
        "Thông số mới";


    table.headers.push(
        newColumnName
    );


    table.rows.forEach(

        row => {

            if (
                Array.isArray(row)
            ) {

                row.push("");

            }

        }

    );


    renderSpecificationTable();

}


/* =========================================================
   REMOVE SPECIFICATION COLUMN
========================================================= */

function removeSpecificationColumn(

    columnIndex

) {

    ensureProductSpecificationStructure();


    const table =
        window.currentProduct.product.specs.table;


    if (
        columnIndex < 0 ||
        columnIndex >= table.headers.length
    ) {

        return;

    }


    table.headers.splice(

        columnIndex,

        1

    );


    table.rows.forEach(

        row => {

            if (
                Array.isArray(row)
            ) {

                row.splice(

                    columnIndex,

                    1

                );

            }

        }

    );


    if (
        table.headers.length === 0
    ) {

        table.rows = [];

    }


    renderSpecificationTable();

}


/* =========================================================
   ADD SPECIFICATION ROW
========================================================= */

function addSpecificationRow() {

    ensureProductSpecificationStructure();


    const table =
        window.currentProduct.product.specs.table;


    if (
        table.headers.length === 0
    ) {

        alert(

            "Vui lòng thêm Specification Table trước."

        );


        return;

    }


    const newRow =
        table.headers.map(

            () => ""

        );


    table.rows.push(
        newRow
    );


    renderSpecificationTable();

}


/* =========================================================
   REMOVE SPECIFICATION ROW
========================================================= */

function removeSpecificationRow(

    rowIndex

) {

    ensureProductSpecificationStructure();


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


    renderSpecificationTable();

}


/* =========================================================
   UPDATE HEADER
========================================================= */

function updateSpecificationHeader(

    columnIndex,

    value

) {

    ensureProductSpecificationStructure();


    const headers =
        window.currentProduct.product.specs.table.headers;


    if (
        columnIndex < 0 ||
        columnIndex >= headers.length
    ) {

        return;

    }


    headers[columnIndex] =
        value.trim();

}


/* =========================================================
   UPDATE CELL
========================================================= */

function updateSpecificationCell(

    rowIndex,

    columnIndex,

    value

) {

    ensureProductSpecificationStructure();


    const table =
        window.currentProduct.product.specs.table;


    if (
        !table.rows[rowIndex]
    ) {

        return;

    }


    table.rows[rowIndex][columnIndex] =
        value.trim();

}


/* =========================================================
   RENDER SPECIFICATION TEXT
========================================================= */

function renderSpecificationText() {

    const container =
        document.getElementById(
            "specificationTextContainer"
        );


    if (!container) {

        return;

    }


    ensureProductSpecificationStructure();


    const texts =
        window.currentProduct.product.specs.text;


    container.innerHTML = "";


    texts.forEach(

        (
            value,
            index
        ) => {


            const block =
                document.createElement(
                    "div"
                );


            block.className =
                "specification-text-item";


            block.innerHTML = `

                <textarea
                    rows="4"
                    placeholder="Nhập thông số kỹ thuật..."
                    onchange="updateSpecificationText(
                        ${index},
                        this.value
                    )"
                >${escapeProductSpecificationHTML(
                    value
                )}</textarea>


                <button
                    type="button"
                    onclick="removeSpecificationText(
                        ${index}
                    )"
                >

                    ✕ Remove

                </button>

            `;


            container.appendChild(
                block
            );

        }

    );

}


/* =========================================================
   ADD SPECIFICATION TEXT
========================================================= */

function addSpecificationText() {

    ensureProductSpecificationStructure();


    window.currentProduct.product.specs.text.push(

        ""

    );


    renderSpecificationText();

}


/* =========================================================
   REMOVE SPECIFICATION TEXT
========================================================= */

function removeSpecificationText(

    index

) {

    ensureProductSpecificationStructure();


    const texts =
        window.currentProduct.product.specs.text;


    if (
        index < 0 ||
        index >= texts.length
    ) {

        return;

    }


    texts.splice(

        index,

        1

    );


    renderSpecificationText();

}


/* =========================================================
   UPDATE SPECIFICATION TEXT
========================================================= */

function updateSpecificationText(

    index,

    value

) {

    ensureProductSpecificationStructure();


    const texts =
        window.currentProduct.product.specs.text;


    if (
        index < 0 ||
        index >= texts.length
    ) {

        return;

    }


    texts[index] =
        value.trim();

}


/* =========================================================
   SAVE STEP 4
========================================================= */

function saveProductSpecification() {

    ensureProductSpecificationStructure();


    const product =
        window.currentProduct.product;


    /* =========================================
       PRODUCT NAME
    ========================================== */

    const name =
        document.getElementById(
            "specProductName"
        );


    if (name) {

        product.name =
            name.value.trim();

    }


    /* =========================================
       PRODUCT DESCRIPTION
    ========================================== */

    const description =
        document.getElementById(
            "specProductDescription"
        );


    if (description) {

        product.description =
            description.value.trim();

    }


    /* =========================================
       CLEAN TEXT
    ========================================== */

    product.specs.text =

        product.specs.text

            .map(

                value =>

                    String(
                        value || ""
                    ).trim()

            )

            .filter(

                Boolean

            );


    /* =========================================
       CLEAN TABLE
    ========================================== */

    product.specs.table.headers =

        product.specs.table.headers

            .map(

                header =>

                    String(
                        header || ""
                    ).trim()

            );


    product.specs.table.rows =

        product.specs.table.rows

            .map(

                row =>

                    Array.isArray(row)

                        ? row.map(

                            value =>

                                String(
                                    value || ""
                                ).trim()

                        )

                        : []

            );


    /* =========================================
       REMOVE LEGACY
    ========================================== */

    delete product.specification;


    console.log(

        "STEP 4 SAVED:",

        product

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

        "========== STEP 4 PRODUCT =========="

    );

    console.log(

        window.currentProduct.product

    );

    console.log(

        "===================================="

    );


    /* =========================================
       STEP 5
       
       Nếu hệ thống đã có hàm Preview
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

       Thử các tên hàm Preview khác
    ========================================== */

    if (

        typeof renderProductPreviewStep ===

        "function"

    ) {

        renderProductPreviewStep();

        return;

    }


    if (

        typeof renderProductStepPreview ===

        "function"

    ) {

        renderProductStepPreview();

        return;

    }


    /* =========================================
       CHƯA CÓ STEP 5
    ========================================== */

    console.warn(

        "Step 5 Preview chưa được triển khai."

    );


    alert(

        "Đã lưu Product Specification. Step 5 Preview chưa được kết nối."

    );

}


/* =========================================================
   BACK TO STEP 3
========================================================= */

function backToProductContentImport() {

    saveProductSpecification();


    if (

        typeof saveProductDraft ===

        "function"

    ) {

        saveProductDraft();

    }


    if (

        typeof renderProductContentImport ===

        "function"

    ) {

        renderProductContentImport();

        return;

    }


    console.error(

        "renderProductContentImport không tồn tại."

    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeProductSpecificationHTML(

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