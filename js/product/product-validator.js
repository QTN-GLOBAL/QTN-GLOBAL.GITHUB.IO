/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Validator
 * File   : validator.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ProductValidator = {};

    //==========================================================
    // BASIC
    //==========================================================

    ProductValidator.validateBasic = function (draft) {

        const errors = [];

        if (!draft.basic.name)
            errors.push("Tên sản phẩm");

        if (!draft.basic.brand)
            errors.push("Thương hiệu");

        if (!draft.basic.category)
            errors.push("Danh mục");

        if (!draft.basic.model)
            errors.push("Model");

        return errors;

    };

    //==========================================================
    // TECHNICAL
    //==========================================================

    ProductValidator.validateTechnical = function (draft) {

        const errors = [];

        if (!draft.technical.table.headers.length)
            errors.push("Thiếu tiêu đề bảng thông số");

        if (!draft.technical.table.rows.length)
            errors.push("Chưa có dữ liệu bảng");

        return errors;

    };

    //==========================================================
    // MEDIA
    //==========================================================

    ProductValidator.validateMedia = function (draft) {

        const errors = [];

        if (!draft.media.images.length)
            errors.push("Chưa có hình ảnh");

        return errors;

    };

    //==========================================================
    // SEO
    //==========================================================

    ProductValidator.validateSEO = function (draft) {

        const errors = [];

        if (!draft.seo.title)
            errors.push("Thiếu SEO Title");

        if (!draft.seo.description)
            errors.push("Thiếu SEO Description");

        return errors;

    };

    //==========================================================
    // ALL
    //==========================================================

    ProductValidator.validate = function (draft) {

        return {

            basic: ProductValidator.validateBasic(draft),

            technical: ProductValidator.validateTechnical(draft),

            media: ProductValidator.validateMedia(draft),

            seo: ProductValidator.validateSEO(draft)

        };

    };

    window.ProductValidator = ProductValidator;

})(window);