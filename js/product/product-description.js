/* ==========================================
   PRODUCT DESCRIPTION
   STEP 3
========================================== */

function renderProductDescription() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;

    body.innerHTML = `

    <div class="product-description">

        <h3 class="product-step-title">

            Step 3 / 6 - Product Description

        </h3>

        <!-- =========================
             VIETNAMESE
        ========================== -->

        <div class="form-group">

            <label>

                🇻🇳 Vietnamese

            </label>

            <textarea

                id="descriptionVi"

                rows="10"

                placeholder="Nhập mô tả sản phẩm bằng tiếng Việt...">

            </textarea>

        </div>

        <!-- =========================
             ENGLISH
        ========================== -->

        <div class="form-group">

            <label>

                🇬🇧 English

            </label>

            <textarea

                id="descriptionEn"

                rows="10"

                placeholder="Product description in English...">

            </textarea>

        </div>

        <!-- =========================
             CHINESE
        ========================== -->

        <div class="form-group">

            <label>

                🇨🇳 Chinese

            </label>

            <textarea

                id="descriptionZh"

                rows="10"

                placeholder="产品描述...">

            </textarea>

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

                onclick="alert('Step 4 sẽ làm sau')">

                Next →

            </button>

        </div>

    </div>

    `;

}
/* ==========================================
   BACK TO STEP 2
========================================== */

function backToProductImages() {

    renderProductImages();

}