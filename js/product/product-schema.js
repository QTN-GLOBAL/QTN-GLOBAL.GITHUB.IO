/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Schema
 * File   : product-schema.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    /**
     * Trạng thái mặc định của Draft Product
     */
    const PRODUCT_SCHEMA = {

        // ==========================
        // SYSTEM
        // ==========================
        system: {

            id: null,

            business: "measure",

            createdAt: "",

            updatedAt: ""

        },

        // ==========================
        // BASIC
        // ==========================
        basic: {

            name: "",

            model: "",

            category: "",

            brand: "",

            origin: "",

            folder: "",

            slug: "",

            description: ""

        },

        // ==========================
        // TECHNICAL
        // ==========================
        technical: {

            capacities: [

                // {
                //     capacity:"",
                //     division:""
                // }

            ],

            specifications: {

                platform: "",

                size: "",

                units: ""

            },

            features: [

                // "Độ phân giải..."

            ]

        },

        // ==========================
        // MEDIA
        // ==========================
        media: {

            images: [

                // {
                //     name:"",
                //     url:"",
                //     isMain:false
                // }

            ],

            pdf: "",

            video: ""

        },

        // ==========================
        // SEO
        // ==========================
        seo: {

            title: "",

            description: "",

            keywords: ""

        },

        // ==========================
        // DISPLAY
        // ==========================
        display: {

            featured: false,

            homepage: false,

            active: true

        }

    };



    /**
     * Draft Product hiện tại
     */
    window.draftProduct = structuredClone(PRODUCT_SCHEMA);



    /**
     * Schema gốc
     */
    window.PRODUCT_SCHEMA = PRODUCT_SCHEMA;

})(window);