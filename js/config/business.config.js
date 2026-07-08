/* =====================================================
   BUSINESS CONFIG
   QTN GLOBAL CMS
===================================================== */

const BUSINESS_CONFIG = {

    measure: {

        id: "measure",

        name: "Thiết bị đo lường",

        icon: "⚖️",

        description: "Cân điện tử và thiết bị đo lường",

        color: "#2F80ED",

        active: true,

        hasProducts: true,

        form: "measure"

    },

    industry: {

        id: "industry",

        name: "Thiết bị công nghiệp",

        icon: "🏭",

        description: "Máy móc và thiết bị công nghiệp",

        color: "#F2994A",

        active: true,

        hasProducts: false,

        form: "industry"

    },

    service: {

        id: "service",

        name: "Dịch vụ kỹ thuật",

        icon: "🔧",

        description: "Lắp đặt, sửa chữa và bảo trì",

        color: "#EB5757",

        active: true,

        hasProducts: false,

        form: "service"

    },

    home: {

        id: "home",

        name: "Thiết bị gia dụng",

        icon: "🏠",

        description: "Máy lọc nước và thiết bị gia dụng",

        color: "#27AE60",

        active: true,

        hasProducts: true,

        form: "home"

    },

    trade: {

        id: "trade",

        name: "Thương mại & Phân phối",

        icon: "🌎",

        description: "Giải pháp thương mại và phân phối",

        color: "#9B51E0",

        active: true,

        hasProducts: false,

        form: "trade"

    }

};

/* =====================================================
   GET ALL BUSINESSES
===================================================== */

function getBusinesses() {

    return Object.values(BUSINESS_CONFIG)
        .filter(item => item.active);

}

/* =====================================================
   GET BUSINESS
===================================================== */

function getBusiness(id) {

    return BUSINESS_CONFIG[id] || null;

}

/* =====================================================
   CHECK BUSINESS
===================================================== */

function hasBusiness(id) {

    return BUSINESS_CONFIG.hasOwnProperty(id);

}
