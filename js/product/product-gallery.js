/* ==========================================
   PRODUCT GALLERY
   PART 1
========================================== */

function initGalleryUpload() {

    if (!window.currentProduct) {

        window.currentProduct = {};

    }

    if (!Array.isArray(window.currentProduct.gallery)) {

        window.currentProduct.gallery = [];

    }

    const slots =
        document.querySelectorAll(".gallery-slot");

    slots.forEach((slot, index) => {

        bindGallerySlot(slot, index);

    });

}

/* ==========================================
   BIND ONE SLOT
========================================== */

function bindGallerySlot(slot, index) {

    const input =
        slot.querySelector(".gallery-input");

    const add =
        slot.querySelector(".gallery-add");

    if (!input) return;

    if (add) {

        add.onclick = function () {

            input.click();

        };

    }

    input.onchange = function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            saveGalleryImage(

                index,

                file,

                e.target.result

            );

            renderGalleryPreview(

                slot,

                index

            );

        };

        reader.readAsDataURL(file);

    };

}

/* ==========================================
   SAVE IMAGE
========================================== */

function saveGalleryImage(

    index,

    file,

    src

) {

    if (!Array.isArray(currentProduct.gallery)) {

        currentProduct.gallery = [];

    }

    currentProduct.gallery[index] = {

        name: file.name,

        src: src

    };

    saveProductDraft();

}

/* ==========================================
   RENDER PREVIEW
========================================== */

function renderGalleryPreview(

    slot,

    index

) {

    const image =
        currentProduct.gallery[index];

    if (!image) return;

    slot.innerHTML = `

        <img

            src="${image.src}"

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

    bindGalleryPreviewEvents(

        slot,

        index

    );

}

/* ==========================================
   PREVIEW EVENTS
========================================== */

function bindGalleryPreviewEvents(

    slot,

    index

) {

    const input =
        slot.querySelector(".gallery-input");

    const replace =
        slot.querySelector(".replace-gallery");

    const remove =
        slot.querySelector(".remove-gallery");

    replace.onclick = function () {

        input.click();

    };

    input.onchange = function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            saveGalleryImage(

                index,

                file,

                e.target.result

            );

            renderGalleryPreview(

                slot,

                index

            );

        };

        reader.readAsDataURL(file);

    };

    remove.onclick = function () {

        currentProduct.gallery[index] = null;

        saveProductDraft();

        slot.innerHTML = `

            <input

                type="file"

                class="gallery-input"

                accept="image/*"

                hidden>

            <div

                class="gallery-add">

                +

            </div>

        `;

        bindGallerySlot(

            slot,

            index

        );

    };

}
