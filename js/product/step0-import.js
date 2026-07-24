/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 0 - Import URL
 * File   : step0-import.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step0 = {};

    // ==========================================================
    // IMPORT
    // ==========================================================

    Step0.import = async function (url) {

        if (!url) {

            alert("Vui lòng nhập URL.");

            return;

        }

        try {

            const source = await SourceLoader.load(url);

            const draft = await AIParser.parse(source);

            window.draftProduct = draft;

            document.dispatchEvent(

                new CustomEvent("product:imported", {

                    detail: draft

                })

            );

        }

        catch (err) {

            console.error(err);

            alert(err.message);

        }

    };

    // ==========================================================
    // NEXT
    // ==========================================================

    Step0.next = function () {

        ProductWizard.next();

    };

    // ==========================================================
    // EXPORT
    // ==========================================================

    window.Step0 = Step0;

})(window);