/* ==========================================
   GALLERY UPLOAD
========================================== */

function initGalleryUpload() {

    const slots =
        document.querySelectorAll(".gallery-slot");

    if (!window.currentProduct.gallery) {

        window.currentProduct.gallery = [];

    }

    slots.forEach(function (slot, index) {

        const input =
            slot.querySelector(".gallery-input");

        const add =
            slot.querySelector(".gallery-add");

        if (!input || !add) return;

        /* =========================
           CLICK +
        ========================= */

        add.onclick = function () {

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
                   SAVE CURRENT PRODUCT
                ========================= */

                currentProduct.gallery[index] = {

                    name: file.name,

                    src: e.target.result

                };

                saveProductDraft();

                /* =========================
                   PREVIEW
                ========================= */

                slot.innerHTML = `

                    <img
                        src="${e.target.result}"
                        class="gallery-preview">

                    <input
                        type="file"
                        class="gallery-input"
                        accept="image/*"
                        hidden>

                    <div class="gallery-actions">

                        <button
                            class="replace-gallery"
                            type="button">

                            🔄

                        </button>

                        <button
                            class="remove-gallery"
                            type="button">

                            ❌

                        </button>

                    </div>

                `;

                const newInput =
                    slot.querySelector(".gallery-input");

                /* =========================
                   REPLACE
                ========================= */

                slot.querySelector(".replace-gallery").onclick =
                    function () {

                        newInput.click();

                    };

                /* =========================
                   REMOVE
                ========================= */

                slot.querySelector(".remove-gallery").onclick =
                    function () {

                        currentProduct.gallery[index] = null;

                        saveProductDraft();

                        slot.innerHTML = `

                            <input
                                type="file"
                                class="gallery-input"
                                accept="image/*"
                                hidden>

                            <div class="gallery-add">

                                +

                            </div>

                        `;

                        initGalleryUpload();

                    };

                /* =========================
                   REPLACE AGAIN
                ========================= */

                newInput.onchange =
                    input.onchange;

            };

            reader.readAsDataURL(file);

        };

    });

}