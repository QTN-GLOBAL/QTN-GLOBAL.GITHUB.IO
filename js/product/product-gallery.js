/* ==========================================
   GALLERY UPLOAD
========================================== */

function initGalleryUpload() {

    const slots =
        document.querySelectorAll(".gallery-slot");

    slots.forEach(function (slot) {

        const input =
            slot.querySelector(".gallery-input");

        const add =
            slot.querySelector(".gallery-add");

        if (!input || !add) return;

        // Click dấu +
        add.onclick = function () {

            input.click();

        };

        // Chọn ảnh
        input.onchange = function () {

            const file = this.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {

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
                            class="replace-gallery">

                            🔄

                        </button>

                        <button
                            class="remove-gallery">

                            ❌

                        </button>

                    </div>

                `;

                // Lấy lại input mới
                const newInput =
                    slot.querySelector(".gallery-input");

                // Replace
                slot.querySelector(".replace-gallery").onclick =
                    function () {

                        newInput.click();

                    };

                // Remove
                slot.querySelector(".remove-gallery").onclick =
                    function () {

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

                // Upload lại sau Replace
                newInput.onchange =
                    input.onchange;

            };

            reader.readAsDataURL(file);

        };

    });

}