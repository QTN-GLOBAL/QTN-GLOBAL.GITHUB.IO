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
document.getElementById("replaceMainImage").onclick = function () {

    input.click();

};

document.getElementById("removeMainImage").onclick = function () {

    input.value = "";

    renderProductImages();

};
        };

        reader.readAsDataURL(file);

    };

}