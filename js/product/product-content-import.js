```javascript
/* ==========================================
   PRODUCT CONTENT IMPORT
   STEP 3
========================================== */


/* ==========================================
   RENDER PRODUCT CONTENT IMPORT
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


        <!-- =========================
             SOURCE TYPE
        ========================== -->

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


        <!-- =========================
             SOURCE URL
        ========================== -->

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


        <!-- =========================
             IMPORT OPTIONS
        ========================== -->

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


        <!-- =========================
             STATUS
        ========================== -->

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


        <!-- =========================
             BUTTONS
        ========================== -->

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

    console.log(

        "STEP 3 READY"

    );


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

    /* ==========================
       SAVE SOURCE
    ========================== */

    saveProductContentImport();


    /* ==========================
       SAVE CURRENT DRAFT
    ========================== */

    saveProductDraft();


    /* ==========================
       STATUS
    ========================== */

    const status =

        document.getElementById(

            "contentImportStatus"

        );


    if (status) {

        status.innerHTML =

            "⏳ Đang tải dữ liệu từ Website...";

    }


    /* ==========================
       GET SOURCE
    ========================== */

    const source =

        window.currentProduct?.source;


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


    /* ==========================
       IMPORT
    ========================== */

    const result =

        await ProductImportEngine.import(

            source

        );


    /* ==========================
       IMPORT FAILED
    ========================== */

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


    /* ==========================
       SAVE IMPORT RESULT
    ========================== */

    window.currentProduct.importResult =

        result;


    /* ==========================
       OLD PRODUCT
       STEP 1 DATA
    ========================== */

    const oldProduct =

        window.currentProduct.product ||

        {};


    /* ==========================
       AI PRODUCT
       STEP 3 DATA
    ========================== */

    const aiProduct =

        result.result?.product ||

        result.product ||

        {};


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


    /* ==========================
       MERGE PRODUCT
    ========================== */

    window.currentProduct.product =

        mergeImportedProduct(

            oldProduct,

            aiProduct

        );


    /* ==========================
       STATUS
    ========================== */

    if (status) {

        status.innerHTML =

            "✅ Website đã đọc thành công";

    }


    /* ==========================
       DEBUG
    ========================== */

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


    /* ==========================
       SAVE DRAFT
    ========================== */

    saveProductContentImport();

    saveProductDraft();


    /* ==========================
       GO STEP 4
    ========================== */

    renderProductSpecification();

}


/* ==========================================
   MERGE IMPORTED PRODUCT
========================================== */

function mergeImportedProduct(

    oldProduct,

    aiProduct

) {

    /* ==========================
       CLONE OLD PRODUCT
    ========================== */

    const merged =

        JSON.parse(

            JSON.stringify(

                oldProduct || {}

            )

        );


    /* ==========================
       HELPER
    ========================== */

    function isValidAIValue(value) {

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


    /* ==========================
       SIMPLE FIELDS
    ========================== */

    const simpleFields = [

        "name",

        "brand",

        "origin",

        "description"

    ];


    simpleFields.forEach(

        field => {

            if (

                isValidAIValue(

                    aiProduct[field]

                )

            ) {

                /*

                AI chỉ ghi đè nếu:

                1. Dữ liệu cũ chưa có

                2. Dữ liệu cũ là Unknown

                3. Field là name hoặc description

                */

                const oldValue =

                    merged[field];


                const oldInvalid =

                    !isValidAIValue(

                        oldValue

                    );


                if (

                    oldInvalid ||

                    field === "name" ||

                    field === "description"

                ) {

                    merged[field] =

                        aiProduct[field];

                }

            }

        }

    );


    /* ==========================
       SPECIFICATION
    ========================== */

    if (

        Array.isArray(

            aiProduct.specification

        ) &&

        aiProduct.specification.length

    ) {

        merged.specification =

            aiProduct.specification;

    }


    /* ==========================
       FEATURES
    ========================== */

    if (

        Array.isArray(

            aiProduct.features

        ) &&

        aiProduct.features.length

    ) {

        merged.features =

            aiProduct.features;

    }


    /* ==========================
       APPLICATIONS
    ========================== */

    if (

        Array.isArray(

            aiProduct.applications

        ) &&

        aiProduct.applications.length

    ) {

        merged.applications =

            aiProduct.applications;

    }


    /* ==========================
       ACCESSORIES
    ========================== */

    if (

        Array.isArray(

            aiProduct.accessories

        ) &&

        aiProduct.accessories.length

    ) {

        merged.accessories =

            aiProduct.accessories;

    }


    /* ==========================
       RETURN
    ========================== */

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

    if (!window.currentProduct) {

        return;

    }


    if (

        !window.currentProduct.source

    ) {

        return;

    }


    const source =

        window.currentProduct.source;


    /* ==========================
       SOURCE TYPE
    ========================== */

    const type =

        document.getElementById(

            "contentSourceType"

        );


    if (type) {

        type.value =

            source.type ||

            "website";

    }


    /* ==========================
       SOURCE URL
    ========================== */

    const url =

        document.getElementById(

            "contentSourceUrl"

        );


    if (url) {

        url.value =

            source.url ||

            "";

    }


    /* ==========================
       OPTIONS
    ========================== */

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
```
