/* =========================================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   VERSION
   ---------------------------------------------------------
   Version 5

   PURPOSE
   ---------------------------------------------------------
   - Nhập URL sản phẩm
   - Gọi ProductImportEngine
   - Nhận dữ liệu từ Backend / Free Parser / AI
   - Giữ nguyên cấu trúc nội dung từ Website
   - Chuẩn hóa nhẹ dữ liệu để chuyển sang Step 4
   - Không tự tạo Specification Table mẫu
   - Không ép dữ liệu Website vào các cột cố định
   - Giữ Product Description riêng
   - Giữ Technical Specification riêng
   - Giữ Product Images

   IMPORTANT
   ---------------------------------------------------------
   STEP 3 KHÔNG TỰ ĐẶT CẤU TRÚC CHO WEBSITE.

   Nếu Website có:

   1. Description
      → giữ Description

   2. HTML Table
      → giữ đúng headers + rows của bảng nguồn

   3. Bullet / List
      → mỗi item là một dòng riêng

   4. Text liền
      → giữ thành text

   5. Images
      → giữ danh sách URL ảnh

   STEP 4 CHỈ DÙNG ĐỂ:
      - xem dữ liệu đã import
      - chỉnh sửa thủ công
      - thêm / xóa / sửa bảng
      - thêm / xóa / sửa text

   KHÔNG TỰ ĐỘNG TẠO:

      Mức cân
      Bước nhảy
      Đĩa cân inox
      Kích thước cân
      Đơn vị cân

   DATA FLOW

   ProductImportEngine
          ↓
   extractImportedProduct()
          ↓
   normalizeImportedProduct()
          ↓
   mergeImportedProduct()
          ↓
   currentProduct.product
          ↓
   renderProductSpecification()

   ========================================================= */


/* =========================================================
   RENDER STEP 3
========================================================= */

function renderProductContentImport() {

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


    body.innerHTML = `

    <div class="product-content-import">


        <!-- =========================================
             TITLE
        ========================================== -->

        <h3 class="product-step-title">

            Step 3 / 6 - AI Content Import

        </h3>


        <!-- =========================================
             SOURCE TYPE
        ========================================== -->

        <div class="form-group">

            <label>

                Source Type

            </label>


            <select id="contentSourceType">

                <option value="website">

                    🌐 Website

                </option>


                <option
                    value="pdf"
                    disabled>

                    📄 PDF Catalogue (Coming Soon)

                </option>


                <option
                    value="word"
                    disabled>

                    📝 Word Document (Coming Soon)

                </option>


                <option
                    value="manual"
                    disabled>

                    ✍ Manual Input (Coming Soon)

                </option>

            </select>

        </div>


        <!-- =========================================
             SOURCE URL
        ========================================== -->

        <div class="form-group">

            <label>

                Source URL

            </label>


            <input

                id="contentSourceUrl"

                type="text"

                placeholder="https://www.excell.vn/..."

            >


            <small>

                Nhập URL trang sản phẩm cần đọc
                và phân tích.

            </small>

        </div>


        <!-- =========================================
             IMPORT CONTENT
        ========================================== -->

        <div class="form-group">

            <label>

                Import Content

            </label>


            <div class="import-content-info">

                <div>

                    ✓ Product Name

                </div>


                <div>

                    ✓ Product Description

                </div>


                <div>

                    ✓ Original Specification Structure

                </div>


                <div>

                    ✓ Specification Table

                </div>


                <div>

                    ✓ Specification Text / List

                </div>


                <div>

                    ✓ Product Images

                </div>

            </div>


            <small>

                Nội dung được giữ theo cấu trúc
                của Website nguồn.
                Step 4 có thể chỉnh sửa thủ công.

            </small>

        </div>


        <!-- =========================================
             STATUS
        ========================================== -->

        <div class="form-group">

            <label>

                Status

            </label>


            <div

                id="contentImportStatus"

                class="import-status">

                Ready to Import

            </div>

        </div>


        <!-- =========================================
             PREVIEW
        ========================================== -->

        <div

            id="contentImportPreview"

            class="content-import-preview"

            style="display:none;">

            <h4>

                Imported Content

            </h4>


            <div

                id="contentImportPreviewContent">

            </div>

        </div>


        <!-- =========================================
             BUTTONS
        ========================================== -->

        <div class="step-buttons">


            <button

                type="button"

                onclick="backToProductImages()">

                ← Back

            </button>


            <button

                type="button"

                onclick="nextProductContentImport()">

                Import & Next →

            </button>


        </div>


    </div>

    `;


    initProductContentImport();

}


/* =========================================================
   INIT
========================================================= */

function initProductContentImport() {

    console.log(
        "STEP 3 READY"
    );


    loadProductContentImport();

}


/* =========================================================
   BACK
========================================================= */

function backToProductImages() {

    if (
        typeof renderProductImages ===
        "function"
    ) {

        renderProductImages();

        return;

    }


    console.error(
        "renderProductImages is not defined."
    );

}


/* =========================================================
   NEXT
========================================================= */

async function nextProductContentImport() {


    /* =========================================
       SAVE SOURCE
    ========================================== */

    saveProductContentImport();


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
       STATUS
    ========================================== */

    const status =
        document.getElementById(
            "contentImportStatus"
        );


    if (status) {

        status.innerHTML =
            "⏳ Đang tải dữ liệu từ Website...";

    }


    /* =========================================
       SOURCE
    ========================================== */

    const source =
        window.currentProduct?.source;


    /* =========================================
       VALIDATE URL
    ========================================== */

    if (
        !source ||
        !source.url
    ) {

        if (status) {

            status.innerHTML =
                "❌ Chưa nhập Source URL";

        }


        alert(
            "Vui lòng nhập URL sản phẩm."
        );


        return;

    }


    /* =========================================
       IMPORT
    ========================================== */

    try {


        /* =====================================
           CHECK ENGINE
        ====================================== */

        if (
            typeof ProductImportEngine ===
            "undefined"
        ) {

            throw new Error(
                "ProductImportEngine chưa được tải."
            );

        }


        /* =====================================
           CALL IMPORT ENGINE
        ====================================== */

        const result =
            await ProductImportEngine.import(
                source
            );


        /* =====================================
           CHECK RESULT
        ====================================== */

        if (
            !result ||
            !result.success
        ) {

            if (status) {

                status.innerHTML =
                    "❌ Import thất bại";

            }


            alert(

                result?.error ||
                result?.message ||
                "Import thất bại."

            );


            return;

        }


        /* =====================================
           SAVE RAW RESULT
        ====================================== */

        window.currentProduct.importResult =
            result;


        /* =====================================
           EXTRACT PRODUCT
        ====================================== */

        const importedProduct =
            extractImportedProduct(
                result
            );


        console.log(
            "========== EXTRACTED PRODUCT =========="
        );

        console.log(
            importedProduct
        );

        console.log(
            "========================================"
        );


        /* =====================================
           CURRENT PRODUCT
        ====================================== */

        const current =
            window.currentProduct ||
            {};


        /* =====================================
           OLD PRODUCT

           STEP 1 DATA HAS PRIORITY
        ====================================== */

        const oldProduct = {

            ...(current.product || {}),


            business:
                current.business ||
                current.product?.business ||
                "",


            category:
                current.category ||
                current.product?.category ||
                "",


            brand:
                current.brand ||
                current.product?.brand ||
                "",


            origin:
                current.origin ||
                current.product?.origin ||
                "",


            folder:
                current.folder ||
                current.product?.folder ||
                ""

        };


        /* =====================================
           NORMALIZE
        ====================================== */

        const normalizedProduct =
            normalizeImportedProduct(
                importedProduct
            );


        console.log(
            "========== NORMALIZED PRODUCT =========="
        );

        console.log(
            normalizedProduct
        );

        console.log(
            "========================================"
        );


        /* =====================================
           MERGE
        ====================================== */

        const mergedProduct =
            mergeImportedProduct(

                oldProduct,

                normalizedProduct

            );


        /* =====================================
           STEP 1 PRIORITY
        ====================================== */

        if (current.business) {

            mergedProduct.business =
                current.business;

        }


        if (current.category) {

            mergedProduct.category =
                current.category;

        }


        if (current.brand) {

            mergedProduct.brand =
                current.brand;

        }


        if (current.origin) {

            mergedProduct.origin =
                current.origin;

        }


        if (current.folder) {

            mergedProduct.folder =
                current.folder;

        }


        /* =====================================
           FINAL CLEAN
        ====================================== */

        delete mergedProduct.specification;


        /* =====================================
           ENSURE SPECS
        ====================================== */

        ensureProductSpecs(
            mergedProduct
        );


        /* =====================================
           SAVE FINAL PRODUCT
        ====================================== */

        window.currentProduct.product =
            mergedProduct;


        /* =====================================
           DEBUG
        ====================================== */

        console.log(
            "========== FINAL PRODUCT =========="
        );

        console.log(
            window.currentProduct.product
        );

        console.log(
            "==================================="
        );


        console.log(
            "========== DESCRIPTION =========="
        );

        console.log(
            window.currentProduct.product.description
        );

        console.log(
            "================================="
        );


        console.log(
            "========== SPECS TABLE =========="
        );

        console.log(
            window.currentProduct.product.specs.table
        );

        console.log(
            "================================="
        );


        console.log(
            "========== SPECS TEXT =========="
        );

        console.log(
            window.currentProduct.product.specs.text
        );

        console.log(
            "==============================="
        );


        /* =====================================
           STATUS
        ====================================== */

        if (status) {

            status.innerHTML =
                "✅ Website đã đọc thành công";

        }


        /* =====================================
           PREVIEW
        ====================================== */

        renderContentImportPreview(
            mergedProduct
        );


        /* =====================================
           MARK IMPORT SUCCESS
        ====================================== */

        markProductContentImported();


        /* =====================================
           SAVE SOURCE
        ====================================== */

        saveProductContentImport();


        /* =====================================
           SAVE DRAFT
        ====================================== */

        if (

            typeof saveProductDraft ===
            "function"

        ) {

            saveProductDraft();

        }


        /* =====================================
           GO STEP 4
        ====================================== */

        if (

            typeof renderProductSpecification ===
            "function"

        ) {

            renderProductSpecification();

            return;

        }


        console.error(
            "renderProductSpecification is not defined."
        );

    }


    catch (error) {

        console.error(
            "IMPORT ERROR:",
            error
        );


        if (status) {

            status.innerHTML =
                "❌ Import thất bại";

        }


        alert(

            error.message ||
            "Không thể Import sản phẩm."

        );

    }

}


/* =========================================================
   EXTRACT IMPORTED PRODUCT

   SUPPORT:

   result.product

   result.result.product

   result.data.product

   result.data
========================================================= */

function extractImportedProduct(
    result
) {


    /* =========================================
       result.product
    ========================================== */

    if (

        result &&
        result.product &&
        typeof result.product ===
        "object"

    ) {

        return result.product;

    }


    /* =========================================
       result.result.product
    ========================================== */

    if (

        result &&
        result.result &&
        result.result.product &&
        typeof result.result.product ===
        "object"

    ) {

        return result.result.product;

    }


    /* =========================================
       result.data.product
    ========================================== */

    if (

        result &&
        result.data &&
        result.data.product &&
        typeof result.data.product ===
        "object"

    ) {

        return result.data.product;

    }


    /* =========================================
       result.data

       Chỉ dùng nếu data có vẻ là product
    ========================================== */

    if (

        result &&
        result.data &&
        typeof result.data ===
        "object" &&
        !Array.isArray(result.data)

    ) {

        if (

            result.data.name ||
            result.data.description ||
            result.data.specs ||
            result.data.specification

        ) {

            return result.data;

        }

    }


    return {};

}


/* =========================================================
   NORMALIZE IMPORTED PRODUCT

   IMPORTANT
   ---------------------------------------------------------
   Chỉ normalize nhẹ.

   KHÔNG:
   - tạo bảng mẫu
   - tự đặt tên cột
   - ép text vào bảng
   - ép bảng vào text
   - ghép tất cả thành một đoạn

========================================================= */

function normalizeImportedProduct(
    importedProduct
) {


    if (

        !importedProduct ||
        typeof importedProduct !==
        "object"

    ) {

        return {

            specs: {

                table: {

                    headers: [],

                    rows: []

                },

                text: []

            }

        };

    }


    const normalized = {

        ...importedProduct

    };


    /* =========================================
       DESCRIPTION
    ========================================== */

    normalized.description =
        normalizeProductDescription(
            importedProduct.description
        );


    /* =========================================
       SPECS
    ========================================== */

    normalized.specs =
        normalizeProductSpecs(
            importedProduct
        );


    /* =========================================
       IMAGES
    ========================================== */

    if (

        Array.isArray(
            importedProduct.images
        )

    ) {

        normalized.images =

            importedProduct.images

                .filter(Boolean)

                .map(

                    image =>

                        String(image).trim()

                )

                .filter(Boolean);

    }


    /* =========================================
       REMOVE LEGACY FIELD
    ========================================== */

    delete normalized.specification;


    return normalized;

}


/* =========================================================
   NORMALIZE PRODUCT DESCRIPTION

   IMPORTANT

   Giữ cấu trúc dòng.

   Không dùng:

       /\s+/g

   Vì cách đó làm mất xuống dòng.

========================================================= */

function normalizeProductDescription(
    value
) {


    if (

        value === null ||
        value === undefined

    ) {

        return "";

    }


    /* =========================================
       STRING
    ========================================== */

    if (

        typeof value ===
        "string"

    ) {

        return normalizePreserveLineStructure(
            value
        );

    }


    /* =========================================
       ARRAY

       Mỗi item = một dòng
    ========================================== */

    if (

        Array.isArray(value)

    ) {

        return value

            .map(

                item =>

                    normalizeDescriptionItem(
                        item
                    )

            )

            .filter(Boolean)

            .join("\n");

    }


    /* =========================================
       OBJECT
    ========================================== */

    if (

        typeof value ===
        "object"

    ) {

        return normalizeDescriptionObject(
            value
        );

    }


    return String(value).trim();

}


/* =========================================================
   NORMALIZE DESCRIPTION ITEM
========================================================= */

function normalizeDescriptionItem(
    item
) {


    if (

        item === null ||
        item === undefined

    ) {

        return "";

    }


    if (

        typeof item ===
        "string"

    ) {

        return normalizePreserveLineStructure(
            item
        );

    }


    if (

        typeof item ===
        "object"

    ) {

        if (

            item.text !== undefined

        ) {

            return normalizePreserveLineStructure(
                item.text
            );

        }


        if (

            item.content !== undefined

        ) {

            return normalizePreserveLineStructure(
                item.content
            );

        }


        if (

            item.description !== undefined

        ) {

            return normalizePreserveLineStructure(
                item.description
            );

        }


        return normalizeLegacySpecObject(
            item
        );

    }


    return String(item).trim();

}


/* =========================================================
   NORMALIZE DESCRIPTION OBJECT
========================================================= */

function normalizeDescriptionObject(
    value
) {


    if (

        value.text !== undefined

    ) {

        return normalizePreserveLineStructure(
            value.text
        );

    }


    if (

        value.content !== undefined

    ) {

        return normalizePreserveLineStructure(
            value.content
        );

    }


    if (

        value.description !== undefined

    ) {

        return normalizePreserveLineStructure(
            value.description
        );

    }


    if (

        Array.isArray(
            value.items
        )

    ) {

        return value.items

            .map(
                normalizeDescriptionItem
            )

            .filter(Boolean)

            .join("\n");

    }


    return normalizeLegacySpecObject(
        value
    );

}


/* =========================================================
   PRESERVE LINE STRUCTURE

   Giữ:

   - xuống dòng
   - bullet
   - dấu chấm đầu dòng

   Chỉ loại bỏ khoảng trắng thừa
   trong cùng một dòng.
========================================================= */

function normalizePreserveLineStructure(
    value
) {


    if (

        value === null ||
        value === undefined

    ) {

        return "";

    }


    return String(value)

        .replace(
            /\r\n/g,
            "\n"
        )

        .replace(
            /\r/g,
            "\n"
        )

        .split("\n")

        .map(

            line =>

                line

                    .replace(
                        /[ \t]+/g,
                        " "
                    )

                    .trim()

        )

        .join("\n")

        .trim();

}


/* =========================================================
   NORMALIZE PRODUCT SPECS

   FINAL:

   specs: {

       table: {

           headers: [],

           rows: []

       },

       text: []

   }

   IMPORTANT

   Không tạo bảng mặc định.

   Nếu nguồn không có table:

       table.headers = []

       table.rows = []

========================================================= */

function normalizeProductSpecs(
    product
) {


    const result = {

        table: {

            headers: [],

            rows: []

        },

        text: []

    };


    if (

        !product ||
        typeof product !==
        "object"

    ) {

        return result;

    }


    /* =========================================
       SOURCE

       ƯU TIÊN specs
    ========================================== */

    let sourceSpecs =
        product.specs;


    /* =========================================
       LEGACY

       Chỉ đọc nếu không có specs
    ========================================== */

    if (

        !sourceSpecs &&

        product.specification !==
        undefined

    ) {

        sourceSpecs =
            product.specification;

    }


    /* =========================================
       CASE 1

       NEW OBJECT

       specs: {

           table: {},

           text: []

       }
    ========================================== */

    if (

        sourceSpecs &&

        typeof sourceSpecs ===
        "object" &&

        !Array.isArray(sourceSpecs)

    ) {


        /* =====================================
           TABLE
        ====================================== */

        if (

            sourceSpecs.table &&

            typeof sourceSpecs.table ===
            "object"

        ) {

            result.table =

                normalizeSpecificationTable(

                    sourceSpecs.table

                );

        }


        /* =====================================
           TEXT
        ====================================== */

        if (

            Array.isArray(
                sourceSpecs.text
            )

        ) {

            result.text =

                normalizeSpecificationTextArray(

                    sourceSpecs.text

                );

        }


        return result;

    }


    /* =========================================
       CASE 2

       ARRAY

       Có thể chứa:

       - HTML table
       - Object table
       - Object spec
       - String
    ========================================== */

    if (

        Array.isArray(
            sourceSpecs
        )

    ) {

        sourceSpecs.forEach(

            item => {


                /* =================================
                   HTML TABLE
                ================================= */

                if (

                    typeof item ===
                    "string" &&

                    isHTMLTable(item)

                ) {

                    const parsedTable =

                        parseHTMLSpecificationTable(

                            item

                        );


                    if (

                        parsedTable.headers.length ||
                        parsedTable.rows.length

                    ) {

                        result.table =
                            parsedTable;

                    }


                    return;

                }


                /* =================================
                   OBJECT
                ================================= */

                if (

                    item &&
                    typeof item ===
                    "object"

                ) {


                    /* =================================
                       OBJECT TABLE
                    ================================= */

                    if (

                        item.table &&

                        typeof item.table ===
                        "object"

                    ) {

                        const parsedTable =

                            normalizeSpecificationTable(

                                item.table

                            );


                        if (

                            parsedTable.headers.length ||
                            parsedTable.rows.length

                        ) {

                            result.table =
                                parsedTable;

                        }


                        if (

                            Array.isArray(
                                item.text
                            )

                        ) {

                            result.text.push(

                                ...normalizeSpecificationTextArray(

                                    item.text

                                )

                            );

                        }


                        return;

                    }


                    /* =================================
                       OBJECT SPEC

                       {
                           name: "...",
                           value: "..."
                       }

                       →

                       text
                    ================================== */

                    const converted =

                        normalizeLegacySpecObject(

                            item

                        );


                    if (converted) {

                        result.text.push(
                            converted
                        );

                    }


                    return;

                }


                /* =================================
                   STRING
                ================================= */

                if (

                    typeof item ===
                    "string"

                ) {

                    const text =

                        normalizePreserveLineStructure(
                            item
                        );


                    if (text) {

                        result.text.push(
                            text
                        );

                    }

                }

            }

        );

    }


    return result;

}


/* =========================================================
   NORMALIZE SPECIFICATION TEXT ARRAY

   Giữ từng item riêng.

   Không ghép tất cả thành một dòng.

========================================================= */

function normalizeSpecificationTextArray(
    items
) {


    if (

        !Array.isArray(items)

    ) {

        return [];

    }


    const result = [];


    items.forEach(

        item => {


            if (

                item === null ||
                item === undefined

            ) {

                return;

            }


            /* =================================
               STRING
            ================================== */

            if (

                typeof item ===
                "string"

            ) {

                const lines =

                    normalizePreserveLineStructure(
                        item
                    )

                        .split("\n")

                        .map(
                            line => line.trim()
                        )

                        .filter(Boolean);


                result.push(
                    ...lines
                );


                return;

            }


            /* =================================
               OBJECT
            ================================== */

            if (

                typeof item ===
                "object"

            ) {

                const text =

                    normalizeDescriptionItem(
                        item
                    );


                if (text) {

                    const lines =

                        text

                            .split("\n")

                            .map(
                                line => line.trim()
                            )

                            .filter(Boolean);


                    result.push(
                        ...lines
                    );

                }


                return;

            }


            /* =================================
               OTHER
            ================================== */

            const text =

                String(item).trim();


            if (text) {

                result.push(
                    text
                );

            }

        }

    );


    return result;

}


/* =========================================================
   NORMALIZE SPECIFICATION TABLE

   IMPORTANT

   Không đặt tên cột mặc định.

   Giữ nguyên số cột từ nguồn.

========================================================= */

function normalizeSpecificationTable(
    table
) {


    const normalized = {

        headers: [],

        rows: []

    };


    if (

        !table ||
        typeof table !==
        "object"

    ) {

        return normalized;

    }


    /* =========================================
       HEADERS
    ========================================== */

    if (

        Array.isArray(
            table.headers
        )

    ) {

        normalized.headers =

            table.headers.map(

                value =>

                    normalizeTableCell(
                        value
                    )

            );

    }


    /* =========================================
       ROWS
    ========================================== */

    if (

        Array.isArray(
            table.rows
        )

    ) {

        normalized.rows =

            table.rows

                .filter(
                    row =>
                        Array.isArray(row)
                )

                .map(

                    row =>

                        row.map(

                            value =>

                                normalizeTableCell(
                                    value
                                )

                        )

                )

                .filter(

                    row =>

                        row.some(

                            cell =>
                                cell !== ""

                        )

                );

    }


    return normalized;

}


/* =========================================================
   NORMALIZE TABLE CELL

   Không phá cấu trúc dòng.

========================================================= */

function normalizeTableCell(
    value
) {


    if (

        value === null ||
        value === undefined

    ) {

        return "";

    }


    return String(value)

        .replace(
            /\r\n/g,
            "\n"
        )

        .replace(
            /\r/g,
            "\n"
        )

        .split("\n")

        .map(

            line =>

                line

                    .replace(
                        /[ \t]+/g,
                        " "
                    )

                    .trim()

        )

        .join("\n")

        .trim();

}


/* =========================================================
   PARSE HTML SPECIFICATION TABLE

   HTML:

       <table>

   OUTPUT:

       {

           headers: [],

           rows: []

       }

   IMPORTANT

   Không tự thêm cột.

========================================================= */

function parseHTMLSpecificationTable(
    html
) {


    const result = {

        headers: [],

        rows: []

    };


    if (

        typeof html !==
        "string" ||

        !html.trim()

    ) {

        return result;

    }


    try {


        const parser =
            new DOMParser();


        const doc =

            parser.parseFromString(

                html,

                "text/html"

            );


        const table =

            doc.querySelector(
                "table"
            );


        if (!table) {

            return result;

        }


        /* =====================================
           THEAD
        ====================================== */

        const headerCells =

            table.querySelectorAll(

                "thead th, thead td"

            );


        if (

            headerCells.length

        ) {

            result.headers =

                Array.from(
                    headerCells
                )

                    .map(

                        cell =>

                            normalizeTableCell(

                                cell.textContent

                            )

                    )

                    .filter(Boolean);

        }


        /* =====================================
           ALL ROWS
        ====================================== */

        const rows =

            table.querySelectorAll(
                "tr"
            );


        Array.from(rows)

            .forEach(

                (row, index) => {


                    const cells =

                        row.querySelectorAll(

                            "th, td"

                        );


                    if (!cells.length) {

                        return;

                    }


                    const values =

                        Array.from(cells)

                            .map(

                                cell =>

                                    normalizeTableCell(

                                        cell.textContent

                                    )

                            );


                    /* =========================
                       HEADER FROM FIRST ROW

                       Nếu chưa có THEAD
                    ========================== */

                    if (

                        !result.headers.length &&

                        index === 0 &&

                        row.querySelector("th")

                    ) {

                        result.headers =

                            values;

                        return;

                    }


                    /* =========================
                       NORMAL DATA ROW
                    ========================== */

                    if (

                        values.some(

                            value =>
                                value !== ""

                        )

                    ) {

                        result.rows.push(
                            values
                        );

                    }

                }

            );


        return result;

    }


    catch (error) {

        console.error(

            "HTML TABLE PARSE ERROR:",

            error

        );


        return result;

    }

}


/* =========================================================
   CHECK HTML TABLE
========================================================= */

function isHTMLTable(
    value
) {

    return (

        typeof value ===
        "string" &&

        /<table[\s>]/i.test(
            value
        )

    );

}


/* =========================================================
   NORMALIZE LEGACY SPEC OBJECT
========================================================= */

function normalizeLegacySpecObject(
    item
) {


    if (

        !item ||
        typeof item !==
        "object"

    ) {

        return "";

    }


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

            `${name}: ${value}`

        );

    }


    return (

        name ||
        value ||
        ""

    );

}


/* =========================================================
   ENSURE PRODUCT SPECS

   IMPORTANT

   Chỉ đảm bảo cấu trúc.

   KHÔNG tạo dữ liệu mẫu.

========================================================= */

function ensureProductSpecs(
    product
) {


    if (

        !product ||
        typeof product !==
        "object"

    ) {

        return;

    }


    if (

        !product.specs ||
        typeof product.specs !==
        "object" ||
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


    if (

        !product.specs.table ||
        typeof product.specs.table !==
        "object" ||
        Array.isArray(
            product.specs.table
        )

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


    if (

        !Array.isArray(
            product.specs.text
        )

    ) {

        product.specs.text = [];

    }

}


/* =========================================================
   MERGE IMPORTED PRODUCT

   STEP 1 DATA HAS PRIORITY

   IMPORTED DATA:

   - name
   - description
   - specs
   - images

========================================================= */

function mergeImportedProduct(
    oldProduct,
    importedProduct
) {


    const merged = {

        ...oldProduct

    };


    /* =========================================
       VALID VALUE
    ========================================== */

    function isValidImportedValue(
        value
    ) {


        if (

            value === null ||
            value === undefined

        ) {

            return false;

        }


        if (

            typeof value ===
            "string"

        ) {

            const text =
                value.trim();


            if (!text) {

                return false;

            }


            const invalidValues = [

                "unknown",

                "undefined",

                "null",

                "n/a",

                "na",

                "none"

            ];


            if (

                invalidValues.includes(

                    text.toLowerCase()

                )

            ) {

                return false;

            }

        }


        return true;

    }


    /* =========================================
       NAME
    ========================================== */

    if (

        isValidImportedValue(
            importedProduct.name
        )

    ) {

        merged.name =
            importedProduct.name;

    }


    /* =========================================
       DESCRIPTION
    ========================================== */

    if (

        isValidImportedValue(
            importedProduct.description
        )

    ) {

        merged.description =
            importedProduct.description;

    }


    /* =========================================
       SPECS

       Không tạo bảng mẫu.

       Chỉ lấy đúng dữ liệu
       đã import.
    ========================================== */

    if (

        importedProduct.specs &&
        typeof importedProduct.specs ===
        "object"

    ) {

        merged.specs = {

            table: {

                headers:

                    Array.isArray(

                        importedProduct.specs
                            .table
                            ?.headers

                    )

                        ? [

                            ...

                            importedProduct.specs
                                .table
                                .headers

                        ]

                        : [],


                rows:

                    Array.isArray(

                        importedProduct.specs
                            .table
                            ?.rows

                    )

                        ? importedProduct.specs
                            .table
                            .rows
                            .map(

                                row =>

                                    Array.isArray(row)

                                        ? [

                                            ...row

                                        ]

                                        : []

                            )

                        : []

            },


            text:

                Array.isArray(

                    importedProduct.specs
                        .text

                )

                    ? [

                        ...

                        importedProduct.specs
                            .text

                    ]

                    : []

        };

    }


    /* =========================================
       IMAGES

       Giữ ảnh từ Website.

       Không xử lý ảnh tại Step 3.

    ========================================== */

    if (

        Array.isArray(
            importedProduct.images
        ) &&

        importedProduct.images.length > 0

    ) {

        merged.images =

            importedProduct.images;

    }


    /* =========================================
       FINAL CLEAN
    ========================================== */

    delete merged.specification;


    return merged;

}


/* =========================================================
   PREVIEW IMPORT RESULT
========================================================= */

function renderContentImportPreview(
    product
) {


    const preview =

        document.getElementById(

            "contentImportPreview"

        );


    const content =

        document.getElementById(

            "contentImportPreviewContent"

        );


    if (

        !preview ||
        !content

    ) {

        return;

    }


    const name =

        product?.name ||
        "Chưa xác định";


    const description =

        product?.description ||
        "Chưa có mô tả";


    const table =

        product?.specs?.table ||
        {};


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


    const text =

        Array.isArray(
            product?.specs?.text
        )

            ? product.specs.text
            : [];


    const images =

        Array.isArray(
            product?.images
        )

            ? product.images
            : [];


    content.innerHTML = `

        <div>

            <strong>

                Product Name:

            </strong>

            ${escapeContentImportHTML(name)}

        </div>


        <div>

            <strong>

                Product Description:

            </strong>


            <div class="import-preview-description">

                ${escapeContentImportHTML(
                    description
                ).replace(
                    /\n/g,
                    "<br>"
                )}

            </div>

        </div>


        <div>

            <strong>

                Specification Table:

            </strong>

            ${headers.length}

            column(s) /

            ${rows.length}

            row(s)

        </div>


        <div>

            <strong>

                Specification Text:

            </strong>

            ${text.length}

            item(s)

        </div>


        <div>

            <strong>

                Product Images:

            </strong>

            ${images.length}

            image(s)

        </div>

    `;


    preview.style.display =
        "block";

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeContentImportHTML(
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
   SAVE CONTENT IMPORT
========================================================= */

function saveProductContentImport() {


    if (

        !window.currentProduct

    ) {

        window.currentProduct = {};

    }


    const existingSource =

        window.currentProduct.source ||
        {};


    window.currentProduct.source = {

        ...existingSource,


        type:

            document.getElementById(

                "contentSourceType"

            )?.value ||

            "website",


        url:

            document.getElementById(

                "contentSourceUrl"

            )?.value.trim() ||

            "",


        options:

            existingSource.options ||

            {

                description: true,

                specs: true,

                images: true

            },


        imported:

            existingSource.imported ||
            false,


        importedAt:

            existingSource.importedAt ||
            ""

    };

}


/* =========================================================
   LOAD CONTENT IMPORT
========================================================= */

function loadProductContentImport() {


    if (

        !window.currentProduct

    ) {

        return;

    }


    const source =

        window.currentProduct.source;


    if (!source) {

        return;

    }


    /* =========================================
       TYPE
    ========================================== */

    const type =

        document.getElementById(

            "contentSourceType"

        );


    if (type) {

        type.value =

            source.type ||
            "website";

    }


    /* =========================================
       URL
    ========================================== */

    const url =

        document.getElementById(

            "contentSourceUrl"

        );


    if (url) {

        url.value =

            source.url ||
            "";

    }

}


/* =========================================================
   MARK IMPORT SUCCESS
========================================================= */

function markProductContentImported() {


    if (

        !window.currentProduct

    ) {

        return;

    }


    if (

        !window.currentProduct.source

    ) {

        window.currentProduct.source = {};

    }


    window.currentProduct.source.imported =

        true;


    window.currentProduct.source.importedAt =

        new Date().toISOString();

}