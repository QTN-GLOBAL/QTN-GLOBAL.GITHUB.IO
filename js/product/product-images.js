/* ==========================================
   PRODUCT IMAGES
========================================== */

function renderProductImages() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;

    body.innerHTML = `

        <div class="product-step">

            <h3 class="product-step-title">

                Step 2 / 6 - Product Images

            </h3>

            <div class="form-group">

                <label>

                    Main Image

                </label>

                <input
                    type="file"
                    id="mainImage">

            </div>

            <div class="form-group">

                <label>

                    Gallery Images

                </label>

                <input
                    type="file"
                    multiple
                    id="galleryImages">

            </div>

            <div class="step-buttons">

                <button
                    type="button"
                    onclick="renderProductBasic()">

                    ← Back

                </button>

                <button
                    type="button"
                    onclick="alert('Step 3 đang phát triển...')">

                    Next →

                </button>

            </div>

        </div>

    `;

}