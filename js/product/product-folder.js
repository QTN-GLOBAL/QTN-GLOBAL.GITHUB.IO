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

function createProductFolder(name) {

    if (!name) return "";

    let folder = name;

    // Loại bỏ các từ chung

    folder = folder.replace(/cân điện tử/gi, "");

    folder = folder.replace(/đầu cân điện tử/gi, "");

    folder = folder.replace(/đầu cân/gi, "");

    folder = folder.replace(/cân bàn đứng/gi, "");

    folder = folder.replace(/cân bàn/gi, "");

    folder = folder.replace(/cân treo/gi, "");

    folder = folder.replace(/cân/gi, "");

    folder = folder.trim();

    return slugifyFolder(folder);

}