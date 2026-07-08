/* =====================================================
   CATEGORY CONFIG
   QTN GLOBAL CMS
===================================================== */

const CATEGORY_CONFIG = {

    /* =====================================================
       THIẾT BỊ ĐO LƯỜNG
    ====================================================== */

    measure: [

        {
            id: "can-ban",
            name: "Cân bàn"
        },

        {
            id: "can-ban-dung",
            name: "Cân bàn đứng"
        },

        {
            id: "can-san",
            name: "Cân sàn"
        },

        {
            id: "can-treo",
            name: "Cân treo"
        },

        {
            id: "can-ky-thuat",
            name: "Cân kỹ thuật"
        },

        {
            id: "can-ban-hang",
            name: "Cân bán hàng"
        },

        {
            id: "can-dem",
            name: "Cân đếm"
        },

        {
            id: "dau-can",
            name: "Đầu cân điện tử"
        },

        {
            id: "loadcell",
            name: "Loadcell"
        },

        {
            id: "qua-can",
            name: "Quả cân chuẩn"
        }

    ],

    /* =====================================================
       THIẾT BỊ GIA DỤNG
    ====================================================== */

    home: [

        {
            id: "water-filter",
            name: "Máy lọc nước"
        },

        {
            id: "water-filter-accessory",
            name: "Phụ kiện máy lọc nước"
        }

    ],

    /* =====================================================
       THIẾT BỊ CÔNG NGHIỆP
    ====================================================== */

    industry: [

    ],

    /* =====================================================
       DỊCH VỤ
    ====================================================== */

    service: [

    ],

    /* =====================================================
       THƯƠNG MẠI
    ====================================================== */

    trade: [

    ]

};

/* =====================================================
   GET CATEGORY
===================================================== */

function getCategories(business){

    return CATEGORY_CONFIG[business] || [];

}