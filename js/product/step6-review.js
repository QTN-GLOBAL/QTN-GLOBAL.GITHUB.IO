/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 6 - Review & Publish
 * File   : step6-review.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step6 = {};

    Step6.result = null;

    //==========================================================
    // Render
    //==========================================================

    Step6.render = function () {

        const draft = window.draftProduct;

        Step6.result = ProductValidator.validate(draft);

        document.dispatchEvent(

            new CustomEvent("step6:render", {

                detail: {

                    draft: draft,

                    validation: Step6.result

                }

            })

        );

    };

    //==========================================================
    // Build Product
    //==========================================================

    Step6.build = function () {

        const product = ProductBuilder.build(window.draftProduct);

        return product;

    };

    //==========================================================
    // Preview JSON
    //==========================================================

    Step6.preview = function () {

        const json = ProductBuilder.toJSON(window.draftProduct);

        console.log(json);

        return json;

    };

    //==========================================================
    // Can Publish
    //==========================================================

    Step6.canPublish = function () {

        const result = ProductValidator.validate(window.draftProduct);

        return (

            result.basic.length === 0 &&

            result.technical.length === 0 &&

            result.media.length === 0 &&

            result.seo.length === 0

        );

    };

    //==========================================================
    // Publish
    //==========================================================

    Step6.publish = function () {

        if (!Step6.canPublish()) {

            alert("Sản phẩm chưa hoàn thiện.");

            return;

        }

        const product = ProductBuilder.build(window.draftProduct);

        document.dispatchEvent(

            new CustomEvent("product:publish", {

                detail: product

            })

        );

    };

    //==========================================================
    // Wizard
    //==========================================================

    document.addEventListener("wizard:change", function (e) {

        if (e.detail.step === 6) {

            Step6.render();

        }

    });

    //==========================================================
    // Export
    //==========================================================

    window.Step6 = Step6;

})(window);