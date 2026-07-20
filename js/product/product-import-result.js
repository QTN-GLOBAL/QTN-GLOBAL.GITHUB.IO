/* =====================================================
   PRODUCT IMPORT RESULT
   - Save AI Result To Current Product
===================================================== */

window.ProductImportResult = {

    /* ==========================================
       APPLY RESULT
    ========================================== */

    apply(result) {

        if (!window.currentProduct) {

            window.currentProduct = {};

        }

        console.log("Applying AI Result...");

        currentProduct.description =

            result.description || "";

        currentProduct.specification =

            result.specification || [];

        currentProduct.features =

            result.features || [];

        currentProduct.applications =

            result.applications || [];

        currentProduct.accessories =

            result.accessories || [];

        currentProduct.aiImported = true;

        currentProduct.aiImportedAt =

            new Date().toISOString();

        if (typeof saveProductDraft === "function") {

            saveProductDraft();

        }

        return currentProduct;

    }

};