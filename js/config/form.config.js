/* =====================================================
   FORM CONFIG
===================================================== */

const FORM_CONFIG = {

    measure: {

        steps: [

            "basic",

            "language",

            "images",

            "specification",

            "seo",

            "preview"

        ]

    },

    home: {

        steps: [

            "basic",

            "language",

            "images",

            "compatible",

            "features",

            "seo",

            "preview"

        ]

    },

    industry: {

        steps: [

            "basic",

            "language",

            "images",

            "technical",

            "seo",

            "preview"

        ]

    },

    service: {

        steps: [

            "basic",

            "language",

            "images",

            "service",

            "seo",

            "preview"

        ]

    },

    trade: {

        steps: [

            "basic",

            "language",

            "images",

            "catalog",

            "seo",

            "preview"

        ]

    }

};

/* =====================================================
   GET FORM CONFIG
===================================================== */

function getFormConfig(business){

    return FORM_CONFIG[business];

}