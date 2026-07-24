/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Wizard View
 * File   : product-wizard-view.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ProductWizardView = {};

    //==========================================================
    // ROOT
    //==========================================================

    ProductWizardView.getContainer = function () {

        return document.getElementById("productWizardContainer");

    };

    //==========================================================
    // RENDER
    //==========================================================

    ProductWizardView.render = function (step) {

        const container = ProductWizardView.getContainer();

        if (!container) return;

        switch (step) {

            case 0:

                if (window.Step0 && Step0.render) {

                    Step0.render(container);

                }

                break;

            case 1:

                if (window.Step1 && Step1.render) {

                    Step1.render(container);

                }

                break;

            case 2:

                if (window.Step2 && Step2.render) {

                    Step2.render(container);

                }

                break;

            case 3:

                if (window.Step3 && Step3.render) {

                    Step3.render(container);

                }

                break;

            case 4:

                if (window.Step4 && Step4.render) {

                    Step4.render(container);

                }

                break;

            case 5:

                if (window.Step5 && Step5.render) {

                    Step5.render(container);

                }

                break;

            case 6:

                if (window.Step6 && Step6.render) {

                    Step6.render(container);

                }

                break;

        }

    };

    //==========================================================
    // WIZARD EVENT
    //==========================================================

    document.addEventListener(

        "wizard:change",

        function (e) {

            ProductWizardView.render(

                e.detail.step

            );

        }

    );

    //==========================================================
    // EXPORT
    //==========================================================

    window.ProductWizardView = ProductWizardView;

})(window);