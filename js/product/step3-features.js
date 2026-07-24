/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 3 - Features
 * File   : step3-features.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step3 = {};

    //==========================================================
    // Render
    //==========================================================

    Step3.render = function () {

        const draft = window.draftProduct;

        if (!Array.isArray(draft.technical.features)) {

            draft.technical.features = [];

        }

        document.dispatchEvent(new CustomEvent(
            "step3:render",
            {
                detail: draft.technical.features
            }
        ));

    };

    //==========================================================
    // Add Feature
    //==========================================================

    Step3.add = function (text = "") {

        if (!window.draftProduct.technical.features) {

            window.draftProduct.technical.features = [];

        }

        window.draftProduct.technical.features.push(text);

        Step3.changed();

    };

    //==========================================================
    // Update Feature
    //==========================================================

    Step3.update = function (index, text) {

        if (!window.draftProduct.technical.features[index])
            return;

        window.draftProduct.technical.features[index] = text;

        Step3.changed();

    };

    //==========================================================
    // Remove Feature
    //==========================================================

    Step3.remove = function (index) {

        window.draftProduct.technical.features.splice(index,1);

        Step3.changed();

    };

    //==========================================================
    // Move Up
    //==========================================================

    Step3.moveUp = function(index){

        if(index<=0) return;

        const arr = window.draftProduct.technical.features;

        [arr[index-1],arr[index]]=[arr[index],arr[index-1]];

        Step3.changed();

    };

    //==========================================================
    // Move Down
    //==========================================================

    Step3.moveDown=function(index){

        const arr=window.draftProduct.technical.features;

        if(index>=arr.length-1) return;

        [arr[index],arr[index+1]]=[arr[index+1],arr[index]];

        Step3.changed();

    };

    //==========================================================
    // Changed
    //==========================================================

    Step3.changed = function () {

        document.dispatchEvent(

            new CustomEvent("product:featuresChanged",{

                detail:window.draftProduct

            })

        );

    };

    //==========================================================
    // Wizard
    //==========================================================

    document.addEventListener("wizard:change",function(e){

        if(e.detail.step===3){

            Step3.render();

        }

    });

    //==========================================================
    // Export
    //==========================================================

    window.Step3 = Step3;

})(window);