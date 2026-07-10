/* =====================================================
   IMAGE PICKER
===================================================== */

function renderImagePicker(options={}){

    return `

        <div class="image-picker">

            <img

                src="${options.image}"

                class="brand-preview"

                onerror="this.src='images/no-image.jpg'">

            <button

                class="secondary-btn">

                Change Image

            </button>

        </div>

    `;

}