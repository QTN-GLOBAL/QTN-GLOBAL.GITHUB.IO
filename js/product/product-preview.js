/* ==========================================
   PRODUCT PREVIEW
   STEP 5 / 6
========================================== */


/* ==========================================
   RENDER PRODUCT PREVIEW
========================================== */

function renderProductPreview() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;


    /* ==========================
       CHECK PRODUCT
    ========================== */

    const product =
        window.currentProduct?.product;


    if (!product) {

        body.innerHTML = `

            <div class="product-preview">

                <h3 class="product-step-title">

                    Step 5 / 6 - Product Preview

                </h3>


                <div class="import-status">

                    Không có dữ liệu sản phẩm.

                </div>


                <div class="step-buttons">

                    <button

                        type="button"

                        onclick="backToProductSpecification()">

                        ← Back

                    </button>

                </div>

            </div>

        `;

        return;

    }


    /* ==========================
       RENDER
    ========================== */

    body.innerHTML = `

    <div class="product-preview">


        <!-- =========================
             TITLE
        ========================== -->

        <h3 class="product-step-title">

            Step 5 / 6 - Product Preview

        </h3>



        <!-- =========================
             BASIC INFORMATION
        ========================== -->

        <div class="preview-section">

            <h4>

                Product Information

            </h4>


            <div class="preview-grid">


                <div class="preview-item">

                    <strong>

                        Product Name

                    </strong>

                    <span>

                        ${escapePreviewHTML(

                            product.name || ""

                        )}

                    </span>

                </div>



                <div class="preview-item">

                    <strong>

                        Brand

                    </strong>

                    <span>

                        ${escapePreviewHTML(

                            product.brand || ""

                        )}

                    </span>

                </div>



                <div class="preview-item">

                    <strong>

                        Origin

                    </strong>

                    <span>

                        ${escapePreviewHTML(

                            product.origin || ""

                        )}

                    </span>

                </div>


            </div>

        </div>



        <!-- =========================
             DESCRIPTION
        ========================== -->

        <div class="preview-section">

            <h4>

                Description

            </h4>


            <div class="preview-description">

                ${escapePreviewHTML(

                    product.description || ""

                )}

            </div>

        </div>



        <!-- =========================
             TECHNICAL SPECIFICATION
        ========================== -->

        <div class="preview-section">

            <h4>

                Technical Specification

            </h4>


            <div id="previewSpecification">

                ${renderPreviewSpecification(

                    product.specification

                )}

            </div>

        </div>



        <!-- =========================
             FEATURES
        ========================== -->

        <div class="preview-section">

            <h4>

                Features

            </h4>


            <div id="previewFeatures">

                ${renderPreviewList(

                    product.features

                )}

            </div>

        </div>



        <!-- =========================
             APPLICATIONS
        ========================== -->

        <div class="preview-section">

            <h4>

                Applications

            </h4>


            <div id="previewApplications">

                ${renderPreviewList(

                    product.applications

                )}

            </div>

        </div>



        <!-- =========================
             ACCESSORIES
        ========================== -->

        <div class="preview-section">

            <h4>

                Accessories

            </h4>


            <div id="previewAccessories">

                ${renderPreviewList(

                    product.accessories

                )}

            </div>

        </div>



        <!-- =========================
             BUTTONS
        ========================== -->

        <div class="step-buttons">


            <button

                type="button"

                onclick="backToProductSpecification()">

                ← Back

            </button>


            <button

                type="button"

                onclick="nextProductSEO()">

                Next →

            </button>


        </div>


    </div>

    `;

}


/* ==========================================
   BACK TO SPECIFICATION
========================================== */

function backToProductSpecification() {

    renderProductSpecification();

}


/* ==========================================
   NEXT TO SEO
========================================== */

function nextProductSEO() {

    console.log("");

    console.log(

        "========== PRODUCT PREVIEW =========="

    );

    console.log(

        window.currentProduct?.product

    );

    console.log(

        "====================================="

    );


    renderProductSEO();

}


/* ==========================================
   ESCAPE HTML
========================================== */

function escapePreviewHTML(value) {

    if (value === null ||

        value === undefined) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* ==========================================
   RENDER SPECIFICATION
========================================== */

function renderPreviewSpecification(

    specification = []

) {

    if (!Array.isArray(specification) ||

        specification.length === 0) {

        return `

            <div class="preview-empty">

                Chưa có thông số kỹ thuật.

            </div>

        `;

    }


    let html = `

        <table class="preview-spec-table">

            <thead>

                <tr>

                    <th>

                        Name

                    </th>

                    <th>

                        Value

                    </th>

                </tr>

            </thead>

            <tbody>

    `;


    specification.forEach(item => {

        html += `

            <tr>

                <td>

                    ${escapePreviewHTML(

                        item.name || ""

                    )}

                </td>

                <td>

                    ${escapePreviewHTML(

                        item.value || ""

                    )}

                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

    `;


    return html;

}


/* ==========================================
   RENDER LIST
========================================== */

function renderPreviewList(

    list = []

) {

    if (!Array.isArray(list) ||

        list.length === 0) {

        return `

            <div class="preview-empty">

                Chưa có dữ liệu.

            </div>

        `;

    }


    let html = `

        <ul class="preview-list">

    `;


    list.forEach(item => {

        html += `

            <li>

                ${escapePreviewHTML(

                    typeof item === "string"

                        ? item

                        : item.name || ""

                )}

            </li>

        `;

    });


    html += `

        </ul>

    `;


    return html;

}