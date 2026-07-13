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

    folder = folder.replace(/đầu cân điện tử/gi, "");

    folder = folder.replace(/đầu cân/gi, "");

    folder = folder.replace(/cân điện tử/gi, "");

    folder = folder.replace(/cân bàn đứng/gi, "");

    folder = folder.replace(/cân bàn/gi, "");

    folder = folder.replace(/cân sàn/gi, "");

    folder = folder.replace(/cân treo/gi, "");

    folder = folder.replace(/cân phân tích/gi, "");

    folder = folder.replace(/cân kỹ thuật/gi, "");

    folder = folder.replace(/cân/gi, "");

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