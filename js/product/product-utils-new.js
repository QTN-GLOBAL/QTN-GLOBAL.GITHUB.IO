/*****************************************************************
 QTN GLOBAL CMS
 File   : product-utils.js
 PART 1 / 3
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

        return ProductUtils.deepClone(

            window.PRODUCT_SCHEMA

        );

    };

    ProductUtils.resetDraft = function () {

        window.draftProduct =

            ProductUtils.createDraft();

        return window.draftProduct;

    };

    // ==========================================================
    // BASIC
    // ==========================================================

    ProductUtils.trim = function (value) {

        return String(value || "").trim();

    };

    ProductUtils.isEmpty = function (value) {

        if (

            value === null ||

            value === undefined

        )

            return true;

        if (

            typeof value === "string"

        )

            return value.trim() === "";

        if (

            Array.isArray(value)

        )

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

        brand =

            ProductUtils.trim(brand)

                .toLowerCase();

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

        origin =

            ProductUtils.trim(origin)

                .toLowerCase();

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

        if (

            !window.products ||

            !window.products.length

        )

            return 1;

        return Math.max(

            ...window.products.map(

                p => p.id || 0

            )

        ) + 1;

    };

    // ==========================================================
    // VALIDATE
    // ==========================================================

    ProductUtils.validateRequired = function (fields) {

        const errors = [];

        fields.forEach(function (field) {

            if (

                ProductUtils.isEmpty(

                    field.value

                )

            ) {

                errors.push(field.name);

            }

        });

        return errors;

    };
    // ==========================================================
    // PRODUCT -> DRAFT
    // ==========================================================

    ProductUtils.productToDraft = function (product) {

        const draft =

            ProductUtils.createDraft();

        if (!product) {

            return draft;

        }

        // ======================================================
        // SYSTEM
        // ======================================================

        draft.system.id =

            product.id ||

            ProductUtils.getNextProductId();

        draft.system.business =

            product.business ||

            "measure";

        draft.system.createdAt =

            new Date().toISOString();

        draft.system.updatedAt =

            new Date().toISOString();

        // ======================================================
        // BASIC
        // ======================================================

        draft.basic.name =

            ProductUtils.trim(

                product.name

            );

        draft.basic.model =

            ProductUtils.trim(

                product.model

            );

        draft.basic.category =

            ProductUtils.normalizeCategory(

                product.category

            );

        draft.basic.brand =

            ProductUtils.normalizeBrand(

                product.brand

            );

        draft.basic.origin =

            ProductUtils.normalizeOrigin(

                product.origin

            );

        draft.basic.folder =

            ProductUtils.trim(

                product.folder

            );

        draft.basic.slug =

            ProductUtils.slugify(

                product.slug ||

                product.name

            );

        draft.basic.description =

            ProductUtils.trim(

                product.description

            );

        // ======================================================
        // TECHNICAL
        // ======================================================

        draft.technical.capacities =

            Array.isArray(

                product.capacities

            )

                ? ProductUtils.deepClone(

                    product.capacities

                )

                : [];

        draft.technical.specifications =

            product.specifications

                ? ProductUtils.deepClone(

                    product.specifications

                )

                : {};

        draft.technical.features =

            Array.isArray(

                product.features

            )

                ? ProductUtils.deepClone(

                    product.features

                )

                : [];

        // ======================================================
        // MEDIA
        // ======================================================

        draft.media.images =

            Array.isArray(

                product.images

            )

                ? ProductUtils.deepClone(

                    product.images

                )

                : [];

        draft.media.pdf =

            product.pdf || "";

        draft.media.video =

            product.video || "";
        // ======================================================
        // SEO
        // ======================================================

        if (product.seo) {

            draft.seo = ProductUtils.deepClone(

                product.seo

            );

        }

        // ======================================================
        // DISPLAY
        // ======================================================

        if (product.display) {

            draft.display = ProductUtils.deepClone(

                product.display

            );

        }

        return draft;

    };

    // ==========================================================
    // DRAFT -> PRODUCT
    // ==========================================================

    ProductUtils.draftToProduct = function (draft) {

        draft = draft || window.draftProduct;

        return {

            id: draft.system.id,

            business: draft.system.business,

            name: draft.basic.name,

            model: draft.basic.model,

            category: draft.basic.category,

            brand: draft.basic.brand,

            origin: draft.basic.origin,

            folder: draft.basic.folder,

            slug: draft.basic.slug,

            description: draft.basic.description,

            capacities: ProductUtils.deepClone(

                draft.technical.capacities

            ),

            specifications: ProductUtils.deepClone(

                draft.technical.specifications

            ),

            features: ProductUtils.deepClone(

                draft.technical.features

            ),

            images: ProductUtils.deepClone(

                draft.media.images

            ),

            pdf: draft.media.pdf,

            video: draft.media.video,

            seo: ProductUtils.deepClone(

                draft.seo

            ),

            display: ProductUtils.deepClone(

                draft.display

            )

        };

    };

    // ==========================================================
    // EXPORT
    // ==========================================================

    window.ProductUtils = ProductUtils;

})(window);

/*****************************************************************
===== END OF FILE : product-utils.js =====
*****************************************************************/