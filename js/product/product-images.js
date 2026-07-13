/* ==========================================
   PRODUCT IMAGES
========================================== */

function renderProductImages() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;

    body.innerHTML = `

    <div class="product-images">

        <h3 class="product-step-title">

            Step 2 / 6 - Product Images

        </h3>

        <div class="product-image-layout">

            <!-- =========================
                 MAIN IMAGE
            ========================== -->

            <div class="main-image-panel">

                <label class="panel-title">

                    Main Image

                </label>

                <div
                    class="image-upload-box"
                    id="mainImageBox">

                    <div class="upload-icon">

                        📷

                    </div>

                    <div>

                        Click to upload

                    </div>

                </div>

            </div>

            <!-- =========================
                 GALLERY
            ========================== -->

            <div class="gallery-panel">

                <label class="panel-title">

                    Gallery Images

                </label>

                <div class="gallery-grid">

                    <div class="gallery-add">+</div>
                    <div class="gallery-add">+</div>
                    <div class="gallery-add">+</div>

                    <div class="gallery-add">+</div>
                    <div class="gallery-add">+</div>
                    <div class="gallery-add">+</div>

                </div>

            </div>

        </div>

        <div class="step-buttons">

            <button
                type="button"
                onclick="renderProductBasic()">

                ← Back

            </button>

            <button
                type="button"
                onclick="alert('Step 3 sẽ làm sau')">

                Next →

            </button>

        </div>

    </div>

    `;

}