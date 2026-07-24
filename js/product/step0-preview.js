/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 0 - Preview
 * File   : step0-preview.js
 * Version: 2.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step0Preview = {};

    // ==========================================================
    // RENDER
    // ==========================================================

    Step0Preview.render = function () {

        const draft = window.draftProduct;

        if (!draft) return;

        console.log("===== IMPORT RESULT =====");

        console.table({

            Name: draft.basic.name,

            Brand: draft.basic.brand,

            Category: draft.basic.category,

            Model: draft.basic.model,

            Origin: draft.basic.origin

        });

        const container = document.getElementById("step0Preview");

        if (!container) return;

        const image =
            draft.media?.mainImage ||
            draft.media?.thumbnail ||
            "";

        container.innerHTML = `

            <div class="step0-preview-card">

                <div class="step0-preview-image">

                    ${
                        image
                        ? `<img src="${image}" alt="">`
                        : `<div class="step0-no-image">No Image</div>`
                    }

                </div>

                <div class="step0-preview-info">

                    <h3>${draft.basic.name || ""}</h3>

                    <table class="preview-table">

                        <tr>
                            <td><b>Brand</b></td>
                            <td>${draft.basic.brand || ""}</td>
                        </tr>

                        <tr>
                            <td><b>Category</b></td>
                            <td>${draft.basic.category || ""}</td>
                        </tr>

                        <tr>
                            <td><b>Model</b></td>
                            <td>${draft.basic.model || ""}</td>
                        </tr>

                        <tr>
                            <td><b>Origin</b></td>
                            <td>${draft.basic.origin || ""}</td>
                        </tr>

                    </table>

                    <div class="step0-preview-actions">

                        <button
                            class="btn-primary"
                            onclick="Step0.next()">

                            Next →

                        </button>

                    </div>

                </div>

            </div>

        `;

    };

    // ==========================================================
    // CLEAR
    // ==========================================================

    Step0Preview.clear = function () {

        const container =
            document.getElementById("step0Preview");

        if (!container) return;

        container.innerHTML = "";

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
    // EVENT
    // ==========================================================

    document.addEventListener(

        "product:imported",

        function () {

            Step0Preview.render();

        }

    );

    // ==========================================================
    // EXPORT
    // ==========================================================

    window.Step0Preview = Step0Preview;

})(window);