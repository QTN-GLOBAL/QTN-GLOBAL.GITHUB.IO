/*****************************************************************
 PART 1
 IMPORT + HEADER + CREATE EMPTY PRODUCT
 File : service/product-parser.service.js
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

    console.log(
        "========== FREE PRODUCT PARSER V3 =========="
    );

    /* ============================================================
       CHECK HTML
    ============================================================ */

    if (!html) {

        console.log("HTML EMPTY");

        return createEmptyProduct();

    }

    /* ============================================================
       LOAD HTML
    ============================================================ */

    const $ = cheerio.load(html);

    /* ============================================================
       CREATE PRODUCT
    ============================================================ */

    const product = createEmptyProduct();

/*****************************************************************
 END PART 1
*****************************************************************/
/*****************************************************************
 PART 2
 HELPER FUNCTIONS
*****************************************************************/

/* ============================================================
   CREATE EMPTY PRODUCT
============================================================ */

function createEmptyProduct() {

    return {

        name: "",

        model: "",

        brand: "",

        category: "",

        origin: "",

        description: "",

        specification: [],

        features: [],

        applications: [],

        accessories: [],

        images: []

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
   REMOVE DUPLICATE ARRAY
============================================================ */

function uniqueArray(arr = []) {

    return [...new Set(

        arr

            .map(item => cleanText(item))

            .filter(Boolean)

    )];

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
 PRODUCT NAME + BRAND + MODEL + CATEGORY
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

    ".node-title",

    ".page-title",

    "h1"

]);

console.log("");
console.log("PRODUCT NAME :", product.name);

/* ============================================================
   BRAND
============================================================ */

const brands = [

    "Ohaus",

    "Jadever",

    "Vibra",

    "Excell",

    "CAS",

    "AND",

    "Mettler Toledo",

    "Yaohua",

    "DIWI",

    "Keli"

];

for (const brand of brands) {

    if (

        product.name

            .toLowerCase()

            .includes(

                brand.toLowerCase()

            )

    ) {

        product.brand = brand;

        break;

    }

}

/* ============================================================
   MODEL
============================================================ */

const modelMatch = product.name.match(

    /\b[A-Z0-9]+(?:[-+][A-Z0-9]+)*\b/

);

if (modelMatch) {

    product.model = modelMatch[0];

}

/* ============================================================
   CATEGORY
============================================================ */

const lowerName = product.name.toLowerCase();

if (

    lowerName.includes("cân bàn")

) {

    product.category = "can-ban";

}

else if (

    lowerName.includes("cân treo")

) {

    product.category = "can-treo";

}

else if (

    lowerName.includes("đếm")

) {

    product.category = "can-dem";

}

else if (

    lowerName.includes("phân tích")

) {

    product.category = "can-phan-tich";

}

else if (

    lowerName.includes("thủy sản") ||

    lowerName.includes("inox") ||

    lowerName.includes("chống nước")

) {

    product.category = "can-chong-nuoc";

}

console.log("BRAND    :", product.brand);
console.log("MODEL    :", product.model);
console.log("CATEGORY :", product.category);

/*****************************************************************
 END PART 3
*****************************************************************/
/*****************************************************************
 PART 4
 ORIGIN + DESCRIPTION
*****************************************************************/

/* ============================================================
   ORIGIN
============================================================ */

const pageText = $("body").text().toLowerCase();

const origins = [

    ["đài loan","Đài Loan"],
    ["taiwan","Đài Loan"],

    ["nhật bản","Nhật Bản"],
    ["japan","Nhật Bản"],

    ["hàn quốc","Hàn Quốc"],
    ["korea","Hàn Quốc"],

    ["trung quốc","Trung Quốc"],
    ["china","Trung Quốc"],

    ["mỹ","Mỹ"],
    ["usa","Mỹ"],

    ["thụy sĩ","Thụy Sĩ"],
    ["switzerland","Thụy Sĩ"]

];

for(const item of origins){

    if(pageText.includes(item[0])){

        product.origin=item[1];

        break;

    }

}

console.log("ORIGIN :",product.origin);

/* ============================================================
   DESCRIPTION
============================================================ */

const descriptionSelectors=[

    ".product-description",

    ".product-detail-description",

    ".product-intro",

    ".product-summary",

    ".product-short-description",

    ".woocommerce-product-details__short-description",

    ".entry-content",

    ".field-item",

    ".node-content",

    "article",

    "main"

];

for(const selector of descriptionSelectors){

    const element=$(selector).first();

    if(!element.length) continue;

    let text=element.text();

    text=text.replace(/\r/g,"");

    text=text.replace(/[ \t]+/g," ");

    text=text.replace(/\n{3,}/g,"\n\n");

    text=text.trim();

    if(text.length<30) continue;

    product.description=text;

    break;

}

console.log("");

console.log("DESCRIPTION LENGTH :",product.description.length);

/*****************************************************************
 END PART 4
*****************************************************************/
/*****************************************************************
 PART 5
 DESCRIPTION CLEANER
*****************************************************************/

if(product.description){

    let text = product.description;

    /* ============================================================
       CHUẨN HÓA XUỐNG DÒNG
    ============================================================ */

    text = text.replace(/\r/g,"");

    text = text.replace(/[ \t]+/g," ");

    text = text.replace(/\n{3,}/g,"\n\n");

    /* ============================================================
       TỰ XUỐNG DÒNG TRƯỚC CÁC DÒNG CÂN
    ============================================================ */

    text = text.replace(

        /(Cân\s+(?:Bàn|Điện|Treo|Đếm|Phân\s*Tích))/gi,

        "\n$1"

    );

    /* ============================================================
       XÓA LIÊN HỆ
    ============================================================ */

    text = text.replace(

        /Hotline[\s\S]*$/i,

        ""

    );

    text = text.replace(

        /Liên\s*hệ[\s\S]*$/i,

        ""

    );

    text = text.replace(

        /Lien\s*he[\s\S]*$/i,

        ""

    );

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
       XÓA CHIA SẺ
    ============================================================ */

    text = text.replace(

        /Share[\s\S]*$/i,

        ""

    );

    text = text.replace(

        /Facebook[\s\S]*$/i,

        ""

    );

    /* ============================================================
       XÓA DÒNG TRỐNG
    ============================================================ */

    text = text

        .split("\n")

        .map(x=>x.trim())

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
   TABLE PARSER
============================================================ */

$("table").each(function(){

    $(this).find("tr").each(function(){

        const cells=$(this).find("th,td");

        if(cells.length<2) return;

        const name=cleanText($(cells[0]).text());

        const value=cleanText($(cells[1]).text());

        if(!name||!value) return;

        if(name.length>150) return;

        if(value.length>1000) return;

        specificationMap.set(name,value);

    });

});

/* ============================================================
   DIV PARSER
============================================================ */

$(".specification li,.technical li,.product-spec li").each(function(){

    const text=cleanText($(this).text());

    if(!text.includes(":")) return;

    const parts=text.split(":");

    if(parts.length<2) return;

    const name=cleanText(parts.shift());

    const value=cleanText(parts.join(":"));

    if(name&&value){

        specificationMap.set(name,value);

    }

});

/* ============================================================
   DL PARSER
============================================================ */

$("dl").each(function(){

    const dt=$(this).find("dt");

    const dd=$(this).find("dd");

    dt.each(function(i){

        const name=cleanText($(this).text());

        const value=cleanText($(dd[i]).text());

        if(name&&value){

            specificationMap.set(name,value);

        }

    });

});

/* ============================================================
   EXPORT
============================================================ */

product.specification=[];

for(const [name,value] of specificationMap){

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
   FIND FEATURES
============================================================ */

const featureKeywords=[

    "tính năng",

    "đặc điểm",

    "ưu điểm",

    "features",

    "feature",

    "advantages"

];

product.features=[];

$("h1,h2,h3,h4,h5,h6").each(function(){

    const heading=cleanText($(this).text()).toLowerCase();

    const matched=featureKeywords.some(

        keyword=>heading.includes(keyword)

    );

    if(!matched) return;

    let container=$(this).next();

    if(!container.length){

        container=$(this).parent();

    }

    container.find("li").each(function(){

        const text=cleanText($(this).text());

        if(

            text &&

            text.length>5 &&

            text.length<500

        ){

            product.features.push(text);

        }

    });

});

product.features=uniqueArray(product.features);

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
   FIND APPLICATIONS
============================================================ */

const applicationKeywords = [

    "ứng dụng",

    "application",

    "applications",

    "lĩnh vực",

    "sử dụng",

    "use"

];

product.applications = [];

$("h1,h2,h3,h4,h5,h6").each(function(){

    const heading = cleanText(

        $(this).text()

    ).toLowerCase();

    const matched = applicationKeywords.some(

        keyword => heading.includes(keyword)

    );

    if(!matched) return;

    let container = $(this).next();

    if(!container.length){

        container = $(this).parent();

    }

    container.find("li").each(function(){

        const text = cleanText(

            $(this).text()

        );

        if(

            text &&

            text.length > 5 &&

            text.length < 500

        ){

            product.applications.push(text);

        }

    });

});

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
   FIND ACCESSORIES
============================================================ */

const accessoryKeywords=[

    "phụ kiện",

    "accessory",

    "accessories",

    "đi kèm",

    "included"

];

product.accessories=[];

$("h1,h2,h3,h4,h5,h6").each(function(){

    const heading=cleanText(

        $(this).text()

    ).toLowerCase();

    const matched=accessoryKeywords.some(

        keyword=>heading.includes(keyword)

    );

    if(!matched) return;

    let container=$(this).next();

    if(!container.length){

        container=$(this).parent();

    }

    container.find("li").each(function(){

        const text=cleanText(

            $(this).text()

        );

        if(

            text &&

            text.length>5 &&

            text.length<500

        ){

            product.accessories.push(text);

        }

    });

});

product.accessories=uniqueArray(

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
 SMART IMAGE PARSER V2
*****************************************************************/

/* ============================================================
   FIND PRODUCT IMAGES
============================================================ */

product.images = [];

$("img").each(function(){

    let src =

        $(this).attr("src") ||

        $(this).attr("data-src") ||

        $(this).attr("data-original") ||

        $(this).attr("data-lazy-src");

    if(!src) return;

    src = src.trim();

    if(src.startsWith("data:")) return;

    const lower = src.toLowerCase();

    /* ==========================================
       LOẠI BỎ ẢNH KHÔNG PHẢI SẢN PHẨM
    ========================================== */

    const invalid = [

        "logo",

        "icon",

        "banner",

        "favicon",

        "loading",

        "spinner",

        "facebook",

        "youtube",

        "zalo",

        "messenger",

        "instagram",

        "iso",

        "certificate",

        "chungchi",

        "footer",

        "header",

        "menu",

        "find-store",

        "qr",

        "avatar"

    ];

    if(

        invalid.some(

            item => lower.includes(item)

        )

    ){

        return;

    }

    /* ==========================================
       CHỈ NHẬN FILE ẢNH
    ========================================== */

    if(

        !/\.(jpg|jpeg|png|webp)/i.test(lower)

    ){

        return;

    }

    product.images.push(src);

});

/* ==========================================
   REMOVE DUPLICATE
========================================== */

product.images = uniqueArray(product.images);

/* ==========================================
   ƯU TIÊN ẢNH GỐC
========================================== */

product.images = product.images.filter(function(image){

    if(

        image.includes("-300x300") ||

        image.includes("-150x150") ||

        image.includes("-100x100") ||

        image.includes("thumbnail")

    ){

        const original = image

            .replace(/-300x300/i,"")

            .replace(/-150x150/i,"")

            .replace(/-100x100/i,"");

        return !product.images.includes(original);
    }

    return true;

});

/* ==========================================
   CHỈ GIỮ 10 ẢNH
========================================== */

product.images = product.images.slice(0,10);

console.log("");

console.log(

    "IMAGE COUNT :",

    product.images.length

);

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

    table:{

        headers:[

            "Thông số",

            "Giá trị"

        ],

        rows: product.specification.map(item=>([

            item.name,

            item.value

        ]))

    },

    specifications: product.specification,

    features: product.features,

    applications: product.applications,

    accessories: product.accessories

};

/* ============================================================
   BUILD MEDIA OBJECT
============================================================ */

product.media={

    images:product.images,

    pdf:"",

    video:""

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

product.ai={

    imported:true,

    importedAt:new Date().toISOString()

};

/* ============================================================
   LOG RESULT
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

/* ==========================================
   EMPTY PRODUCT
========================================== */

function createEmptyProduct(){

    return{

        name:"",

        model:"",

        brand:"",

        origin:"",

        category:"",

        folder:"",

        slug:"",

        description:"",

        specification:[],

        features:[],

        applications:[],

        accessories:[],

        images:[]

    };

}

/*****************************************************************
 THE END
 product-parser.service.js
 VERSION 3.0
*****************************************************************/
