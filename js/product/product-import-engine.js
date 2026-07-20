/* =====================================================
   PRODUCT IMPORT ENGINE
   Version 3
===================================================== */

window.ProductImportEngine = {

    async import(source) {

        try {

            console.log("=================================");

            console.log("PRODUCT IMPORT ENGINE");

            console.log("=================================");

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

                throw new Error(

                    result.message || "Import failed."

                );

            }

            console.log("BACKEND OK");

            console.log(result.title);

            /* ==========================
               TRẢ THẲNG BACKEND RESULT
            ========================== */

            return result;

        }

        catch (err) {

            console.error(err);

            return {

                success: false,

                error: err.message || err

            };

        }

    }

};