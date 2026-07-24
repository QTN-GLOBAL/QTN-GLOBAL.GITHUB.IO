/* =========================================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   FILE
   ---------------------------------------------------------
   product-content-import.js

   PURPOSE
   ---------------------------------------------------------
   - Nhập URL sản phẩm
   - Gọi ProductImportEngine
   - Nhận dữ liệu từ Backend / Free Parser
   - Import:
       Product Name
       Product Description
       Technical Specification
       Product Images
   - Giữ cấu trúc dữ liệu nguồn tốt nhất có thể
   - Không tạo Specification cố định
   - Không tự tạo cột:
       Mức cân
       Bước nhảy
       Đĩa cân inox
       Kích thước cân
       Đơn vị cân
   - Chuyển dữ liệu sang Step 4

   DATA FLOW
   ---------------------------------------------------------

   Step 3
       ↓
   Source URL
       ↓
   ProductImportEngine.import()
       ↓
   Imported Product
       ↓
   normalizeImportedContent()
       ↓
   window.currentProduct.product
       ↓
   Step 4

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


    const session =

        typeof ensureProductSession ===
        "function"

            ? ensureProductSession()

            : window.currentProduct;


    const source =

        session?.source ||

        {};


    body.innerHTML = `

        <div class="product-content-import">

            <h3 class="product-step-title">

                Step 3 / 6 - AI Content Import

            </h3>


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


            <div class="form-group">

                <label>

                    Source URL

                </label>


                <input

                    id="contentSourceUrl"

                    type="text"

                    placeholder="https://www.excell.vn/..."

                    value="${escapeProductImportHTML(

                        source.url || ""

                    )}"

                >


                <small>

                    Nhập URL trang sản phẩm cần đọc
                    và phân tích.

                </small>

            </div>


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

                    Nội dung sẽ được lấy từ Website
                    và giữ cấu trúc tốt nhất có thể.
                    Bạn có thể kiểm tra và chỉnh sửa
                    tại Step 4.

                </small>

            </div>


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


            <div class="step-buttons">


                <button

                    type="button"

                    onclick="backToProductImages()">

                    ← Back

                </button>


                <button

                    type="button"

                    id="productContentImportButton"

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

        "================================="

    );

    console.log(

        "STEP 3 READY"

    );

    console.log(

        "PRODUCT CONTENT IMPORT"

    );

    console.log(

        "================================="

    );


    if (

        typeof ensureProductSession ===
        "function"

    ) {

        ensureProductSession();

    }


    setProductStepSafe(

        3

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

        setProductStepSafe(

            2

        );


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

    const status =

        document.getElementById(

            "contentImportStatus"

        );


    const button =

        document.getElementById(

            "productContentImportButton"

        );


    /* =====================================================
       ENSURE SESSION
    ===================================================== */

    const session =

        typeof ensureProductSession ===
        "function"

            ? ensureProductSession()

            : window.currentProduct;


    if (!session) {

        if (status) {

            status.innerHTML =

                "❌ Product Session không tồn tại.";

        }


        alert(

            "Product Session chưa được khởi tạo."

        );


        return;

    }


    /* =====================================================
       SAVE SOURCE
    ===================================================== */

    saveProductContentImport();


    /* =====================================================
       SOURCE
    ===================================================== */

    const source =

        session.source ||

        {};


    const url =

        typeof source.url === "string"

            ? source.url.trim()

            : "";


    /* =====================================================
       VALIDATE URL
    ===================================================== */

    if (!url) {

        if (status) {

            status.innerHTML =

                "❌ Chưa nhập Source URL.";

        }


        alert(

            "Vui lòng nhập URL sản phẩm."

        );


        return;

    }


    /* =====================================================
       PREVENT DOUBLE CLICK
    ===================================================== */

    if (button) {

        button.disabled = true;

        button.innerHTML =

            "⏳ Importing...";

    }


    if (status) {

        status.innerHTML =

            "⏳ Đang đọc dữ liệu từ Website...";

    }


    /* =====================================================
       CLEAR PREVIOUS ERROR
    ===================================================== */

    if (

        typeof clearProductImportData ===
        "function"

    ) {

        clearProductImportData();

    }


    /* =====================================================
       SAVE DRAFT BEFORE IMPORT
    ===================================================== */

    saveProductImportDraftSafe();


    /* =====================================================
       CHECK IMPORT ENGINE
    ===================================================== */

    if (

        typeof ProductImportEngine ===
        "undefined"

    ) {

        const error =

            new Error(

                "ProductImportEngine chưa được tải."

            );


        handleProductImportError(

            error,

            status,

            button

        );


        return;

    }


    /* =====================================================
       IMPORT
    ===================================================== */

    try {

        console.log(

            "================================="

        );

        console.log(

            "STEP 3 IMPORT START"

        );

        console.log(

            "URL:",

            url

        );

        console.log(

            "================================="

        );


        const result =

            await ProductImportEngine.import(

                {

                    ...source,

                    url: url

                }

            );


        console.log(

            "========== IMPORT RESULT =========="

        );

        console.log(

            result

        );

        console.log(

            "==================================="

        );


        /* =================================================
           CHECK RESULT
        ================================================= */

        if (

            !result ||

            !result.success

        ) {

            throw new Error(

                result?.error ||

                result?.message ||

                "Import thất bại."

            );

        }


        /* =================================================
           EXTRACT
        ================================================= */

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


        /* =================================================
           NORMALIZE
        ================================================= */

        const normalizedProduct =

            normalizeImportedContent(

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


        /* =================================================
           MERGE WITH CURRENT PRODUCT
        ================================================= */

        const finalProduct =

            mergeImportedContent(

                session.product ||

                {},

                normalizedProduct

            );


        /* =================================================
           PRESERVE STEP 1 DATA
        ================================================= */

        preserveStepOneData(

            session,

            finalProduct

        );


        /* =================================================
           SAVE PRODUCT
        ================================================= */

        session.product =

            finalProduct;


        /* =================================================
           SAVE RAW IMPORT RESULT
        ================================================= */

        session.importResult =

            result;


        /* =================================================
           IMPORT SUCCESS
        ================================================= */

        if (

            typeof markProductImportSuccess ===
            "function"

        ) {

            markProductImportSuccess(

                result

            );

        }

        else {

            session.source.imported =

                true;


            session.source.importedAt =

                new Date().toISOString();

        }


        /* =================================================
           SAVE SOURCE AGAIN
        ================================================= */

        saveProductContentImport();


        /* =================================================
           SAVE DRAFT
        ================================================= */

        saveProductImportDraftSafe();


        /* =================================================
           DEBUG
        ================================================= */

        debugProductImport(

            session,

            finalProduct

        );


        /* =================================================
           STATUS
        ================================================= */

        if (status) {

            status.innerHTML =

                "✅ Website đã đọc thành công.";

        }


        /* =================================================
           PREVIEW
        ================================================= */

        renderContentImportPreview(

            finalProduct

        );


        /* =================================================
           GO STEP 4
        ================================================= */

        setProductStepSafe(

            4

        );


        if (

            typeof renderProductSpecification ===
            "function"

        ) {

            setTimeout(

                function() {

                    renderProductSpecification();

                },

                300

            );


            return;

        }


        throw new Error(

            "renderProductSpecification chưa được tải."

        );

    }

    catch (error) {

        handleProductImportError(

            error,

            status,

            button

        );


        return;

    }


    finally {

        if (button) {

            button.disabled = false;

            button.innerHTML =

                "Import & Next →";

        }

    }

}


/* =========================================================
   EXTRACT IMPORTED PRODUCT
========================================================= */

function extractImportedProduct(

    result

) {

    if (

        !result ||

        typeof result !== "object"

    ) {

        return {};

    }


    /* =====================================================
       result.product
    ===================================================== */

    if (

        result.product &&

        typeof result.product === "object"

    ) {

        return result.product;

    }


    /* =====================================================
       result.result.product
    ===================================================== */

    if (

        result.result &&

        result.result.product &&

        typeof result.result.product === "object"

    ) {

        return result.result.product;

    }


    /* =====================================================
       result.data.product
    ===================================================== */

    if (

        result.data &&

        result.data.product &&

        typeof result.data.product === "object"

    ) {

        return result.data.product;

    }


    /* =====================================================
       result.data
    ===================================================== */

    if (

        result.data &&

        typeof result.data === "object" &&

        !Array.isArray(result.data)

    ) {

        return result.data;

    }


    /* =====================================================
       BACKEND DIRECT FIELDS
    ===================================================== */

    const directProduct = {

        name:

            result.title ||

            result.name ||

            "",


        description:

            result.description ||

            "",


        specs:

            result.specs ||

            null,


        specification:

            result.specification ||

            null,


        images:

            result.images ||

            []

    };


    if (

        directProduct.name ||

        directProduct.description ||

        directProduct.specs ||

        directProduct.specification ||

        directProduct.images.length

    ) {

        return directProduct;

    }


    return {};

}


/* =========================================================
   NORMALIZE IMPORTED CONTENT
========================================================= */

function normalizeImportedContent(

    product

) {

    const normalized = {

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


    if (

        !product ||

        typeof product !== "object"

    ) {

        return normalized;

    }


    /* =====================================================
       NAME
    ===================================================== */

    normalized.name =

        normalizeImportedValue(

            product.name ||

            product.title ||

            ""

        );


    /* =====================================================
       DESCRIPTION
    ===================================================== */

    normalized.description =

        normalizeDescription(

            product.description

        );


    /* =====================================================
       SPECIFICATION
    ===================================================== */

    normalized.specs =

        normalizeSpecs(

            product

        );


    /* =====================================================
       IMAGES
    ===================================================== */

    normalized.images =

        normalizeImages(

            product.images

        );


    return normalized;

}


/* =========================================================
   NORMALIZE VALUE
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

        typeof value === "string"

    ) {

        return value.trim();

    }


    return String(

        value

    ).trim();

}


/* =========================================================
   NORMALIZE DESCRIPTION
========================================================= */

function normalizeDescription(

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

        return normalizeTextStructure(

            value

        );

    }


    if (

        Array.isArray(value)

    ) {

        return value

            .map(

                item => {

                    if (

                        typeof item === "object" &&

                        item !== null

                    ) {

                        return normalizeDescription(

                            item.text ||

                            item.description ||

                            ""

                        );

                    }


                    return normalizeDescription(

                        item

                    );

                }

            )

            .filter(Boolean)

            .join("\n\n");

    }


    if (

        typeof value === "object"

    ) {

        return Object.entries(

            value

        )

            .map(

                ([key, item]) => {

                    const text =

                        normalizeDescription(

                            item

                        );


                    if (!text) {

                        return "";

                    }


                    return (

                        key +

                        ": " +

                        text

                    );

                }

            )

            .filter(Boolean)

            .join("\n\n");

    }


    return String(

        value

    ).trim();

}


/* =========================================================
   NORMALIZE TEXT STRUCTURE
========================================================= */

function normalizeTextStructure(

    value

) {

    const text =

        String(value)

            .trim();


    if (!text) {

        return "";

    }


    if (

        !/<[a-z][\s\S]*>/i.test(

            text

        )

    ) {

        return text;

    }


    try {

        const parser =

            new DOMParser();


        const doc =

            parser.parseFromString(

                text,

                "text/html"

            );


        const listItems =

            Array.from(

                doc.querySelectorAll(

                    "li"

                )

            );


        if (

            listItems.length

        ) {

            return listItems

                .map(

                    item =>

                        item.textContent

                            .replace(

                                /\s+/g,

                                " "

                            )

                            .trim()

                )

                .filter(Boolean)

                .join("\n");

        }


        const blocks =

            Array.from(

                doc.querySelectorAll(

                    "p, div, section, article, h1, h2, h3, h4, h5, h6"

                )

            );


        if (

            blocks.length

        ) {

            return blocks

                .map(

                    block =>

                        block.textContent

                            .replace(

                                /\s+/g,

                                " "

                            )

                            .trim()

                )

                .filter(Boolean)

                .join("\n\n");

        }


        return doc.body.textContent

            .replace(

                /\s+/g,

                " "

            )

            .trim();

    }

    catch (error) {

        console.warn(

            "TEXT NORMALIZE ERROR:",

            error

        );


        return text;

    }

}


/* =========================================================
   NORMALIZE SPECS
========================================================= */

function normalizeSpecs(

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

        typeof product !== "object"

    ) {

        return result;

    }


    let sourceSpecs =

        product.specs;


    /* =====================================================
       LEGACY FALLBACK
    ===================================================== */

    if (

        sourceSpecs === undefined ||

        sourceSpecs === null

    ) {

        sourceSpecs =

            product.specification;

    }


    /* =====================================================
       OBJECT
    ===================================================== */

    if (

        sourceSpecs &&

        typeof sourceSpecs === "object" &&

        !Array.isArray(sourceSpecs)

    ) {

        if (

            sourceSpecs.table &&

            typeof sourceSpecs.table === "object"

        ) {

            result.table =

                normalizeTable(

                    sourceSpecs.table

                );

        }


        if (

            Array.isArray(

                sourceSpecs.text

            )

        ) {

            sourceSpecs.text.forEach(

                item => {

                    appendSpecText(

                        result.text,

                        item

                    );

                }

            );

        }


        return result;

    }


    /* =====================================================
       ARRAY
    ===================================================== */

    if (

        Array.isArray(sourceSpecs)

    ) {

        sourceSpecs.forEach(

            item => {

                /* =========================================
                   HTML TABLE
                ========================================== */

                if (

                    typeof item === "string" &&

                    /<table[\s>]/i.test(item)

                ) {

                    const table =

                        parseHTMLTable(

                            item

                        );


                    if (

                        table.headers.length ||

                        table.rows.length

                    ) {

                        result.table =

                            table;

                    }


                    return;

                }


                /* =========================================
                   HTML LIST
                ========================================== */

                if (

                    typeof item === "string" &&

                    /<(ul|ol)[\s>]/i.test(item)

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


                /* =========================================
                   HTML TEXT
                ========================================== */

                if (

                    typeof item === "string" &&

                    /<(p|div|br)[\s>]/i.test(item)

                ) {

                    const lines =

                        parseHTMLText(

                            item

                        );


                    result.text.push(

                        ...lines

                    );


                    return;

                }


                /* =========================================
                   OBJECT
                ========================================== */

                if (

                    item &&

                    typeof item === "object"

                ) {

                    if (

                        item.table &&

                        typeof item.table === "object"

                    ) {

                        const table =

                            normalizeTable(

                                item.table

                            );


                        if (

                            table.headers.length ||

                            table.rows.length

                        ) {

                            result.table =

                                table;

                        }


                        if (

                            Array.isArray(item.text)

                        ) {

                            item.text.forEach(

                                textItem => {

                                    appendSpecText(

                                        result.text,

                                        textItem

                                    );

                                }

                            );

                        }


                        return;

                    }


                    if (

                        item.text !== undefined

                    ) {

                        appendSpecText(

                            result.text,

                            item.text

                        );


                        return;

                    }


                    const legacyText =

                        normalizeLegacySpecification(

                            item

                        );


                    if (legacyText) {

                        result.text.push(

                            legacyText

                        );

                    }


                    return;

                }


                /* =========================================
                   NORMAL STRING
                ========================================== */

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


        return result;

    }


    /* =====================================================
       DIRECT STRING
    ===================================================== */

    if (

        typeof sourceSpecs === "string"

    ) {

        const text =

            normalizeTextStructure(

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
   APPEND SPEC TEXT
========================================================= */

function appendSpecText(

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

        typeof value === "string"

    ) {

        const text =

            value.trim();


        if (!text) {

            return;

        }


        if (

            /<(ul|ol)[\s>]/i.test(text)

        ) {

            target.push(

                ...parseHTMLList(

                    text

                )

            );


            return;

        }


        if (

            /<(p|div|br)[\s>]/i.test(text)

        ) {

            target.push(

                ...parseHTMLText(

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

                appendSpecText(

                    target,

                    item

                );

            }

        );


        return;

    }


    if (

        typeof value === "object"

    ) {

        const text =

            normalizeLegacySpecification(

                value

            );


        if (text) {

            target.push(

                text

            );

        }

    }

}


/* =========================================================
   NORMALIZE TABLE
========================================================= */

function normalizeTable(

    table

) {

    const result = {

        headers: [],

        rows: []

    };


    if (

        !table ||

        typeof table !== "object"

    ) {

        return result;

    }


    if (

        Array.isArray(table.headers)

    ) {

        result.headers =

            table.headers

                .map(

                    cell =>

                        normalizeImportedValue(

                            cell

                        )

                )

                .filter(Boolean);

    }


    if (

        Array.isArray(table.rows)

    ) {

        result.rows =

            table.rows

                .map(

                    row => {

                        if (

                            !Array.isArray(row)

                        ) {

                            return [];

                        }


                        return row.map(

                            cell =>

                                normalizeImportedValue(

                                    cell

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


    return result;

}


/* =========================================================
   PARSE HTML TABLE
========================================================= */

function parseHTMLTable(

    html

) {

    const result = {

        headers: [],

        rows: []

    };


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


        const rows =

            Array.from(

                table.querySelectorAll(

                    "tr"

                )

            );


        rows.forEach(

            (row, index) => {

                const cells =

                    Array.from(

                        row.querySelectorAll(

                            "th, td"

                        )

                    );


                if (!cells.length) {

                    return;

                }


                const values =

                    cells

                        .map(

                            cell =>

                                normalizeImportedValue(

                                    cell.textContent

                                )

                        );


                const hasHeader =

                    row.querySelector(

                        "th"

                    );


                if (

                    index === 0 &&

                    hasHeader &&

                    !result.headers.length

                ) {

                    result.headers =

                        values;

                    return;

                }


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


    }

    catch (error) {

        console.warn(

            "HTML TABLE PARSE ERROR:",

            error

        );

    }


    return result;

}


/* =========================================================
   PARSE HTML LIST
========================================================= */

function parseHTMLList(

    html

) {

    try {

        const parser =

            new DOMParser();


        const doc =

            parser.parseFromString(

                html,

                "text/html"

            );


        return Array.from(

            doc.querySelectorAll(

                "li"

            )

        )

            .map(

                item =>

                    item.textContent

                        .replace(

                            /\s+/g,

                            " "

                        )

                        .trim()

            )

            .filter(Boolean);

    }

    catch (error) {

        console.warn(

            "HTML LIST PARSE ERROR:",

            error

        );


        return [];

    }

}


/* =========================================================
   PARSE HTML TEXT
========================================================= */

function parseHTMLText(

    html

) {

    try {

        const parser =

            new DOMParser();


        const doc =

            parser.parseFromString(

                html,

                "text/html"

            );


        const blocks =

            Array.from(

                doc.querySelectorAll(

                    "p, div, section, article, h1, h2, h3, h4, h5, h6"

                )

            );


        if (

            blocks.length

        ) {

            return blocks

                .map(

                    block =>

                        block.textContent

                            .replace(

                                /\s+/g,

                                " "

                            )

                            .trim()

                )

                .filter(Boolean);

        }


        const text =

            doc.body.textContent

                .replace(

                    /\s+/g,

                    " "

                )

                .trim();


        return text

            ? [text]

            : [];

    }

    catch (error) {

        console.warn(

            "HTML TEXT PARSE ERROR:",

            error

        );


        return [];

    }

}


/* =========================================================
   NORMALIZE LEGACY SPECIFICATION
========================================================= */

function normalizeLegacySpecification(

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

            ? normalizeImportedValue(

                item.name

            )

            : "";


    const value =

        item.value !== undefined

            ? normalizeImportedValue(

                item.value

            )

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
   NORMALIZE IMAGES
========================================================= */

function normalizeImages(

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

                    typeof image === "string"

                ) {

                    return image.trim();

                }


                if (

                    image &&

                    typeof image === "object"

                ) {

                    return (

                        image.url ||

                        image.src ||

                        image.image ||

                        ""

                    ).toString().trim();

                }


                return "";

            }

        )

        .filter(Boolean);

}


/* =========================================================
   MERGE IMPORTED CONTENT
========================================================= */

function mergeImportedContent(

    oldProduct,

    importedProduct

) {

    const oldData =

        oldProduct &&

        typeof oldProduct === "object"

            ? oldProduct

            : {};


    const imported =

        importedProduct &&

        typeof importedProduct === "object"

            ? importedProduct

            : {};


    const merged = {

        ...oldData

    };


    /* =====================================================
       NAME
    ===================================================== */

    if (

        isValidImportedValue(

            imported.name

        )

    ) {

        merged.name =

            imported.name;

    }


    /* =====================================================
       DESCRIPTION
    ===================================================== */

    if (

        isValidImportedValue(

            imported.description

        )

    ) {

        merged.description =

            imported.description;

    }


    /* =====================================================
       SPECS
    ===================================================== */

    if (

        imported.specs &&

        typeof imported.specs === "object"

    ) {

        merged.specs = {

            table: {

                headers:

                    Array.isArray(

                        imported.specs.table?.headers

                    )

                        ? [

                            ...

                            imported.specs.table.headers

                        ]

                        : [],


                rows:

                    Array.isArray(

                        imported.specs.table?.rows

                    )

                        ? imported.specs.table.rows.map(

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

                    imported.specs.text

                )

                    ? [

                        ...

                        imported.specs.text

                    ]

                    : []

        };

    }


    /* =====================================================
       IMAGES
    ===================================================== */

    if (

        Array.isArray(

            imported.images

        ) &&

        imported.images.length

    ) {

        merged.images =

            [

                ...

                imported.images

            ];

    }


    /* =====================================================
       REMOVE LEGACY
    ===================================================== */

    delete merged.specification;


    return merged;

}


/* =========================================================
   VALID IMPORTED VALUE
========================================================= */

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


/* =========================================================
   PRESERVE STEP 1 DATA
========================================================= */

function preserveStepOneData(

    session,

    product

) {

    if (

        !session ||

        !product

    ) {

        return;

    }


    if (

        session.business

    ) {

        product.business =

            session.business;

    }


    if (

        session.category

    ) {

        product.category =

            session.category;

    }


    if (

        session.brand

    ) {

        product.brand =

            session.brand;

    }


    if (

        session.origin

    ) {

        product.origin =

            session.origin;

    }


    if (

        session.folder

    ) {

        product.folder =

            session.folder;

    }

}


/* =========================================================
   RENDER IMPORT PREVIEW
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

        Array.isArray(table.headers)

            ? table.headers

            : [];


    const rows =

        Array.isArray(table.rows)

            ? table.rows

            : [];


    const text =

        Array.isArray(product?.specs?.text)

            ? product.specs.text

            : [];


    const images =

        Array.isArray(product?.images)

            ? product.images

            : [];


    content.innerHTML = `

        <div>

            <strong>

                Product Name:

            </strong>

            ${escapeProductImportHTML(

                name

            )}

        </div>


        <div>

            <strong>

                Product Description:

            </strong>

            <div style="white-space:pre-line;">

                ${escapeProductImportHTML(

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
   SAVE SOURCE
========================================================= */

function saveProductContentImport() {

    const session =

        typeof ensureProductSession ===
        "function"

            ? ensureProductSession()

            : window.currentProduct;


    if (!session) {

        return;

    }


    const type =

        document.getElementById(

            "contentSourceType"

        );


    const url =

        document.getElementById(

            "contentSourceUrl"

        );


    session.source = {

        ...(session.source || {}),


        type:

            type?.value ||

            "website",


        url:

            url?.value.trim() ||

            "",


        options:

            session.source?.options ||

            {

                description: true,

                specs: true,

                images: true

            }

    };


    if (

        typeof session.updatedAt !==
        "undefined"

    ) {

        session.updatedAt =

            new Date().toISOString();

    }

}


/* =========================================================
   LOAD SOURCE
========================================================= */

function loadProductContentImport() {

    const session =

        typeof ensureProductSession ===
        "function"

            ? ensureProductSession()

            : window.currentProduct;


    if (!session) {

        return;

    }


    const source =

        session.source ||

        {};


    const type =

        document.getElementById(

            "contentSourceType"

        );


    const url =

        document.getElementById(

            "contentSourceUrl"

        );


    if (type) {

        type.value =

            source.type ||

            "website";

    }


    if (url) {

        url.value =

            source.url ||

            "";

    }

}


/* =========================================================
   SAVE DRAFT SAFE
========================================================= */

function saveProductImportDraftSafe() {

    try {

        if (

            typeof saveProductDraft ===
            "function"

        ) {

            saveProductDraft();

        }

    }

    catch (error) {

        console.warn(

            "SAVE PRODUCT DRAFT ERROR:",

            error

        );

    }

}


/* =========================================================
   HANDLE IMPORT ERROR
========================================================= */

function handleProductImportError(

    error,

    status,

    button

) {

    console.error(

        "PRODUCT IMPORT ERROR:",

        error

    );


    if (status) {

        status.innerHTML =

            "❌ Import thất bại.";

    }


    if (

        typeof markProductImportError ===
        "function"

    ) {

        markProductImportError(

            error

        );

    }


    const message =

        error instanceof Error

            ? error.message

            : String(

                error ||

                "Không thể Import sản phẩm."

            );


    alert(

        message

    );


    if (button) {

        button.disabled = false;

        button.innerHTML =

            "Import & Next →";

    }

}


/* =========================================================
   SET STEP SAFE
========================================================= */

function setProductStepSafe(

    step

) {

    if (

        typeof setProductStep ===
        "function"

    ) {

        setProductStep(

            step

        );

        return;

    }


    if (

        window.currentProduct

    ) {

        window.currentProduct.currentStep =

            step;

    }

}


/* =========================================================
   DEBUG
========================================================= */

function debugProductImport(

    session,

    product

) {

    console.log(

        "========================================"

    );

    console.log(

        "STEP 3 IMPORT COMPLETE"

    );

    console.log(

        "========================================"

    );


    console.log(

        "PRODUCT SESSION:",

        session

    );


    console.log(

        "PRODUCT:",

        product

    );


    console.log(

        "NAME:",

        product?.name

    );


    console.log(

        "DESCRIPTION:",

        product?.description

    );


    console.log(

        "SPECS:",

        product?.specs

    );


    console.log(

        "SPEC TABLE:",

        product?.specs?.table

    );


    console.log(

        "SPEC TEXT:",

        product?.specs?.text

    );


    console.log(

        "IMAGES:",

        product?.images

    );


    console.log(

        "========================================"

    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeProductImportHTML(

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