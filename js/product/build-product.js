/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Builder
 * File   : build-product.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ProductBuilder = {};

    //==========================================================
    // Build Product Object
    //==========================================================

    ProductBuilder.build = function (draft) {

        if (!draft) {

            throw new Error("Draft Product không tồn tại.");

        }

        return {

            business: draft.system.business,

            id: draft.system.id,

            name: draft.basic.name,

            category: draft.basic.category,

            folder: draft.basic.folder,

            brand: draft.basic.brand,

            origin: draft.basic.origin,

            description: draft.basic.description,

            specs: ProductBuilder.buildSpecs(draft)

        };

    };

    //==========================================================
    // Build Specs Array
    //==========================================================

    ProductBuilder.buildSpecs = function (draft) {

        const specs = [];

        // HTML Table
        if (draft.technical.tableHtml) {

            specs.push(draft.technical.tableHtml);

        }

        // Features
        if (Array.isArray(draft.technical.features)) {

            draft.technical.features.forEach(function (item) {

                if (item && item.trim()) {

                    specs.push(item.trim());

                }

            });

        }

        return specs;

    };

    //==========================================================
    // JSON
    //==========================================================

    ProductBuilder.toJSON = function (draft) {

        return JSON.stringify(

            ProductBuilder.build(draft),

            null,
            4

        );

    };

    //==========================================================
    // Export
    //==========================================================

    window.ProductBuilder = ProductBuilder;

})(window);