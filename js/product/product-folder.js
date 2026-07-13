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

    let folder = productName;

    // Loại bỏ các từ phổ biến

   // Loại bỏ các tiền tố phổ biến ở đầu tên
folder = folder.replace(
    /^(đầu\s*cân\s*điện\s*tử|đầu\s*cân|cân\s*bàn\s*đứng|cân\s*bàn|cân\s*sàn|cân\s*treo|cân\s*phân\s*tích|cân\s*kỹ\s*thuật|cân\s*điện\s*tử|cân)\s*/i,
    ""
);

    folder = folder.trim();

    return slugifyFolder(folder);

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