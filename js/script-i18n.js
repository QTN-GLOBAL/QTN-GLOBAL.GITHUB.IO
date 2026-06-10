
/* =========================
   QTN GLOBAL - MULTI LANGUAGE SYSTEM
   UI + SPEC TRANSLATION
========================= */

/* =========================
   TRANSLATIONS - UI TEXT
========================= */

const translations = {
    vi: {
        home: "TRANG CHỦ",
        about: "GIỚI THIỆU",
        contact: "LIÊN HỆ",
        language: "NGÔN NGỮ",

        cart: "Giỏ hàng",
        buyNow: "Mua ngay",
        addCart: "Thêm vào giỏ",
        hotline: "Hotline",
        website: "Website",
        description: "Mô tả sản phẩm",
        search: "Tìm kiếm"
    },

    en: {
        home: "HOME",
        about: "ABOUT",
        contact: "CONTACT",
        language: "LANGUAGE",

        cart: "Cart",
        buyNow: "Buy Now",
        addCart: "Add to Cart",
        hotline: "Hotline",
        website: "Website",
        description: "Product Description",
        search: "Search"
    },

    cn: {
        home: "首页",
        about: "介绍",
        contact: "联系",
        language: "语言",

        cart: "购物车",
        buyNow: "立即购买",
        addCart: "加入购物车",
        hotline: "热线",
        website: "网站",
        description: "产品说明",
        search: "搜索"
    }
};

/* =========================
   TRANSLATIONS - SPEC TERMS
========================= */

const specTranslations = {
    vi: {
        "Khối lượng": "Khối lượng",
        "Tải trọng": "Tải trọng",
        "Sai số": "Sai số",
        "Kích thước": "Kích thước",
        "Chất liệu": "Chất liệu",
        "Độ chia": "Độ chia",
        "Màn hình": "Màn hình",
        "Nguồn điện": "Nguồn điện"
    },

    en: {
        "Khối lượng": "Capacity",
        "Tải trọng": "Load capacity",
        "Sai số": "Accuracy",
        "Kích thước": "Dimensions",
        "Chất liệu": "Material",
        "Độ chia": "Division",
        "Màn hình": "Display",
        "Nguồn điện": "Power supply"
    },

    cn: {
        "Khối lượng": "容量",
        "Tải trọng": "负载",
        "Sai số": "精度",
        "Kích thước": "尺寸",
        "Chất liệu": "材料",
        "Độ chia": "分度值",
        "Màn hình": "显示屏",
        "Nguồn điện": "电源"
    }
};

/* =========================
   SET LANGUAGE
========================= */

function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
}

/* =========================
   APPLY LANGUAGE (UI + SPEC)
========================= */

function applyLanguage(lang) {

    /* ===== UI TEXT ===== */
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");

        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    /* ===== SPEC TRANSLATION ===== */
    translateSpec(lang);
}

/* =========================
   SPEC TRANSLATION ENGINE
========================= */

function translateSpec(lang) {

    document.querySelectorAll("td, th, li, span, p").forEach(el => {

        // 🔥 CHỐT: BỎ QUA ELEMENT ĐÃ CÓ I18N
        if (el.hasAttribute("data-i18n")) return;

        let text = el.innerText;

        if (!text) return;

        for (let key in specTranslations.vi) {

            const regex = new RegExp(key, "g");

            if (specTranslations[lang] && specTranslations[lang][key]) {
                text = text.replace(regex, specTranslations[lang][key]);
            }
        }

        el.innerText = text;
    });
}

/* =========================
   AUTO INIT ON PAGE LOAD
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const lang = localStorage.getItem("lang") || "vi";
    applyLanguage(lang);

});