/* =========================
   I18N SYNC TOOL (AUTO)
   - Sync products → products-i18n
   - Prevent missing translation
========================= */

function syncI18n() {

    const products = window.products || [];
    const i18n = window.productTranslations || {};

    const result = {};

    let missingCount = 0;

    products.forEach(p => {

        if (!p || !p.id) return;

        const id = p.id;

        // nếu chưa có translation
        if (!i18n[id]) {

            missingCount++;

            result[id] = {
                en: {
                    name: "",
                    origin: "",
                    description: "",
                    specs: []
                },
                zh: {
                    name: "",
                    origin: "",
                    description: "",
                    specs: []
                }
            };

        } else {

            // nếu đã có thì giữ nguyên
            result[id] = i18n[id];
        }
    });

    console.log("TOTAL PRODUCTS:", products.length);
    console.log("MISSING TRANSLATIONS:", missingCount);
    console.log("SYNC RESULT:", result);

    return result;
}