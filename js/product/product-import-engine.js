/* =====================================================
   PRODUCT IMPORT ENGINE
   Version 2
===================================================== */

window.ProductImportEngine = {

    /* ==========================================
       IMPORT
    ========================================== */

    async import(source) {

        try {

            console.log("=================================");

            console.log("PRODUCT IMPORT ENGINE");

            console.log("=================================");

            /* =========================
               SEND TO BACKEND
            ========================= */

            const response = await fetch(

                "http://localhost:3000/api/import",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        url: source.url,

                        options: source.options || {}

                    })

                }

            );

            const result = await response.json();

            console.log(result);

            if (!result.success) {

                throw result.message || "Import failed.";

            }

            /* =========================
               SAVE HTML
            ========================= */

            window.currentProduct.importResult = result;

            console.log("BACKEND OK");

            console.log(result.title);

            return {

                success: true,

                result

            };

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                error: err

            };

        }

    }

};