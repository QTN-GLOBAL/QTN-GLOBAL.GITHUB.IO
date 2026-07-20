/* ==========================================
   PRODUCT SPECIFICATION
   STEP 4 / 6
========================================== */

function renderProductSpecification() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;

    body.innerHTML = `

    <div class="product-specification">

        <h3 class="product-step-title">

            Step 4 / 6 - Product Specification

        </h3>

        <div id="specificationContent"></div>

        <div class="step-buttons">

            <button
                type="button"
                onclick="backToContentImport()">

                ← Back

            </button>

            <button
                type="button"
                onclick="nextProductPreview()">

                Next →

            </button>

        </div>

    </div>

    `;

    renderSpecificationContent();

}

/* ==========================================
   CONTENT
========================================== */

function renderSpecificationContent() {

    const box =
        document.getElementById("specificationContent");

    if (!box) return;

    const product =
        window.currentProduct?.product;

    if (!product) {

        box.innerHTML = `

            <div class="import-status">

                Không có dữ liệu AI.

            </div>

        `;

        return;

    }

    box.innerHTML = `

<div class="ai-block">

    <h4>Description</h4>

    <textarea

        id="productDescription"

        class="form-control"

        style="width:100%;
               min-height:180px;
               resize:vertical;">

${product.description || ""}

    </textarea>

</div>

`;
}

/* ==========================================
   BACK
========================================== */

function backToContentImport() {

    renderProductContentImport();

}

/* ==========================================
   NEXT
========================================== */

function nextProductPreview() {

    saveSpecificationStep();

    console.log(currentProduct.product);

    alert("Step 5 sẽ làm tiếp.");

}
/* ==========================================
   SAVE DESCRIPTION
========================================== */

function saveSpecificationStep() {

    if (!window.currentProduct) return;

    if (!window.currentProduct.product) return;

    const description =

        document.getElementById(

            "productDescription"

        );

    if (description) {

        currentProduct.product.description =

            description.value.trim();

    }

}