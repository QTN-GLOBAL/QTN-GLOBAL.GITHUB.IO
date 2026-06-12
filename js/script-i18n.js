/* =========================
   QTN GLOBAL - I18N CORE (CLEAN VERSION)
   SAFE FOR CART + PRODUCT + FOOTER
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
        detail: "Chi tiết",

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

        footer_brand: "QTN GLOBAL",
        footer_intro: "Chuyên cung cấp cân điện tử, đầu cân và thiết bị cân công nghiệp chính hãng.",

        footer_address_label: "Địa chỉ:",
        footer_address: "Số 14 Ngõ 68 Đường Giáp Hải, Xã Bát Tràng, Thành phố Hà Nội",

        footer_hotline: "Hotline:",
        footer_support: "Hỗ trợ kỹ thuật:",

        footer_email: "Email:",
        footer_website: "Website:"
    },

    en: {
        home: "HOME",
        about: "ABOUT",
        contact: "CONTACT",
        language: "LANGUAGE",

        cart: "Cart",
        buyNow: "Buy Now",
        addCart: "Add to Cart",
        detail: "Details",

        slogan: "PRECISION IN EVERY VALUE",

        hero_line1: "WEIGHING SOLUTIONS",
        hero_line2: "ELECTRONIC SCALES",
        hero_line3: "FOR BUSINESS PRECISION",

        category_title: "CATEGORIES",
        brand_title: "BRANDS",

        footer_brand: "QTN GLOBAL",
        footer_intro: "We provide electronic scales and industrial weighing equipment.",

        footer_address_label: "Address:",
        footer_address: "No. 14 Alley 68 Giap Hai Street, Hanoi",

        footer_hotline: "Hotline:",
        footer_support: "Technical support:",

        footer_email: "Email:",
        footer_website: "Website:"
    },

    cn: {
        home: "首页",
        about: "介绍",
        contact: "联系",
        language: "语言",

        cart: "购物车",
        buyNow: "立即购买",
        addCart: "加入购物车",
        detail: "详情",

        slogan: "每一个价值都精准",

        hero_line1: "称重解决方案",
        hero_line2: "电子秤",
        hero_line3: "企业精准计量",

        category_title: "分类",
        brand_title: "品牌",

        footer_brand: "QTN GLOBAL",
        footer_intro: "专业提供电子秤及工业称重设备。",

        footer_address_label: "地址：",
        footer_address: "越南河内市巴特庄乡",

        footer_hotline: "热线：",
        footer_support: "技术支持：",

        footer_email: "电子邮箱：",
        footer_website: "网站："
    }
};

/* =========================
   SPEC TRANSLATION
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
   GET LANGUAGE
========================= */

function getLang() {
    return localStorage.getItem("lang") || "vi";
}

/* =========================
   SET LANGUAGE (SAFE)
========================= */

function setLanguage(lang) {

    localStorage.setItem("lang", lang);

    applyLanguage(lang);

    if (typeof renderProducts === "function") {
        renderProducts(getProducts());
    }

    if (typeof renderProductDetail === "function") {
        renderProductDetail();
    }

    // SAFE RE-APPLY (fix late DOM like footer/cart)
    setTimeout(() => {
        applyLanguage(lang);
    }, 50);
}

/* =========================
   APPLY LANGUAGE
========================= */

function applyLanguage(lang) {

    document.querySelectorAll("[data-i18n]").forEach(el => {

        const key = el.getAttribute("data-i18n");

        if (translations[lang]?.[key]) {
            el.textContent = translations[lang][key];
        }
    });

    translateSpec(lang);
}

/* =========================
   SPEC TRANSLATION (SAFE MODE)
========================= */

function translateSpec(lang) {

    document.querySelectorAll("[data-spec]").forEach(el => {

        let original = el.getAttribute("data-spec-original");
        if (!original) return;

        let text = original;

        for (let key in specTranslations.vi) {

            if (specTranslations[lang]?.[key]) {
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
   MANUAL REAPPLY
========================= */

window.reApplyI18n = function () {
    applyLanguage(getLang());
};

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(getLang());
});