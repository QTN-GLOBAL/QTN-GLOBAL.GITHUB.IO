/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Exporter
 * File   : product-exporter.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ProductExporter = {};

    //==========================================================
    // Build Current Product
    //==========================================================

    ProductExporter.build = function () {

        return ProductBuilder.build(window.draftProduct);

    };

    //==========================================================
    // Export Object
    //==========================================================

    ProductExporter.exportObject = function () {

        return ProductExporter.build();

    };

    //==========================================================
    // Export JSON
    //==========================================================

    ProductExporter.exportJSON = function () {

        return JSON.stringify(

            ProductExporter.build(),

            null,

            4

        );

    };

    //==========================================================
    // Export products.js Text
    //==========================================================

    ProductExporter.exportProductsJS = function () {

        const product = ProductExporter.build();

        return JSON.stringify(product, null, 4);

    };

    //==========================================================
    // Download JSON
    //==========================================================

    ProductExporter.downloadJSON = function () {

        const blob = new Blob(

            [ProductExporter.exportJSON()],

            { type: "application/json" }

        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "product.json";

        a.click();

        URL.revokeObjectURL(url);

    };

    //==========================================================
    // Download products.js snippet
    //==========================================================

    ProductExporter.downloadJS = function () {

        const text = ProductExporter.exportProductsJS();

        const blob = new Blob(

            [text],

            { type: "text/javascript" }

        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "product.js";

        a.click();

        URL.revokeObjectURL(url);

    };

    //==========================================================
    // Export
    //==========================================================

    window.ProductExporter = ProductExporter;

})(window);