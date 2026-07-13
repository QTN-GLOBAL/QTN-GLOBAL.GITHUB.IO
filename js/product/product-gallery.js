function initGalleryUpload(){

    const slots =
        document.querySelectorAll(".gallery-slot");

    slots.forEach(function(slot){

        slot.innerHTML = `

            <div class="gallery-add">

                +

            </div>

        `;

    });

}