/* ==========================================
   GALLERY
========================================== */

function initGalleryUpload() {

    const slots =
        document.querySelectorAll(".gallery-slot");

    slots.forEach(function (slot) {

        const input =
            slot.querySelector(".gallery-input");

        const add =
            slot.querySelector(".gallery-add");

        add.onclick = function () {

            input.click();

        };

    });

}