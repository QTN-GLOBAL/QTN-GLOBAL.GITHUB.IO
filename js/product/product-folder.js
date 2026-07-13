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

function createProductFolder(productName) {

    if (!productName) return "";

    // Chuẩn hóa khoảng trắng
    productName = productName.trim();

    // Lấy các từ
    const words = productName.split(/\s+/);

    // Ghép các từ cuối cho đến khi gặp model
    let result = [];

    for (let i = words.length - 1; i >= 0; i--) {

        result.unshift(words[i]);

        // Nếu từ có số thì coi là bắt đầu model
        if (/\d/.test(words[i])) {
            break;
        }

    }

    return slugifyFolder(result.join(" "));

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