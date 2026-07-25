/*****************************************************************
 QTN GLOBAL CMS
 File   : product-validator.js
 PART 1 / 2
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

        if (!draft.technical) {

            errors.push("Thiếu dữ liệu kỹ thuật");

            return errors;

        }

        //======================================================
        // CAPACITIES
        //======================================================

        if (

            !Array.isArray(

                draft.technical.capacities

            )

        ) {

            errors.push(

                "Capacities không hợp lệ"

            );

        }

        //======================================================
        // SPECIFICATIONS
        //======================================================

        if (

            !draft.technical.specifications ||

            typeof draft.technical.specifications !== "object"

        ) {

            errors.push(

                "Thiếu Specifications"

            );

        }

        //======================================================
        // FEATURES
        //======================================================

        if (

            !Array.isArray(

                draft.technical.features

            )

        ) {

            errors.push(

                "Features không hợp lệ"

            );

        }

        return errors;

    };
    //==========================================================
    // MEDIA
    //==========================================================

    ProductValidator.validateMedia = function (draft) {

        const errors = [];

        if (

            !draft.media ||

            !Array.isArray(

                draft.media.images

            ) ||

            draft.media.images.length === 0

        ) {

            errors.push(

                "Chưa có hình ảnh"

            );

        }

        return errors;

    };

    //==========================================================
    // SEO
    //==========================================================

    ProductValidator.validateSEO = function (draft) {

        const errors = [];

        if (

            !draft.seo.title

        )

            errors.push(

                "Thiếu SEO Title"

            );

        if (

            !draft.seo.description

        )

            errors.push(

                "Thiếu SEO Description"

            );

        return errors;

    };

    //==========================================================
    // ALL
    //==========================================================

    ProductValidator.validate = function (draft) {

        draft =

            draft ||

            window.draftProduct;

        return {

            basic:

                ProductValidator.validateBasic(

                    draft

                ),

            technical:

                ProductValidator.validateTechnical(

                    draft

                ),

            media:

                ProductValidator.validateMedia(

                    draft

                ),

            seo:

                ProductValidator.validateSEO(

                    draft

                )

        };

    };

    //==========================================================
    // EXPORT
    //==========================================================

    window.ProductValidator = ProductValidator;

})(window);

/*****************************************************************
===== END OF FILE : product-validator.js =====
*****************************************************************/