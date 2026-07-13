/* ==========================================
   MAIN IMAGE
========================================== */

function initMainImageUpload() {

    const box =
        document.getElementById("mainImageBox");

    const input =
        document.getElementById("mainImageInput");

    if (!box || !input) return;

    box.onclick = function () {

        input.click();

    };

}