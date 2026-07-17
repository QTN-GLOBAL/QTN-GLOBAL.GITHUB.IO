/* =====================================================
   PRODUCT SOURCE LOADER
   - Unified Source Loader
   - Website
   - PDF (Future)
   - Word (Future)
===================================================== */

window.ProductSourceLoader = {

    /* ==========================================
       LOAD SOURCE
    ========================================== */

    async load(source) {

        if (!source) {

            throw "Source is missing.";

        }

        switch (source.type) {

            case "website":

                return await this.loadWebsite(source);

            case "pdf":

                return await this.loadPdf(source);

            case "word":

                return await this.loadWord(source);

            default:

                throw "Unsupported source type.";

        }

    },

    /* ==========================================
       WEBSITE
    ========================================== */

    async loadWebsite(source) {

        console.log("Loading Website...");

        console.log(source.url);

        /*
           Tạm thời chưa có API
        */

        return {

            success: false,

            sourceType: "website",

            url: source.url,

            title: "",

            html: "",

            fetchedAt: new Date().toISOString(),

            message: "Website Loader chưa kết nối API."

        };

    },

    /* ==========================================
       PDF
    ========================================== */

    async loadPdf(source) {

        return {

            success: false,

            sourceType: "pdf",

            url: source.url,

            title: "",

            html: "",

            fetchedAt: new Date().toISOString(),

            message: "PDF Loader chưa phát triển."

        };

    },

    /* ==========================================
       WORD
    ========================================== */

    async loadWord(source) {

        return {

            success: false,

            sourceType: "word",

            url: source.url,

            title: "",

            html: "",

            fetchedAt: new Date().toISOString(),

            message: "Word Loader chưa phát triển."

        };

    }

};