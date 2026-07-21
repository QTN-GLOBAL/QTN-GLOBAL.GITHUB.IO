/* =========================================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   DATA FLOW

   ProductImportEngine
          ↓
   normalizeImportedProduct()
          ↓
   currentProduct.product
          ↓
   currentProduct.product.specs
          ↓
   product-specification.js

   IMPORTANT

   CHỈ CÓ MỘT FIELD DUY NHẤT:

       product.specs

   KHÔNG SỬ DỤNG:

       product.specification

   ========================================================= */


/* =========================================================
   RENDER STEP 3
========================================================= */

function renderProductContentImport() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;


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

                <option value="pdf" disabled>
                    📄 PDF Catalogue (Coming Soon)
                </option>

                <option value="word" disabled>
                    📝 Word Document (Coming Soon)
                </option>

                <option value="manual" disabled>
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
                Nhập URL trang sản phẩm cần AI đọc và phân tích.
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
                    ✓ Product Specifications
                </div>

                <div>
                    ✓ AI Product Information
                </div>

            </div>

            <small>
                AI sẽ đọc nội dung từ Website
                và chuyển dữ liệu sang bước xử lý sản phẩm tiếp theo.
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

            <div id="contentImportPreviewContent"></div>

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
            typeof ProductImportEngine === "undefined"
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

        let importedProduct = {};


        if (
            result.product &&
            typeof result.product === "object"
        ) {

            importedProduct =
                result.product;

        }

        else if (
            result.result &&
            result.result.product &&
            typeof result.result.product === "object"
        ) {

            importedProduct =
                result.result.product;

        }


        /* =====================================
           OLD PRODUCT
        ====================================== */

        const current =
            window.currentProduct || {};


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
           RAW IMPORT DEBUG
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
           FINAL DATA CLEAN

           CHỈ CÓ:

               specs

           KHÔNG CÓ:

               specification
        ====================================== */

        delete mergedProduct.specification;


        /* =====================================
           SAVE
        ====================================== */

        window.currentProduct.product =
            mergedProduct;


        /* =====================================
           DEBUG
        ====================================== */

        console.log("");

        console.log(
            "========== NORMALIZED PRODUCT =========="
        );

        console.log(
            window.currentProduct.product
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
   NORMALIZE IMPORTED PRODUCT
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


    let rawSpecs = [];


    /* =========================================
       PRIMARY SOURCE

       CHUẨN:

           specs
    ========================================== */

    if (
        Array.isArray(
            importedProduct.specs
        )
    ) {

        rawSpecs =
            importedProduct.specs;

    }


    /* =========================================
       LEGACY COMPATIBILITY

       Parser cũ có thể vẫn trả:

           specification

       Chỉ đọc để chuyển đổi.

       Sau normalize sẽ XÓA.
    ========================================== */

    else if (
        Array.isArray(
            importedProduct.specification
        )
    ) {

        rawSpecs =
            importedProduct.specification;

    }


    /* =========================================
       NORMALIZE SPECS
    ========================================== */

    normalized.specs =
        rawSpecs

            .map(
                normalizeSpecItem
            )

            .filter(
                item => item !== ""
            );


    /* =========================================
       REMOVE LEGACY FIELD
    ========================================== */

    delete normalized.specification;


    return normalized;

}


/* =========================================================
   NORMALIZE ONE SPEC ITEM

   INPUT:

   String
       "Độ phân giải 1/30.000"

   HTML
       "<table>...</table>"

   Object
       {
           name: "Hóa đơn in",
           value: "Tiếng Việt..."
       }

   OUTPUT:

   String
========================================================= */

function normalizeSpecItem(
    item
) {

    if (
        item === null ||
        item === undefined
    ) {

        return "";

    }


    /* =========================================
       STRING
    ========================================== */

    if (
        typeof item === "string"
    ) {

        return item.trim();

    }


    /* =========================================
       OBJECT
    ========================================== */

    if (
        typeof item === "object"
    ) {

        const name =
            item.name !== undefined

                ? String(item.name).trim()

                : "";


        const value =
            item.value !== undefined

                ? String(item.value).trim()

                : "";


        if (
            name &&
            value
        ) {

            return `${name}: ${value}`;

        }


        if (name) {

            return name;

        }


        if (value) {

            return value;

        }


        return "";

    }


    /* =========================================
       OTHER
    ========================================== */

    return String(item).trim();

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

       DUY NHẤT
    ========================================== */

    if (
        Array.isArray(
            importedProduct.specs
        )
    ) {

        merged.specs =
            importedProduct.specs;

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


    const specs =
        Array.isArray(
            product?.specs
        )

            ? product.specs

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
                Description:
            </strong>

            ${escapeContentImportHTML(description)}

        </div>


        <div>

            <strong>
                Specifications:
            </strong>

            ${specs.length}

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


        /* =====================================
           IMPORT OPTIONS

           Dùng specs thay specification
        ====================================== */

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