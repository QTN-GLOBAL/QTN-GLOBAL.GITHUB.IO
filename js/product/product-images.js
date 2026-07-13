/* ==========================================
   PRODUCT IMAGES
========================================== */

function renderProductImages(){

    const container =
        document.getElementById("productFormContent");

    if(!container) return;

    container.innerHTML = `

        <div class="product-step">

            <h2>

                Step 2 / 6

            </h2>

            <h3>

                Product Images

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

                    Gallery

                </label>

                <input
                    type="file"
                    multiple
                    id="galleryImages">

            </div>

            <div class="step-buttons">

                <button
                    onclick="renderProductBasic()">

                    Back

                </button>

                <button
                    onclick="renderProductDescription()">

                    Next

                </button>

            </div>

        </div>

    `;

}