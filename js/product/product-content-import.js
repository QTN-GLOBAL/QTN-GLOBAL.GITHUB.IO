
/* ==========================================
   PRODUCT CONTENT IMPORT
   STEP 3
========================================== */

function renderProductContentImport() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;

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


        <div class="form-group">

            <label>

                Source URL

            </label>

            <input

                id="contentSourceUrl"

                type="text"

                placeholder="https://canthinhphat.com/...">

            <small>

                Ví dụ:
                https://canthinhphat.com/can-ban-excell...

            </small>

        </div>


        <div class="form-group">

            <label>

                Import Options

            </label>

            <div class="import-options">

                <label>

                    <input
                        type="checkbox"
                        id="importDescription"
                        checked>

                    Product Description

                </label>

                <label>

                    <input
                        type="checkbox"
                        id="importSpecification"
                        checked>

                    Technical Specification

                </label>

                <label>

                    <input
                        type="checkbox"
                        id="importFeatures"
                        checked>

                    Features

                </label>

                <label>

                    <input
                        type="checkbox"
                        id="importApplications"
                        checked>

                    Applications

                </label>

                <label>

                    <input
                        type="checkbox"
                        id="importAccessories"
                        checked>

                    Accessories

                </label>

                <label>

                    <input
                        type="checkbox"
                        id="importImages">

                    Product Images (Coming Soon)

                </label>

            </div>

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


/* ==========================================
   INIT
========================================== */

function initProductContentImport() {

    console.log("STEP 3 READY");

    loadProductContentImport();

}


/* ==========================================
   BACK
========================================== */

function backToProductImages() {

    renderProductImages();

}


/* ==========================================
   NEXT STEP
========================================== */

async function nextProductContentImport() {

    saveProductContentImport();

    saveProductDraft();


    const status =
        document.getElementById(
            "contentImportStatus"
        );


    if (status) {

        status.innerHTML =
            "⏳ Đang tải dữ liệu từ Website...";

    }


    const source =
        window.currentProduct?.source;


    if (!source || !source.url) {

        if (status) {

            status.innerHTML =
                "❌ Chưa nhập Source URL";

        }

        alert(
            "Vui lòng nhập URL sản phẩm."
        );

        return;

    }


    try {

        const result =
            await ProductImportEngine.import(
                source
            );


        if (!result.success) {

            if (status) {

                status.innerHTML =
                    "❌ Import thất bại";

            }

            alert(
                result.error ||
                "Import thất bại."
            );

            return;

        }


        /* ==================================
           SAVE IMPORT RESULT
        ================================== */

        window.currentProduct.importResult =
            result;


        /* ==================================
           OLD PRODUCT
           STEP 1 DATA
        ================================== */

        const oldProduct =
            window.currentProduct.product ||
            {};


        /* ==================================
           AI PRODUCT
        ================================== */

        let aiProduct = {};


        if (
            result.product
        ) {

            aiProduct =
                result.product;

        }

        else if (
            result.result &&
            result.result.product
        ) {

            aiProduct =
                result.result.product;

        }


        console.log("");

        console.log(
            "========== AI PRODUCT =========="
        );

        console.log(
            aiProduct
        );

        console.log(
            "================================"
        );


        /* ==================================
           MERGE
        ================================== */

        const mergedProduct =
            mergeImportedProduct(
                oldProduct,
                aiProduct
            );


        window.currentProduct.product =
            mergedProduct;


        /* ==================================
           STATUS
        ================================== */

        if (status) {

            status.innerHTML =
                "✅ Website đã đọc thành công";

        }


        /* ==================================
           DEBUG
        ================================== */

        console.log("");

        console.log(
            "========== MERGED PRODUCT =========="
        );

        console.log(
            window.currentProduct.product
        );

        console.log(
            "===================================="
        );


        /* ==================================
           SAVE
        ================================== */

        saveProductContentImport();

        saveProductDraft();


        /* ==================================
           STEP 4
        ================================== */

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


/* ==========================================
   MERGE IMPORTED PRODUCT
========================================== */

function mergeImportedProduct(
    oldProduct,
    aiProduct
) {

    const merged = {

        ...oldProduct

    };


    /* ==================================
       CHECK AI VALUE
    ================================== */

    function isValidAIValue(value) {

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


    /* ==================================
       NAME
    ================================== */

    if (
        isValidAIValue(
            aiProduct.name
        )
    ) {

        merged.name =
            aiProduct.name;

    }


    /* ==================================
       BRAND
    ================================== */

    if (
        isValidAIValue(
            aiProduct.brand
        )
    ) {

        if (
            !isValidAIValue(
                merged.brand
            )
        ) {

            merged.brand =
                aiProduct.brand;

        }

    }


    /* ==================================
       ORIGIN
    ================================== */

    if (
        isValidAIValue(
            aiProduct.origin
        )
    ) {

        if (
            !isValidAIValue(
                merged.origin
            )
        ) {

            merged.origin =
                aiProduct.origin;

        }

    }


    /* ==================================
       DESCRIPTION
    ================================== */

    if (
        isValidAIValue(
            aiProduct.description
        )
    ) {

        merged.description =
            aiProduct.description;

    }


    /* ==================================
       SPECIFICATION
    ================================== */

    if (
        Array.isArray(
            aiProduct.specification
        ) &&
        aiProduct.specification.length > 0
    ) {

        merged.specification =
            aiProduct.specification;

    }


    /* ==================================
       FEATURES
    ================================== */

    if (
        Array.isArray(
            aiProduct.features
        ) &&
        aiProduct.features.length > 0
    ) {

        merged.features =
            aiProduct.features;

    }


    /* ==================================
       APPLICATIONS
    ================================== */

    if (
        Array.isArray(
            aiProduct.applications
        ) &&
        aiProduct.applications.length > 0
    ) {

        merged.applications =
            aiProduct.applications;

    }


    /* ==================================
       ACCESSORIES
    ================================== */

    if (
        Array.isArray(
            aiProduct.accessories
        ) &&
        aiProduct.accessories.length > 0
    ) {

        merged.accessories =
            aiProduct.accessories;

    }


    return merged;

}


/* ==========================================
   SAVE CONTENT IMPORT
========================================== */

function saveProductContentImport() {

    if (!window.currentProduct) {

        window.currentProduct = {};

    }


    window.currentProduct.source = {

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


        options: {

            description:

                document.getElementById(
                    "importDescription"
                )?.checked ||
                false,


            specification:

                document.getElementById(
                    "importSpecification"
                )?.checked ||
                false,


            features:

                document.getElementById(
                    "importFeatures"
                )?.checked ||
                false,


            applications:

                document.getElementById(
                    "importApplications"
                )?.checked ||
                false,


            accessories:

                document.getElementById(
                    "importAccessories"
                )?.checked ||
                false,


            images:

                document.getElementById(
                    "importImages"
                )?.checked ||
                false

        },


        imported:
            false,


        importedAt:
            ""

    };

}


/* ==========================================
   LOAD CONTENT IMPORT
========================================== */

function loadProductContentImport() {

    if (
        !window.currentProduct
    ) {

        return;

    }


    if (
        !window.currentProduct.source
    ) {

        return;

    }


    const source =
        window.currentProduct.source;


    const type =
        document.getElementById(
            "contentSourceType"
        );


    if (type) {

        type.value =
            source.type ||
            "website";

    }


    const url =
        document.getElementById(
            "contentSourceUrl"
        );


    if (url) {

        url.value =
            source.url ||
            "";

    }


    const options =
        source.options ||
        {};


    const description =
        document.getElementById(
            "importDescription"
        );


    if (description) {

        description.checked =
            options.description ??
            true;

    }


    const specification =
        document.getElementById(
            "importSpecification"
        );


    if (specification) {

        specification.checked =
            options.specification ??
            true;

    }


    const features =
        document.getElementById(
            "importFeatures"
        );


    if (features) {

        features.checked =
            options.features ??
            true;

    }


    const applications =
        document.getElementById(
            "importApplications"
        );


    if (applications) {

        applications.checked =
            options.applications ??
            true;

    }


    const accessories =
        document.getElementById(
            "importAccessories"
        );


    if (accessories) {

        accessories.checked =
            options.accessories ??
            true;

    }


    const images =
        document.getElementById(
            "importImages"
        );


    if (images) {

        images.checked =
            options.images ??
            false;

    }

}

