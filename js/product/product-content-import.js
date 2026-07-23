/* =====================================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   PURPOSE
   -----------------------------------------------------
   - Nhập URL sản phẩm
   - Gọi ProductImportEngine
   - Nhận dữ liệu từ Backend / Free Parser / AI
   - Giữ nguyên cấu trúc nội dung từ nguồn
   - Không ép Technical Specification vào
     các cột cố định
   - Giữ Description theo cấu trúc nguồn
   - Giữ Specification theo cấu trúc nguồn
   - Giữ HTML / paragraph / list / line break
   - Giữ Specification Table nếu nguồn có bảng
   - Giữ Product Images
   - Chuyển dữ liệu sang Step 4

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

   IMPORTANT
   -----------------------------------------------------
   STEP 3 KHÔNG ĐƯỢC:

   - Tự tạo cột "Mức cân"
   - Tự tạo cột "Bước nhảy"
   - Tự tạo cột "Đĩa cân inox"
   - Tự phân loại thông số
   - Tự suy đoán cấu trúc dữ liệu

   STEP 3 CHỈ:

   - Lấy dữ liệu từ nguồn
   - Giữ cấu trúc nguồn
   - Chuyển dữ liệu sang Step 4

===================================================== */


/* =====================================================
   RENDER STEP 3
===================================================== */

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

                    ✓ Original Content Structure

                </div>


                <div>

                    ✓ Technical Specification

                </div>


                <div>

                    ✓ Product Images

                </div>

            </div>


            <small>

                Nội dung được lấy từ Website và giữ
                nguyên cấu trúc nguồn để chỉnh sửa
                thủ công tại Step 4.

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


/* =====================================================
   INIT
===================================================== */

function initProductContentImport() {

    console.log(
        "STEP 3 READY"
    );


    loadProductContentImport();

}


/* =====================================================
   BACK TO STEP 2
===================================================== */

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


/* =====================================================
   NEXT
===================================================== */

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

        if (
            !window.currentProduct
        ) {

            window.currentProduct = {};

        }


        window.currentProduct.importResult =

            result;


        /* =====================================
           EXTRACT PRODUCT
        ====================================== */

        const importedProduct =

            extractImportedProduct(

                result

            );


        console.log("");

        console.log(

            "========== RAW IMPORTED PRODUCT =========="

        );

        console.log(

            importedProduct

        );

        console.log(

            "==========================================="

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

            ...(

                current.product ||

                {}

            ),


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


        console.log("");

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

           KHÔNG TẠO CỘT CỐ ĐỊNH
        ====================================== */

        if (

            !mergedProduct.specs ||

            typeof mergedProduct.specs !==

            "object" ||

            Array.isArray(

                mergedProduct.specs

            )

        ) {

            mergedProduct.specs = {

                table: {

                    headers: [],

                    rows: []

                },

                text: []

            };

        }


        /* =====================================
           ENSURE TABLE
        ====================================== */

        if (

            !mergedProduct.specs.table ||

            typeof mergedProduct.specs.table !==

            "object" ||

            Array.isArray(

                mergedProduct.specs.table

            )

        ) {

            mergedProduct.specs.table = {

                headers: [],

                rows: []

            };

        }


        /* =====================================
           ENSURE TABLE ARRAYS
        ====================================== */

        if (

            !Array.isArray(

                mergedProduct.specs.table.headers

            )

        ) {

            mergedProduct.specs.table.headers = [];

        }


        if (

            !Array.isArray(

                mergedProduct.specs.table.rows

            )

        ) {

            mergedProduct.specs.table.rows = [];

        }


        /* =====================================
           ENSURE TEXT
        ====================================== */

        if (

            !Array.isArray(

                mergedProduct.specs.text

            )

        ) {

            mergedProduct.specs.text = [];

        }


        /* =====================================
           SAVE FINAL PRODUCT
        ====================================== */

        window.currentProduct.product =

            mergedProduct;


        /* =====================================
           DEBUG FINAL PRODUCT
        ====================================== */

        console.log("");

        console.log(

            "========== FINAL PRODUCT =========="

        );

        console.log(

            window.currentProduct.product

        );

        console.log(

            "==================================="

        );


        console.log("");

        console.log(

            "========== DESCRIPTION =========="

        );

        console.log(

            window.currentProduct.product

                .description

        );

        console.log(

            "================================="

        );


        console.log("");

        console.log(

            "========== SPECS TABLE =========="

        );

        console.log(

            window.currentProduct.product

                .specs

                .table

        );

        console.log(

            "================================="

        );


        console.log("");

        console.log(

            "========== SPECS TEXT =========="

        );

        console.log(

            window.currentProduct.product

                .specs

                .text

        );

        console.log(

            "================================"

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


        alert(

            "Import thành công nhưng không tìm thấy Step 4."

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


/* =====================================================
   EXTRACT IMPORTED PRODUCT

   SUPPORT:

   result.product

   result.result.product

   result.data.product

   result.data
===================================================== */

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

            result.data.specification ||

            result.data.images

        ) {

            return result.data;

        }

    }


    return {};

}


/* =====================================================
   NORMALIZE IMPORTED PRODUCT

   MỤC TIÊU:

   - Không làm mất cấu trúc nguồn
   - Không ép description thành một dòng
   - Không ép spec text thành một dòng
   - Không tự tạo bảng
   - Không tự tạo header cố định
===================================================== */

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

       GIỮ CẤU TRÚC
    ========================================== */

    normalized.description =

        normalizeProductDescription(

            importedProduct.description

        );


    /* =========================================
       SPECS

       GIỮ CẤU TRÚC
    ========================================== */

    normalized.specs =

        normalizeProductSpecs(

            importedProduct

        );


    /* =========================================
       IMAGES

       GIỮ NGUYÊN DANH SÁCH
    ========================================== */

    if (

        Array.isArray(

            importedProduct.images

        )

    ) {

        normalized.images =

            [

                ...importedProduct.images

            ];

    }


    /* =========================================
       REMOVE LEGACY FIELD
    ========================================== */

    delete normalized.specification;


    return normalized;

}


/* =====================================================
   NORMALIZE PRODUCT DESCRIPTION

   IMPORTANT

   Không:

       replace(/\s+/g, " ")

   Vì sẽ phá cấu trúc nguồn.

   Nếu nguồn có:

       <p>...</p>
       <ul>
           <li>...</li>
       </ul>

   thì giữ nguyên.

===================================================== */

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

       GIỮ NGUYÊN CẤU TRÚC
    ========================================== */

    if (

        typeof value ===

        "string"

    ) {

        return value.trim();

    }


    /* =========================================
       ARRAY

       GIỮ TỪNG PHẦN

       Không gộp bằng khoảng trắng.

       Dùng newline giữa các phần.
    ========================================== */

    if (

        Array.isArray(value)

    ) {

        return value

            .map(

                item =>

                    normalizeContentBlock(

                        item

                    )

            )

            .filter(Boolean)

            .join("\n");

    }


    /* =========================================
       OBJECT

       Nếu có HTML / content / text
       ưu tiên dữ liệu gốc.
    ========================================== */

    if (

        typeof value ===

        "object"

    ) {

        if (

            typeof value.html ===

            "string"

        ) {

            return value.html.trim();

        }


        if (

            typeof value.content ===

            "string"

        ) {

            return value.content.trim();

        }


        if (

            typeof value.text ===

            "string"

        ) {

            return value.text.trim();

        }


        return normalizeLegacySpecObject(

            value

        );

    }


    return String(

        value

    ).trim();

}


/* =====================================================
   NORMALIZE CONTENT BLOCK

   DÙNG CHO DESCRIPTION
===================================================== */

function normalizeContentBlock(

    value

) {


    if (

        value === null ||

        value === undefined

    ) {

        return "";

    }


    if (

        typeof value ===

        "string"

    ) {

        return value.trim();

    }


    if (

        typeof value ===

        "object"

    ) {


        if (

            typeof value.html ===

            "string"

        ) {

            return value.html.trim();

        }


        if (

            typeof value.content ===

            "string"

        ) {

            return value.content.trim();

        }


        if (

            typeof value.text ===

            "string"

        ) {

            return value.text.trim();

        }


        return normalizeLegacySpecObject(

            value

        );

    }


    return String(

        value

    ).trim();

}


/* =====================================================
   NORMALIZE PRODUCT SPECS

   FINAL COMPATIBLE STRUCTURE

   {

       table: {

           headers: [],

           rows: []

       },

       text: []

   }

   IMPORTANT

   Không tạo bảng nếu nguồn không có bảng.

   Không tạo cột mặc định.

===================================================== */

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

       OBJECT

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

           GIỮ CẤU TRÚC
        ====================================== */

        if (

            Array.isArray(

                sourceSpecs.text

            )

        ) {

            result.text =

                sourceSpecs.text

                    .map(

                        normalizeSpecText

                    )

                    .filter(Boolean);

        }


        return result;

    }


    /* =========================================
       CASE 2

       ARRAY

       Có thể chứa:

       - HTML table
       - Object table
       - Object
       - String
       - HTML
       - Text
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


                        return;

                    }


                    /* =================================
                       OBJECT HTML
                    ================================= */

                    if (

                        typeof item.html ===

                        "string"

                    ) {

                        if (

                            isHTMLTable(

                                item.html

                            )

                        ) {

                            const parsedTable =

                                parseHTMLSpecificationTable(

                                    item.html

                                );


                            if (

                                parsedTable.headers.length ||

                                parsedTable.rows.length

                            ) {

                                result.table =

                                    parsedTable;

                            }

                        }

                        else {

                            result.text.push(

                                item.html.trim()

                            );

                        }


                        return;

                    }


                    /* =================================
                       OBJECT CONTENT
                    ================================= */

                    if (

                        typeof item.content ===

                        "string"

                    ) {

                        result.text.push(

                            item.content.trim()

                        );

                        return;

                    }


                    /* =================================
                       OBJECT SPEC

                       Chỉ chuyển thành text
                       khi backend trả object
                       dạng name/value.
                    ================================= */

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

                        item.trim();


                    if (!text) {

                        return;

                    }


                    /*
                       Nếu là HTML table
                       đã xử lý ở trên.

                       Các HTML khác:

                       GIỮ NGUYÊN
                    */

                    result.text.push(

                        text

                    );

                }

            }

        );

    }


    return result;

}


/* =====================================================
   NORMALIZE SPECIFICATION TABLE

   KHÔNG TẠO HEADER MẶC ĐỊNH

   KHÔNG XÓA CẤU TRÚC BẢNG

===================================================== */

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

                .map(

                    row => {

                        if (

                            !Array.isArray(row)

                        ) {

                            return [];

                        }


                        return row.map(

                            value =>

                                normalizeTableCell(

                                    value

                                )

                        );

                    }

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


/* =====================================================
   NORMALIZE TABLE CELL

   KHÔNG PHÁ DÒNG / HTML

===================================================== */

function normalizeTableCell(

    value

) {


    if (

        value === null ||

        value === undefined

    ) {

        return "";

    }


    if (

        typeof value ===

        "string"

    ) {

        return value.trim();

    }


    if (

        typeof value ===

        "object"

    ) {

        if (

            typeof value.html ===

            "string"

        ) {

            return value.html.trim();

        }


        if (

            typeof value.content ===

            "string"

        ) {

            return value.content.trim();

        }


        if (

            typeof value.text ===

            "string"

        ) {

            return value.text.trim();

        }

    }


    return String(

        value

    ).trim();

}


/* =====================================================
   PARSE HTML SPECIFICATION TABLE

   HTML:

       <table>

   OUTPUT:

       {

           headers: [],

           rows: []

       }

   IMPORTANT

   Không replace(/\s+/g, " ")

   vì có thể phá cấu trúc nội dung.

===================================================== */

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

                "thead th"

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

                            getHTMLTableCellContent(

                                cell

                            )

                    )

                    .filter(

                        value =>

                            value !== ""

                    );

        }


        /* =====================================
           ALL ROWS
        ====================================== */

        const rows =

            table.querySelectorAll(

                "tr"

            );


        Array.from(

            rows

        ).forEach(

            (row, index) => {


                const cells =

                    row.querySelectorAll(

                        "th, td"

                    );


                if (!cells.length) {

                    return;

                }


                const values =

                    Array.from(

                        cells

                    )

                        .map(

                            cell =>

                                getHTMLTableCellContent(

                                    cell

                                )

                        );


                /* =================================
                   HEADER FROM FIRST ROW

                   Nếu chưa có THEAD
                ================================== */

                if (

                    !result.headers.length &&

                    index === 0 &&

                    row.querySelector("th")

                ) {

                    result.headers =

                        values;

                    return;

                }


                /* =================================
                   NORMAL DATA ROW
                ================================== */

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


/* =====================================================
   GET HTML TABLE CELL CONTENT

   GIỮ:

   - <br>
   - danh sách
   - nội dung nhiều dòng

   Dùng innerHTML nếu có HTML cấu trúc.
===================================================== */

function getHTMLTableCellContent(

    cell

) {


    if (!cell) {

        return "";

    }


    const html =

        cell.innerHTML?.trim();


    if (html) {

        return html;

    }


    return (

        cell.textContent ||

        ""

    ).trim();

}


/* =====================================================
   CHECK HTML TABLE
===================================================== */

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


/* =====================================================
   NORMALIZE LEGACY SPEC OBJECT

   Chỉ dùng cho backend cũ

   {

       name: "...",

       value: "..."

   }

===================================================== */

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

            )

                .trim()

            : "";


    const value =

        item.value !== undefined

            ? String(

                item.value

            )

                .trim()

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


/* =====================================================
   NORMALIZE SPEC TEXT

   IMPORTANT

   KHÔNG:

       replace(/\s+/g, " ")

   Vì sẽ biến nhiều dòng thành một dòng.

===================================================== */

function normalizeSpecText(

    value

) {


    if (

        value === null ||

        value === undefined

    ) {

        return "";

    }


    if (

        typeof value ===

        "string"

    ) {

        return value.trim();

    }


    if (

        typeof value ===

        "object"

    ) {


        if (

            typeof value.html ===

            "string"

        ) {

            return value.html.trim();

        }


        if (

            typeof value.content ===

            "string"

        ) {

            return value.content.trim();

        }


        if (

            typeof value.text ===

            "string"

        ) {

            return value.text.trim();

        }


        return normalizeLegacySpecObject(

            value

        );

    }


    return String(

        value

    )

        .trim();

}


/* =====================================================
   MERGE IMPORTED PRODUCT

   STEP 1 DATA HAS PRIORITY

   IMPORTED DATA:

   - name
   - description
   - specs
   - images

===================================================== */

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

       KHÔNG TẠO CỘT MẶC ĐỊNH
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

       GIỮ NGUYÊN ẢNH TỪ BACKEND
    ========================================== */

    if (

        Array.isArray(

            importedProduct.images

        )

    ) {

        merged.images =

            [

                ...

                importedProduct.images

            ];

    }


    /* =========================================
       FINAL CLEAN
    ========================================== */

    delete merged.specification;


    return merged;

}


/* =====================================================
   PREVIEW IMPORT RESULT
===================================================== */

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

            ${escapeContentImportHTML(

                description

            )}

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


/* =====================================================
   ESCAPE HTML

   Dùng cho PREVIEW TEXT
===================================================== */

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


/* =====================================================
   SAVE CONTENT IMPORT
===================================================== */

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


/* =====================================================
   LOAD CONTENT IMPORT
===================================================== */

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


/* =====================================================
   MARK IMPORT SUCCESS
===================================================== */

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