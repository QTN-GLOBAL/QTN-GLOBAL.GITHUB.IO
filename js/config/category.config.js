/* =====================================================
   CATEGORY CONFIG
   QTN GLOBAL CMS
===================================================== */

const CATEGORY_CONFIG = {

    /* =================================================
       THIẾT BỊ ĐO LƯỜNG
    ================================================= */

    measure: [

        {
            id: "can-ban",
            name: "Cân bàn",
            icon: "⚖️",
            description: "Cân bàn điện tử",
            folder: "platform-scale",
            active: true,
            hasProducts: true
        },

        {
            id: "can-ban-dung",
            name: "Cân bàn đứng",
            icon: "⚖️",
            description: "Cân bàn đứng điện tử",
            folder: "floor-platform-scale",
            active: true,
            hasProducts: true
        },

        {
            id: "can-dem",
            name: "Cân đếm",
            icon: "🔢",
            description: "Cân đếm số lượng",
            folder: "counting-scale",
            active: true,
            hasProducts: true
        },

        {
            id: "can-treo",
            name: "Cân treo",
            icon: "🏗️",
            description: "Cân treo điện tử",
            folder: "crane-scale",
            active: true,
            hasProducts: true
        },

        {
            id: "dau-can-dien-tu",
            name: "Đầu cân điện tử",
            icon: "🖥️",
            description: "Đầu hiển thị cân",
            folder: "indicator",
            active: true,
            hasProducts: true
        },

        {
            id: "can-phan-tich",
            name: "Cân phân tích",
            icon: "🧪",
            description: "Cân phân tích phòng thí nghiệm",
            folder: "analytical-scale",
            active: true,
            hasProducts: true
        },

        {
            id: "can-chong-nuoc",
            name: "Cân chống nước",
            icon: "💧",
            description: "Cân điện tử chống nước",
            folder: "waterproof-scale",
            active: true,
            hasProducts: true
        },

        {
            id: "can-in-tem-ma-vach",
            name: "Cân in tem mã vạch",
            icon: "🏷️",
            description: "Cân in tem",
            folder: "label-printing-scale",
            active: true,
            hasProducts: true
        },

        {
            id: "can-ghe-ngoi",
            name: "Cân ghế ngồi",
            icon: "🪑",
            description: "Cân y tế ghế ngồi",
            folder: "chair-scale",
            active: true,
            hasProducts: true
        }

    ],

    /* =================================================
       THIẾT BỊ GIA DỤNG
    ================================================= */

    home: [

        {
            id: "air-purifier",
            name: "Máy lọc không khí",
            icon: "🌬️",
            description: "Máy lọc không khí",
            folder: "air-purifier",
            active: true,
            hasProducts: true
        },

        {
            id: "air-filter",
            name: "Phụ kiện máy lọc không khí",
            icon: "🧩",
            description: "Lõi lọc và phụ kiện",
            folder: "air-filter",
            active: true,
            hasProducts: true
        },

        {
            id: "water-purifier",
            name: "Máy lọc nước",
            icon: "💧",
            description: "Máy lọc nước",
            folder: "water-purifier",
            active: true,
            hasProducts: true
        },

        {
            id: "water-filter",
            name: "Lõi lọc & phụ kiện",
            icon: "🚰",
            description: "Lõi lọc và phụ kiện",
            folder: "water-filter",
            active: true,
            hasProducts: true
        }

    ],

    /* =================================================
       CHƯA CÓ SẢN PHẨM
    ================================================= */

    industry: [],

    service: [],

    trade: []

};

/* =====================================================
   GET CATEGORIES
===================================================== */

function getCategories(businessId) {

    if (!CATEGORY_CONFIG[businessId]) {

        return [];

    }

    return CATEGORY_CONFIG[businessId]
        .filter(item => item.active);

}

/* =====================================================
   GET CATEGORY
===================================================== */

function getCategory(categoryId) {

    const groups = Object.values(CATEGORY_CONFIG);

    for (const list of groups) {

        const found = list.find(item => item.id === categoryId);

        if (found) return found;

    }

    return null;

}