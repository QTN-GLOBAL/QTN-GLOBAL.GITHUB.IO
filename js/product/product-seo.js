/* ==========================================
   PRODUCT SEO
   STEP 6 / 6
========================================== */


/* ==========================================
   RENDER PRODUCT SEO
========================================== */

function renderProductSEO() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;


    /* ==========================
       GET PRODUCT
    ========================== */

    const product =
        window.currentProduct?.product;


    /* ==========================
       CHECK PRODUCT
    ========================== */

    if (!product) {

        body.innerHTML = `

            <div class="product-seo">

                <h3 class="product-step-title">

                    Step 6 / 6 - Product SEO

                </h3>


                <div class="import-status">

                    Không có dữ liệu sản phẩm.

                </div>


                <div class="step-buttons">

                    <button

                        type="button"

                        onclick="backToProductPreview()">

                        ← Back

                    </button>

                </div>

            </div>

        `;

        return;

    }


    /* ==========================
       SEO DATA
    ========================== */

    const seo =
        product.seo || {};


    /* ==========================
       RENDER
    ========================== */

    body.innerHTML = `

    <div class="product-seo">


        <!-- =========================
             TITLE
        ========================== -->

        <h3 class="product-step-title">

            Step 6 / 6 - Product SEO

        </h3>



        <!-- =========================
             SEO TITLE
        ========================== -->

        <div class="form-group">

            <label>

                SEO Title

            </label>


            <input

                type="text"

                id="productSeoTitle"

                class="form-control"

                value="${escapeSEOHTML(

                    seo.title ||

                    product.name ||

                    ""

                )}"

                placeholder="Nhập SEO Title">

        </div>



        <!-- =========================
             META DESCRIPTION
        ========================== -->

        <div class="form-group">

            <label>

                Meta Description

            </label>


            <textarea

                id="productSeoDescription"

                class="form-control"

                style="width:100%;
                       min-height:120px;
                       resize:vertical;"

                placeholder="Nhập Meta Description">${escapeSEOHTML(

                    seo.description ||

                    product.description ||

                    ""

                )}</textarea>

        </div>



        <!-- =========================
             KEYWORDS
        ========================== -->

        <div class="form-group">

            <label>

                SEO Keywords

            </label>


            <input

                type="text"

                id="productSeoKeywords"

                class="form-control"

                value="${escapeSEOHTML(

                    Array.isArray(seo.keywords)

                        ? seo.keywords.join(", ")

                        : seo.keywords || ""

                )}"

                placeholder="cân điện tử, cân bàn, excell">

        </div>



        <!-- =========================
             SLUG
        ========================== -->

        <div class="form-group">

            <label>

                URL Slug

            </label>


            <input

                type="text"

                id="productSeoSlug"

                class="form-control"

                value="${escapeSEOHTML(

                    seo.slug ||

                    createProductSlug(

                        product.name || ""

                    )

                )}"

                placeholder="ten-san-pham">

        </div>



        <!-- =========================
             SEO PREVIEW
        ========================== -->

        <div class="seo-preview">

            <h4>

                Search Preview

            </h4>


            <div class="seo-preview-box">


                <div

                    id="seoPreviewTitle"

                    class="seo-preview-title">

                    ${escapeSEOHTML(

                        seo.title ||

                        product.name ||

                        ""

                    )}

                </div>


                <div

                    id="seoPreviewUrl"

                    class="seo-preview-url">

                    ${escapeSEOHTML(

                        seo.slug ||

                        createProductSlug(

                            product.name || ""

                        )

                    )}

                </div>


                <div

                    id="seoPreviewDescription"

                    class="seo-preview-description">

                    ${escapeSEOHTML(

                        seo.description ||

                        product.description ||

                        ""

                    )}

                </div>


            </div>

        </div>



        <!-- =========================
             STATUS
        ========================== -->

        <div

            id="productSeoStatus"

            class="import-status">

            Ready to Save

        </div>



        <!-- =========================
             BUTTONS
        ========================== -->

        <div class="step-buttons">


            <button

                type="button"

                onclick="backToProductPreview()">

                ← Back

            </button>


            <button

                type="button"

                onclick="saveFinalProduct()">

                ✓ Save Product

            </button>


        </div>


    </div>

    `;


    /* ==========================
       INIT SEO EVENTS
    ========================== */

    initProductSEO();

}


/* ==========================================
   INIT SEO
========================================== */

function initProductSEO() {

    console.log(

        "STEP 6 SEO READY"

    );


    const title =

        document.getElementById(

            "productSeoTitle"

        );


    const description =

        document.getElementById(

            "productSeoDescription"

        );


    const slug =

        document.getElementById(

            "productSeoSlug"

        );


    if (title) {

        title.addEventListener(

            "input",

            updateSEOPreview

        );

    }


    if (description) {

        description.addEventListener(

            "input",

            updateSEOPreview

        );

    }


    if (slug) {

        slug.addEventListener(

            "input",

            updateSEOPreview

        );

    }

}


/* ==========================================
   UPDATE SEO PREVIEW
========================================== */

function updateSEOPreview() {

    const title =

        document.getElementById(

            "productSeoTitle"

        )?.value || "";


    const description =

        document.getElementById(

            "productSeoDescription"

        )?.value || "";


    const slug =

        document.getElementById(

            "productSeoSlug"

        )?.value || "";


    const previewTitle =

        document.getElementById(

            "seoPreviewTitle"

        );


    const previewDescription =

        document.getElementById(

            "seoPreviewDescription"

        );


    const previewUrl =

        document.getElementById(

            "seoPreviewUrl"

        );


    if (previewTitle) {

        previewTitle.textContent =

            title;

    }


    if (previewDescription) {

        previewDescription.textContent =

            description;

    }


    if (previewUrl) {

        previewUrl.textContent =

            slug;

    }

}


/* ==========================================
   BACK TO PREVIEW
========================================== */

function backToProductPreview() {

    renderProductPreview();

}


/* ==========================================
   SAVE SEO
========================================== */

function saveProductSEO() {

    if (!window.currentProduct) {

        return;

    }


    if (!window.currentProduct.product) {

        return;

    }


    const product =

        window.currentProduct.product;


    const title =

        document.getElementById(

            "productSeoTitle"

        );


    const description =

        document.getElementById(

            "productSeoDescription"

        );


    const keywords =

        document.getElementById(

            "productSeoKeywords"

        );


    const slug =

        document.getElementById(

            "productSeoSlug"

        );


    product.seo = {

        title:

            title?.value.trim() || "",


        description:

            description?.value.trim() || "",


        keywords:

            keywords

                ? keywords.value

                    .split(",")

                    .map(

                        item =>

                            item.trim()

                    )

                    .filter(Boolean)

                : [],


        slug:

            slug?.value.trim() || ""

    };


    console.log("");

    console.log(

        "========== SEO SAVED =========="

    );


    console.log(

        product.seo

    );


    console.log(

        "==============================="

    );

}


/* ==========================================
   SAVE FINAL PRODUCT
========================================== */

function saveFinalProduct() {

    /* ==========================
       SAVE SEO
    ========================== */

    saveProductSEO();


    /* ==========================
       SAVE DRAFT
    ========================== */

    if (

        typeof saveProductDraft ===

        "function"

    ) {

        saveProductDraft();

    }


    /* ==========================
       STATUS
    ========================== */

    const status =

        document.getElementById(

            "productSeoStatus"

        );


    if (status) {

        status.innerHTML =

            "✅ Product đã được lưu.";

    }


    /* ==========================
       DEBUG
    ========================== */

    console.log("");

    console.log(

        "========== FINAL PRODUCT =========="

    );


    console.log(

        window.currentProduct?.product

    );


    console.log(

        "===================================="

    );


    /* ==========================
       TEMPORARY MESSAGE
    ========================== */

    alert(

        "Product đã được lưu vào Draft."

    );

}


/* ==========================================
   CREATE SLUG
========================================== */

function createProductSlug(name) {

    if (!name) return "";


    return String(name)

        .toLowerCase()

        .normalize("NFD")

        .replace(

            /[\u0300-\u036f]/g,

            ""

        )

        .replace(

            /đ/g,

            "d"

        )

        .replace(

            /[^a-z0-9]+/g,

            "-"

        )

        .replace(

            /^-+|-+$/g,

            "");

}


/* ==========================================
   ESCAPE HTML
========================================== */

function escapeSEOHTML(value) {

    if (

        value === null ||

        value === undefined

    ) {

        return "";

    }


    return String(value)

        .replace(

            /&/g,

            "&amp;"

        )

        .replace(

            /</g,

            "&lt;"

        )

        .replace(

            />/g,

            "&gt;"

        )

        .replace(

            /"/g,

            "&quot;"

        )

        .replace(

            /'/g,

            "&#039;"

        );

}