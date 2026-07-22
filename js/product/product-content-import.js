/* =========================================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   PURPOSE
   ---------------------------------------------------------
   - Nhập URL sản phẩm
   - Gọi ProductImportEngine
   - Nhận dữ liệu từ Backend / Free Parser / AI
   - Giữ nguyên cấu trúc Product Description
   - Giữ nguyên cấu trúc Technical Specification
   - Import Product Images nếu Engine trả về
   - Chuyển dữ liệu sang Step 4

   IMPORTANT
   ---------------------------------------------------------
   STEP 3 KHÔNG ÉP NỘI DUNG NGUỒN VÀO MỘT CẤU TRÚC CỨNG.

   DESCRIPTION:
   - Giữ xuống dòng
   - Giữ bullet / danh sách
   - Giữ đoạn văn
   - Không tự động gộp tất cả thành một dòng

   TECHNICAL SPECIFICATION:
   - HTML Table → specs.table
   - Array / danh sách → specs.text
   - Mỗi dòng / mỗi item được giữ riêng

   IMAGES:
   - Nếu ProductImportEngine trả về images
     thì lưu vào product.images

   FINAL PRODUCT STRUCTURE
   ---------------------------------------------------------

   product: {

       name: "",

       description: "",

       specs: {

           table: {

               headers: [],

               rows: []

           },

           text: []

       },

       images: []

   }

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

                    Nội dung được lấy từ Website và giữ
                    cấu trúc phù hợp với dữ liệu nguồn.
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
           DEBUG OLD PRODUCT
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
           NORMALIZE
        ====================================== */

        const normalizedProduct =

            normalizeImportedProduct(

                importedProduct

            );


        /* =====================================
           DEBUG NORMALIZED PRODUCT
        ====================================== */

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

           REMOVE LEGACY FIELD
        ====================================== */

        delete mergedProduct.specification;


        /* =====================================
           ENSURE SPECS
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


        console.log("");

        console.log(

            "========== PRODUCT IMAGES =========="

        );

        console.log(

            window.currentProduct.product

                .images

        );

        console.log(

            "===================================="

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


        alert(

            "Import thành công nhưng chưa tìm thấy hàm renderProductSpecification()."

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

   Không phá cấu trúc Description.

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

            },

            images: []

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

    normalized.images =

        normalizeProductImages(

            importedProduct.images

        );


    /* =========================================
       REMOVE LEGACY FIELD
    ========================================== */

    delete normalized.specification;


    return normalized;

}


/* =========================================================
   NORMALIZE PRODUCT DESCRIPTION

   IMPORTANT

   Không dùng:

       /\s+/g

   Vì sẽ làm mất xuống dòng.

   Description phải giữ:

   - xuống dòng
   - bullet
   - đoạn văn
   - khoảng cách cấu trúc cơ bản

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

        return normalizeDescriptionString(

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

                    normalizeDescriptionItem(

                        item

                    )

            )

            .filter(

                item =>

                    item !== ""

            )

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


    return String(

        value

    ).trim();

}


/* =========================================================
   NORMALIZE DESCRIPTION STRING

   Giữ cấu trúc dòng.

========================================================= */

function normalizeDescriptionString(

    value

) {


    if (

        typeof value !==

        "string"

    ) {

        return "";

    }


    let text =

        value

            .replace(

                /\r\n/g,

                "\n"

            )

            .replace(

                /\r/g,

                "\n"

            );


    /* =========================================
       Nếu là HTML

       Chuyển các block element thành xuống dòng
       nhưng không gộp toàn bộ nội dung.
    ========================================== */

    if (

        /<\/?(p|div|br|li|ul|ol|h[1-6])[\s>]/i.test(

            text

        )

    ) {

        text =

            htmlToStructuredText(

                text

            );

    }


    /* =========================================
       Chuẩn hóa khoảng trắng ngang

       KHÔNG động vào newline.
    ========================================== */

    text =

        text.replace(

            /[ \t]+/g,

            " "

        );


    /* =========================================
       Không để quá nhiều dòng trống liên tiếp
       nhưng vẫn giữ cấu trúc đoạn.
    ========================================== */

    text =

        text.replace(

            /\n[ \t]+/g,

            "\n"

        );


    text =

        text.replace(

            /\n{3,}/g,

            "\n\n"

        );


    return text.trim();

}


/* =========================================================
   HTML TO STRUCTURED TEXT

   Mục tiêu:

   <p>Đoạn 1</p>
   <p>Đoạn 2</p>

   →

   Đoạn 1

   Đoạn 2


   <li>A</li>
   <li>B</li>

   →

   • A
   • B

========================================================= */

function htmlToStructuredText(

    html

) {


    if (

        typeof html !==

        "string"

    ) {

        return "";

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
           REMOVE NON-CONTENT
        ========================================== */

        doc

            .querySelectorAll(

                "script, style, noscript"

            )

            .forEach(

                element =>

                    element.remove()

            );


        /* =========================================
           PROCESS LIST ITEMS
        ========================================== */

        doc

            .querySelectorAll(

                "li"

            )

            .forEach(

                li => {

                    const text =

                        li.textContent

                            .replace(

                                /[ \t]+/g,

                                " "

                            )

                            .trim();


                    if (text) {

                        li.replaceWith(

                            doc.createTextNode(

                                "• " +

                                text +

                                "\n"

                            )

                        );

                    }

                }

            );


        /* =========================================
           BLOCK ELEMENTS
        ========================================== */

        doc

            .querySelectorAll(

                "p, div, section, article, h1, h2, h3, h4, h5, h6, tr"

            )

            .forEach(

                element => {

                    element.insertAdjacentText(

                        "beforebegin",

                        "\n"

                    );


                    element.insertAdjacentText(

                        "afterend",

                        "\n"

                    );

                }

            );


        /* =========================================
           BR
        ========================================== */

        doc

            .querySelectorAll(

                "br"

            )

            .forEach(

                br => {

                    br.replaceWith(

                        doc.createTextNode(

                            "\n"

                        )

                    );

                }

            );


        let text =

            doc.body

                .textContent ||

            "";


        text =

            text

                .replace(

                    /\r\n/g,

                    "\n"

                )

                .replace(

                    /\r/g,

                    "\n"

                );


        text =

            text.replace(

                /[ \t]+/g,

                " "

            );


        text =

            text.replace(

                /\n[ \t]+/g,

                "\n"

            );


        text =

            text.replace(

                /\n{3,}/g,

                "\n\n"

            );


        return text.trim();

    }


    catch (error) {

        console.error(

            "DESCRIPTION HTML PARSE ERROR:",

            error

        );


        return html.trim();

    }

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

        return normalizeDescriptionString(

            item

        );

    }


    if (

        typeof item ===

        "object"

    ) {

        return normalizeDescriptionObject(

            item

        );

    }


    return String(

        item

    ).trim();

}


/* =========================================================
   NORMALIZE DESCRIPTION OBJECT
========================================================= */

function normalizeDescriptionObject(

    item

) {


    if (

        !item ||

        typeof item !==

        "object"

    ) {

        return "";

    }


    /* =========================================
       HTML CONTENT
    ========================================== */

    if (

        typeof item.html ===

        "string"

    ) {

        return normalizeDescriptionString(

            item.html

        );

    }


    if (

        typeof item.content ===

        "string"

    ) {

        return normalizeDescriptionString(

            item.content

        );

    }


    if (

        typeof item.text ===

        "string"

    ) {

        return normalizeDescriptionString(

            item.text

        );

    }


    if (

        typeof item.description ===

        "string"

    ) {

        return normalizeDescriptionString(

            item.description

        );

    }


    /* =========================================
       NAME + VALUE

       Chỉ dùng khi dữ liệu thực sự có dạng này.
    ========================================== */

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


        /* =====================================
           DESCRIPTION-LIKE FALLBACK

           Chỉ đọc các field rõ ràng thuộc spec.
        ====================================== */

        if (

            !result.text.length &&

            Array.isArray(

                sourceSpecs.items

            )

        ) {

            result.text =

                normalizeSpecificationTextArray(

                    sourceSpecs.items

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

                                ...

                                normalizeSpecificationTextArray(

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

                   Không gộp newline.
                ================================= */

                if (

                    typeof item ===

                    "string"

                ) {

                    const text =

                        normalizeSpecText(

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

   Giữ mỗi item riêng.

========================================================= */

function normalizeSpecificationTextArray(

    values

) {


    if (

        !Array.isArray(values)

    ) {

        return [];

    }


    const result = [];


    values.forEach(

        item => {


            if (

                item === null ||

                item === undefined

            ) {

                return;

            }


            if (

                typeof item ===

                "string"

            ) {

                const text =

                    normalizeSpecText(

                        item

                    );


                if (text) {

                    result.push(

                        text

                    );

                }


                return;

            }


            if (

                typeof item ===

                "object"

            ) {

                const converted =

                    normalizeLegacySpecObject(

                        item

                    );


                if (converted) {

                    result.push(

                        converted

                    );

                }

            }

        }

    );


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


/* =========================================================
   NORMALIZE TABLE CELL

   Không phá newline nếu cell có nhiều dòng.

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

        .replace(

            /[ \t]+/g,

            " "

        )

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

                                normalizeTableCell(

                                    cell.textContent

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

                        values

                            .filter(Boolean);

                    return;

                }


                /* =================================
                   NORMAL DATA ROW
                ================================= */

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


/* =========================================================
   NORMALIZE SPEC TEXT

   IMPORTANT

   Không dùng:

       /\s+/g

   Vì có thể phá xuống dòng.

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

        typeof value ===

        "string"

    ) {

        return normalizeDescriptionString(

            value

        );

    }


    if (

        typeof value ===

        "object"

    ) {

        return normalizeLegacySpecObject(

            value

        );

    }


    return String(

        value

    )

        .trim();

}


/* =========================================================
   NORMALIZE PRODUCT IMAGES

   Hỗ trợ:

   images: []

   image: ""

   object:

   {

       url: "..."

   }

========================================================= */

function normalizeProductImages(

    images

) {


    if (

        images === null ||

        images === undefined

    ) {

        return [];

    }


    let source =

        images;


    if (

        !Array.isArray(source)

    ) {

        source = [

            source

        ];

    }


    const result = [];


    source.forEach(

        item => {


            if (

                typeof item ===

                "string"

            ) {

                const url =

                    item.trim();


                if (url) {

                    result.push(

                        url

                    );

                }


                return;

            }


            if (

                item &&

                typeof item ===

                "object"

            ) {


                const url =

                    item.url ||

                    item.src ||

                    item.image ||

                    item.imageUrl ||

                    item.original ||

                    "";


                if (

                    typeof url ===

                    "string" &&

                    url.trim()

                ) {

                    result.push(

                        {

                            ...item,

                            url:

                                url.trim()

                        }

                    );

                }

            }

        }

    );


    return result;

}


/* =========================================================
   ENSURE PRODUCT SPECS STRUCTURE
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

       Giữ nguyên cấu trúc đã normalize.
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

            [

                ...

                importedProduct.images

            ];

    }


    /* =========================================
       FINAL CLEAN
    ========================================== */

    delete merged.specification;


    ensureProductSpecsStructure(

        merged

    );


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


        <div style="margin-top:10px;">

            <strong>

                Product Description:

            </strong>


            <div

                style="

                    white-space:pre-wrap;

                    margin-top:6px;

                "

            >

                ${escapeContentImportHTML(

                    description

                )}

            </div>

        </div>


        <div style="margin-top:10px;">

            <strong>

                Specification Table:

            </strong>

            ${headers.length}

            column(s) /

            ${rows.length}

            row(s)

        </div>


        <div style="margin-top:10px;">

            <strong>

                Specification Text:

            </strong>

            ${text.length}

            item(s)

        </div>


        <div style="margin-top:10px;">

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