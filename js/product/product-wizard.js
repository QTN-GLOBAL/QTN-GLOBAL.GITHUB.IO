/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Wizard
 * File   : product-wizard.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ProductWizard = {};

    // ==========================================================
    // CONFIG
    // ==========================================================

    ProductWizard.totalSteps = 7; // Step0 → Step6

    ProductWizard.currentStep = 0;

    ProductWizard.isCompleted = false;

    // ==========================================================
    // STEP
    // ==========================================================

    ProductWizard.getCurrentStep = function () {

        return ProductWizard.currentStep;

    };

    ProductWizard.setStep = function (step) {

        step = Number(step);

        if (isNaN(step))
            return false;

        if (step < 0)
            step = 0;

        if (step > ProductWizard.totalSteps - 1)
            step = ProductWizard.totalSteps - 1;

        ProductWizard.currentStep = step;

        ProductWizard.dispatch();

        return true;

    };

    ProductWizard.next = function () {

        return ProductWizard.setStep(ProductWizard.currentStep + 1);

    };

    ProductWizard.previous = function () {

        return ProductWizard.setStep(ProductWizard.currentStep - 1);

    };

    ProductWizard.first = function () {

        return ProductWizard.setStep(0);

    };

    ProductWizard.last = function () {

        return ProductWizard.setStep(ProductWizard.totalSteps - 1);

    };

    // ==========================================================
    // DRAFT
    // ==========================================================

    ProductWizard.newDraft = function () {

        window.draftProduct = ProductUtils.createDraft();

        ProductWizard.first();

    };

    ProductWizard.reset = function () {

        ProductUtils.resetDraft();

        ProductWizard.first();

    };

    ProductWizard.getDraft = function () {

        return window.draftProduct;

    };

    // ==========================================================
    // EVENT
    // ==========================================================

    ProductWizard.dispatch = function () {

        document.dispatchEvent(

            new CustomEvent("wizard:change", {

                detail: {

                    step: ProductWizard.currentStep,

                    draft: window.draftProduct

                }

            })

        );

    };

    // ==========================================================
    // READY
    // ==========================================================

    ProductWizard.start = function () {

        ProductWizard.dispatch();

    };

    // ==========================================================
    // EXPORT
    // ==========================================================

    window.ProductWizard = ProductWizard;

})(window);