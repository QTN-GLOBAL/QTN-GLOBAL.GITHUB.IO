/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Content Parser
 * File   : parser/content-parser.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ContentParser = {};

    //==========================================================
    // Parse
    //==========================================================

    ContentParser.parse = function (source) {

        if (!source || !source.document) {

            throw new Error("Source không hợp lệ.");

        }

        switch (source.source) {

            case "lehuy":
                return ContentParser.parseLeHuy(source);

            case "excell":
                return ContentParser.parseExcell(source);

            default:
                return ContentParser.parseGeneric(source);

        }

    };

    //==========================================================
    // LEHUY
    //==========================================================

    ContentParser.parseLeHuy = function (source) {

        const doc = source.document;

        return {

            source: "lehuy",

            title: doc.title,

            html: source.html,

            document: doc

        };

    };

    //==========================================================
    // EXCELL
    //==========================================================

    ContentParser.parseExcell = function (source) {

        const doc = source.document;

        return {

            source: "excell",

            title: doc.title,

            html: source.html,

            document: doc

        };

    };

    //==========================================================
    // GENERIC
    //==========================================================

    ContentParser.parseGeneric = function (source) {

        const doc = source.document;

        return {

            source: "generic",

            title: doc.title,

            html: source.html,

            document: doc

        };

    };

    //==========================================================
    // Export
    //==========================================================

    window.ContentParser = ContentParser;

})(window);