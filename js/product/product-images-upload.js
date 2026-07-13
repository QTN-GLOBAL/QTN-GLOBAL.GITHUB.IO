/* ==========================================
   MAIN IMAGE UPLOAD
========================================== */

function initMainImageUpload() {

    const box =
        document.getElementById("mainImageBox");

    const input =
        document.getElementById("mainImageInput");

    if (!box || !input) return;

    // Click vùng upload
    box.onclick = function () {

        input.click();

    };

    // Chọn ảnh
    input.onchange = function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            box.innerHTML = `

                <img
                    src="${e.target.result}"
                    class="main-image-preview">

            `;

        };

        reader.readAsDataURL(file);

    };

}