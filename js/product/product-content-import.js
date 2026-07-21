/* ==========================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   PURPOSE:

   - Nhập URL sản phẩm
   - Gọi ProductImportEngine
   - Giữ nguyên API Import hiện tại
   - Nhận dữ liệu từ Backend / Free Parser / AI
   - Chuẩn hóa dữ liệu về cấu trúc products.js
   - Chỉ sử dụng:
        product.specs

   IMPORTANT:

   Không sử dụng song song:

        specification
        specs

   Sau Step 3:

        currentProduct.product.specs

   là nguồn dữ liệu duy nhất cho
   Technical Specification ở Step 4.
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

                Imported Content

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
        typeof saveProductDraft === "function"
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

       ProductImportEngine.import(source)

       API bên trong ProductImportEngine
       không thay đổi.
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
           SAVE RAW IMPORT RESULT

           Giữ nguyên kết quả gốc để
           có thể debug khi cần.

           Không dùng trực tiếp làm
           cấu trúc sản phẩm cuối.
        ================================== */

        window.currentProduct.importResult =

            result;


        /* ==================================
           GET IMPORTED PRODUCT
        ================================== */

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


        /* ==================================
           OLD PRODUCT

           Lấy dữ liệu quản lý từ Step 1.

           Step 1 luôn được ưu tiên cho:

           business
           category
           brand
           origin
           folder
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
           DEBUG RAW IMPORT
        ================================== */

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


        /* ==================================
           NORMALIZE IMPORTED PRODUCT

           Đây là điểm quan trọng.

           Mọi dữ liệu:

              specification
              specs

           đều được đưa về:

              specs

           Không giữ specification.
        ================================== */

        const normalizedProduct =

            normalizeImportedProduct(

                importedProduct

            );


        /* ==================================
           MERGE PRODUCT

           Step 1 + Import

           Kết quả cuối:

              currentProduct.product

           phải có:

              specs

           Không có:

              specification
        ================================== */

        const mergedProduct =

            mergeImportedProduct(

                oldProduct,

                normalizedProduct

            );


        /* ==================================
           PRESERVE STEP 1 DATA

           Step 1 luôn được ưu tiên.
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
           FINAL CLEAN

           Tuyệt đối không để
           specification tồn tại.

           Chỉ dùng:

              specs
        ================================== */

        delete mergedProduct.specification;


        /* ==================================
           SAVE MERGED PRODUCT
        ================================== */

        window.currentProduct.product =

            mergedProduct;


        /* ==================================
           DEBUG NORMALIZED PRODUCT
        ================================== */

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


        /* ==================================
           VERIFY SPECS
        ================================== */

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
           SAVE SOURCE
        ================================== */

        markProductContentImported();


        saveProductContentImport();


        /* ==================================
           SAVE DRAFT
        ================================== */

        if (

            typeof saveProductDraft === "function"

        ) {

            saveProductDraft();

        }


        /* ==================================
           STEP 4

           Step 4 sẽ đọc:

              currentProduct.product.specs
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
   NORMALIZE IMPORTED PRODUCT

   MỤC TIÊU:

   Tất cả dữ liệu Import phải có
   một cấu trúc duy nhất:

       specs

   Các nguồn có thể trả:

       specification
       specs

   Kết quả luôn:

       specs

   Và:

       specification = undefined
========================================== */

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


    /* ======================================
       NORMALIZE SPECS
    ====================================== */

    let specs = [];


    /* ======================================
       CASE 1

       Backend / Parser trả:

           specs
    ====================================== */

    if (

        Array.isArray(

            importedProduct.specs

        )

    ) {

        specs =

            importedProduct.specs;

    }


    /* ======================================
       CASE 2

       Free Parser / AI cũ trả:

           specification
       
       Chuyển sang:

           specs
    ====================================== */

    else if (

        Array.isArray(

            importedProduct.specification

        )

    ) {

        specs =

            importedProduct.specification;

    }


    /* ======================================
       NORMALIZE SPECS ITEMS

       products.js hiện tại cho phép:

       1. String

       Ví dụ:

       "Độ phân giải nội: 1/30.000"

       2. HTML String

       Ví dụ:

       "<table>...</table>"

       3. Object

       Ví dụ:

       {
           name: "Mức cân",
           value: "30kg"
       }

       Giữ nguyên tất cả dạng dữ liệu
       để Step 4 xử lý.
    ====================================== */

    normalized.specs =

        specs.map(item => {

            if (

                item === null ||

                item === undefined

            ) {

                return "";

            }


            if (

                typeof item === "string"

            ) {

                return item.trim();

            }


            if (

                typeof item === "object"

            ) {

                return {

                    name:

                        item.name !== undefined

                            ? String(item.name).trim()

                            : "",


                    value:

                        item.value !== undefined

                            ? String(item.value).trim()

                            : ""

                };

            }


            return String(item);

        });


    /* ======================================
       REMOVE OLD FIELD

       Không cho phép 2 luồng tồn tại.
    ====================================== */

    delete normalized.specification;


    return normalized;

}


/* ==========================================
   MERGE IMPORTED PRODUCT

   PURPOSE:

   - Giữ dữ liệu Step 1
   - Nhận dữ liệu Import
   - Chỉ lấy dữ liệu Import hợp lệ
   - Chỉ sử dụng specs

   KHÔNG TẠO:

       specification

   KHÔNG TẠO:

       _aiFeatures

       _aiApplications

       _aiAccessories
========================================== */

function mergeImportedProduct(

    oldProduct,

    importedProduct

) {

    const merged = {

        ...oldProduct

    };


    /* ======================================
       CHECK VALID VALUE
    ====================================== */

    function isValidImportedValue(value) {

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

        isValidImportedValue(

            importedProduct.name

        )

    ) {

        merged.name =

            importedProduct.name;

    }


    /* ======================================
       DESCRIPTION
    ====================================== */

    if (

        isValidImportedValue(

            importedProduct.description

        )

    ) {

        merged.description =

            importedProduct.description;

    }


    /* ======================================
       SPECS

       ĐÂY LÀ FIELD DUY NHẤT.

       Không dùng specification.
    ====================================== */

    if (

        Array.isArray(

            importedProduct.specs

        ) &&

        importedProduct.specs.length > 0

    ) {

        merged.specs =

            importedProduct.specs;

    }


    /* ======================================
       IMAGES

       Nếu Import Engine trả về images
       thì giữ lại.

       Không xử lý UI hình ảnh ở Step 3.
    ====================================== */

    if (

        Array.isArray(

            importedProduct.images

        ) &&

        importedProduct.images.length > 0

    ) {

        merged.images =

            importedProduct.images;

    }


    /* ======================================
       FINAL CLEAN

       Không bao giờ để specification
       tồn tại trong currentProduct.product.
    ====================================== */

    delete merged.specification;


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