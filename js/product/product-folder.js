/* =====================================================
   PRODUCT FOLDER
===================================================== */

function slugifyFolder(text) {

    return text

        .toLowerCase()

        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

        .replace(/\+/g, "-")

        .replace(/[()]/g, "")

        .replace(/[^a-z0-9\s-]/g, "")

        .replace(/\s+/g, "-")

        .replace(/-+/g, "-")

        .replace(/^-|-$/g, "");

}

/* =====================================================
   CREATE FOLDER
===================================================== */

function generateFolder(){

    const product =
        document.getElementById("productName");

    const folder =
        document.getElementById("productFolder");

    if(!product || !folder) return;

    folder.value =
        createProductFolder(product.value);

}