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

        active: true,

        categories: [

            "can-ban",
            "can-ban-dung",
            "can-dem",
            "can-treo",
            "can-chong-nuoc"

        ]

    },

    excell: {

        id: "excell",

        name: "EXCELL",

        origin: "Taiwan",

        logo: "excell.png",

        website: "",

        active: true,

        categories: [

            "can-ban",
            "can-ban-dung",
            "can-treo",
            "dau-can-dien-tu"

        ]

    },

    vibra: {

        id: "vibra",

        name: "VIBRA",

        origin: "Japan",

        logo: "vibra.png",

        website: "",

        active: true,

        categories: [

            "can-ban",
            "can-phan-tich"

        ]

    },

    ohaus: {

        id: "ohaus",

        name: "OHAUS",

        origin: "USA",

        logo: "ohaus.png",

        website: "",

        active: true,

        categories: [

            "can-ban",
            "can-phan-tich"

        ]

    },

    yaohua: {

        id: "yaohua",

        name: "Yaohua",

        origin: "China",

        logo: "yaohua.png",

        website: "",

        active: true,

        categories: [

            "dau-can-dien-tu"

        ]

    },

    espring: {

        id: "espring",

        name: "eSpring",

        origin: "USA",

        logo: "espring.png",

        website: "",

        active: true,

        categories: [

            "water-purifier",
            "water-filter"

        ]

    },

    atmosphere: {

        id: "atmosphere",

        name: "Atmosphere",

        origin: "USA",

        logo: "atmosphere.png",

        website: "",

        active: true,

        categories: [

            "air-purifier",
            "air-filter"

        ]

    },

    amway: {

        id: "amway",

        name: "Amway",

        origin: "USA",

        logo: "amway.png",

        website: "",

        active: true,

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

function getBrands(categoryId) {

    return Object.values(BRAND_CONFIG).filter(item =>

        item.active &&
        item.categories.includes(categoryId)

    );

}

/* =====================================================
   GET BRAND
===================================================== */

function getBrand(id) {

    return BRAND_CONFIG[id] || null;

}