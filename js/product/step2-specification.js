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
//==========================================================
// AUTO CREATE STRUCTURE
//==========================================================

draft.technical ??= {};

draft.technical.table ??= {

    headers: [

        "Thông số",

        "Giá trị"

    ],

    rows: []

};

draft.technical.specifications ??= [];

draft.technical.features ??= [];

draft.technical.applications ??= [];

draft.technical.accessories ??= [];
//==========================================================
// LOAD DATA
//==========================================================

const table = draft.technical.table;

const specifications =

    draft.technical.specifications;

const features =

    draft.technical.features;

const applications =

    draft.technical.applications;

const accessories =

    draft.technical.accessories;
//==========================================================
// DEBUG
//==========================================================

console.log("");

console.log("========== STEP 2 ==========");

console.log("TABLE");

console.table(table.rows);

console.log("SPECIFICATIONS");

console.log(specifications);

console.log("FEATURES");

console.log(features);

console.log("APPLICATIONS");

console.log(applications);

console.log("ACCESSORIES");

console.log(accessories);

console.log("============================");


if(!draft.technical){

    draft.technical={};

}


if(!draft.technical.table){

    draft.technical.table={
        rows:[]
    };

}


console.log("Specification");

console.table(
    draft.technical.table.rows
);
    };

    //==========================================================
    // Add Row
    //==========================================================

    Step2.addRow = function () {

    const table =

        window.draftProduct.technical.table;

    table.rows.push([

        "",

        ""

    ]);

    Step2.render();

};

    //==========================================================
    // Remove Row
    //==========================================================

    Step2.removeRow = function (index) {

    const table =

        window.draftProduct.technical.table;

    if (

        index < 0 ||

        index >= table.rows.length

    ) {

        return;

    }

    table.rows.splice(index, 1);

    Step2.render();

};

    //==========================================================
    // Update Cell
    //==========================================================

    Step2.updateCell = function (

    row,

    col,

    value

) {

    const table =

        window.draftProduct.technical.table;

    if (

        !table.rows[row]

    ) {

        table.rows[row] = [

            "",

            ""

        ];

    }

    table.rows[row][col] =

        value;

};
//==========================================================
// UPDATE LIST
//==========================================================

Step2.updateList = function (

    type,

    list

) {

    if (

        !window.draftProduct.technical[type]

    ) {

        window.draftProduct.technical[type] = [];

    }

    window.draftProduct.technical[type] =

        list.filter(function (item) {

            return item && item.trim();

        });

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
// GET TABLE HTML
//==========================================================

Step2.buildTableHtml = function () {

    const table =

        window.draftProduct.technical.table;

    let html = "<table class=\"spec-table\">";

    html += "<tr>";

    table.headers.forEach(function (header) {

        html += "<th>" + header + "</th>";

    });

    html += "</tr>";

    table.rows.forEach(function (row) {

        html += "<tr>";

        row.forEach(function (cell) {

            html += "<td>" + (cell || "") + "</td>";

        });

        html += "</tr>";

    });

    html += "</table>";

    window.draftProduct.technical.tableHtml = html;

    return html;

};

//==========================================================
// SAVE
//==========================================================

Step2.save = function () {

    Step2.buildTableHtml();

    document.dispatchEvent(

        new CustomEvent(

            "product:technicalChanged",

            {

                detail: window.draftProduct

            }

        )

    );

};
    //==========================================================
    // Export
    //==========================================================

    window.Step2 = Step2;

})(window);