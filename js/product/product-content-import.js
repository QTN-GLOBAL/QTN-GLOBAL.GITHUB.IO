/* =========================================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   PURPOSE
   ---------------------------------------------------------
   - Nhập URL sản phẩm
   - Gọi ProductImportEngine
   - Nhận dữ liệu từ Backend / Free Parser / AI
   - Giữ nguyên cấu trúc Description từ nguồn
   - Giữ nguyên cấu trúc Specification từ nguồn
   - Tách bullet / paragraph theo đúng cấu trúc dữ liệu
   - Hỗ trợ Specification Table nếu nguồn trả về bảng
   - Giữ Product Images
   - Chuyển dữ liệu sang Step 4

   IMPORTANT
   ---------------------------------------------------------
   CHỈ SỬ DỤNG:

       product.specs

   KHÔNG SỬ DỤNG SAU KHI NORMALIZE:

       product.specification

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

                    ✓ Technical Specification

                </div>


                <div>

                    ✓ Specification Table

                </div>


                <div>

                    ✓ Product Images

                </div>

            </div>


            <small>

                Nội dung được lấy từ Website và giữ
                cấu trúc mà nguồn trả về.
                Bạn có thể chỉnh sửa thủ công tại Step 4.

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
   BACK TO STEP 2
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


        console.log("");

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
           ENSURE SPECS STRUCTURE
        ====================================== */

        ensureProductSpecsStructure(

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

            window.currentProduct.product.description

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


        throw new Error(

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


/* =========================================================
   NORMALIZE IMPORTED PRODUCT

   IMPORTANT
   ---------------------------------------------------------
   Không ép Description vào Specs.
   Không ép Specs vào Description.
   Không ép text thành một dòng duy nhất.
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

            specs: createEmptyProductSpecs()

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

            normalizeProductImages(

                importedProduct.images

            );

    }


    /* =========================================
       REMOVE LEGACY
    ========================================== */

    delete normalized.specification;


    return normalized;

}


/* =========================================================
   NORMALIZE PRODUCT DESCRIPTION

   GIỮ CẤU TRÚC DÒNG

   Không:

       .replace(/\s+/g, " ")

   Vì sẽ làm mất:

       - bullet
       - xuống dòng
       - paragraph
       - cấu trúc nguồn
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

        return normalizeStructuredText(

            value

        );

    }


    /* =========================================
       ARRAY
    ========================================== */

    if (

        Array.isArray(value)

    ) {

        return value

            .map(

                item =>

                    normalizeStructuredTextItem(

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

        /* -------------------------------------
           HTML / CONTENT
        -------------------------------------- */

        if (

            typeof value.html ===

            "string"

        ) {

            return normalizeStructuredText(

                value.html

            );

        }


        if (

            typeof value.content ===

            "string"

        ) {

            return normalizeStructuredText(

                value.content

            );

        }


        if (

            typeof value.text ===

            "string"

        ) {

            return normalizeStructuredText(

                value.text

            );

        }


        /* -------------------------------------
           BLOCKS
        -------------------------------------- */

        if (

            Array.isArray(

                value.blocks

            )

        ) {

            return value.blocks

                .map(

                    normalizeStructuredTextItem

                )

                .filter(Boolean)

                .join("\n");

        }


        /* -------------------------------------
           PARAGRAPHS
        -------------------------------------- */

        if (

            Array.isArray(

                value.paragraphs

            )

        ) {

            return value.paragraphs

                .map(

                    normalizeStructuredTextItem

                )

                .filter(Boolean)

                .join("\n");

        }


        /* -------------------------------------
           LIST ITEMS
        -------------------------------------- */

        if (

            Array.isArray(

                value.items

            )

        ) {

            return value.items

                .map(

                    normalizeStructuredTextItem

                )

                .filter(Boolean)

                .join("\n");

        }


        /* -------------------------------------
           LEGACY OBJECT
        -------------------------------------- */

        return normalizeLegacySpecObject(

            value

        );

    }


    return String(

        value

    ).trim();

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

========================================================= */

function normalizeProductSpecs(

    product

) {


    const result =

        createEmptyProductSpecs();


    if (

        !product ||

        typeof product !==

        "object"

    ) {

        return result;

    }


    /* =========================================
       SOURCE SPECS
    ========================================== */

    let sourceSpecs =

        product.specs;


    /* =========================================
       LEGACY FALLBACK

       Chỉ dùng khi không có specs
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
       NEW OBJECT
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

                sourceSpecs.text

                    .map(

                        normalizeStructuredTextItem

                    )

                    .filter(Boolean);

        }


        /* =====================================
           RAW HTML
        ====================================== */

        if (

            typeof sourceSpecs.html ===

            "string"

        ) {

            const parsed =

                parseSpecificationHTML(

                    sourceSpecs.html

                );


            mergeParsedSpecification(

                result,

                parsed

            );

        }


        return result;

    }


    /* =========================================
       ARRAY
    ========================================== */

    if (

        Array.isArray(

            sourceSpecs

        )

    ) {

        sourceSpecs.forEach(

            item => {


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


                    /* -----------------------------
                       HTML TABLE
                    ------------------------------ */

                    if (

                        isHTMLTable(

                            text

                        )

                    ) {

                        const parsedTable =

                            parseHTMLSpecificationTable(

                                text

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


                    /* -----------------------------
                       NORMAL TEXT

                       GIỮ NGUYÊN XUỐNG DÒNG
                    ------------------------------ */

                    const lines =

                        splitStructuredLines(

                            text

                        );


                    result.text.push(

                        ...lines

                    );


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


                    /* -----------------------------
                       TABLE
                    ------------------------------ */

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

                                ...item.text

                                    .map(

                                        normalizeStructuredTextItem

                                    )

                                    .filter(Boolean)

                            );

                        }


                        return;

                    }


                    /* -----------------------------
                       HTML
                    ------------------------------ */

                    if (

                        typeof item.html ===

                        "string"

                    ) {

                        const parsed =

                            parseSpecificationHTML(

                                item.html

                            );


                        mergeParsedSpecification(

                            result,

                            parsed

                        );


                        return;

                    }


                    /* -----------------------------
                       CONTENT
                    ------------------------------ */

                    if (

                        typeof item.content ===

                        "string"

                    ) {

                        result.text.push(

                            ...splitStructuredLines(

                                item.content

                            )

                        );


                        return;

                    }


                    /* -----------------------------
                       TEXT
                    ------------------------------ */

                    if (

                        typeof item.text ===

                        "string"

                    ) {

                        result.text.push(

                            ...splitStructuredLines(

                                item.text

                            )

                        );


                        return;

                    }


                    /* -----------------------------
                       NAME / VALUE
                    ------------------------------ */

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

            }

        );

    }


    return result;

}


/* =========================================================
   NORMALIZE SPECIFICATION TABLE
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

            table.headers

                .map(

                    value =>

                        normalizeCellValue(

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

                                normalizeCellValue(

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


/* =========================================================
   PARSE HTML SPECIFICATION TABLE
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

                "thead th"

            );


        if (

            headerCells.length

        ) {

            result.headers =

                Array.from(

                    headerCells

                ).map(

                    cell =>

                        normalizeCellValue(

                            cell.textContent

                        )

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

                    ).map(

                        cell =>

                            normalizeCellValue(

                                cell.textContent

                            )

                    );


                /* =================================
                   HEADER FROM FIRST ROW
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
                   NORMAL ROW
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


/* =========================================================
   PARSE GENERIC HTML CONTENT

   Dùng khi Engine trả về:

       specs.html

       item.html

   Mục tiêu:

       - table → table
       - li → từng dòng
       - p → từng đoạn
       - div → từng block
========================================================= */

function parseSpecificationHTML(

    html

) {


    const result =

        createEmptyProductSpecs();


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


        /* =========================================
           TABLE
        ========================================== */

        const table =

            doc.querySelector(

                "table"

            );


        if (table) {

            result.table =

                parseHTMLSpecificationTable(

                    html

                );

        }


        /* =========================================
           LIST ITEMS
        ========================================== */

        const listItems =

            Array.from(

                doc.querySelectorAll(

                    "li"

                )

            )

                .map(

                    item =>

                        item.textContent.trim()

                )

                .filter(Boolean);


        /* =========================================
           PARAGRAPHS
        ========================================== */

        const paragraphs =

            Array.from(

                doc.querySelectorAll(

                    "p"

                )

            )

                .map(

                    item =>

                        item.textContent.trim()

                )

                .filter(Boolean);


        /* =========================================
           DIV BLOCKS

           Chỉ dùng nếu không có p/li
        ========================================== */

        let blocks = [];


        if (

            !listItems.length &&

            !paragraphs.length

        ) {

            blocks =

                Array.from(

                    doc.querySelectorAll(

                        "div"

                    )

                )

                    .map(

                        item =>

                            item.textContent.trim()

                    )

                    .filter(Boolean);

        }


        result.text = [

            ...listItems,

            ...paragraphs,

            ...blocks

        ];


        return result;

    }


    catch (error) {

        console.error(

            "SPECIFICATION HTML PARSE ERROR:",

            error

        );


        return result;

    }

}


/* =========================================================
   MERGE PARSED SPECIFICATION
========================================================= */

function mergeParsedSpecification(

    target,

    parsed

) {


    if (

        !target ||

        !parsed

    ) {

        return;

    }


    if (

        parsed.table &&

        (

            parsed.table.headers.length ||

            parsed.table.rows.length

        )

    ) {

        target.table =

            parsed.table;

    }


    if (

        Array.isArray(

            parsed.text

        )

    ) {

        target.text.push(

            ...parsed.text

        );

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

            ? normalizeCellValue(

                item.name

            )

            : "";


    const value =

        item.value !== undefined

            ? normalizeCellValue(

                item.value

            )

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
   NORMALIZE STRUCTURED TEXT ITEM
========================================================= */

function normalizeStructuredTextItem(

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

        return normalizeStructuredText(

            value

        );

    }


    if (

        typeof value ===

        "object"

    ) {

        if (

            typeof value.text ===

            "string"

        ) {

            return normalizeStructuredText(

                value.text

            );

        }


        if (

            typeof value.content ===

            "string"

        ) {

            return normalizeStructuredText(

                value.content

            );

        }


        return normalizeLegacySpecObject(

            value

        );

    }


    return String(

        value

    ).trim();

}


/* =========================================================
   NORMALIZE STRUCTURED TEXT

   GIỮ CẤU TRÚC DÒNG

   Không gom toàn bộ thành một dòng.
========================================================= */

function normalizeStructuredText(

    value

) {


    if (

        typeof value !==

        "string"

    ) {

        return "";

    }


    return value

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

        .filter(

            line =>

                line !== ""

        )

        .join("\n")

        .trim();

}


/* =========================================================
   SPLIT STRUCTURED LINES

   Xử lý:

   - xuống dòng
   - bullet
   - danh sách
   - paragraph

   Ví dụ:

   • Độ chính xác: 1/15000
   • Có chức năng đếm
   • Có chức năng in

   Kết quả:

   [

       "• Độ chính xác: 1/15000",

       "• Có chức năng đếm",

       "• Có chức năng in"

   ]
========================================================= */

function splitStructuredLines(

    value

) {


    if (

        typeof value !==

        "string"

    ) {

        return [];

    }


    const normalized =

        value

            .replace(

                /\r\n/g,

                "\n"

            )

            .replace(

                /\r/g,

                "\n"

            );


    const lines =

        normalized

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

            .filter(Boolean);


    return lines;

}


/* =========================================================
   NORMALIZE CELL VALUE
========================================================= */

function normalizeCellValue(

    value

) {


    if (

        value === null ||

        value === undefined

    ) {

        return "";

    }


    return String(

        value

    )

        .replace(

            /\r\n/g,

            "\n"

        )

        .replace(

            /\r/g,

            "\n"

        )

        .trim();

}


/* =========================================================
   CREATE EMPTY SPECS
========================================================= */

function createEmptyProductSpecs() {

    return {

        table: {

            headers: [],

            rows: []

        },

        text: []

    };

}


/* =========================================================
   ENSURE SPECS STRUCTURE
========================================================= */

function ensureProductSpecsStructure(

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

        Array.isArray(

            product.specs

        )

    ) {

        product.specs =

            createEmptyProductSpecs();

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
   NORMALIZE PRODUCT IMAGES
========================================================= */

function normalizeProductImages(

    images

) {


    if (

        !Array.isArray(images)

    ) {

        return [];

    }


    return images

        .map(

            image => {


                if (

                    typeof image ===

                    "string"

                ) {

                    return image.trim();

                }


                if (

                    image &&

                    typeof image ===

                    "object"

                ) {

                    return {

                        ...image

                    };

                }


                return "";

            }

        )

        .filter(

            image =>

                image !== ""

        );

}


/* =========================================================
   MERGE IMPORTED PRODUCT
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


            <div

                style="white-space:pre-line;"

            >

                ${escapeContentImportHTML(

                    description

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

            existingSource.type ||

            "website",


        url:

            document.getElementById(

                "contentSourceUrl"

            )?.value.trim() ||

            existingSource.url ||

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