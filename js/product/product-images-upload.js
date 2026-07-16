/* ==========================================
   MAIN IMAGE UPLOAD
========================================== */

function initMainImageUpload() {

    const box =
        document.getElementById("mainImageBox");

    const input =
        document.getElementById("mainImageInput");

    if (!box || !input) return;

    /* =========================
       CLICK UPLOAD
    ========================= */

    box.onclick = function () {

        input.click();

    };

    /* =========================
       CHOOSE IMAGE
    ========================= */

    input.onchange = function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            /* =========================
               SAVE TO CURRENTPRODUCT
            ========================= */

            window.currentProduct.mainImage = {

                name: file.name,

                src: e.target.result

            };

            /* =========================
               SAVE DRAFT
            ========================= */

            saveProductDraft();

            /* =========================
               PREVIEW
            ========================= */

            box.innerHTML = `

                <img
                    src="${e.target.result}"
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

            /* =========================
               REPLACE
            ========================= */

            document.getElementById("replaceMainImage").onclick =
                function () {

                    input.click();

                };

            /* =========================
               REMOVE
            ========================= */

            document.getElementById("removeMainImage").onclick =
                function () {

                    input.value = "";

                    window.currentProduct.mainImage = "";

                    saveProductDraft();

                    renderProductImages();

                };

        };

        reader.readAsDataURL(file);

    };

}