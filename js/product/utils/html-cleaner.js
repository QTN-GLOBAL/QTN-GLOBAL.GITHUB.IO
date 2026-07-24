/* =====================================================
   PRODUCT HTML CLEANER
   - Remove useless HTML
   - Keep product content only
===================================================== */

window.ProductHtmlCleaner = {

    /* ==========================================
       CLEAN HTML
    ========================================== */

    clean(html) {

        if (!html) {

            return "";

        }

        console.log("Cleaning HTML...");

        const parser = new DOMParser();

        const doc = parser.parseFromString(

            html,

            "text/html"

        );

        /* =========================
           REMOVE TAGS
        ========================= */

        const removeTags = [

            "script",

            "style",

            "noscript",

            "iframe",

            "svg",

            "canvas",

            "footer",

            "header",

            "nav",

            "aside",

            "form"

        ];

        removeTags.forEach(tag => {

            doc.querySelectorAll(tag)

                .forEach(node => node.remove());

        });

        /* =========================
           REMOVE COMMON CLASSES
        ========================= */

        const removeSelectors = [

            ".header",

            ".footer",

            ".sidebar",

            ".menu",

            ".navigation",

            ".breadcrumb",

            ".comment",

            ".comments",

            ".facebook",

            ".fb",

            ".zalo",

            ".messenger",

            ".popup",

            ".banner",

            ".ads",

            ".advertisement",

            ".related",

            ".related-products",

            ".recommend",

            ".recommend-product"

        ];

        removeSelectors.forEach(selector => {

            doc.querySelectorAll(selector)

                .forEach(node => node.remove());

        });

        /* =========================
           RETURN BODY HTML
        ========================= */

        return doc.body.innerHTML;

    }

};