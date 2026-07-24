/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Utilities
 * File   : product-utils.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ProductUtils = {};

    // ==========================================================
    // CLONE
    // ==========================================================

    ProductUtils.deepClone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };

    ProductUtils.createDraft = function () {
        return ProductUtils.deepClone(window.PRODUCT_SCHEMA);
    };

    ProductUtils.resetDraft = function () {
        window.draftProduct = ProductUtils.createDraft();
        return window.draftProduct;
    };

    // ==========================================================
    // BASIC
    // ==========================================================

    ProductUtils.trim = function (value) {
        return String(value || "").trim();
    };

    ProductUtils.isEmpty = function (value) {

        if (value === null || value === undefined)
            return true;

        if (typeof value === "string")
            return value.trim() === "";

        if (Array.isArray(value))
            return value.length === 0;

        return false;

    };

    // ==========================================================
    // SLUG
    // ==========================================================

    ProductUtils.slugify = function (text) {

        return String(text || "")

            .normalize("NFD")

            .replace(/[\u0300-\u036f]/g, "")

            .replace(/đ/g, "d")

            .replace(/Đ/g, "D")

            .toLowerCase()

            .replace(/[^a-z0-9]+/g, "-")

            .replace(/^-+|-+$/g, "");

    };

    // ==========================================================
    // FOLDER
    // ==========================================================

    ProductUtils.generateFolder = function (model) {

        return ProductUtils.slugify(model);

    };

    // ==========================================================
    // CATEGORY
    // ==========================================================

    ProductUtils.normalizeCategory = function (value) {

        value = ProductUtils.slugify(value);

        const map = {

            "bench-scale": "can-ban",

            "table-scale": "can-ban",

            "counting-scale": "can-dem",

            "platform-scale": "can-san",

            "waterproof-scale": "can-chong-nuoc"

        };

        return map[value] || value;

    };

    // ==========================================================
    // BRAND
    // ==========================================================

    ProductUtils.normalizeBrand = function (brand) {

        brand = ProductUtils.trim(brand).toLowerCase();

        const map = {

            jadever: "Jadever",

            vibra: "Vibra",

            excell: "Excell",

            cas: "CAS"

        };

        return map[brand] || brand;

    };

    // ==========================================================
    // ORIGIN
    // ==========================================================

    ProductUtils.normalizeOrigin = function (origin) {

        origin = ProductUtils.trim(origin).toLowerCase();

        const map = {

            taiwan: "Đài Loan",

            japan: "Nhật Bản",

            korea: "Hàn Quốc",

            china: "Trung Quốc"

        };

        return map[origin] || origin;

    };

    // ==========================================================
    // PRODUCT ID
    // ==========================================================

    ProductUtils.getNextProductId = function () {

        if (!window.products || !window.products.length)
            return 1;

        return Math.max(...window.products.map(p => p.id || 0)) + 1;

    };

    // ==========================================================
    // VALIDATE
    // ==========================================================

    ProductUtils.validateRequired = function (fields) {

        const errors = [];

        fields.forEach(field => {

            if (ProductUtils.isEmpty(field.value)) {

                errors.push(field.name);

            }

        });

        return errors;

    };

    // ==========================================================
    // EXPORT
    // ==========================================================

    window.ProductUtils = ProductUtils;

})(window);