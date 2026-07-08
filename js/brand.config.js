/* =====================================================
   BRAND CONFIG
   QTN GLOBAL CMS
===================================================== */

const BRAND_CONFIG = {

    measure: [

        {
            id: "jadever",
            name: "Jadever",
            country: "Taiwan",
            active: true
        },

        {
            id: "excell",
            name: "EXCELL",
            country: "Taiwan",
            active: true
        },

        {
            id: "ohaus",
            name: "OHAUS",
            country: "USA",
            active: true
        },

        {
            id: "vibra",
            name: "VIBRA",
            country: "Japan",
            active: true
        },

        {
            id: "yaohua",
            name: "YAOHUA",
            country: "China",
            active: true
        }

    ],

    home: [

        {
            id: "espring",
            name: "eSpring",
            country: "USA",
            active: true
        },

        {
            id: "atmosphere",
            name: "Atmosphere",
            country: "USA",
            active: true
        },

        {
            id: "amway-home",
            name: "Amway Home",
            country: "USA",
            active: true
        },

        {
            id: "artistry",
            name: "Artistry",
            country: "USA",
            active: true
        },

        {
            id: "nutrilite",
            name: "Nutrilite",
            country: "USA",
            active: true
        }

    ],

    industry: [],

    service: [],

    trade: []

};

/* =====================================================
   GET BRANDS
===================================================== */

function getBrands(business){

    return BRAND_CONFIG[business] || [];

}