/* =====================================================
   PRODUCT FOLDER
   QTN GLOBAL CMS
===================================================== */

/* =====================================================
   SLUGIFY
===================================================== */

function slugifyFolder(text) {

    if (!text) return "";

    return text

        .toLowerCase()

        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")

        .replace(/\+/g, "-")

        .replace(/&/g, "-")

        .replace(/[()]/g, "")

        .replace(/[^a-z0-9\s-]/g, "")

        .replace(/\s+/g, "-")

        .replace(/-+/g, "-")

        .replace(/^-|-$/g, "");

}

/* =====================================================
   CREATE PRODUCT FOLDER
===================================================== */

function createProductFolder(productName){

    if(!productName) return "";

    // Chuẩn hóa khoảng trắng
    let text = productName.trim();

    // Tách thành các từ
    let words = text.split(/\s+/);

    // Lấy 2 từ cuối
    let lastTwo = words.slice(-2).join(" ");

    // Nếu chứa số hoặc dấu +
    if(/[0-9+]/.test(lastTwo)){

        return slugifyFolder(lastTwo);

    }

    // Nếu không thì lấy từ cuối
    return slugifyFolder(words[words.length-1]);

}

/* =====================================================
   AUTO GENERATE FOLDER
===================================================== */

function generateFolder() {

    const productName =
        document.getElementById("productName");

    const folder =
        document.getElementById("productFolder");

    if (!productName || !folder) return;

    // Nếu sản phẩm đã tồn tại
    if (typeof findProductByName === "function") {

        const product =
            findProductByName(productName.value);

        if (product) {

            folder.value = product.folder;

            return;

        }

    }

    // Nếu sản phẩm mới

    folder.value =
        createProductFolder(productName.value);

}