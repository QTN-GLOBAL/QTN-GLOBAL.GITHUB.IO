/* =====================================================
   BRAND CONFIG
   QTN GLOBAL CMS
===================================================== */

const BRAND_CONFIG = {

    jadever: {

        id: "jadever",

        name: "Jadever",
        

        origin: "Taiwan",

        logo: "jadever.png",

        website: "",

description: "",

active: true,

business: ["measure"],



        categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"
        ]

    },

    excell: {

        id: "excell",

        name: "EXCELL",
        

        origin: "Taiwan",

        logo: "excell.png",

          website: "",

description: "",

active: true,

business: ["measure"],

        categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"

        ]

    },

    vibra: {

        id: "vibra",

        name: "VIBRA",

        origin: "Japan",

        logo: "vibra.png",

         website: "",

description: "",

active: true,

business: ["measure"],

        categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"

        ]

    },

    ohaus: {

        id: "ohaus",

        name: "OHAUS",

        origin: "USA",

        logo: "ohaus.png",

         website: "",

description: "",

active: true,

business: ["measure"],

        categories: [

           "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"

        ]

    },

    yaohua: {

        id: "yaohua",

        name: "Yaohua",

        origin: "China",

        logo: "yaohua.png",

          website: "",

description: "",

active: true,

business: ["measure"],

        categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"

        ]

    },
   oneko: {

    id: "oneko",

    name: "ONEKO",

    origin: "",

    logo: "oneko.png",

     website: "",

description: "",

active: true,

business: ["measure"],
    categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"
        ]

},

faithful: {

    id: "faithful",

    name: "FAITHFUL",

    origin: "",

    logo: "faithful.png",

     website: "",

description: "",

active: true,

business: ["measure"],
    categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"
        ]

},

shinko: {

    id: "shinko",

    name: "Shinko",

    origin: "Japan",

    logo: "shinko.png",

      website: "",

description: "",

active: true,

business: ["measure"],
categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"
        ]

},

oks: {

    id: "oks",

    name: "OKS",

    origin: "",

    logo: "oks.png",

     website: "",

description: "",

active: true,

business: ["measure"],
categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"
        ]

},

hz: {

    id: "hz",

    name: "HZ",

    origin: "",

    logo: "hz.png",

      website: "",

description: "",

active: true,

business: ["measure"],
categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"
        ]

},

fuji: {

    id: "fuji",

    name: "FUJI",

    origin: "Japan",

    logo: "fuji.png",

     website: "",

description: "",

active: true,

business: ["measure"],
categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc",
            "dau-can-dien-tu",
             "can-phan-tich",
             "can-in-tem-ma-vach",
             "can-ghe-ngoi"
        ]

},

   
    

    amway: {

        id: "amway",

        name: "Amway",

        origin: "USA",

        logo: "amway.png",

        website: "",

description: "",

active: true,

business: ["home"],

        categories: [

            "water-purifier",
            "water-filter",
            "air-purifier",
            "air-filter"

        ]

    }

};

/* =====================================================
   GET BRANDS BY CATEGORY
===================================================== */

function getBrandsByCategory(categoryId) {

    return Object.values(BRAND_CONFIG).filter(item =>

        item.active &&
        item.categories.includes(categoryId)

    );

}

/* =====================================================
   GET BRANDS BY BUSINESS
===================================================== */

function getBrandsByBusiness(businessId) {

    return Object.values(BRAND_CONFIG).filter(item =>

        item.active &&
        item.business &&
        item.business.includes(businessId)

    );

}
/* =====================================================
   BACKWARD COMPATIBILITY
===================================================== */

function getBrands(businessId){

    return getBrandsByBusiness(businessId);

}