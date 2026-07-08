/* =====================================================
   SERIES CONFIG
   QTN GLOBAL CMS
===================================================== */

const SERIES_CONFIG = {

    /* ============================================
       JADEVER
    ============================================ */

    jadever: [

        {
            id: "jwl",
            name: "JWL",
            active: true
        }

    ],

    /* ============================================
       EXCELL
    ============================================ */

    excell: [

        {
            id: "xk315a1",
            name: "XK315A1",
            active: true
        }

    ],

    /* ============================================
       VIBRA
    ============================================ */

    vibra: [

        {
            id: "alc",
            name: "ALC",
            active: true
        }

    ],

    /* ============================================
       OHAUS
    ============================================ */

    ohaus: [

        {
            id: "rc21pe",
            name: "RC21PE",
            active: true
        }

    ],

    /* ============================================
       YAOHUA
    ============================================ */

    yaohua: [

        {
            id: "xk3190",
            name: "XK3190",
            active: true
        }

    ],

    /* ============================================
       eSpring
    ============================================ */

    espring: [

        {
            id: "new-espring",
            name: "New eSpring",
            active: true
        }

    ],

    /* ============================================
       Atmosphere
    ============================================ */

    atmosphere: [

        {
            id: "sky",
            name: "Atmosphere Sky",
            active: true
        }

    ],

    /* ============================================
       AMWAY
    ============================================ */

    amway: [

    ]

};

/* =====================================================
   GET SERIES
===================================================== */

function getSeries(brandId){

    if(!SERIES_CONFIG[brandId]){

        return [];

    }

    return SERIES_CONFIG[brandId]
        .filter(item=>item.active);

}

/* =====================================================
   GET SERIES ITEM
===================================================== */

function getSeriesItem(seriesId){

    const groups =
        Object.values(SERIES_CONFIG);

    for(const list of groups){

        const found =
            list.find(item=>item.id===seriesId);

        if(found){

            return found;

        }

    }

    return null;

}