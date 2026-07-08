/* =====================================================
   BUSINESS CONFIG
   QTN GLOBAL CMS
===================================================== */

const BUSINESS_CONFIG = {

    measure: {

        id: "measure",

        name: "Thiết bị đo lường",

        icon: "⚖️",

        hasProducts: true,

        form: "measure"

    },

    industry: {

        id: "industry",

        name: "Thiết bị công nghiệp",

        icon: "🏭",

        hasProducts: false,

        form: "industry"

    },

    service: {

        id: "service",

        name: "Dịch vụ kỹ thuật",

        icon: "🔧",

        hasProducts: false,

        form: "service"

    },

    home: {

        id: "home",

        name: "Thiết bị gia dụng",

        icon: "🏠",

        hasProducts: true,

        form: "home"

    },

    trade: {

        id: "trade",

        name: "Thương mại & Phân phối",

        icon: "🌎",

        hasProducts: false,

        form: "trade"

    }

};

/* =====================================================
   GET ALL BUSINESSES
===================================================== */

function getBusinesses(){

    return Object.values(BUSINESS_CONFIG);

}

/* =====================================================
   GET BUSINESS
===================================================== */

function getBusiness(id){

    return BUSINESS_CONFIG[id];

}
