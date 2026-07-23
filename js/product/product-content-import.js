/* =====================================================
   PRODUCT CONTENT IMPORT
   STEP 3 / 6

   VERSION
   -----------------------------------------------------
   Version 5 - RAW SOURCE PRESERVATION

   PURPOSE
   -----------------------------------------------------
   - Nhập URL sản phẩm
   - Gọi ProductImportEngine
   - Nhận dữ liệu từ Backend
   - GIỮ NGUYÊN dữ liệu Backend trả về
   - Không tự phân loại Description / Specification
   - Không tự tách nội dung thành Specification Text
   - Không tự ép nội dung vào Table
   - Không tự nối các đoạn văn thành một đoạn
   - Giữ nguyên Product Images
   - Chuyển dữ liệu sang Step 4

   DATA FLOW

   ProductImportEngine
          ↓
   Backend
          ↓
   result
          ↓
   extractImportedProduct()
          ↓
   preserveImportedProduct()
          ↓
   mergeImportedProduct()
          ↓
   currentProduct.product
          ↓
   renderProductSpecification()

   IMPORTANT
   -----------------------------------------------------
   Step 3 KHÔNG chịu trách nhiệm:

   - chỉnh sửa Description
   - chia Description
   - gộp Description
   - tạo Specification Text
   - tạo Specification Table
   - chuyển Description sang Specs
   - chuyển Specs sang Description

   Step 4 mới là nơi người dùng chỉnh sửa thủ công.

===================================================== */


/* =====================================================
   RENDER STEP 3
===================================================== */

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

                    ✓ Technical Specification

                </div>


                <div>

                    ✓ Product Images

                </div>

            </div>


            <small>

                Dữ liệu sẽ được nhận từ Website
                và giữ nguyên cấu trúc mà Backend
                trả về để xử lý ở Step 4.

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


/* =====================================================
   INIT
===================================================== */

function initProductContentImport() {

    console.log(
        "STEP 3 READY"
    );


    loadProductContentImport();

}


/* =====================================================
   BACK TO STEP 2
===================================================== */

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


/* =====================================================
   NEXT
===================================================== */

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


        console.log("");

        console.log(

            "========== RAW IMPORT RESULT =========="

        );

        console.log(

            result

        );

        console.log(

            "======================================="

        );


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

            "======================================="

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
           PRESERVE IMPORTED PRODUCT

           KHÔNG NORMALIZE NỘI DUNG

           Chỉ copy dữ liệu Backend.
        ====================================== */

        const preservedProduct =

            preserveImportedProduct(

                importedProduct

            );


        /* =====================================
           DEBUG PRESERVED PRODUCT
        ====================================== */

        console.log("");

        console.log(

            "========== PRESERVED PRODUCT =========="

        );

        console.log(

            preservedProduct

        );

        console.log(

            "======================================="

        );


        /* =====================================
           MERGE
        ====================================== */

        const mergedProduct =

            mergeImportedProduct(

                oldProduct,

                preservedProduct

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

           Không sử dụng:

           product.specification

           Chỉ giữ:

           product.specs
        ====================================== */

        delete mergedProduct.specification;


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


        /* =====================================
           DEBUG DESCRIPTION
        ====================================== */

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


        /* =====================================
           DEBUG SPECS
        ====================================== */

        console.log("");

        console.log(

            "========== SPECS =========="

        );

        console.log(

            window.currentProduct.product

                .specs

        );

        console.log(

            "==========================="

        );


        /* =====================================
           DEBUG IMAGES
        ====================================== */

        console.log("");

        console.log(

            "========== IMAGES =========="

        );

        console.log(

            window.currentProduct.product

                .images

        );

        console.log(

            "============================"

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


        console.error(

            "renderProductSpecification is not defined."

        );

        alert(

            "Import thành công nhưng chưa kết nối được Step 4."

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


/* =====================================================
   EXTRACT IMPORTED PRODUCT

   Hỗ trợ:

   result.product

   result.result.product

   result.data.product

   result.data

===================================================== */

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

       Nếu data là product
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

            result.data.name !== undefined ||

            result.data.description !== undefined ||

            result.data.specs !== undefined ||

            result.data.specification !== undefined ||

            result.data.images !== undefined

        ) {

            return result.data;

        }

    }


    return {};

}


/* =====================================================
   PRESERVE IMPORTED PRODUCT

   IMPORTANT

   Không normalize nội dung.

   Không:

   - join array
   - split string
   - trim HTML
   - chuyển object thành text
   - chuyển specs thành description
   - chuyển description thành specs

   Chỉ sao chép dữ liệu nhận được.

===================================================== */

function preserveImportedProduct(

    importedProduct

) {


    if (

        !importedProduct ||

        typeof importedProduct !==
        "object"

    ) {

        return {};

    }


    const preserved = {

        ...importedProduct

    };


    /* =========================================
       DESCRIPTION

       GIỮ NGUYÊN GIÁ TRỊ

       Có thể là:

       string
       HTML string
       array
       object

       Không biến đổi.
    ========================================== */

    if (

        Object.prototype.hasOwnProperty.call(

            importedProduct,

            "description"

        )

    ) {

        preserved.description =

            importedProduct.description;

    }


    /* =========================================
       SPECS

       GIỮ NGUYÊN GIÁ TRỊ

       Không ép thành:

       table
       text

       nếu Backend không trả như vậy.
    ========================================== */

    if (

        Object.prototype.hasOwnProperty.call(

            importedProduct,

            "specs"

        )

    ) {

        preserved.specs =

            importedProduct.specs;

    }


    /* =========================================
       LEGACY SPECIFICATION

       Nếu Backend chỉ trả:

       specification

       thì giữ tạm trong product.

       Sau đó merge sẽ chuyển sang specs
       nếu cần.

    ========================================== */

    if (

        !Object.prototype.hasOwnProperty.call(

            importedProduct,

            "specs"

        ) &&

        Object.prototype.hasOwnProperty.call(

            importedProduct,

            "specification"

        )

    ) {

        preserved.specification =

            importedProduct.specification;

    }


    /* =========================================
       IMAGES

       GIỮ NGUYÊN MẢNG ẢNH
    ========================================== */

    if (

        Array.isArray(

            importedProduct.images

        )

    ) {

        preserved.images =

            [

                ...importedProduct.images

            ];

    }


    return preserved;

}


/* =====================================================
   MERGE IMPORTED PRODUCT

   NGUYÊN TẮC

   1. Step 1 giữ nguyên dữ liệu lựa chọn.

   2. Nội dung từ Website được copy nguyên trạng.

   3. Không normalize Description.

   4. Không normalize Specs.

   5. Không tự tạo Specification Text.

===================================================== */

function mergeImportedProduct(

    oldProduct,

    importedProduct

) {


    const merged = {

        ...oldProduct

    };


    if (

        !importedProduct ||

        typeof importedProduct !==
        "object"

    ) {

        return merged;

    }


    /* =========================================
       NAME
    ========================================== */

    if (

        Object.prototype.hasOwnProperty.call(

            importedProduct,

            "name"

        )

    ) {

        if (

            importedProduct.name !==
            null &&

            importedProduct.name !==
            undefined

        ) {

            merged.name =

                importedProduct.name;

        }

    }


    /* =========================================
       DESCRIPTION

       COPY NGUYÊN TRẠNG

    ========================================== */

    if (

        Object.prototype.hasOwnProperty.call(

            importedProduct,

            "description"

        )

    ) {

        merged.description =

            importedProduct.description;

    }


    /* =========================================
       SPECS

       COPY NGUYÊN TRẠNG

    ========================================== */

    if (

        Object.prototype.hasOwnProperty.call(

            importedProduct,

            "specs"

        )

    ) {

        merged.specs =

            importedProduct.specs;

    }


    /* =========================================
       LEGACY SPECIFICATION

       Nếu Backend chưa dùng specs

       Chuyển nguyên trạng sang specs.

       Không biến đổi nội dung.

    ========================================== */

    else if (

        Object.prototype.hasOwnProperty.call(

            importedProduct,

            "specification"

        )

    ) {

        merged.specs =

            importedProduct.specification;

    }


    /* =========================================
       IMAGES

       COPY NGUYÊN TRẠNG
    ========================================== */

    if (

        Array.isArray(

            importedProduct.images

        )

    ) {

        merged.images =

            [

                ...importedProduct.images

            ];

    }


    /* =========================================
       OTHER IMPORTED DATA

       Giữ lại các trường khác mà Backend
       trả về nếu Step 1 chưa có.
    ========================================== */

    Object.keys(

        importedProduct

    ).forEach(

        key => {


            if (

                key === "name" ||

                key === "description" ||

                key === "specs" ||

                key === "specification" ||

                key === "images"

            ) {

                return;

            }


            if (

                merged[key] ===
                undefined

            ) {

                merged[key] =

                    importedProduct[key];

            }

        }

    );


    /* =========================================
       REMOVE LEGACY FIELD
    ========================================== */

    delete merged.specification;


    return merged;

}


/* =====================================================
   PREVIEW IMPORT RESULT

   Preview chỉ hiển thị thông tin tổng quan.

   Không sửa dữ liệu.

===================================================== */

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

        product?.description;


    const specs =

        product?.specs;


    const images =

        Array.isArray(

            product?.images

        )

            ? product.images

            : [];


    /* =========================================
       DESCRIPTION PREVIEW

       Nếu HTML:

       Render HTML.

       Nếu string:

       Giữ xuống dòng.

       Nếu array:

       Hiển thị từng item riêng.

    ========================================== */

    let descriptionHTML =

        "Chưa có mô tả";


    if (

        typeof description ===
        "string"

    ) {

        if (

            /<[^>]+>/.test(

                description

            )

        ) {

            descriptionHTML =

                description;

        }

        else {

            descriptionHTML =

                escapeContentImportHTML(

                    description

                )

                    .replace(

                        /\n/g,

                        "<br>"

                    );

        }

    }


    else if (

        Array.isArray(

            description

        )

    ) {

        descriptionHTML =

            description

                .map(

                    item =>

                        `

                        <div>

                            ${

                                escapeContentImportHTML(

                                    item

                                )

                            }

                        </div>

                        `

                )

                .join("");

    }


    else if (

        description &&

        typeof description ===
        "object"

    ) {

        descriptionHTML =

            escapeContentImportHTML(

                JSON.stringify(

                    description

                )

            );

    }


    /* =========================================
       SPECS PREVIEW

       Chỉ đếm dữ liệu.

       Không thay đổi.
    ========================================== */

    let specsInfo =

        "Đã nhận dữ liệu";


    if (

        specs === null ||

        specs === undefined

    ) {

        specsInfo =

            "Chưa có thông số";

    }


    else if (

        Array.isArray(

            specs

        )

    ) {

        specsInfo =

            `${

                specs.length

            } item(s)`;

    }


    else if (

        typeof specs ===
        "object"

    ) {

        specsInfo =

            `${

                Object.keys(

                    specs

                ).length

            } field(s)`;

    }


    else {

        specsInfo =

            "Đã nhận dữ liệu";

    }


    content.innerHTML = `

        <div>

            <strong>

                Product Name:

            </strong>

            ${

                escapeContentImportHTML(

                    name

                )

            }

        </div>


        <div>

            <strong>

                Product Description:

            </strong>


            <div

                class="import-description-preview"

            >

                ${

                    descriptionHTML

                }

            </div>

        </div>


        <div>

            <strong>

                Technical Specification:

            </strong>

            ${

                escapeContentImportHTML(

                    specsInfo

                )

            }

        </div>


        <div>

            <strong>

                Product Images:

            </strong>

            ${

                images.length

            }

            image(s)

        </div>

    `;


    preview.style.display =

        "block";

}


/* =====================================================
   ESCAPE HTML

   Chỉ dùng cho dữ liệu hiển thị an toàn.

   Không dùng để lưu dữ liệu sản phẩm.

===================================================== */

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

            : String(

                value

            );


    return div.innerHTML;

}


/* =====================================================
   SAVE CONTENT IMPORT
===================================================== */

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


/* =====================================================
   LOAD CONTENT IMPORT
===================================================== */

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


/* =====================================================
   MARK IMPORT SUCCESS
===================================================== */

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


/* =====================================================
   OPTIONAL DEBUG HELPER

   Có thể gọi trong Console:

   debugImportedProduct()

===================================================== */

function debugImportedProduct() {


    console.log("");

    console.log(

        "========================================"

    );

    console.log(

        "CURRENT PRODUCT DEBUG"

    );

    console.log(

        "========================================"

    );


    console.log(

        "SOURCE:",

        window.currentProduct?.source

    );


    console.log(

        "RAW IMPORT RESULT:",

        window.currentProduct?.importResult

    );


    console.log(

        "FINAL PRODUCT:",

        window.currentProduct?.product

    );


    console.log(

        "DESCRIPTION:",

        window.currentProduct?.product?.description

    );


    console.log(

        "SPECS:",

        window.currentProduct?.product?.specs

    );


    console.log(

        "IMAGES:",

        window.currentProduct?.product?.images

    );


    console.log(

        "========================================"

    );

}