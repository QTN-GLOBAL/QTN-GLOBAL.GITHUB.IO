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
   - Chuyển sang Step 4

   IMPORTANT:

   Step 3 KHÔNG quyết định cấu trúc cuối
   của sản phẩm.

   Step 4 sẽ xử lý dữ liệu theo cấu trúc
   sản phẩm chính của QTN GLOBAL / products.js.
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

                placeholder=
                "https://www.excell.vn/..."

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

                onclick=
                "backToProductImages()">

                ← Back

            </button>


            <button

                type="button"

                onclick=
                "nextProductContentImport()">

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

    saveProductDraft();


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
       
       sẽ gọi:
       
       POST
       http://localhost:3000/api/import
       
       thông qua file
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
           SAVE IMPORT RESULT
        ================================== */

        window.currentProduct.importResult =

            result;


        /* ==================================
           AI PRODUCT
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
           OLD PRODUCT

           Lấy dữ liệu Step 1
           từ currentProduct

           Không lấy trực tiếp toàn bộ
           từ currentProduct.product
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


            category:

                window.currentProduct.category ||


                window.currentProduct.product
                    ?.category ||


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


                "",


            folder:

                window.currentProduct.folder ||


                window.currentProduct.product
                    ?.folder ||


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
           
           AI bổ sung dữ liệu.
           
           Step 1 vẫn được ưu tiên đối với
           các trường quản lý sản phẩm:
           
           business
           category
           brand
           origin
           folder
        ================================== */

        const mergedProduct =

            mergeImportedProduct(

                oldProduct,

                aiProduct

            );


        /* ==================================
           PRESERVE STEP 1 DATA
        ================================== */

        if (

            window.currentProduct.business

        ) {

            mergedProduct.business =

                window.currentProduct.business;

        }


        if (

            window.currentProduct.category

        ) {

            mergedProduct.category =

                window.currentProduct.category;

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


        if (

            window.currentProduct.folder

        ) {

            mergedProduct.folder =

                window.currentProduct.folder;

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

   PURPOSE:

   - Giữ dữ liệu Step 1
   - Nhận dữ liệu AI
   - Không ghi đè dữ liệu quản lý
   - Chỉ lấy AI nếu có dữ liệu hợp lệ

   LƯU Ý:

   Step 3 không quyết định cấu trúc
   cuối cùng của products.js.

   Step 4 sẽ xử lý tiếp.
========================================== */

function mergeImportedProduct(

    oldProduct,

    aiProduct

) {

    const merged = {

        ...oldProduct

    };


    /* ======================================
       CHECK AI VALUE
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
    ====================================== */

    if (

        isValidAIValue(

            aiProduct.name

        )

    ) {

        merged.name =

            aiProduct.name;

    }


    /* ======================================
       DESCRIPTION
    ====================================== */

    if (

        isValidAIValue(

            aiProduct.description

        )

    ) {

        merged.description =

            aiProduct.description;

    }


    /* ======================================
       SPECIFICATION
       
       AI có thể trả về:
       
       specification
       
       Trong khi products.js hiện tại
       sử dụng:
       
       specs
       
       Step 4 sẽ chuẩn hóa tiếp.
    ====================================== */

    if (

        Array.isArray(

            aiProduct.specification

        ) &&

        aiProduct.specification.length > 0

    ) {

        merged.specification =

            aiProduct.specification;

    }


    /* ======================================
       GIỮ specs CŨ NẾU CÓ
    ====================================== */

    if (

        Array.isArray(

            aiProduct.specs

        ) &&

        aiProduct.specs.length > 0

    ) {

        merged.specs =

            aiProduct.specs;

    }


    /* ======================================
       OPTIONAL AI DATA
       
       Không hiển thị ở Step 3.
       
       Giữ lại trong dữ liệu import để
       Step 4 có thể xử lý sau nếu cần.
    ====================================== */

    if (

        Array.isArray(

            aiProduct.features

        ) &&

        aiProduct.features.length > 0

    ) {

        merged._aiFeatures =

            aiProduct.features;

    }


    if (

        Array.isArray(

            aiProduct.applications

        ) &&

        aiProduct.applications.length > 0

    ) {

        merged._aiApplications =

            aiProduct.applications;

    }


    if (

        Array.isArray(

            aiProduct.accessories

        ) &&

        aiProduct.accessories.length > 0

    ) {

        merged._aiAccessories =

            aiProduct.accessories;

    }


    return merged;

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


    let specificationCount = 0;


    if (

        Array.isArray(

            product?.specification

        )

    ) {

        specificationCount =

            product.specification.length;

    }


    else if (

        Array.isArray(

            product?.specs

        )

    ) {

        specificationCount =

            product.specs.length;

    }


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

            ${specificationCount}

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