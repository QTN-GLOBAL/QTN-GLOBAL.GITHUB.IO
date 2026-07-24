/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Source Loader
 * File   : parser/source-loader.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const SourceLoader = {};

    //==========================================================
    // Detect Website
    //==========================================================

    SourceLoader.detectSource = function (hostname) {

        hostname = hostname.toLowerCase();

        if (hostname.includes("candientulehuy"))
            return "lehuy";

        if (hostname.includes("excell"))
            return "excell";

        return "generic";

    };

    //==========================================================
    // Download HTML
    //==========================================================

    SourceLoader.fetchHTML = async function (url) {

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Không tải được dữ liệu.");

        }

        return await response.text();

    };

    //==========================================================
    // Load
    //==========================================================

    SourceLoader.load = async function (url) {

        const u = new URL(url);

        const html = await SourceLoader.fetchHTML(url);

        const parser = new DOMParser();

        const doc = parser.parseFromString(html, "text/html");

        return {

            success: true,

            url: url,

            hostname: u.hostname,

            source: SourceLoader.detectSource(u.hostname),

            html: html,

            document: doc,

            fetchedAt: new Date().toISOString()

        };

    };

    //==========================================================
    // Export
    //==========================================================

    window.SourceLoader = SourceLoader;

})(window);