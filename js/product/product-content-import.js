/* ==========================================
   PRODUCT CONTENT IMPORT
   STEP 3
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

    console.log("STEP 3 READY");

}

/* ==========================================
   BACK
========================================== */

function backToProductImages() {

    renderProductImages();

}

/* ==========================================
   NEXT
========================================== */

function nextProductContentImport() {

    alert("Version 1: Save Source URL sẽ làm ở bước tiếp theo.");

}