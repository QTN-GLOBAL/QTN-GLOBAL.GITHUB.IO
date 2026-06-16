/* =========================
   QTN GLOBAL I18N
========================= */

const translations = {

    vi: {

        home: "TRANG CHỦ",
        about: "GIỚI THIỆU",
        contact: "LIÊN HỆ",
        detail: "Chi tiết",

        slogan: "CHÍNH XÁC TRONG TỪNG GIÁ TRỊ",

        cart: "🛒 GIỎ HÀNG",

        heroLine1: "GIẢI PHÁP",
        heroLine2: "CÂN ĐIỆN TỬ",
        heroLine3: "CHÍNH XÁC CHO",
        heroLine4: "DOANH NGHIỆP",

        heroFeature1: "SẢN PHẨM CHÍNH HÃNG",
        heroFeature2: "BÁO GIÁ NHANH - GIAO HÀNG TOÀN QUỐC",
        heroFeature3: "HỖ TRỢ KỸ THUẬT CHUYÊN NGHIỆP",

        categories: "DANH MỤC",

        catPlatformScale: "Cân bàn",
        catCountingScale: "Cân đếm",
        catCraneScale: "Cân treo",
        catIndicator: "Đầu cân điện tử",
        catAnalyticalScale: "Cân phân tích",
        catWaterproofScale: "Cân chống nước",
        catLabelPrintingScale: "Cân in tem mã vạch",
        catChairScale: "Cân ghế ngồi",

        brands: "THƯƠNG HIỆU",

        buyNow: "MUA NGAY",
        orderTitle: "ĐẶT HÀNG",

        customerName: "Tên khách hàng",
        customerPhone: "Số điện thoại",
        customerCompany: "Tên công ty",
        customerTax: "Mã số thuế",
        customerInvoice: "Địa chỉ xuất hóa đơn",
        customerAddress: "Địa chỉ giao hàng",

        sendZalo: "GỬI ZALO",
        sendMessenger: "GỬI MESSENGER",

        footerDesc:
            "Chuyên cung cấp cân điện tử, đầu cân và thiết bị cân công nghiệp chính hãng.",

        addressLabel: "Địa chỉ:",
        addressValue:
            "Số 14 Ngõ 68 Đường Giáp Hải, Xã Bát Tràng, Thành phố Hà Nội",

        hotlineLabel: "Hotline:",
        techSupport: "Hỗ trợ kỹ thuật:",
        emailLabel: "Email:",
        websiteLabel: "Website:"
    },

    en: {

        home: "HOME",
        about: "ABOUT",
        contact: "CONTACT",
        detail: "Details",

        slogan: "ACCURACY IN EVERY VALUE",

        cart: "🛒 CART",

        heroLine1: "SOLUTIONS",
        heroLine2: "ELECTRONIC SCALES",
        heroLine3: "PRECISION FOR",
        heroLine4: "BUSINESSES",

        heroFeature1: "GENUINE PRODUCTS",
        heroFeature2: "FAST QUOTATION - NATIONWIDE DELIVERY",
        heroFeature3: "PROFESSIONAL TECHNICAL SUPPORT",

        categories: "CATEGORIES",

        catPlatformScale: "Platform Scales",
        catCountingScale: "Counting Scales",
        catCraneScale: "Crane Scales",
        catIndicator: "Weight Indicators",
        catAnalyticalScale: "Analytical Balances",
        catWaterproofScale: "Waterproof Scales",
        catLabelPrintingScale: "Label Printing Scales",
        catChairScale: "Chair Scales",

        brands: "BRANDS",

        buyNow: "BUY NOW",
        orderTitle: "ORDER FORM",

        customerName: "Customer Name",
        customerPhone: "Phone Number",
        customerCompany: "Company Name",
        customerTax: "Tax Code",
        customerInvoice: "Invoice Address",
        customerAddress: "Delivery Address",

        sendZalo: "SEND VIA ZALO",
        sendMessenger: "SEND VIA MESSENGER",

        footerDesc:
            "Supplier of electronic scales, weighing indicators and industrial weighing equipment.",

        addressLabel: "Address:",
        addressValue:
            "No.14, Alley 68 Giap Hai Street, Bat Trang Commune, Hanoi City, Vietnam",

        hotlineLabel: "Hotline:",
        techSupport: "Technical Support:",
        emailLabel: "Email:",
        websiteLabel: "Website:"
    },

    zh: {

        home: "首页",
        about: "关于我们",
        contact: "联系我们",
        detail: "详情",

        slogan: "精准体现每一个价值",

        cart: "🛒 购物车",

        heroLine1: "电子衡器",
        heroLine2: "解决方案",
        heroLine3: "精准服务",
        heroLine4: "企业客户",

        heroFeature1: "原装正品",
        heroFeature2: "快速报价 - 全国配送",
        heroFeature3: "专业技术支持",

        categories: "产品分类",

        catPlatformScale: "台秤",
        catCountingScale: "计数秤",
        catCraneScale: "吊秤",
        catIndicator: "称重显示器",
        catAnalyticalScale: "分析天平",
        catWaterproofScale: "防水秤",
        catLabelPrintingScale: "条码标签秤",
        catChairScale: "座椅秤",

        brands: "品牌",

        buyNow: "立即购买",
        orderTitle: "订购信息",

        customerName: "客户姓名",
        customerPhone: "联系电话",
        customerCompany: "公司名称",
        customerTax: "税号",
        customerInvoice: "发票地址",
        customerAddress: "收货地址",

        sendZalo: "发送到 ZALO",
        sendMessenger: "发送到 Messenger",

        footerDesc:
            "专业提供电子秤、称重仪表及工业称重设备。",

        addressLabel: "地址：",
        addressValue:
            "越南河内市八场社甲海路68巷14号",

        hotlineLabel: "热线：",
        techSupport: "技术支持：",
        emailLabel: "电子邮箱：",
        websiteLabel: "网站："
    }
};

/* =========================
   APPLY LANGUAGE
========================= */
function t(key) {

    const lang =
        localStorage.getItem("language") || "vi";

    return translations[lang]?.[key]
        || translations.vi[key]
        || key;
}
function applyLanguage(lang) {

    const dict = translations[lang];

    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {

        const key = el.dataset.i18n;

        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {

        const key = el.dataset.i18nPlaceholder;

        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });
}

/* =========================
   SET LANGUAGE
========================= */

function setLanguage(lang) {

    localStorage.setItem("language", lang);

    applyLanguage(lang);
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const select = document.getElementById("languageSelect");

    const savedLang =
        localStorage.getItem("language") || "vi";

    applyLanguage(savedLang);

    if (select) {

        select.value = savedLang;

        select.addEventListener("change", function () {

            setLanguage(this.value);

        });
    }
});