/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Session
 * File   : product-session.js
 * Version: 2.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ProductSession = {};

    //==========================================================
    // CREATE DRAFT
    //==========================================================

    ProductSession.create = function () {

        if (!window.PRODUCT_SCHEMA) {

            throw new Error(
                "PRODUCT_SCHEMA chưa được load."
            );

        }

        return ProductUtils.deepClone(
            window.PRODUCT_SCHEMA
        );

    };

    //==========================================================
    // NEW DRAFT
    //==========================================================

    ProductSession.newDraft = function () {

        window.draftProduct = ProductSession.create();

        window.draftProduct.system.createdAt =
            new Date().toISOString();

        window.draftProduct.system.updatedAt =
            new Date().toISOString();

        return window.draftProduct;

    };

    //==========================================================
    // GET
    //==========================================================

    ProductSession.get = function () {

        if (!window.draftProduct) {

            ProductSession.newDraft();

        }

        return window.draftProduct;

    };

    //==========================================================
    // SET
    //==========================================================

    ProductSession.set = function (draft) {

        window.draftProduct = draft;

        return window.draftProduct;

    };

    //==========================================================
    // UPDATE TIME
    //==========================================================

    ProductSession.touch = function () {

        const draft = ProductSession.get();

        draft.system.updatedAt =
            new Date().toISOString();

    };

    //==========================================================
    // RESET
    //==========================================================

    ProductSession.reset = function () {

        return ProductSession.newDraft();

    };

    //==========================================================
    // EXPORT
    //==========================================================

    ProductSession.export = function () {

        return ProductUtils.deepClone(

            ProductSession.get()

        );

    };

    //==========================================================
    // DEBUG
    //==========================================================

    ProductSession.debug = function () {

        console.log("");

        console.log("================================");

        console.log("CURRENT DRAFT PRODUCT");

        console.log(ProductSession.get());

        console.log("================================");

    };

    //==========================================================
    // AUTO INIT
    //==========================================================

    ProductSession.newDraft();

    //==========================================================
    // EXPORT
    //==========================================================

    window.ProductSession = ProductSession;

})(window);