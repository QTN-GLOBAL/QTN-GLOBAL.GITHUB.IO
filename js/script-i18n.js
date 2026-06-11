
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

        // 🔥 THÊM Ở ĐÂY
        slogan: "CHÍNH XÁC TRONG TỪNG GIÁ TRỊ",
        hero_line1: "GIẢI PHÁP",
hero_line2: "CÂN ĐIỆN TỬ",
hero_line3: "CHÍNH XÁC CHO DOANH NGHIỆP",

hero_item1: "SẢN PHẨM CHÍNH HÃNG",
hero_item2: "BÁO GIÁ NHANH - GIAO HÀNG TOÀN QUỐC",
hero_item3: "HỖ TRỢ KỸ THUẬT CHUYÊN NGHIỆP",
category_title: "DANH MỤC",
brand_title: "THƯƠNG HIỆU",

cat_can_ban: "Cân bàn",
cat_can_dem: "Cân đếm",
cat_can_treo: "Cân treo",
cat_dau_can: "Đầu cân điện tử",
cat_can_pt: "Cân phân tích",
cat_chong_nuoc: "Cân chống nước",
cat_in_tem: "Cân in tem mã vạch",
cat_ghe_ngoi: "Cân ghế ngồi",

brand_ohaus: "Ohaus",
brand_jadever: "Jadever",
brand_vibra: "Vibra",
brand_yaohua: "Yaohua",
brand_excell: "EXCELL",
    },

    en: {
        home: "HOME",
        about: "ABOUT",
        contact: "CONTACT",
        language: "LANGUAGE",

        cart: "Cart",
        buyNow: "Buy Now",
        addCart: "Add to Cart",

        // 🔥 THÊM Ở ĐÂY
        slogan: "PRECISION IN EVERY VALUE",
hero_line1: "WEIGHING SOLUTIONS",
hero_line2: "ELECTRONIC SCALES",
hero_line3: "FOR BUSINESS PRECISION",

hero_item1: "AUTHENTIC PRODUCTS",
hero_item2: "FAST QUOTE - NATIONWIDE DELIVERY",
hero_item3: "PROFESSIONAL TECHNICAL SUPPORT",
category_title: "CATEGORIES",
brand_title: "BRANDS",

cat_can_ban: "Platform Scale",
cat_can_dem: "Counting Scale",
cat_can_treo: "Hanging Scale",
cat_dau_can: "Indicator",
cat_can_pt: "Analytical Scale",
cat_chong_nuoc: "Waterproof Scale",
cat_in_tem: "Label Printing Scale",
cat_ghe_ngoi: "Chair Scale",

brand_ohaus: "Ohaus",
brand_jadever: "Jadever",
brand_vibra: "Vibra",
brand_yaohua: "Yaohua",
brand_excell: "EXCELL",
    },

    cn: {
        home: "首页",
        about: "介绍",
        contact: "联系",
        language: "语言",

        cart: "购物车",
        buyNow: "立即购买",
        addCart: "加入购物车",

        // 🔥 THÊM Ở ĐÂY
        slogan: "每一个价值都精准",
hero_line1: "称重解决方案",
hero_line2: "电子秤",
hero_line3: "企业精准计量",

hero_item1: "正品产品",
hero_item2: "快速报价 - 全国配送",
hero_item3: "专业技术支持",
category_title: "分类",
brand_title: "品牌",

cat_can_ban: "台秤",
cat_can_dem: "计数秤",
cat_can_treo: "吊秤",
cat_dau_can: "称重仪表",
cat_can_pt: "分析天平",
cat_chong_nuoc: "防水秤",
cat_in_tem: "标签打印秤",
cat_ghe_ngoi: "座椅秤",

brand_ohaus: "奥豪斯",
brand_jadever: "捷德韦尔",
brand_vibra: "维博拉",
brand_yaohua: "耀华",
brand_excell: "艾科尔",
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
   GLOBAL I18N HOOK
========================= */

window.reApplyI18n = function () {
    const lang = localStorage.getItem("lang") || "vi";
    applyLanguage(lang);
};


/* =========================
   SET LANGUAGE
========================= */
function setLanguage(lang) {
    localStorage.setItem("lang", lang);

    applyLanguage(lang);

    // QUAN TRỌNG: delay để DOM kịp render
    setTimeout(() => applyLanguage(lang), 100);
    setTimeout(() => applyLanguage(lang), 400);
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

        // ❌ KHÔNG DỊCH CÁC KHU VỰC UI CHÍNH
        if (
            el.closest(".hero") ||
            el.closest(".hero-list") ||
            el.closest(".sidebar") ||
            el.closest(".brand-sidebar") ||
            el.closest(".detail-right") ||
            el.closest(".detail-left")
        ) return;

        if (el.hasAttribute("data-i18n")) return;

        let text = el.innerText;
        if (!text) return;

        for (let key in specTranslations.vi) {

            if (specTranslations[lang] && specTranslations[lang][key]) {
                text = text.replace(
                    new RegExp(key, "g"),
                    specTranslations[lang][key]
                );
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
const safeReapply = () => {
    const lang = localStorage.getItem("lang") || "vi";
    applyLanguage(lang);
};
window.addEventListener("load", () => {
    setTimeout(() => {
        const lang = localStorage.getItem("lang") || "vi";
        applyLanguage(lang);
    }, 200);
});
