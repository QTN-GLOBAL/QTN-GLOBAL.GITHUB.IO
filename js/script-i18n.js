/* =========================
   QTN GLOBAL - MULTI LANGUAGE SYSTEM
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

        slogan: "CHÍNH XÁC TRONG TỪNG GIÁ TRỊ",
        hero_line1: "GIẢI PHÁP",
        hero_line2: "CÂN ĐIỆN TỬ",
        hero_line3: "CHÍNH XÁC CHO DOANH NGHIỆP",

        category_title: "DANH MỤC",
        brand_title: "THƯƠNG HIỆU"
    },

    en: {
        home: "HOME",
        about: "ABOUT",
        contact: "CONTACT",
        language: "LANGUAGE",
        cart: "Cart",
        buyNow: "Buy Now",
        addCart: "Add to Cart",

        slogan: "PRECISION IN EVERY VALUE",
        hero_line1: "WEIGHING SOLUTIONS",
        hero_line2: "ELECTRONIC SCALES",
        hero_line3: "FOR BUSINESS PRECISION",

        category_title: "CATEGORIES",
        brand_title: "BRANDS"
    },

    cn: {
        home: "首页",
        about: "介绍",
        contact: "联系",
        language: "语言",
        cart: "购物车",
        buyNow: "立即购买",
        addCart: "加入购物车",

        slogan: "每一个价值都精准",
        hero_line1: "称重解决方案",
        hero_line2: "电子秤",
        hero_line3: "企业精准计量",

        category_title: "分类",
        brand_title: "品牌"
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
   CORE APPLY LANGUAGE
========================= */

function applyLanguage(lang) {

    requestAnimationFrame(() => {

        // UI TEXT
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang]?.[key]) {
                el.innerText = translations[lang][key];
            }
        });

        // SPEC
        setTimeout(() => {
            translateSpec(lang);
        }, 0);

        // FOOTER
        setTimeout(() => {
            applyFooterTranslation();
        }, 0);
    });
}

/* =========================
   SPEC ENGINE
========================= */
function translateSpec(lang) {

   document.querySelectorAll("td, th, li").forEach(el => {

        // ❌ KHÔNG động vào khu vực UI chính
        if (el.closest(".hero") ||
            el.closest(".sidebar") ||
            el.closest(".brand-sidebar") ||
            el.closest(".detail-right") ||
            el.closest(".detail-left")) return;

        // ❌ KHÔNG động vào element i18n
        if (el.hasAttribute("data-i18n")) return;

        // ❌ CHẶN luôn element con của i18n (rất quan trọng)
        if (el.closest("[data-i18n]")) return;

        // =========================
        // 🔥 RESET VỀ VI
        // =========================
        if (lang === "vi") {
            if (el.dataset.origin) {
                el.innerText = el.dataset.origin;
            }
            return;
        }

        // =========================
        // 🔥 LƯU TEXT GỐC 1 LẦN
        // =========================
        if (!el.dataset.origin) {
            el.dataset.origin = el.innerText;
        }

        let text = el.dataset.origin;
        if (!text) return;

        // =========================
        // 🔥 TRANSLATE
        // =========================
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
   FOOTER
========================= */

const footerTranslations = {
    en: {
        footer_brand: "QTN GLOBAL",
        footer_intro: "We provide electronic scales and industrial equipment.",
        footer_address_label: "Address:",
        footer_address: "No. 14 Alley 68 Giap Hai Street, Hanoi",
        footer_support: "Technical support:"
    },

    cn: {
        footer_brand: "QTN GLOBAL",
        footer_intro: "专业提供电子秤及工业设备。",
        footer_address_label: "地址：",
        footer_address: "越南河内市 Giap Hai 街 68 巷14号",
        footer_support: "技术支持："
    }
};

function applyFooterTranslation() {

    const lang = localStorage.getItem("lang") || "vi";

    document.querySelectorAll(".footer [data-i18n]").forEach(el => {

        const key = el.getAttribute("data-i18n");

        if (lang === "vi") {
            el.innerText = el.dataset.origin || el.innerText;
            return;
        }

        if (footerTranslations[lang]?.[key]) {
            el.innerText = footerTranslations[lang][key];
        }
    });
}

/* =========================
   LANGUAGE CONTROL
========================= */

window.reApplyI18n = function () {
    const lang = localStorage.getItem("lang") || "vi";
    applyLanguage(lang);
};

function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    // 🔥 LƯU TEXT GỐC 1 LẦN DUY NHẤT
    document.querySelectorAll("[data-i18n]").forEach(el => {
        if (!el.dataset.origin) {
            el.dataset.origin = el.innerText;
        }
    });

    // chạy i18n ban đầu
    const lang = localStorage.getItem("lang") || "vi";
    applyLanguage(lang);

});