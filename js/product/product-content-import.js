/* ==========================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   PURPOSE:

   - Nhập URL sản phẩm
   - Gọi ProductImportEngine
   - Giữ nguyên API Import hiện tại
   - Nhận dữ liệu từ Backend / AI
   - Lưu kết quả vào currentProduct.importResult
   - Merge dữ liệu Step 1 + AI
   - Chuẩn hóa specification -> specs
   - Chuyển sang Step 4

   IMPORTANT:

   Step 3 KHÔNG hiển thị hoặc lưu:

   - features
   - applications
   - accessories

   Cấu trúc product sau Step 3
   hướng theo products.js:

   {
       business,
       id,
       name,
       category,
       folder,
       brand,
       origin,
       description,
       specs
   }

   API Backend vẫn giữ nguyên:

   POST
   http://localhost:3000/api/import

========================================== */


/* ==========================================
   RENDER STEP 3
========================================== */

function renderProductContentImport() {

    const body =
        document.getElementById(
            "productModalBody"
        );

    if (!body) return;


    body.innerHTML = `

    <div class="product-content-import">

        <h3 class="product-step-title">

            Step 3 / 6 - AI Content Import

        </h3>


        <!-- =================================
             SOURCE TYPE
        ================================== -->

        <div class="form-group">

            <label>

                Source Type

            </label>


            <select
                id="contentSourceType">

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


        <!-- =================================
             SOURCE URL
        ================================== -->

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


        <!-- =================================
             IMPORT CONTENT
        ================================== -->

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
                và chuyển dữ liệu sang bước
                xử lý sản phẩm tiếp theo.

            </small>

        </div>


        <!-- =================================
             STATUS
        ================================== -->

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


        <!-- =================================
             AI RESULT PREVIEW
        ================================== -->

        <div

            id="contentImportPreview"

            class="content-import-preview"

            style="display:none;">

            <h4>

                AI Imported Content

            </h4>


            <div

                id="contentImportPreviewContent">

            </div>

        </div>


        <!-- =================================
             BUTTONS
        ================================== -->

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


    /* ======================================
       INIT
    ====================================== */

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

    /* ======================================
       SAVE SOURCE
    ====================================== */

    saveProductContentImport();


    /* ======================================
       SAVE DRAFT
    ====================================== */

    if (
        typeof saveProductDraft ===
        "function"
    ) {

        saveProductDraft();

    }


    /* ======================================
       STATUS
    ====================================== */

    const status =

        document.getElementById(

            "contentImportStatus"

        );


    if (status) {

        status.innerHTML =

            "⏳ Đang tải dữ liệu từ Website...";

    }


    /* ======================================
       GET SOURCE
    ====================================== */

    const source =

        window.currentProduct?.source;


    /* ======================================
       VALIDATE URL
    ====================================== */

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


    /* ======================================
       IMPORT

       GIỮ NGUYÊN API HIỆN TẠI

       ProductImportEngine.import()

       gọi:

       POST
       http://localhost:3000/api/import

       thông qua:

       product-import-engine.js
    ====================================== */

    try {

        const result =

            await ProductImportEngine.import(

                source

            );


        /* ==================================
           CHECK RESULT
        ================================== */

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


        /* ==================================
           SAVE FULL IMPORT RESULT

           Giữ nguyên kết quả Backend.

           Có thể dùng về sau cho:

           - Debug
           - AI logs
           - Image Import
           - Source tracking
        ================================== */

        window.currentProduct.importResult =

            result;


        /* ==================================
           MARK IMPORTED
        ================================== */

        markProductContentImported();


        /* ==================================
           GET AI PRODUCT
        ================================== */

        let aiProduct = {};


        if (

            result.product &&

            typeof result.product ===

            "object"

        ) {

            aiProduct =

                result.product;

        }


        else if (

            result.result &&

            result.result.product &&

            typeof result.result.product ===

            "object"

        ) {

            aiProduct =

                result.result.product;

        }


        /* ==================================
           GET STEP 1 PRODUCT

           Step 1 luôn được ưu tiên cho:

           business
           id
           category
           folder
           brand
           origin
        ================================== */

        const oldProduct = {

            ...(

                window.currentProduct.product ||

                {}

            ),


            business:

                window.currentProduct.business ||


                window.currentProduct.product
                    ?.business ||


                "",


            id:

                window.currentProduct.id ||


                window.currentProduct.product
                    ?.id ||


                "",


            category:

                window.currentProduct.category ||


                window.currentProduct.product
                    ?.category ||


                "",


            folder:

                window.currentProduct.folder ||


                window.currentProduct.product
                    ?.folder ||


                "",


            brand:

                window.currentProduct.brand ||


                window.currentProduct.product
                    ?.brand ||


                "",


            origin:

                window.currentProduct.origin ||


                window.currentProduct.product
                    ?.origin ||


                ""

        };


        /* ==================================
           DEBUG STEP 1
        ================================== */

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


        /* ==================================
           DEBUG AI
        ================================== */

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

           AI chỉ bổ sung:

           name
           description
           specs

           Step 1 giữ:

           business
           id
           category
           folder
           brand
           origin
        ================================== */

        const mergedProduct =

            mergeImportedProduct(

                oldProduct,

                aiProduct

            );


        /* ==================================
           PRESERVE STEP 1 DATA

           Đảm bảo dữ liệu quản lý
           không bị AI ghi đè.
        ================================== */

        if (

            window.currentProduct.business

        ) {

            mergedProduct.business =

                window.currentProduct.business;

        }


        if (

            window.currentProduct.id

        ) {

            mergedProduct.id =

                window.currentProduct.id;

        }


        if (

            window.currentProduct.category

        ) {

            mergedProduct.category =

                window.currentProduct.category;

        }


        if (

            window.currentProduct.folder

        ) {

            mergedProduct.folder =

                window.currentProduct.folder;

        }


        if (

            window.currentProduct.brand

        ) {

            mergedProduct.brand =

                window.currentProduct.brand;

        }


        if (

            window.currentProduct.origin

        ) {

            mergedProduct.origin =

                window.currentProduct.origin;

        }


        /* ==================================
           SAVE MERGED PRODUCT
        ================================== */

        window.currentProduct.product =

            mergedProduct;


        /* ==================================
           DEBUG MERGED PRODUCT
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
           SHOW STATUS
        ================================== */

        if (status) {

            status.innerHTML =

                "✅ Website đã đọc thành công";

        }


        /* ==================================
           SHOW PREVIEW
        ================================== */

        renderContentImportPreview(

            mergedProduct

        );


        /* ==================================
           SAVE
        ================================== */

        saveProductContentImport();


        if (
            typeof saveProductDraft ===
            "function"
        ) {

            saveProductDraft();

        }


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

   PURPOSE:

   - Giữ dữ liệu Step 1
   - Nhận dữ liệu AI
   - Chuyển specification -> specs
   - Không ghi đè dữ liệu quản lý
   - Không lưu features
   - Không lưu applications
   - Không lưu accessories

   CẤU TRÚC CHUẨN:

   {
       business,
       id,
       name,
       category,
       folder,
       brand,
       origin,
       description,
       specs
   }

========================================== */

function mergeImportedProduct(

    oldProduct,

    aiProduct

) {

    const merged = {

        /* ==================================
           CHỈ LẤY CÁC FIELD CHUẨN

           Không dùng:

           ...oldProduct

           để tránh giữ lại:

           specification
           _aiFeatures
           _aiApplications
           _aiAccessories
        ================================== */

        business:

            oldProduct.business || "",


        id:

            oldProduct.id || "",


        name:

            oldProduct.name || "",


        category:

            oldProduct.category || "",


        folder:

            oldProduct.folder || "",


        brand:

            oldProduct.brand || "",


        origin:

            oldProduct.origin || "",


        description:

            oldProduct.description || "",


        specs:

            Array.isArray(oldProduct.specs)

                ? oldProduct.specs

                : []

    };


    /* ======================================
       VALIDATE AI VALUE
    ====================================== */

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


    /* ======================================
       NAME

       AI name được ưu tiên nếu hợp lệ.
    ====================================== */

    if (

        isValidAIValue(

            aiProduct.name

        )

    ) {

        merged.name =

            aiProduct.name.trim();

    }


    /* ======================================
       DESCRIPTION

       AI description được ưu tiên
       nếu có dữ liệu.
    ====================================== */

    if (

        isValidAIValue(

            aiProduct.description

        )

    ) {

        merged.description =

            aiProduct.description.trim();

    }


    /* ======================================
       SPECIFICATION -> SPECS

       Backend hiện tại trả:

       specification

       products.js sử dụng:

       specs

       Vì vậy Step 3 chuyển đổi
       ngay tại đây.
    ====================================== */

    if (

        Array.isArray(

            aiProduct.specification

        ) &&

        aiProduct.specification.length > 0

    ) {

        merged.specs =

            normalizeImportedSpecs(

                aiProduct.specification

            );

    }


    /* ======================================
       FALLBACK

       Nếu sau này Backend đã trả:

       specs

       thì vẫn hỗ trợ.
    ====================================== */

    else if (

        Array.isArray(

            aiProduct.specs

        ) &&

        aiProduct.specs.length > 0

    ) {

        merged.specs =

            normalizeImportedSpecs(

                aiProduct.specs

            );

    }


    /* ======================================
       RETURN

       Không có:

       specification
       features
       applications
       accessories

       trong product chính.
    ====================================== */

    return merged;

}


/* ==========================================
   NORMALIZE IMPORTED SPECS

   Hỗ trợ:

   1.

   {
       name: "...",
       value: "..."
   }

   2.

   String

   Vì products.js hiện tại có thể chứa:

   specs: [

       "Độ phân giải nội: 1/30.000",

       "...",

       `<table>...</table>`

   ]

========================================== */

function normalizeImportedSpecs(

    specs

) {

    if (

        !Array.isArray(specs)

    ) {

        return [];

    }


    return specs

        .map(item => {

            /* ==========================
               OBJECT
            ========================== */

            if (

                item &&

                typeof item === "object"

            ) {

                return {

                    name:

                        item.name ||

                        "",


                    value:

                        item.value ||

                        ""

                };

            }


            /* ==========================
               STRING

               Giữ nguyên nội dung.

               Step 4 có thể chỉnh sửa.
            ========================== */

            return String(item);

        })

        .filter(item => {

            if (

                typeof item === "string"

            ) {

                return item.trim() !== "";

            }


            return (

                item.name ||

                item.value

            );

        });

}


/* ==========================================
   PREVIEW IMPORT RESULT
========================================== */

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


/* ==========================================
   ESCAPE HTML

   Tránh AI content chèn trực tiếp
   HTML nguy hiểm vào Preview.
========================================== */

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


/* ==========================================
   SAVE CONTENT IMPORT
========================================== */

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


        /*

           Giữ options cũ nếu tồn tại.

           API Import hiện tại vẫn nhận:

           source.options

        */

        options:

            existingSource.options ||

            {

                description: true,

                specification: true

            },


        imported:

            existingSource.imported ||

            false,


        importedAt:

            existingSource.importedAt ||

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


    /* ======================================
       TYPE
    ====================================== */

    const type =

        document.getElementById(

            "contentSourceType"

        );


    if (type) {

        type.value =

            source.type ||

            "website";

    }


    /* ======================================
       URL
    ====================================== */

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


/* ==========================================
   MARK IMPORT SUCCESS
========================================== */

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