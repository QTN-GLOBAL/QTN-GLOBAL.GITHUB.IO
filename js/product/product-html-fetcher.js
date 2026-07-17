/* =====================================================
   PRODUCT HTML FETCHER
   - Fetch HTML from URL
   - Return raw HTML
===================================================== */

window.ProductHtmlFetcher = {

    /* ==========================================
       FETCH HTML
    ========================================== */

    async fetch(url) {

        if (!url) {

            throw "Source URL is empty.";

        }

        console.log("Fetching HTML...");

        /* ==========================================
           DEVELOPMENT MODE
           (Temporary)
        ========================================== */

        return await this.fetchDevelopment(url);

    },

    /* ==========================================
       DEVELOPMENT FETCH
       (Will replace by API later)
    ========================================== */

    async fetchDevelopment(url) {

        console.log("Development Fetch");

        console.log(url);

        throw "HTML Fetch API chưa được kết nối.";

    },

    /* ==========================================
       SERVER FETCH
       (Future)
    ========================================== */

    async fetchServer(url) {

        const response = await fetch("/api/import", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                url

            })

        });

        if (!response.ok) {

            throw "Cannot fetch HTML.";

        }

        return await response.text();

    }

};