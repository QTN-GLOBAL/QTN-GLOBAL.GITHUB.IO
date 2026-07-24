/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 0 - Preview
 * File   : step0-preview.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step0Preview = {};

    // ==========================================================
    // RENDER
    // ==========================================================

    Step0Preview.render = function () {

        const draft = window.draftProduct;

        console.log("===== IMPORT RESULT =====");

        console.table({

            Name: draft.basic.name,

            Brand: draft.basic.brand,

            Category: draft.basic.category,

            Model: draft.basic.model,

            Origin: draft.basic.origin

        });

        console.log(draft);

    };

    // ==========================================================
    // VALIDATE
    // ==========================================================

    Step0Preview.validate = function () {

        const draft = window.draftProduct;

        return ProductUtils.validateRequired([

            {
                name: "Tên sản phẩm",
                value: draft.basic.name
            },

            {
                name: "Brand",
                value: draft.basic.brand
            },

            {
                name: "Category",
                value: draft.basic.category
            },

            {
                name: "Model",
                value: draft.basic.model
            }

        ]);

    };

    // ==========================================================
    // READY
    // ==========================================================

    document.addEventListener("product:imported", function () {

        Step0Preview.render();

    });

    // ==========================================================
    // EXPORT
    // ==========================================================

    window.Step0Preview = Step0Preview;

})(window);