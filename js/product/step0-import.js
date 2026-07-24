/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 0 - Import URL
 * File   : step0-import.js
 * Version: 2.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step0 = {};

    // ==========================================================
    // RENDER
    // ==========================================================

    Step0.render = function (container) {

        if (!container) return;

        container.innerHTML = `

            <div class="product-step">

                <div class="product-step-header">

                    <h2>Step 0 - Import Product</h2>

                    <p>Nhập URL sản phẩm từ website nguồn để tự động lấy dữ liệu.</p>

                </div>

                <div class="product-step-body">

                    <label>URL sản phẩm</label>

                    <input
                        type="url"
                        id="step0Url"
                        class="form-control"
                        placeholder="https://...">

                </div>

                <div class="product-step-footer">

                    <button
                        type="button"
                        class="btn-primary"
                        onclick="Step0.handleImport()">

                        Import URL

                    </button>

                </div>

            </div>

        `;

    };

    // ==========================================================
    // HANDLE IMPORT
    // ==========================================================

    Step0.handleImport = function () {

        const input = document.getElementById("step0Url");

        if (!input) return;

        Step0.import(input.value.trim());

    };

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