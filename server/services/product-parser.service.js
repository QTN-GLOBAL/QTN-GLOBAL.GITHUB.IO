/*****************************************************************
 PART 1
 IMPORT + PARSER START
 VERSION 4.0
*****************************************************************/

import * as cheerio from "cheerio";

/* ============================================================
   MAIN PARSER
============================================================ */

export function parseProductFromHtml(

    html = "",

    options = {}

) {

    console.log("");

    console.log("========================================");
    console.log("QTN GLOBAL PRODUCT PARSER V4");
    console.log("========================================");

    /* ============================================================
       CHECK HTML
    ============================================================ */

    if (!html || !html.trim()) {

        console.log("HTML EMPTY");

        return createEmptyProduct();

    }

    /* ============================================================
       LOAD HTML
    ============================================================ */

    const $ = cheerio.load(

        html,

        {

            decodeEntities: false

        }

    );

    /* ============================================================
       CREATE PRODUCT
    ============================================================ */

    const product = createEmptyProduct();

    console.log("");

    console.log("HTML SIZE :", html.length);

    console.log("START PARSER");

/*****************************************************************
 END PART 1
*****************************************************************/
/*****************************************************************
 PART 2
 HELPER ENGINE
 VERSION 4.0
*****************************************************************/

/* ============================================================
   CREATE EMPTY PRODUCT
============================================================ */

function createEmptyProduct() {

    return {

        name: "",

        model: "",

        brand: "",

        origin: "",

        category: "",

        folder: "",

        slug: "",

        description: "",

        technical: {

            table: {

                headers: [],

                rows: []

            },

            specifications: [],

            features: [],

            applications: [],

            accessories: []

        },

        media: {

            images: [],

            pdf: "",

            video: ""

        },

        ai: {

            imported: false,

            importedAt: ""

        }

    };

}

/* ============================================================
   CLEAN TEXT
============================================================ */

function cleanText(text = "") {

    return String(text)

        .replace(/\u00A0/g, " ")

        .replace(/\r/g, "")

        .replace(/[ \t]+/g, " ")

        .replace(/\n{3,}/g, "\n\n")

        .trim();

}

/* ============================================================
   REMOVE DUPLICATE
============================================================ */

function uniqueArray(arr = []) {

    return [...new Set(

        arr

            .map(item => cleanText(item))

            .filter(Boolean)

    )];

}

/* ============================================================
   SLUG
============================================================ */

function createSlug(text = "") {

    return cleanText(text)

        .toLowerCase()

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .replace(/đ/g, "d")

        .replace(/[^a-z0-9]+/g, "-")

        .replace(/^-+|-+$/g, "")

        .replace(/-+/g, "-");

}

/* ============================================================
   FOLDER
============================================================ */

function createFolder(text = "") {

    return createSlug(text)

        .replace(/-+/g, "-");

}

/* ============================================================
   FIND FIRST TEXT
============================================================ */

function findFirstText($, selectors = []) {

    for (const selector of selectors) {

        const el = $(selector).first();

        if (!el.length) continue;

        const text = cleanText(el.text());

        if (text) {

            return text;

        }

    }

    return "";

}

/*****************************************************************
 END PART 2
*****************************************************************/
/*****************************************************************
 PART 3
 PRODUCT NAME + MODEL + BRAND + CATEGORY
*****************************************************************/

/* ============================================================
   PRODUCT NAME
============================================================ */

product.name = findFirstText($, [

    "h1.product-title",

    "h1.product-name",

    ".product-detail h1",

    ".product-info h1",

    ".product-content h1",

    ".page-title",

    ".entry-title",

    ".node-title",

    "h1"

]);

product.name = cleanText(product.name);

console.log("");
console.log("PRODUCT :", product.name);

/* ============================================================
   MODEL
============================================================ */

const modelRegex = /\b[A-Z0-9]+(?:[-+][A-Z0-9]+)*\b/g;

const modelMatch = product.name.match(modelRegex);

if (modelMatch && modelMatch.length) {

    product.model = modelMatch[0];

}

/* ============================================================
   BRAND
============================================================ */

const brands = [

    "Ohaus",

    "Jadever",

    "Excell",

    "Vibra",

    "CAS",

    "AND",

    "Yaohua",

    "Mettler Toledo",

    "Keli",

    "DIWI",

    "A12E",

    "A15E"

];

const lowerProductName = product.name.toLowerCase();

for (const brand of brands) {

    if (

        lowerProductName.includes(

            brand.toLowerCase()

        )

    ) {

        product.brand = brand;

        break;

    }

}

/* ============================================================
   CATEGORY
============================================================ */

const lower = product.name.toLowerCase();

if (

    lower.includes("cân bàn")

) {

    product.category = "can-ban";

}

else if (

    lower.includes("cân treo")

) {

    product.category = "can-treo";

}

else if (

    lower.includes("cân đếm") ||

    lower.includes("đếm")

) {

    product.category = "can-dem";

}

else if (

    lower.includes("phân tích")

) {

    product.category = "can-phan-tich";

}

else if (

    lower.includes("thủy sản") ||

    lower.includes("inox") ||

    lower.includes("chống nước")

) {

    product.category = "can-chong-nuoc";

}

/* ============================================================
   FOLDER
============================================================ */

if (product.model) {

    product.folder = product.model

        .toLowerCase()

        .replace(/\+/g, "-")

        .replace(/[^a-z0-9-]/g, "");

}

/* ============================================================
   SLUG
============================================================ */

product.slug = product.name

    .toLowerCase()

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "")

    .replace(/đ/g, "d")

    .replace(/[^a-z0-9]+/g, "-")

    .replace(/^-+|-+$/g, "");

/* ============================================================
   LOG
============================================================ */

console.log("MODEL    :", product.model);

console.log("BRAND    :", product.brand);

console.log("CATEGORY :", product.category);

console.log("FOLDER   :", product.folder);

console.log("SLUG     :", product.slug);

/*****************************************************************
 END PART 3
*****************************************************************/
/*****************************************************************
 PART 4
 ORIGIN + DESCRIPTION PARSER
*****************************************************************/

/* ============================================================
   ORIGIN
============================================================ */

const originKeywords = [

    ["đài loan","Đài Loan"],
    ["taiwan","Đài Loan"],

    ["nhật bản","Nhật Bản"],
    ["japan","Nhật Bản"],

    ["hàn quốc","Hàn Quốc"],
    ["korea","Hàn Quốc"],

    ["trung quốc","Trung Quốc"],
    ["china","Trung Quốc"],

    ["usa","Mỹ"],
    ["united states","Mỹ"],
    ["mỹ","Mỹ"],

    ["germany","Đức"],
    ["đức","Đức"],

    ["italy","Ý"],
    ["ý","Ý"],

    ["switzerland","Thụy Sĩ"],
    ["thụy sĩ","Thụy Sĩ"]

];

const lowerPage = pageText.toLowerCase();

for (const item of originKeywords) {

    if (lowerPage.includes(item[0])) {

        product.origin = item[1];

        break;

    }

}

console.log("ORIGIN :", product.origin);

/* ============================================================
   DESCRIPTION
============================================================ */

const descriptionSelectors = [

    ".product-description",

    ".product-detail-description",

    ".product-intro",

    ".product-summary",

    ".product-short-description",

    ".woocommerce-product-details__short-description",

    ".entry-content",

    ".field-item",

    ".node-content",

    ".product-content",

    ".product-detail",

    "article",

    "main"

];

for (const selector of descriptionSelectors) {

    const element = $(selector).first();

    if (!element.length) {

        continue;

    }

    let text = cleanText(

        element.text()

    );

    if (text.length < 30) {

        continue;

    }

    product.description = text;

    break;

}

/* ============================================================
   FALLBACK
============================================================ */

if (!product.description) {

    $("p").each(function () {

        if (product.description) {

            return;

        }

        const text = cleanText(

            $(this).text()

        );

        if (

            text.length >= 50 &&

            text.length <= 5000

        ) {

            product.description = text;

        }

    });

}

console.log("");

console.log(

    "DESCRIPTION LENGTH :",

    product.description.length

);

/*****************************************************************
 END PART 4
*****************************************************************/
/*****************************************************************
 PART 5
 DESCRIPTION CLEANER
*****************************************************************/

if (product.description) {

    let text = product.description;

    /* ============================================================
       CHUẨN HÓA
    ============================================================ */

    text = text.replace(/\r/g, "");

    text = text.replace(/[ \t]+/g, " ");

    text = text.replace(/\n{3,}/g, "\n\n");

    /* ============================================================
       XÓA HOTLINE
    ============================================================ */

    text = text.replace(

        /Hotline[\s\S]*$/i,

        ""

    );

    /* ============================================================
       XÓA LIÊN HỆ
    ============================================================ */

    text = text.replace(

        /Liên\s*hệ[\s\S]*$/i,

        ""

    );

    text = text.replace(

        /Contact[\s\S]*$/i,

        ""

    );

    /* ============================================================
       XÓA HỖ TRỢ KỸ THUẬT
    ============================================================ */

    text = text.replace(

        /Hỗ\s*trợ\s*kỹ\s*thuật[\s\S]*$/i,

        ""

    );

    /* ============================================================
       XÓA DANH MỤC
    ============================================================ */

    text = text.replace(

        /Danh\s*mục[\s\S]*$/i,

        ""

    );

    /* ============================================================
       XÓA TAG
    ============================================================ */

    text = text.replace(

        /Tags?[\s\S]*$/i,

        ""

    );

    /* ============================================================
       XÓA SHARE
    ============================================================ */

    text = text.replace(

        /Share[\s\S]*$/i,

        ""

    );

    text = text.replace(

        /Facebook[\s\S]*$/i,

        ""

    );

    text = text.replace(

        /Youtube[\s\S]*$/i,

        ""

    );

    text = text.replace(

        /Zalo[\s\S]*$/i,

        ""

    );

    /* ============================================================
       XÓA KHOẢNG TRẮNG
    ============================================================ */

    text = text

        .split("\n")

        .map(line => line.trim())

        .filter(Boolean)

        .join("\n");

    product.description = text;

}

console.log("");

console.log("DESCRIPTION CLEANED");

console.log(product.description);

/*****************************************************************
 END PART 5
*****************************************************************/
/*****************************************************************
 PART 6
 SPECIFICATION PARSER
*****************************************************************/

const specificationMap = new Map();

/* ============================================================
   TABLE
============================================================ */

$("table").each(function () {

    $(this).find("tr").each(function () {

        const cells = $(this).find("th,td");

        if (cells.length < 2) return;

        const name = cleanText($(cells[0]).text());

        const value = cleanText($(cells[1]).text());

        if (!name || !value) return;

        if (name.length > 150) return;

        if (value.length > 2000) return;

        specificationMap.set(name, value);

    });

});

/* ============================================================
   DL / DT / DD
============================================================ */

$("dl").each(function () {

    const dt = $(this).find("dt");

    const dd = $(this).find("dd");

    dt.each(function (index) {

        const name = cleanText($(this).text());

        const value = cleanText($(dd[index]).text());

        if (!name || !value) return;

        specificationMap.set(name, value);

    });

});

/* ============================================================
   LIST
============================================================ */

$(".specification li,.technical li,.product-spec li").each(function () {

    const text = cleanText($(this).text());

    if (!text.includes(":")) return;

    const pos = text.indexOf(":");

    const name = cleanText(text.substring(0, pos));

    const value = cleanText(text.substring(pos + 1));

    if (!name || !value) return;

    specificationMap.set(name, value);

});

/* ============================================================
   DIV LABEL : VALUE
============================================================ */

$(".specification div,.technical div,.product-spec div").each(function () {

    const text = cleanText($(this).text());

    if (!text.includes(":")) return;

    const pos = text.indexOf(":");

    const name = cleanText(text.substring(0, pos));

    const value = cleanText(text.substring(pos + 1));

    if (!name || !value) return;

    specificationMap.set(name, value);

});

/* ============================================================
   EXPORT
============================================================ */

product.specification = [];

for (const [name, value] of specificationMap) {

    product.specification.push({

        name,

        value

    });

}

console.log("");

console.log(

    "SPECIFICATION COUNT :",

    product.specification.length

);

/*****************************************************************
 END PART 6
*****************************************************************/
/*****************************************************************
 PART 7
 FEATURES PARSER
*****************************************************************/

/* ============================================================
   FEATURES KEYWORDS
============================================================ */

const featureKeywords = [

    "tính năng",

    "đặc điểm",

    "ưu điểm",

    "feature",

    "features",

    "advantages",

    "benefits"

];

product.features = [];

/* ============================================================
   FIND FEATURES
============================================================ */

$("h1,h2,h3,h4,h5,h6").each(function () {

    const heading = cleanText(

        $(this).text()

    ).toLowerCase();

    const matched = featureKeywords.some(

        keyword => heading.includes(keyword)

    );

    if (!matched) return;

    let container = $(this).next();

    if (!container.length) {

        container = $(this).parent();

    }

    /* ---------- LI ---------- */

    container.find("li").each(function () {

        const text = cleanText(

            $(this).text()

        );

        if (

            text.length > 5 &&

            text.length < 500

        ) {

            product.features.push(text);

        }

    });

    /* ---------- P ---------- */

    container.find("p").each(function () {

        const text = cleanText(

            $(this).text()

        );

        if (

            text.length > 20 &&

            text.length < 500

        ) {

            product.features.push(text);

        }

    });

});

/* ============================================================
   REMOVE DUPLICATE
============================================================ */

product.features = uniqueArray(

    product.features

);

console.log("");

console.log(

    "FEATURES COUNT :",

    product.features.length

);

/*****************************************************************
 END PART 7
*****************************************************************/
/*****************************************************************
 PART 8
 APPLICATIONS PARSER
*****************************************************************/

/* ============================================================
   APPLICATION KEYWORDS
============================================================ */

const applicationKeywords = [

    "ứng dụng",

    "application",

    "applications",

    "lĩnh vực",

    "sử dụng",

    "use",

    "industry"

];

product.applications = [];

/* ============================================================
   FIND APPLICATIONS
============================================================ */

$("h1,h2,h3,h4,h5,h6").each(function () {

    const heading = cleanText(

        $(this).text()

    ).toLowerCase();

    const matched = applicationKeywords.some(

        keyword => heading.includes(keyword)

    );

    if (!matched) return;

    let container = $(this).next();

    if (!container.length) {

        container = $(this).parent();

    }

    /* ---------- LI ---------- */

    container.find("li").each(function () {

        const text = cleanText(

            $(this).text()

        );

        if (

            text.length > 5 &&

            text.length < 500

        ) {

            product.applications.push(text);

        }

    });

    /* ---------- P ---------- */

    container.find("p").each(function () {

        const text = cleanText(

            $(this).text()

        );

        if (

            text.length > 20 &&

            text.length < 500

        ) {

            product.applications.push(text);

        }

    });

});

/* ============================================================
   REMOVE DUPLICATE
============================================================ */

product.applications = uniqueArray(

    product.applications

);

console.log("");

console.log(

    "APPLICATIONS COUNT :",

    product.applications.length

);

/*****************************************************************
 END PART 8
*****************************************************************/
/*****************************************************************
 PART 9
 ACCESSORIES PARSER
*****************************************************************/

/* ============================================================
   ACCESSORY KEYWORDS
============================================================ */

const accessoryKeywords = [

    "phụ kiện",

    "accessory",

    "accessories",

    "đi kèm",

    "included",

    "included accessories"

];

product.accessories = [];

/* ============================================================
   FIND ACCESSORIES
============================================================ */

$("h1,h2,h3,h4,h5,h6").each(function () {

    const heading = cleanText(

        $(this).text()

    ).toLowerCase();

    const matched = accessoryKeywords.some(

        keyword => heading.includes(keyword)

    );

    if (!matched) return;

    let container = $(this).next();

    if (!container.length) {

        container = $(this).parent();

    }

    /* ---------- LI ---------- */

    container.find("li").each(function () {

        const text = cleanText(

            $(this).text()

        );

        if (

            text.length > 5 &&

            text.length < 500

        ) {

            product.accessories.push(text);

        }

    });

    /* ---------- P ---------- */

    container.find("p").each(function () {

        const text = cleanText(

            $(this).text()

        );

        if (

            text.length > 20 &&

            text.length < 500

        ) {

            product.accessories.push(text);

        }

    });

});

/* ============================================================
   REMOVE DUPLICATE
============================================================ */

product.accessories = uniqueArray(

    product.accessories

);

console.log("");

console.log(

    "ACCESSORIES COUNT :",

    product.accessories.length

);

/*****************************************************************
 END PART 9
*****************************************************************/
/*****************************************************************
 PART 10
 SMART IMAGE PARSER V3
*****************************************************************/

/* ============================================================
   IMAGE PARSER
============================================================ */

product.images = [];

const imageSet = new Set();

$("img").each(function () {

    let src =

        $(this).attr("src") ||

        $(this).attr("data-src") ||

        $(this).attr("data-original") ||

        $(this).attr("data-lazy-src") ||

        $(this).attr("data-srcset");

    if (!src) return;

    src = src.split(",")[0].trim();

    if (!src) return;

    if (src.startsWith("data:")) return;

    if (src.startsWith("//")) {

        src = "https:" + src;

    }

    const lower = src.toLowerCase();

    /* ============================================================
       CHỈ NHẬN FILE ẢNH
    ============================================================ */

    if (

        !lower.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/)

    ) {

        return;

    }

    /* ============================================================
       LOẠI BỎ ẢNH KHÔNG PHẢI SẢN PHẨM
    ============================================================ */

    const blacklist = [

        "logo",

        "banner",

        "icon",

        "favicon",

        "loading",

        "spinner",

        "facebook",

        "youtube",

        "instagram",

        "messenger",

        "zalo",

        "avatar",

        "iso",

        "certificate",

        "chungchi",

        "footer",

        "header",

        "find-store",

        "menu",

        "qr",

        "thumb-default"

    ];

    if (

        blacklist.some(

            item => lower.includes(item)

        )

    ) {

        return;

    }

    /* ============================================================
       ƯU TIÊN ẢNH LỚN
    ============================================================ */

    src = src

        .replace("-100x100", "")

        .replace("-150x150", "")

        .replace("-200x200", "")

        .replace("-300x300", "")

        .replace("-400x400", "")

        .replace("-600x600", "");

    imageSet.add(src);

});

/* ============================================================
   EXPORT
============================================================ */

product.images = [...imageSet];

/* ============================================================
   GIỚI HẠN 10 ẢNH
============================================================ */

product.images = product.images.slice(0, 10);

console.log("");

console.log(

    "IMAGE COUNT :",

    product.images.length

);

console.log(product.images);

/*****************************************************************
 END PART 10
*****************************************************************/
/*****************************************************************
 PART 11
 FINALIZE & RETURN
*****************************************************************/

/* ============================================================
   BUILD TECHNICAL OBJECT
============================================================ */

product.technical = {

    specifications: product.specification,

    features: product.features,

    applications: product.applications,

    accessories: product.accessories

};

/* ============================================================
   BUILD MEDIA
============================================================ */

product.media = {

    images: product.images,

    pdf: "",

    video: ""

};

/* ============================================================
   REMOVE TEMP DATA
============================================================ */

delete product.specification;

delete product.features;

delete product.applications;

delete product.accessories;

delete product.images;

/* ============================================================
   AI INFO
============================================================ */

product.ai = {

    imported: true,

    parser: "QTN Parser V3",

    importedAt: new Date().toISOString()

};

/* ============================================================
   RESULT
============================================================ */

console.log("");

console.log("========== PARSER RESULT ==========");

console.log(product);

console.log("===================================");

/* ============================================================
   RETURN
============================================================ */

return product;

}

/*****************************************************************
 THE END
 product-parser.service.js
*****************************************************************/
