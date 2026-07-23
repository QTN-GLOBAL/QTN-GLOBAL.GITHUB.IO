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
   - Import Product Name
   - Import Product Description
   - Import Technical Specification
   - Import Product Images nếu Backend trả về
   - Giữ cấu trúc nội dung nguồn tốt nhất có thể
   - Không ép Specification vào cột cố định
   - Không tự tạo bảng Specification
   - Chuyển dữ liệu sang Step 4 để chỉnh sửa thủ công


   IMPORTANT
   ---------------------------------------------------------
   STEP 3 KHÔNG TẠO CÁC CỘT CỐ ĐỊNH:

       Mức cân
       Bước nhảy
       Đĩa cân inox
       Kích thước cân
       Đơn vị cân

   Nếu nguồn không có bảng:

       specs.table.headers = []

       specs.table.rows = []

   Nếu nguồn có bảng:

       Giữ lại headers
       Giữ lại rows

   Nếu nguồn có danh sách / bullet:

       Mỗi item = một dòng riêng

   Nếu nguồn có đoạn văn:

       Giữ từng đoạn riêng

   Nếu nguồn viết liền:

       Giữ nội dung liền


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
   ---------------------------------------------------------

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

                        ✓ Product Images

                    </div>

                </div>


                <small>

                    Nội dung sẽ được giữ theo cấu trúc
                    của trang nguồn tốt nhất có thể.
                    Bạn có thể chỉnh sửa thủ công
                    tại Step 4.

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

            "⏳ Đang đọc dữ liệu từ Website...";

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


        console.log(

            "========== IMPORT RESULT =========="

        );

        console.log(result);

        console.log(

            "==================================="

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

            window.currentProduct || {};


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
           REMOVE LEGACY FIELD
        ====================================== */

        delete mergedProduct.specification;


        /* =====================================
           ENSURE SPECS STRUCTURE

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

           CHỈ RỖNG NẾU NGUỒN KHÔNG CÓ BẢNG
        ====================================== */

        if (

            !mergedProduct.specs.table ||

            typeof mergedProduct.specs.table !==
            "object"

        ) {

            mergedProduct.specs.table = {

                headers: [],

                rows: []

            };

        }


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

            window.currentProduct.product
                .description

        );

        console.log(

            "================================="

        );


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

            "renderProductSpecification chưa được tải."

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

        !Array.isArray(

            result.data

        )

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

        };

    }


    const normalized = {

        ...importedProduct

    };


    /* =========================================
       NAME
    ========================================== */

    normalized.name =

        normalizeImportedValue(

            importedProduct.name

        );


    /* =========================================
       DESCRIPTION

       Giữ cấu trúc đoạn văn / danh sách
    ========================================== */

    normalized.description =

        normalizeProductDescription(

            importedProduct.description

        );


    /* =========================================
       SPECS

       Giữ table nếu có.
       Giữ text/list nếu có.
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
       REMOVE LEGACY
    ========================================== */

    delete normalized.specification;


    return normalized;

}


/* =========================================================
   NORMALIZE SIMPLE VALUE
========================================================= */

function normalizeImportedValue(

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


    return String(

        value

    ).trim();

}


/* =========================================================
   NORMALIZE PRODUCT DESCRIPTION

   MỤC TIÊU:

   - String → giữ nguyên
   - Array → mỗi phần tử thành một đoạn
   - HTML → giữ cấu trúc cơ bản
   - Object → chuyển thành text


   KHÔNG:

   - Gộp tất cả thành một dòng
   - Ép vào Specification
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

        return normalizeStructuredHTML(

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

            .filter(Boolean)

            .join("\n\n");

    }


    /* =========================================
       OBJECT
    ========================================== */

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

    ).trim();

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

        return normalizeStructuredHTML(

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

            return normalizeDescriptionItem(

                item.text

            );

        }


        return normalizeLegacySpecObject(

            item

        );

    }


    return String(

        item

    ).trim();

}


/* =========================================================
   NORMALIZE STRUCTURED HTML

   Giữ:

   <p>
   <div>
   <br>
   <li>

   Bullet/list:

   mỗi item một dòng.

   Không biến toàn bộ thành một dòng.
========================================================= */

function normalizeStructuredHTML(

    value

) {

    if (

        typeof value !==
        "string"

    ) {

        return "";

    }


    const html =

        value.trim();


    if (!html) {

        return "";

    }


    /* =========================================
       KHÔNG PHẢI HTML
    ========================================== */

    if (

        !/<[a-z][\s\S]*>/i.test(

            html

        )

    ) {

        return html;

    }


    try {

        const parser =

            new DOMParser();


        const doc =

            parser.parseFromString(

                html,

                "text/html"

            );


        const output = [];


        /* =====================================
           LIST ITEMS
        ====================================== */

        const listItems =

            doc.querySelectorAll(

                "li"

            );


        if (

            listItems.length

        ) {

            Array.from(

                listItems

            ).forEach(

                item => {

                    const text =

                        item.textContent

                            .replace(

                                /\s+/g,

                                " "

                            )

                            .trim();


                    if (text) {

                        output.push(

                            text

                        );

                    }

                }

            );

        }


        /* =====================================
           BLOCK ELEMENTS

           Nếu không có LI
        ====================================== */

        if (

            !listItems.length

        ) {

            const blocks =

                doc.querySelectorAll(

                    "p, div, section, article, h1, h2, h3, h4, h5, h6, br"

                );


            if (

                blocks.length

            ) {

                Array.from(

                    blocks

                ).forEach(

                    block => {

                        const text =

                            block.textContent

                                .replace(

                                    /\s+/g,

                                    " "

                                )

                                .trim();


                        if (text) {

                            output.push(

                                text

                            );

                        }

                    }

                );

            }

        }


        /* =====================================
           FALLBACK
        ====================================== */

        if (

            !output.length

        ) {

            return doc.body.textContent

                .replace(

                    /\s+/g,

                    " "

                )

                .trim();

        }


        return output

            .filter(Boolean)

            .join("\n");

    }


    catch (error) {

        console.warn(

            "DESCRIPTION HTML NORMALIZE ERROR:",

            error

        );


        return html;

    }

}


/* =========================================================
   NORMALIZE PRODUCT SPECS

   KHÔNG TẠO CỘT CỐ ĐỊNH

   Nếu source có table:
       giữ table

   Nếu source có text/list:
       giữ text

   Nếu source chỉ có specification legacy:
       chuyển sang cấu trúc mới
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
       SOURCE SPECS
    ========================================== */

    let sourceSpecs =

        product.specs;


    /* =========================================
       LEGACY FALLBACK

       Chỉ dùng nếu không có specs
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
       OBJECT
    ========================================== */

    if (

        sourceSpecs &&

        typeof sourceSpecs ===
        "object" &&

        !Array.isArray(

            sourceSpecs

        )

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

            sourceSpecs.text.forEach(

                item => {

                    appendStructuredSpecText(

                        result.text,

                        item

                    );

                }

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


                /* ================================
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


                /* ================================
                   HTML LIST / TEXT
                ================================= */

                if (

                    typeof item ===
                    "string"

                ) {

                    if (

                        /<(ul|ol)[\s>]/i.test(

                            item

                        )

                    ) {

                        const lines =

                            parseHTMLList(

                                item

                            );


                        result.text.push(

                            ...lines

                        );

                        return;

                    }


                    if (

                        /<(p|div|br)[\s>]/i.test(

                            item

                        )

                    ) {

                        const lines =

                            parseHTMLTextBlocks(

                                item

                            );


                        result.text.push(

                            ...lines

                        );

                        return;

                    }


                    const text =

                        item.trim();


                    if (text) {

                        result.text.push(

                            text

                        );

                    }


                    return;

                }


                /* ================================
                   OBJECT
                ================================= */

                if (

                    item &&

                    typeof item ===
                    "object"

                ) {


                    /* ============================
                       OBJECT TABLE
                    ============================= */

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

                            item.text.forEach(

                                textItem => {

                                    appendStructuredSpecText(

                                        result.text,

                                        textItem

                                    );

                                }

                            );

                        }


                        return;

                    }


                    /* ============================
                       OBJECT TEXT
                    ============================= */

                    if (

                        item.text !== undefined

                    ) {

                        appendStructuredSpecText(

                            result.text,

                            item.text

                        );


                        return;

                    }


                    /* ============================
                       LEGACY NAME / VALUE
                    ============================= */

                    const converted =

                        normalizeLegacySpecObject(

                            item

                        );


                    if (converted) {

                        result.text.push(

                            converted

                        );

                    }

                }

            }

        );

    }


    /* =========================================
       DIRECT STRING

       Nếu backend trả:

       specs: "abc"

       thì giữ thành một item.
    ========================================== */

    if (

        typeof sourceSpecs ===
        "string"

    ) {

        const text =

            normalizeStructuredHTML(

                sourceSpecs

            );


        if (text) {

            result.text.push(

                text

            );

        }

    }


    return result;

}


/* =========================================================
   APPEND STRUCTURED SPEC TEXT
========================================================= */

function appendStructuredSpecText(

    target,

    value

) {

    if (

        !Array.isArray(target)

    ) {

        return;

    }


    if (

        value === null ||

        value === undefined

    ) {

        return;

    }


    if (

        typeof value ===
        "string"

    ) {

        const text =

            value.trim();


        if (!text) {

            return;

        }


        if (

            /<(ul|ol)[\s>]/i.test(

                text

            )

        ) {

            target.push(

                ...parseHTMLList(

                    text

                )

            );


            return;

        }


        if (

            /<(p|div|br)[\s>]/i.test(

                text

            )

        ) {

            target.push(

                ...parseHTMLTextBlocks(

                    text

                )

            );


            return;

        }


        target.push(

            text

        );


        return;

    }


    if (

        Array.isArray(value)

    ) {

        value.forEach(

            item => {

                appendStructuredSpecText(

                    target,

                    item

                );

            }

        );


        return;

    }


    if (

        typeof value ===
        "object"

    ) {

        const converted =

            normalizeLegacySpecObject(

                value

            );


        if (converted) {

            target.push(

                converted

            );

        }

    }

}


/* =========================================================
   PARSE HTML LIST
========================================================= */

function parseHTMLList(

    html

) {

    const result = [];


    if (

        typeof html !==
        "string"

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


        const items =

            doc.querySelectorAll(

                "li"

            );


        Array.from(

            items

        ).forEach(

            item => {

                const text =

                    item.textContent

                        .replace(

                            /\s+/g,

                            " "

                        )

                        .trim();


                if (text) {

                    result.push(

                        text

                    );

                }

            }

        );

    }


    catch (error) {

        console.warn(

            "HTML LIST PARSE ERROR:",

            error

        );

    }


    return result;

}


/* =========================================================
   PARSE HTML TEXT BLOCKS
========================================================= */

function parseHTMLTextBlocks(

    html

) {

    const result = [];


    if (

        typeof html !==
        "string"

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


        const blocks =

            doc.querySelectorAll(

                "p, div, section, article, h1, h2, h3, h4, h5, h6"

            );


        Array.from(

            blocks

        ).forEach(

            block => {

                const text =

                    block.textContent

                        .replace(

                            /\s+/g,

                            " "

                        )

                        .trim();


                if (text) {

                    result.push(

                        text

                    );

                }

            }

        );


        if (

            !result.length

        ) {

            const text =

                doc.body.textContent

                    .replace(

                        /\s+/g,

                        " "

                    )

                    .trim();


            if (text) {

                result.push(

                    text

                );

            }

        }

    }


    catch (error) {

        console.warn(

            "HTML TEXT PARSE ERROR:",

            error

        );

    }


    return result;

}


/* =========================================================
   NORMALIZE SPECIFICATION TABLE

   CHỈ GIỮ TABLE THỰC SỰ

   KHÔNG TẠO HEADER MẶC ĐỊNH
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


    if (

        typeof value ===
        "string"

    ) {

        return value.trim();

    }


    return String(

        value

    ).trim();

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

                        normalizeTableCell(

                            cell.textContent

                        )

                ).filter(Boolean);

        }


        /* =====================================
           ROWS
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

                            normalizeTableCell(

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

                        values.filter(Boolean);


                    return;

                }


                /* =================================
                   DATA ROW
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

                    return (

                        image.url ||

                        image.src ||

                        image.image ||

                        ""

                    ).trim();

                }


                return "";

            }

        )

        .filter(Boolean);

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

                                            ...

                                            row

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
       REMOVE LEGACY
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

            ${escapeContentImportHTML(

                name

            )}

        </div>


        <div>

            <strong>

                Product Description:

            </strong>

            <div style="white-space:pre-line;">

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