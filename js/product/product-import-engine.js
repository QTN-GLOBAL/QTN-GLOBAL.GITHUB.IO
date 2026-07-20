/* =====================================================
   PRODUCT IMPORT ENGINE
   Version 1
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
               STEP 1
               LOAD SOURCE
            ========================= */

            const sourceResult =
                await ProductSourceLoader.load(source);

            if (!sourceResult.success) {

                throw sourceResult.error ||
                    "Load source failed.";

            }

            console.log("SOURCE OK");

            /* =========================
               STEP 2
               CLEAN HTML
            ========================= */

            const cleanHtml =
                ProductHtmlCleaner.clean(

                    sourceResult.html

                );

            console.log("HTML CLEAN OK");

            /* =========================
               STEP 3
               BUILD PROMPT
            ========================= */

            const prompt =
                ProductPromptBuilder.build(

                    cleanHtml,

                    source.options || {}

                );

            console.log("PROMPT OK");

            /* =========================
               STEP 4
               AI PARSE
            ========================= */

            const aiResult =
                await ProductAIParser.parse(

                    prompt

                );

            console.log("AI OK");

            /* =========================
               STEP 5
               VALIDATE
            ========================= */

            const result =
                ProductJsonValidator.validate(

                    aiResult

                );

            console.log("VALIDATOR OK");

            /* =========================
               STEP 6
               APPLY
            ========================= */

            ProductImportResult.apply(

                result

            );

            console.log("IMPORT DONE");

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