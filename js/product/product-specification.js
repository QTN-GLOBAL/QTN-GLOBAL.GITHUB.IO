/* =========================================================
   PRODUCT SPECIFICATION
   STEP 4 / 6

   PURPOSE

   Step 4 quản lý toàn bộ:

   1. Product Information
   2. Product Description
   3. Technical Specification Table
   4. Technical Specification Text

   DATA FLOW

   Step 3
       ↓
   currentProduct.product
       ↓
   currentProduct.product.specs
       ↓
   Step 4
       ↓
   Preview
       ↓
   Save Product

   IMPORTANT

   CHỈ SỬ DỤNG:

       currentProduct.product.specs

   KHÔNG SỬ DỤNG:

       specification

   STRUCTURE

   specs = [

       {
           type: "table",

           columns: [
               "Mức cân",
               "Bước nhảy",
               "Kích thước cân"
           ],

           rows: [
               [
                   "30kg",
                   "1g",
                   "300 × 330 mm"
               ]
           ]
       },


       {
           type: "text",

           value:
               "Độ phân giải nội 1/30.000"
       }

   ]

========================================================= */


/* =========================================================
   GLOBAL DATA
========================================================= */

let productSpecificationData = {

    description: "",

    specs: []

};


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
            "productModalBody không tồn tại."
        );

        return;

    }


    /* =========================================
       LOAD CURRENT PRODUCT
    ========================================== */

    const current =
        window.currentProduct || {};


    const product =
        current.product || {};


    /* =========================================
       INITIALIZE DATA
    ========================================== */

    productSpecificationData = {

        description:
            product.description || "",

        specs:
            normalizeSpecificationData(
                product.specs
            )

    };


    /* =========================================
       SAVE BACK TO CURRENT PRODUCT
    ========================================== */

    current.product = product;


    window.currentProduct =
        current;


    /* =========================================
       RENDER HTML
    ========================================== */

    body.innerHTML = `

    <div class="product-specification-step">


        <!-- =================================================
             TITLE
        ================================================== -->

        <h3 class="product-step-title">

            Step 4 / 6 - Product Specification

        </h3>



        <!-- =================================================
             PRODUCT INFORMATION
        ================================================== -->

        <div class="specification-section">

            <h4 class="specification-section-title">

                Product Information

            </h4>


            <div class="product-information-box">


                <div class="product-information-item">

                    <strong>
                        Product Name
                    </strong>

                    <div
                        id="specProductName"
                        class="product-information-value">

                    </div>

                </div>


                <div class="product-information-item">

                    <strong>
                        Business
                    </strong>

                    <div
                        id="specProductBusiness"
                        class="product-information-value">

                    </div>

                </div>


                <div class="product-information-item">

                    <strong>
                        Category
                    </strong>

                    <div
                        id="specProductCategory"
                        class="product-information-value">

                    </div>

                </div>


                <div class="product-information-item">

                    <strong>
                        Brand
                    </strong>

                    <div
                        id="specProductBrand"
                        class="product-information-value">

                    </div>

                </div>


                <div class="product-information-item">

                    <strong>
                        Origin
                    </strong>

                    <div
                        id="specProductOrigin"
                        class="product-information-value">

                    </div>

                </div>


            </div>

        </div>



        <!-- =================================================
             PRODUCT DESCRIPTION
        ================================================== -->

        <div class="specification-section">

            <h4 class="specification-section-title">

                Product Description

            </h4>


            <div class="specification-description-box">

                <textarea
                    id="productSpecificationDescription"
                    rows="7"
                    placeholder="Nhập mô tả sản phẩm...">

                </textarea>


                <small>

                    Mô tả sản phẩm được hiển thị riêng
                    với Technical Specification.

                </small>

            </div>

        </div>



        <!-- =================================================
             TECHNICAL SPECIFICATION
        ================================================== -->

        <div class="specification-section">

            <h4 class="specification-section-title">

                Technical Specification

            </h4>


            <div class="technical-specification-info">

                Dữ liệu được lấy từ Website và Free Parser.
                Bạn có thể kiểm tra, chỉnh sửa hoặc nhập
                thủ công trước khi chuyển sang bước Preview.

            </div>



            <!-- =============================================
                 SPECIFICATION TABLE
            ============================================== -->

            <div class="specification-subsection">

                <div class="specification-subsection-header">

                    <h5>

                        Specification Table

                    </h5>


                    <button
                        type="button"
                        onclick="addSpecificationTable()">

                        + Add Specification Table

                    </button>

                </div>


                <div
                    id="specificationTablesContainer">

                </div>

            </div>



            <!-- =============================================
                 SPECIFICATION TEXT
            ============================================== -->

            <div class="specification-subsection">

                <div class="specification-subsection-header">

                    <h5>

                        Specification Text

                    </h5>


                    <button
                        type="button"
                        onclick="addSpecificationText()">

                        + Add Specification Text

                    </button>

                </div>


                <div
                    id="specificationTextsContainer">

                </div>

            </div>


        </div>



        <!-- =================================================
             BUTTONS
        ================================================== -->

        <div class="step-buttons">


            <button
                type="button"
                onclick="backToProductContentImport()">

                ← Back

            </button>


            <button
                type="button"
                onclick="nextProductSpecification()">

                Next →

            </button>


        </div>


    </div>

    `;


    /* =========================================
       RENDER PRODUCT INFO
    ========================================== */

    renderSpecificationProductInformation();


    /* =========================================
       LOAD DESCRIPTION
    ========================================== */

    const description =
        document.getElementById(
            "productSpecificationDescription"
        );


    if (description) {

        description.value =
            productSpecificationData.description;

    }


    /* =========================================
       RENDER SPECS
    ========================================== */

    renderSpecificationTables();

    renderSpecificationTexts();

}


/* =========================================================
   PRODUCT INFORMATION
========================================================= */

function renderSpecificationProductInformation() {

    const current =
        window.currentProduct || {};


    const product =
        current.product || {};


    const name =
        product.name || "";


    const business =
        current.business ||

        product.business ||

        "";


    const category =
        current.category ||

        product.category ||

        "";


    const brand =
        current.brand ||

        product.brand ||

        "";


    const origin =
        current.origin ||

        product.origin ||

        "";


    const nameElement =
        document.getElementById(
            "specProductName"
        );


    const businessElement =
        document.getElementById(
            "specProductBusiness"
        );


    const categoryElement =
        document.getElementById(
            "specProductCategory"
        );


    const brandElement =
        document.getElementById(
            "specProductBrand"
        );


    const originElement =
        document.getElementById(
            "specProductOrigin"
        );


    if (nameElement) {

        nameElement.textContent =
            name;

    }


    if (businessElement) {

        businessElement.textContent =
            business;

    }


    if (categoryElement) {

        categoryElement.textContent =
            category;

    }


    if (brandElement) {

        brandElement.textContent =
            brand;

    }


    if (originElement) {

        originElement.textContent =
            origin;

    }

}


/* =========================================================
   NORMALIZE SPECIFICATION DATA
========================================================= */

function normalizeSpecificationData(
    specs
) {

    if (
        !Array.isArray(specs)
    ) {

        return [];

    }


    const normalized = [];


    specs.forEach(
        item => {

            if (
                !item
            ) {

                return;

            }


            /* =========================================
               TABLE
            ========================================== */

            if (
                typeof item === "object" &&

                item.type === "table"
            ) {

                const columns =

                    Array.isArray(
                        item.columns
                    )

                        ? item.columns.map(
                            column =>
                                String(
                                    column || ""
                                )
                        )

                        : [];


                const rows =

                    Array.isArray(
                        item.rows
                    )

                        ? item.rows.map(
                            row => {

                                if (
                                    !Array.isArray(
                                        row
                                    )
                                ) {

                                    return [];

                                }


                                return row.map(
                                    cell =>
                                        String(
                                            cell || ""
                                        )
                                );

                            }
                        )

                        : [];


                if (
                    columns.length > 0
                ) {

                    normalized.push({

                        type:
                            "table",

                        columns:
                            columns,

                        rows:
                            rows

                    });

                }


                return;

            }


            /* =========================================
               TEXT
            ========================================== */

            if (
                typeof item === "object" &&

                item.type === "text"
            ) {

                const value =

                    item.value !== undefined

                        ? String(
                            item.value
                        ).trim()

                        : "";


                if (value) {

                    normalized.push({

                        type:
                            "text",

                        value:
                            value

                    });

                }


                return;

            }


            /* =========================================
               OLD OBJECT

               {
                   name: "...",
                   value: "..."
               }

               Chuyển thành text.
            ========================================== */

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

                    normalized.push({

                        type:
                            "text",

                        value:
                            `${name}: ${value}`

                    });

                }

                else if (
                    name
                ) {

                    normalized.push({

                        type:
                            "text",

                        value:
                            name

                    });

                }

                else if (
                    value
                ) {

                    normalized.push({

                        type:
                            "text",

                        value:
                            value

                    });

                }


                return;

            }


            /* =========================================
               STRING
            ========================================== */

            if (
                typeof item === "string"
            ) {

                const value =
                    item.trim();


                if (!value) {

                    return;

                }


                /* =====================================
                   HTML TABLE

                   Nếu Step 3 trả về HTML table
                   thì cố gắng chuyển thành table.
                ====================================== */

                if (
                    value
                        .toLowerCase()
                        .includes("<table")
                ) {

                    const table =
                        parseHTMLTableToSpecification(
                            value
                        );


                    if (
                        table
                    ) {

                        normalized.push(
                            table
                        );

                        return;

                    }

                }


                normalized.push({

                    type:
                        "text",

                    value:
                        value

                });

            }

        }
    );


    return normalized;

}


/* =========================================================
   PARSE HTML TABLE
========================================================= */

function parseHTMLTableToSpecification(
    html
) {

    try {

        const parser =
            new DOMParser();


        const documentObject =
            parser.parseFromString(
                html,
                "text/html"
            );


        const table =
            documentObject.querySelector(
                "table"
            );


        if (!table) {

            return null;

        }


        const rows =
            Array.from(
                table.querySelectorAll(
                    "tr"
                )
            );


        if (
            rows.length === 0
        ) {

            return null;

        }


        let headerIndex = 0;


        const firstRowCells =
            rows[0].querySelectorAll(
                "th"
            );


        if (
            firstRowCells.length === 0
        ) {

            headerIndex = -1;

        }


        let columns = [];


        let dataRows = [];


        /* =========================================
           TABLE HAS TH
        ========================================== */

        if (
            headerIndex === 0
        ) {

            columns =

                Array.from(
                    rows[0].querySelectorAll(
                        "th"
                    )
                ).map(
                    cell =>
                        cell.textContent.trim()
                );


            dataRows =

                rows
                    .slice(1)
                    .map(
                        row =>

                            Array.from(
                                row.querySelectorAll(
                                    "td, th"
                                )
                            ).map(
                                cell =>
                                    cell.textContent
                                        .trim()
                            )

                    );

        }


        /* =========================================
           TABLE WITHOUT TH

           Dùng dòng đầu tiên làm header.
        ========================================== */

        else {

            const allRows =

                rows.map(
                    row =>

                        Array.from(
                            row.querySelectorAll(
                                "td, th"
                            )
                        ).map(
                            cell =>
                                cell.textContent
                                    .trim()
                        )

                );


            if (
                allRows.length === 0
            ) {

                return null;

            }


            columns =
                allRows.shift() || [];


            dataRows =
                allRows;

        }


        if (
            columns.length === 0
        ) {

            return null;

        }


        return {

            type:
                "table",

            columns:
                columns,

            rows:
                dataRows

        };

    }


    catch (error) {

        console.error(
            "PARSE HTML TABLE ERROR:",
            error
        );


        return null;

    }

}


/* =========================================================
   RENDER TABLES
========================================================= */

function renderSpecificationTables() {

    const container =
        document.getElementById(
            "specificationTablesContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    productSpecificationData.specs.forEach(

        (spec, index) => {

            if (
                spec.type !== "table"
            ) {

                return;

            }


            container.appendChild(

                createSpecificationTableElement(

                    spec,

                    index

                )

            );

        }

    );

}


/* =========================================================
   CREATE TABLE ELEMENT
========================================================= */

function createSpecificationTableElement(

    tableData,

    specIndex

) {

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "specification-table-editor";


    /* =========================================
       HEADER
    ========================================== */

    const header =
        document.createElement(
            "div"
        );


    header.className =
        "specification-editor-header";


    const title =
        document.createElement(
            "strong"
        );


    title.textContent =
        "Technical Specification Table";


    const removeButton =
        document.createElement(
            "button"
        );


    removeButton.type =
        "button";


    removeButton.textContent =
        "✕ Remove Table";


    removeButton.onclick =
        function () {

            removeSpecificationItem(
                specIndex
            );

        };


    header.appendChild(
        title
    );


    header.appendChild(
        removeButton
    );


    wrapper.appendChild(
        header
    );


    /* =========================================
       TABLE
    ========================================== */

    const table =
        document.createElement(
            "table"
        );


    table.className =
        "specification-edit-table";


    /* =========================================
       THEAD
    ========================================== */

    const thead =
        document.createElement(
            "thead"
        );


    const headerRow =
        document.createElement(
            "tr"
        );


    tableData.columns.forEach(

        (column, columnIndex) => {

            const th =
                document.createElement(
                    "th"
                );


            const input =
                document.createElement(
                    "input"
                );


            input.type =
                "text";


            input.value =
                column;


            input.placeholder =
                "Tên thông số";


            input.oninput =
                function () {

                    productSpecificationData
                        .specs[
                            specIndex
                        ]
                        .columns[
                            columnIndex
                        ] =
                            this.value;

                };


            th.appendChild(
                input
            );


            headerRow.appendChild(
                th
            );

        }

    );


    /* =========================================
       ADD COLUMN BUTTON
    ========================================== */

    const addColumnTh =
        document.createElement(
            "th"
        );


    const addColumnButton =
        document.createElement(
            "button"
        );


    addColumnButton.type =
        "button";


    addColumnButton.textContent =
        "+ Cột";


    addColumnButton.onclick =
        function () {

            addSpecificationTableColumn(
                specIndex
            );

        };


    addColumnTh.appendChild(
        addColumnButton
    );


    headerRow.appendChild(
        addColumnTh
    );


    thead.appendChild(
        headerRow
    );


    table.appendChild(
        thead
    );


    /* =========================================
       TBODY
    ========================================== */

    const tbody =
        document.createElement(
            "tbody"
        );


    tableData.rows.forEach(

        (row, rowIndex) => {

            const tr =
                document.createElement(
                    "tr"
                );


            tableData.columns.forEach(

                (
                    column,
                    columnIndex
                ) => {

                    const td =
                        document.createElement(
                            "td"
                        );


                    const input =
                        document.createElement(
                            "input"
                        );


                    input.type =
                        "text";


                    input.value =
                        row[
                            columnIndex
                        ] || "";


                    input.placeholder =
                        "Giá trị";


                    input.oninput =
                        function () {

                            productSpecificationData
                                .specs[
                                    specIndex
                                ]
                                .rows[
                                    rowIndex
                                ][
                                    columnIndex
                                ] =
                                    this.value;

                        };


                    td.appendChild(
                        input
                    );


                    tr.appendChild(
                        td
                    );

                }

            );


            /* =====================================
               REMOVE ROW
            ====================================== */

            const removeTd =
                document.createElement(
                    "td"
                );


            const removeRowButton =
                document.createElement(
                    "button"
                );


            removeRowButton.type =
                "button";


            removeRowButton.textContent =
                "✕";


            removeRowButton.title =
                "Xóa dòng";


            removeRowButton.onclick =
                function () {

                    removeSpecificationTableRow(

                        specIndex,

                        rowIndex

                    );

                };


            removeTd.appendChild(
                removeRowButton
            );


            tr.appendChild(
                removeTd
            );


            tbody.appendChild(
                tr
            );

        }

    );


    table.appendChild(
        tbody
    );


    wrapper.appendChild(
        table
    );


    /* =========================================
       ADD ROW
    ========================================== */

    const footer =
        document.createElement(
            "div"
        );


    footer.className =
        "specification-editor-footer";


    const addRowButton =
        document.createElement(
            "button"
        );


    addRowButton.type =
        "button";


    addRowButton.textContent =
        "+ Add Row";


    addRowButton.onclick =
        function () {

            addSpecificationTableRow(
                specIndex
            );

        };


    footer.appendChild(
        addRowButton
    );


    wrapper.appendChild(
        footer
    );


    return wrapper;

}


/* =========================================================
   ADD SPECIFICATION TABLE
========================================================= */

function addSpecificationTable() {

    productSpecificationData.specs.push({

        type:
            "table",

        columns: [

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

    });


    renderSpecificationTables();

}


/* =========================================================
   ADD TABLE ROW
========================================================= */

function addSpecificationTableRow(
    specIndex
) {

    const table =
        productSpecificationData
            .specs[
                specIndex
            ];


    if (
        !table ||
        table.type !== "table"
    ) {

        return;

    }


    table.rows.push(

        table.columns.map(
            () => ""
        )

    );


    renderSpecificationTables();

}


/* =========================================================
   ADD TABLE COLUMN
========================================================= */

function addSpecificationTableColumn(
    specIndex
) {

    const table =
        productSpecificationData
            .specs[
                specIndex
            ];


    if (
        !table ||
        table.type !== "table"
    ) {

        return;

    }


    table.columns.push(
        "Thông số mới"
    );


    table.rows.forEach(

        row => {

            row.push("");

        }

    );


    renderSpecificationTables();

}


/* =========================================================
   REMOVE TABLE ROW
========================================================= */

function removeSpecificationTableRow(

    specIndex,

    rowIndex

) {

    const table =
        productSpecificationData
            .specs[
                specIndex
            ];


    if (
        !table ||
        table.type !== "table"
    ) {

        return;

    }


    table.rows.splice(

        rowIndex,

        1

    );


    renderSpecificationTables();

}


/* =========================================================
   REMOVE SPECIFICATION ITEM
========================================================= */

function removeSpecificationItem(
    specIndex
) {

    productSpecificationData.specs.splice(

        specIndex,

        1

    );


    renderSpecificationTables();

    renderSpecificationTexts();

}


/* =========================================================
   RENDER TEXT SPECS
========================================================= */

function renderSpecificationTexts() {

    const container =
        document.getElementById(
            "specificationTextsContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    productSpecificationData.specs.forEach(

        (spec, index) => {

            if (
                spec.type !== "text"
            ) {

                return;

            }


            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "specification-text-editor";


            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.rows =
                3;


            textarea.value =
                spec.value || "";


            textarea.placeholder =
                "Nhập thông số kỹ thuật...";


            textarea.oninput =
                function () {

                    productSpecificationData
                        .specs[
                            index
                        ]
                        .value =
                            this.value;

                };


            const removeButton =
                document.createElement(
                    "button"
                );


            removeButton.type =
                "button";


            removeButton.textContent =
                "✕ Remove";


            removeButton.onclick =
                function () {

                    removeSpecificationItem(
                        index
                    );

                };


            wrapper.appendChild(
                textarea
            );


            wrapper.appendChild(
                removeButton
            );


            container.appendChild(
                wrapper
            );

        }

    );

}


/* =========================================================
   ADD SPECIFICATION TEXT
========================================================= */

function addSpecificationText() {

    productSpecificationData.specs.push({

        type:
            "text",

        value:
            ""

    });


    renderSpecificationTexts();

}


/* =========================================================
   BACK
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


    console.warn(

        "renderProductContentImport() không tồn tại."

    );

}


/* =========================================================
   NEXT
========================================================= */

function nextProductSpecification() {

    saveProductSpecification();


    if (
        typeof saveProductDraft ===
        "function"
    ) {

        saveProductDraft();

    }


    /* =========================================
       NEXT STEP

       Nếu hệ thống đã có Step 5,
       gọi hàm tương ứng.
    ========================================== */

    if (
        typeof renderProductPreview ===
        "function"
    ) {

        renderProductPreview();

        return;

    }


    if (
        typeof renderProductProductPreview ===
        "function"
    ) {

        renderProductProductPreview();

        return;

    }


    console.log(

        "STEP 4 COMPLETE",

        window.currentProduct

    );

}


/* =========================================================
   SAVE PRODUCT SPECIFICATION
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


    /* =========================================
       DESCRIPTION
    ========================================== */

    const description =
        document.getElementById(
            "productSpecificationDescription"
        );


    if (description) {

        productSpecificationData.description =
            description.value.trim();

    }


    /* =========================================
       CLEAN SPECS
    ========================================== */

    productSpecificationData.specs =

        productSpecificationData.specs

            .filter(
                item => {

                    if (
                        !item
                    ) {

                        return false;

                    }


                    if (
                        item.type === "text"
                    ) {

                        return Boolean(

                            String(
                                item.value || ""
                            ).trim()

                        );

                    }


                    if (
                        item.type === "table"
                    ) {

                        return (

                            Array.isArray(
                                item.columns
                            ) &&

                            item.columns.length > 0

                        );

                    }


                    return false;

                }
            );


    /* =========================================
       SAVE DESCRIPTION
    ========================================== */

    window.currentProduct.product.description =

        productSpecificationData.description;


    /* =========================================
       SAVE SPECS

       DUY NHẤT:

           product.specs
    ========================================== */

    window.currentProduct.product.specs =

        productSpecificationData.specs;


    /* =========================================
       REMOVE LEGACY
    ========================================== */

    delete window.currentProduct
        .product
        .specification;


    /* =========================================
       DEBUG
    ========================================== */

    console.log(

        "========== STEP 4 SAVED =========="

    );


    console.log(

        "PRODUCT DESCRIPTION:",

        window.currentProduct.product.description

    );


    console.log(

        "PRODUCT SPECS:",

        window.currentProduct.product.specs

    );


    console.log(

        "==================================="

    );

}


/* =========================================================
   EXPORT / DEBUG HELPER
========================================================= */

function getProductSpecificationData() {

    return {

        description:

            productSpecificationData.description,

        specs:

            productSpecificationData.specs

    };

}