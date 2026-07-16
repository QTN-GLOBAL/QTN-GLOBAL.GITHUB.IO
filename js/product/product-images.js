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

    <input
        type="file"
        id="mainImageInput"
        accept="image/*"
        hidden>

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

   <div class="gallery-slot" data-index="0">

    <input
        type="file"
        class="gallery-input"
        accept="image/*"
        hidden>

    <div class="gallery-add">

        +

    </div>

</div>
    <div class="gallery-slot" data-index="1">

    <input
        type="file"
        class="gallery-input"
        accept="image/*"
        hidden>

    <div class="gallery-add">

        +

    </div>

</div>
   <div class="gallery-slot" data-index="2">

    <input
        type="file"
        class="gallery-input"
        accept="image/*"
        hidden>

    <div class="gallery-add">

        +

    </div>

</div>

    <div class="gallery-slot" data-index="3">

    <input
        type="file"
        class="gallery-input"
        accept="image/*"
        hidden>

    <div class="gallery-add">

        +

    </div>

</div>

  <div class="gallery-slot" data-index="4">

    <input
        type="file"
        class="gallery-input"
        accept="image/*"
        hidden>

    <div class="gallery-add">

        +

    </div>

</div>

   <div class="gallery-slot" data-index="5">

    <input
        type="file"
        class="gallery-input"
        accept="image/*"
        hidden>

    <div class="gallery-add">

        +

    </div>

</div>

</div>

            </div>

        </div>

        <div class="step-buttons">

            <button
    type="button"
    onclick="backToProductBasic()">

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
initProductImages();

}
/* ==========================================
   INIT PRODUCT IMAGES
========================================== */

function initProductImages() {

    initMainImageUpload();

    initGalleryUpload();

    loadProductImages();

}
/* ==========================================
   LOAD PRODUCT IMAGES
========================================== */

function loadProductImages() {

    if (!window.currentProduct) return;

    /* =========================
       MAIN IMAGE
    ========================= */

    if (!currentProduct.mainImage) return;

    const box =
        document.getElementById("mainImageBox");

    const input =
        document.getElementById("mainImageInput");

    if (!box || !input) return;

    box.innerHTML = `

        <img
            src="${currentProduct.mainImage.src}"
            class="main-image-preview">

        <div class="image-actions">

            <button
                id="replaceMainImage"
                type="button">

                🔄

            </button>

            <button
                id="removeMainImage"
                type="button">

                ❌

            </button>

        </div>

    `;

    document.getElementById("replaceMainImage").onclick =
        function () {

            input.click();

        };

    document.getElementById("removeMainImage").onclick =
        function () {

            input.value = "";

            currentProduct.mainImage = "";

            saveProductDraft();

            renderProductImages();

        };

}
/* ==========================================
   BACK TO STEP 1
========================================== */

function backToProductBasic() {

    saveProductImages();

    renderProductBasic();

}
/* ==========================================
   SAVE PRODUCT IMAGES
========================================== */

function saveProductImages() {

    if (!window.currentProduct) {

        window.currentProduct = {};

    }

    // Giữ nguyên nếu đã có
    if (!currentProduct.mainImage) {

        currentProduct.mainImage = "";

    }

    if (!currentProduct.gallery) {

        currentProduct.gallery = [];

    }

    // Lưu luôn Draft sau khi cập nhật Step 2
    saveProductDraft();

}