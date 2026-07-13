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
input.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const box =
            document.getElementById("mainImageBox");

        box.innerHTML = `

            <img
                src="${e.target.result}"
                class="main-image-preview">

        `;

    };

    reader.readAsDataURL(file);

});