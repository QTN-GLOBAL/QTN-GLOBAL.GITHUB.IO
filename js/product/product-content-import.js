/* =========================================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   PURPOSE
   ---------------------------------------------------------
   - Nhập URL sản phẩm
   - Gọi ProductImportEngine
   - Nhận dữ liệu từ Backend / Free Parser / AI
   - Chuẩn hóa dữ liệu về cấu trúc products.js
   - Chuẩn hóa:

       product.description

       product.specs = {

           table: {

               headers: [],

               rows: []

           },

           text: []

       }

   DATA FLOW

   ProductImportEngine
          ↓
   normalizeImportedProduct()
          ↓
   currentProduct.product
          ↓
   currentProduct.product.description
          ↓
   currentProduct.product.specs
          ↓
   product-specification.js


   IMPORTANT

   CHỈ SỬ DỤNG:

       product.specs

   KHÔNG SỬ DỤNG:

       product.specification

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

        return;

    }


    body.innerHTML = `

    <div class="product-content-import">

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

                Nhập URL trang sản phẩm cần AI
                đọc và phân tích.

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

                    ✓ Specification Table

                </div>


                <div>

                    ✓ Specification Text

                </div>


                <div>

                    ✓ Product Images

                </div>

            </div>


            <small>

                AI sẽ đọc nội dung từ Website
                và chuyển dữ liệu sang bước
                xử lý sản phẩm tiếp theo.

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

    renderProductImages();

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

        typeof saveProductDraft === "function"

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

        if (

            typeof ProductImportEngine ===

            "undefined"

        ) {

            throw new Error(

                "ProductImportEngine chưa được tải."

            );

        }


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
           GET IMPORTED PRODUCT
        ====================================== */

        const importedProduct =

            extractImportedProduct(

                result

            );


        /* =====================================
           CURRENT PRODUCT
        ====================================== */

        const current =

            window.currentProduct ||

            {};


        /* =====================================
           OLD PRODUCT

           Step 1 luôn ưu tiên:

           business
           category
           brand
           origin
           folder
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
           DEBUG STEP 1
        ====================================== */

        console.log("");

        console.log(

            "========== STEP 1 PRODUCT =========="

        );

        console.log(

            oldProduct

        );

        console.log(

            "===================================="

        );


        /* =====================================
           DEBUG RAW IMPORT
        ====================================== */

        console.log("");

        console.log(

            "========== RAW IMPORT PRODUCT =========="

        );

        console.log(

            importedProduct

        );

        console.log(

            "========================================="

        );


        /* =====================================
           NORMALIZE
        ====================================== */

        const normalizedProduct =

            normalizeImportedProduct(

                importedProduct

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

           Chỉ sử dụng:

               specs

           Không sử dụng:

               specification
        ====================================== */

        delete mergedProduct.specification;


        /* =====================================
           SAVE
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

            "========== PRODUCT DESCRIPTION =========="

        );

        console.log(

            window.currentProduct.product.description

        );

        console.log(

            "========================================="

        );


        console.log("");

        console.log(

            "========== PRODUCT SPECS =========="

        );

        console.log(

            window.currentProduct.product.specs

        );

        console.log(

            "==================================="

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
           MARK IMPORT
        ====================================== */

        markProductContentImported();


        saveProductContentImport();


        /* =====================================
           SAVE DRAFT
        ====================================== */

        if (

            typeof saveProductDraft === "function"

        ) {

            saveProductDraft();

        }


        /* =====================================
           STEP 4

           Step 4 đọc:

               product.description

               product.specs.table

               product.specs.text
        ====================================== */

        renderProductSpecification();

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

   Hỗ trợ:

   result.product

   hoặc

   result.result.product
========================================================= */

function extractImportedProduct(

    result

) {

    if (

        result &&

        result.product &&

        typeof result.product === "object"

    ) {

        return result.product;

    }


    if (

        result &&

        result.result &&

        result.result.product &&

        typeof result.result.product === "object"

    ) {

        return result.result.product;

    }


    return {};

}


/* =========================================================
   NORMALIZE IMPORTED PRODUCT

   OUTPUT:

   {

       name,

       description,

       specs: {

           table: {

               headers: [],

               rows: []

           },

           text: []

       }

   }

========================================================= */

function normalizeImportedProduct(

    importedProduct

) {

    if (

        !importedProduct ||

        typeof importedProduct !== "object"

    ) {

        return {};

    }


    const normalized = {

        ...importedProduct

    };


    /* =========================================
       DESCRIPTION
    ========================================== */

    if (

        typeof importedProduct.description ===

        "string"

    ) {

        normalized.description =

            importedProduct.description.trim();

    }


    /* =========================================
       SPECS

       Luôn chuyển về:

       specs.table

       specs.text
    ========================================== */

    normalized.specs =

        normalizeProductSpecs(

            importedProduct

        );


    /* =========================================
       REMOVE LEGACY FIELD
    ========================================== */

    delete normalized.specification;


    return normalized;

}


/* =========================================================
   NORMALIZE PRODUCT SPECS
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


    /* =========================================
       SOURCE SPECS
    ========================================== */

    let sourceSpecs =

        product?.specs;


    /* =========================================
       LEGACY COMPATIBILITY

       Chỉ đọc specification
       nếu specs không tồn tại.

       Sau đó chuyển toàn bộ
       về specs.
    ========================================== */

    if (

        !sourceSpecs &&

        Array.isArray(

            product?.specification

        )

    ) {

        sourceSpecs =

            product.specification;

    }


    /* =========================================
       CASE 1

       specs đã là cấu trúc mới

       {

           table: {},

           text: []

       }
    ========================================== */

    if (

        sourceSpecs &&

        typeof sourceSpecs === "object" &&

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

                        normalizeSpecText

                    )

                    .filter(Boolean);

        }


        return result;

    }


    /* =========================================
       CASE 2

       specs là ARRAY

       Có thể chứa:

       HTML table

       Object

       String
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

                    typeof item === "string" &&

                    isHTMLTable(item)

                ) {

                    const parsedTable =

                        parseHTMLSpecificationTable(

                            item

                        );


                    if (

                        parsedTable.headers.length

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

                    typeof item === "object"

                ) {

                    const converted =

                        normalizeLegacySpecObject(

                            item

                        );


                    if (

                        converted

                    ) {

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

                    typeof item === "string"

                ) {

                    const text =

                        item.trim();


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

        typeof table !== "object"

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

                        String(value ?? "")

                            .trim()

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

            table.rows.map(

                row => {

                    if (

                        Array.isArray(row)

                    ) {

                        return row.map(

                            value =>

                                String(

                                    value ?? ""

                                ).trim()

                        );

                    }


                    return [];

                }

            );

    }


    return normalized;

}


/* =========================================================
   PARSE HTML SPECIFICATION TABLE

   Chuyển:

       <table>

   thành:

       {

           headers: [],

           rows: []

       }

========================================================= */

function parseHTMLSpecificationTable(

    html

) {

    const result = {

        headers: [],

        rows: []

    };


    if (

        typeof html !== "string" ||

        !html.trim()

    ) {

        return result;

    }


    const parser =

        new DOMParser();


    const doc =

        parser.parseFromString(

            html,

            "text/html"

        );


    const table =

        doc.querySelector("table");


    if (!table) {

        return result;

    }


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

                    cell.textContent

                        .trim()

            );

    }


    const rows =

        table.querySelectorAll(

            "tr"

        );


    Array.from(rows).forEach(

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

                        cell.textContent

                            .replace(

                                /\s+/g,

                                " "

                            )

                            .trim()

                );


            /* =================================
               Nếu chưa có header
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


            result.rows.push(

                values

            );

        }

    );


    return result;

}


/* =========================================================
   CHECK HTML TABLE
========================================================= */

function isHTMLTable(

    value

) {

    return (

        typeof value === "string" &&

        /<table[\s>]/i.test(value)

    );

}


/* =========================================================
   NORMALIZE LEGACY OBJECT

   Ví dụ:

   {

       name: "Hóa đơn in",

       value: "Tiếng Việt..."

   }

   Chuyển thành:

       "Hóa đơn in: Tiếng Việt..."
========================================================= */

function normalizeLegacySpecObject(

    item

) {

    if (

        !item ||

        typeof item !== "object"

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

        return `${name}: ${value}`;

    }


    return (

        name ||

        value ||

        ""

    );

}


/* =========================================================
   NORMALIZE TEXT
========================================================= */

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

        typeof value === "string"

    ) {

        return value.trim();

    }


    if (

        typeof value === "object"

    ) {

        return normalizeLegacySpecObject(

            value

        );

    }


    return String(

        value

    ).trim();

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

            typeof value === "string"

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

       Luôn lưu cấu trúc:

       specs.table

       specs.text
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

                            ...importedProduct.specs

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

                                row => [

                                    ...(

                                        Array.isArray(row)

                                            ? row

                                            : []

                                    )

                                ]

                            )

                        : []

            },


            text:

                Array.isArray(

                    importedProduct.specs.text

                )

                    ? [

                        ...importedProduct.specs.text

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

            ${escapeContentImportHTML(description)}

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

                specs: true

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