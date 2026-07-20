/* =====================================================
   PRODUCT JSON VALIDATOR
===================================================== */

window.ProductJsonValidator = {

    /* ==========================================
       VALIDATE
    ========================================== */

    validate(data) {

        if (!data) {

            data = {};

        }

        return {

            success:

                data.success ?? true,

            description:

                typeof data.description === "string"

                    ? data.description

                    : "",

            specification:

                Array.isArray(data.specification)

                    ? data.specification

                    : [],

            features:

                Array.isArray(data.features)

                    ? data.features

                    : [],

            applications:

                Array.isArray(data.applications)

                    ? data.applications

                    : [],

            accessories:

                Array.isArray(data.accessories)

                    ? data.accessories

                    : []

        };

    }

};