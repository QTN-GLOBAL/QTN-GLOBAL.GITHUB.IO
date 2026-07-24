/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 1 - Basic Information
 * File   : step1-basic.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step1 = {};

    //==========================================================
    // Elements
    //==========================================================

    Step1.elements = {};

    //==========================================================
    // Init
    //==========================================================

    Step1.init = function () {

        Step1.elements = {

            name: document.querySelector("#productName"),

            model: document.querySelector("#productModel"),

            brand: document.querySelector("#productBrand"),

            category: document.querySelector("#productCategory"),

            origin: document.querySelector("#productOrigin"),

            business: document.querySelector("#productBusiness"),

            description: document.querySelector("#productDescription"),

            folder: document.querySelector("#productFolder"),

            slug: document.querySelector("#productSlug")

        };

        Step1.bind();

    };

    //==========================================================
    // Bind Event
    //==========================================================

    Step1.bind = function () {

        Object.values(Step1.elements).forEach(function (el) {

            if (!el) return;

            el.addEventListener("input", Step1.save);

            el.addEventListener("change", Step1.save);

        });

    };

    //==========================================================
    // Render
    //==========================================================

    Step1.render = function () {

        const d = window.draftProduct;

        Step1.elements.name.value = d.basic.name || "";

        Step1.elements.model.value = d.basic.model || "";

        Step1.elements.brand.value = d.basic.brand || "";

        Step1.elements.category.value = d.basic.category || "";

        Step1.elements.origin.value = d.basic.origin || "";

        Step1.elements.business.value = d.system.business || "";

        Step1.elements.description.value = d.basic.description || "";

        Step1.elements.folder.value = d.basic.folder || "";

        Step1.elements.slug.value = d.basic.slug || "";

    };

    //==========================================================
    // Save
    //==========================================================

    Step1.save = function () {

        const d = window.draftProduct;

        d.basic.name = Step1.elements.name.value;

        d.basic.model = Step1.elements.model.value;

        d.basic.brand = Step1.elements.brand.value;

        d.basic.category = Step1.elements.category.value;

        d.basic.origin = Step1.elements.origin.value;

        d.system.business = Step1.elements.business.value;

        d.basic.description = Step1.elements.description.value;

        d.basic.folder = Step1.elements.folder.value;

        d.basic.slug = Step1.elements.slug.value;

        document.dispatchEvent(

            new CustomEvent("product:basicChanged", {

                detail: d

            })

        );

    };

    //==========================================================
    // Refresh
    //==========================================================

    document.addEventListener("product:imported", function () {

        Step1.render();

    });

    document.addEventListener("wizard:change", function (e) {

        if (e.detail.step === 1) {

            Step1.render();

        }

    });

    //==========================================================
    // Ready
    //==========================================================

    document.addEventListener("DOMContentLoaded", function () {

        Step1.init();

    });

    //==========================================================
    // Export
    //==========================================================

    window.Step1 = Step1;

})(window);