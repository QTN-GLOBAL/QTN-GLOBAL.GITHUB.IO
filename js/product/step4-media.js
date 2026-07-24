/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 4 - Media
 * File   : step4-media.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step4 = {};

    //==========================================================
    // Render
    //==========================================================

    Step4.render = function () {

        const draft = window.draftProduct;

        if (!Array.isArray(draft.media.images)) {

            draft.media.images = [];

        }

        document.dispatchEvent(

            new CustomEvent("step4:render", {

                detail: draft.media

            })

        );

    };

    //==========================================================
    // Add Image
    //==========================================================

    Step4.addImage = function (image) {

        const media = window.draftProduct.media;

        media.images.push({

            id: Date.now(),

            name: image.name || "",

            url: image.url || "",

            type: "image",

            isMain: media.images.length === 0,

            sort: media.images.length + 1,

            alt: image.alt || ""

        });

        Step4.changed();

    };

    //==========================================================
    // Remove Image
    //==========================================================

    Step4.removeImage = function (id) {

        const media = window.draftProduct.media;

        media.images = media.images.filter(img => img.id !== id);

        Step4.changed();

    };

    //==========================================================
    // Set Main Image
    //==========================================================

    Step4.setMainImage = function (id) {

        window.draftProduct.media.images.forEach(img => {

            img.isMain = (img.id === id);

        });

        Step4.changed();

    };

    //==========================================================
    // Sort Images
    //==========================================================

    Step4.sortImages = function (ids) {

        const media = window.draftProduct.media;

        media.images.sort((a,b)=>{

            return ids.indexOf(a.id)-ids.indexOf(b.id);

        });

        media.images.forEach((img,index)=>{

            img.sort=index+1;

        });

        Step4.changed();

    };

    //==========================================================
    // PDF
    //==========================================================

    Step4.setPDF = function (url) {

        window.draftProduct.media.pdf = url;

        Step4.changed();

    };

    //==========================================================
    // VIDEO
    //==========================================================

    Step4.setVideo = function (url) {

        window.draftProduct.media.video = url;

        Step4.changed();

    };

    //==========================================================
    // Changed
    //==========================================================

    Step4.changed = function () {

        document.dispatchEvent(

            new CustomEvent("product:mediaChanged", {

                detail: window.draftProduct

            })

        );

    };

    //==========================================================
    // Wizard
    //==========================================================

    document.addEventListener("wizard:change", function (e) {

        if (e.detail.step === 4) {

            Step4.render();

        }

    });

    //==========================================================
    // Export
    //==========================================================

    window.Step4 = Step4;

})(window);