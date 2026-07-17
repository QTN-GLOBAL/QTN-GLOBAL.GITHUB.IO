/* =====================================================
   PRODUCT IMPORT ENGINE
   CORE IMPORT CONTROLLER
===================================================== */

window.ProductImportEngine = {

    /* ==========================================
       IMPORT PRODUCT
    ========================================== */

    async importProduct(url) {

        try {

            console.log("========== PRODUCT IMPORT ==========");

            console.log("URL:", url);

            /* =========================
               STEP 1
               FETCH HTML
            ========================= */

            const html =
                await ProductHtmlFetcher.fetch(url);

            if (!html) {

                throw "Cannot fetch HTML.";

            }

            console.log("HTML Loaded");

            /* =========================
               STEP 2
               CLEAN HTML
            ========================= */

            const cleanHtml =
                ProductHtmlCleaner.clean(html);

            console.log("HTML Cleaned");

            /* =========================
               STEP 3
               AI PARSE
            ========================= */

            const result =
                await ProductAIParser.parse(cleanHtml);

            console.log("AI Parsed");

            /* =========================
               STEP 4
               SAVE RESULT
            ========================= */

            ProductImportResult.apply(result);

            console.log("Draft Updated");

            return true;

        }

        catch (error) {

            console.error(error);

            alert(

                "Import thất bại.\n\n" +

                error

            );

            return false;

        }

    }

};