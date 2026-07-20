/* ==========================================
   PRODUCT NORMALIZER
========================================== */

export function normalizeProduct(data = {}) {

    return {

        /* ==========================
           BASIC
        ========================== */

        name:

            data.name || "",

        brand:

            data.brand || "",

        origin:

            data.origin || "",

        /* ==========================
           DESCRIPTION
        ========================== */

        description:

            data.description || "",

        /* ==========================
           SPECIFICATION
        ========================== */

        specification:

            Array.isArray(data.specification)

                ? data.specification

                : [],

        /* ==========================
           FEATURES
        ========================== */

        features:

            Array.isArray(data.features)

                ? data.features

                : [],

        /* ==========================
           APPLICATIONS
        ========================== */

        applications:

            Array.isArray(data.applications)

                ? data.applications

                : [],

        /* ==========================
           ACCESSORIES
        ========================== */

        accessories:

            Array.isArray(data.accessories)

                ? data.accessories

                : [],

        /* ==========================
           AI INFO
        ========================== */

        ai: {

            imported: true,

            importedAt:

                new Date().toISOString()

        }

    };

}