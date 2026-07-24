/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 0 - Import
 * File   : step0-import.js
 *****************************************************************/

(function (window) {

    "use strict";

    const Step0 = {};

    //==========================================================
    // RENDER
    //==========================================================

    Step0.render = function (container) {

        container.innerHTML = `
            <div class="step0-import">

                <h2>Step 0 - Import Product</h2>

                <p>
                    Nhập URL sản phẩm từ website nguồn để tự động lấy dữ liệu.
                </p>

                <input
                    id="importUrl"
                    type="text"
                    placeholder="https://..."
                    style="width:100%;padding:10px;margin-top:10px;"
                >

                <br><br>

                <button id="btnImport">
                    Import URL
                </button>

            </div>
        `;

        document
            .getElementById("btnImport")
            .onclick = function () {

                Step0.import(

                    document.getElementById("importUrl").value

                );

            };

    };

    //==========================================================
    // IMPORT
    //==========================================================

    Step0.import = async function (url) {

        url = ProductUtils.trim(url);

        if (!url) {

            alert("Vui lòng nhập URL.");

            return;

        }

        try {

            const response = await fetch(

                "http://localhost:3000/api/import",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        url

                    })

                }

            );

            const result = await response.json();

            if (!response.ok || !result.success) {

                throw new Error(

                    result.message || "Import thất bại."

                );

            }

            window.draftProduct =

                ProductUtils.productToDraft(

                    result.product

                );

            document.dispatchEvent(

                new CustomEvent(

                    "product:imported",

                    {

                        detail: window.draftProduct

                    }

                )

            );

            ProductWizard.next();

        }

        catch (err) {

            console.error(err);

            alert(err.message);

        }

    };

    //==========================================================
    // NEXT
    //==========================================================

    Step0.next = function () {

        ProductWizard.next();

    };

    //==========================================================
    // EXPORT
    //==========================================================

    window.Step0 = Step0;

})(window);