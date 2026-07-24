/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Parser
 * File   : parser/product-parser.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ProductParser = {};

    //==========================================================
    // Parse Product
    //==========================================================

    ProductParser.parse = function (html, options = {}) {

        const product = {

            name: "",

            model: "",

            brand: "",

            origin: "",

            category: "",

            description: "",

            specification: [],

            features: [],

            applications: [],

            accessories: [],

            images: [],

            pdf: "",

            video: ""

        };

        product.name = ProductParser.getName(html);

        product.model = ProductParser.getModel(product.name);

        product.brand = ProductParser.getBrand(html);

        product.origin = ProductParser.getOrigin(html);

        product.category = ProductParser.getCategory(html);

        product.description = ProductParser.getDescription(html);

        product.specification = ProductParser.getSpecification(html);

        product.features = ProductParser.getFeatures(html);

        product.applications = ProductParser.getApplications(html);

        product.accessories = ProductParser.getAccessories(html);

        product.images = ProductParser.getImages(html);

        product.pdf = ProductParser.getPdf(html);

        product.video = ProductParser.getVideo(html);

        product.ai = {

            imported: true,

            importedAt: new Date().toISOString()

        };

        return product;

    };

    //==========================================================
    // BASIC
    //==========================================================

    ProductParser.getName = function (html) {

        return "";

    };

    ProductParser.getModel = function (name) {

        return "";

    };

    ProductParser.getBrand = function (html) {

        return "";

    };

    ProductParser.getOrigin = function (html) {

        return "";

    };

    ProductParser.getCategory = function (html) {

        return "";

    };

    ProductParser.getDescription = function (html) {

        return "";

    };

    //==========================================================
    // SPECIFICATION
    //==========================================================

    ProductParser.getSpecification = function (html) {

        return [];

    };

    ProductParser.getFeatures = function (html) {

        return [];

    };

    ProductParser.getApplications = function (html) {

        return [];

    };

    ProductParser.getAccessories = function (html) {

        return [];

    };

    //==========================================================
    // MEDIA
    //==========================================================

    ProductParser.getImages = function (html) {

        return [];

    };

    ProductParser.getPdf = function (html) {

        return "";

    };

    ProductParser.getVideo = function (html) {

        return "";

    };

    //==========================================================
    // EXPORT
    //==========================================================

    window.ProductParser = ProductParser;

})(window);