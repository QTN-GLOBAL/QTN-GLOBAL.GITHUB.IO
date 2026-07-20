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

        <div id="aiSpecificationContainer">

            Loading...

        </div>

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

    renderAISpecification();

}

/* ==========================================
   RENDER AI RESULT
========================================== */

function renderAISpecification() {

    const box =
        document.getElementById(
            "aiSpecificationContainer"
        );

    if (!box) return;

    const product =
        window.currentProduct?.importResult?.product;

    if (!product) {

        box.innerHTML = `

        <div class="import-status">

            No AI Result

        </div>

        `;

        return;

    }

    box.innerHTML = `

    <div class="ai-block">

        <h4>Description</h4>

        <div class="ai-description">

            ${product.description || ""}

        </div>

    </div>

    <div class="ai-block">

        <h4>Technical Specification</h4>

        ${renderSpecificationTable(
            product.specification
        )}

    </div>

    <div class="ai-block">

        <h4>Features</h4>

        ${renderSimpleList(
            product.features
        )}

    </div>

    <div class="ai-block">

        <h4>Applications</h4>

        ${renderSimpleList(
            product.applications
        )}

    </div>

    <div class="ai-block">

        <h4>Accessories</h4>

        ${renderSimpleList(
            product.accessories
        )}

    </div>

    `;

}

/* ==========================================
   TABLE
========================================== */

function renderSpecificationTable(list = []) {

    if (!list.length) {

        return "<p>No specification.</p>";

    }

    let html = `

    <table class="ai-spec-table">

        <thead>

            <tr>

                <th>Name</th>

                <th>Value</th>

            </tr>

        </thead>

        <tbody>

    `;

    list.forEach(item => {

        html += `

        <tr>

            <td>

                ${item.name || ""}

            </td>

            <td>

                ${item.value || ""}

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
   SIMPLE LIST
========================================== */

function renderSimpleList(list = []) {

    if (!list.length) {

        return "<p>Empty</p>";

    }

    let html = "<ul>";

    list.forEach(item => {

        html += `

        <li>

            ${item}

        </li>

        `;

    });

    html += "</ul>";

    return html;

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

    alert("Step 5 sẽ làm tiếp.");

}