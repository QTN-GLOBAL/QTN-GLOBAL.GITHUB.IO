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

    let specificationHTML = "";

    (product.specification || []).forEach((item, index) => {

        specificationHTML += `

        <tr>

            <td>

                <input
                    class="spec-name"
                    data-index="${index}"
                    value="${item.name || ""}">

            </td>

            <td>

                <input
                    class="spec-value"
                    data-index="${index}"
                    value="${item.value || ""}">

            </td>

            <td>

                <button
                    type="button"
                    onclick="removeSpecification(${index})">

                    ❌

                </button>

            </td>

        </tr>

        `;

    });

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

<div class="ai-block">

    <h4>Technical Specification</h4>

    <table
        class="spec-table"
        style="width:100%;border-collapse:collapse;">

        <thead>

            <tr>

                <th>Name</th>

                <th>Value</th>

                <th></th>

            </tr>

        </thead>

        <tbody>

            ${specificationHTML}

        </tbody>

    </table>

    <br>

    <button

        type="button"

        onclick="addSpecification()">

        + Add Specification

    </button>

</div>

`;

}

/* ==========================================
   ADD SPECIFICATION
========================================== */

function addSpecification() {

    if (!currentProduct.product.specification) {

        currentProduct.product.specification = [];

    }

    currentProduct.product.specification.push({

        name: "",

        value: ""

    });

    renderSpecificationContent();

}

/* ==========================================
   REMOVE SPECIFICATION
========================================== */

function removeSpecification(index) {

    currentProduct.product.specification.splice(index,1);

    renderSpecificationContent();

}

/* ==========================================
   SAVE
========================================== */

function saveSpecificationStep() {

    if (!window.currentProduct) return;

    if (!window.currentProduct.product) return;

    const description =
        document.getElementById("productDescription");

    if (description) {

        currentProduct.product.description =
            description.value.trim();

    }

    document
        .querySelectorAll(".spec-name")
        .forEach(input=>{

            const i = input.dataset.index;

            currentProduct.product.specification[i].name =
                input.value;

        });

    document
        .querySelectorAll(".spec-value")
        .forEach(input=>{

            const i = input.dataset.index;

            currentProduct.product.specification[i].value =
                input.value;

        });

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