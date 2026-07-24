/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 2 - Specification
 * File   : step2-specification.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step2 = {};

    //==========================================================
    // Render
    //==========================================================

    Step2.render = function () {

        const draft = window.draftProduct;

        console.log("Specification");

        console.table(draft.technical.table.rows);

    };

    //==========================================================
    // Add Row
    //==========================================================

    Step2.addRow = function () {

        window.draftProduct.technical.table.rows.push([]);

        Step2.render();

    };

    //==========================================================
    // Remove Row
    //==========================================================

    Step2.removeRow = function (index) {

        window.draftProduct.technical.table.rows.splice(index,1);

        Step2.render();

    };

    //==========================================================
    // Update Cell
    //==========================================================

    Step2.updateCell = function(row,col,value){

        const table = window.draftProduct.technical.table;

        if(!table.rows[row])

            return;

        table.rows[row][col]=value;

    };

    //==========================================================
    // Event
    //==========================================================

    document.addEventListener("wizard:change",function(e){

        if(e.detail.step===2){

            Step2.render();

        }

    });

    //==========================================================
    // Export
    //==========================================================

    window.Step2 = Step2;

})(window);