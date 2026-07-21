
/* ==========================================
   IMPORT CONTROLLER
========================================== */

import { downloadHtml } from "../services/html.service.js";

import { cleanHtml } from "../utils/html-cleaner.js";

import { buildPrompt } from "../utils/prompt-builder.js";

import { parseProductFromHtml } from "../services/product-parser.service.js";

import { normalizeProduct } from "../utils/product-normalizer.js";

/* ==========================================
   IMPORT PRODUCT
========================================== */

export async function importProduct(req, res) {

    try {

        console.log("");

        console.log(
            "========== IMPORT REQUEST =========="
        );

        console.log(
            req.body
        );

        console.log(
            "===================================="
        );


        /* ==========================
           GET REQUEST DATA
        ========================== */

        const {

            url = "",

            options = {}

        } = req.body;


        /* ==========================
           VALIDATE URL
        ========================== */

        if (!url) {

            return res.status(400).json({

                success: false,

                message:
                    "Missing Product URL"

            });

        }


        /* ==========================
           STEP 1
           DOWNLOAD HTML
        ========================== */

        console.log("");

        console.log(
            "STEP 1: DOWNLOADING HTML..."
        );


        const htmlResult =

            await downloadHtml(

                url

            );


        if (!htmlResult.success) {

            return res.status(500).json(

                htmlResult

            );

        }


        console.log(

            "DOWNLOAD OK"

        );


        /* ==========================
           STEP 2
           CLEAN HTML
        ========================== */

        console.log("");

        console.log(

            "STEP 2: CLEANING HTML..."

        );


        const clean =

            cleanHtml(

                htmlResult.html

            );
console.log("========== CLEAN HTML PREVIEW ==========");
console.log(clean.substring(0, 20000));
console.log("========================================");


        console.log(

            "HTML CLEAN OK"

        );


        /* ==========================
           STEP 3
           BUILD PROMPT
        ========================== */

        console.log("");

        console.log(

            "STEP 3: BUILDING PROMPT..."

        );


        const prompt =

            buildPrompt(

                clean,

                options

            );


        console.log(

            "PROMPT OK"

        );


       /* ==========================
   STEP 4
   FREE PRODUCT PARSER
========================== */

console.log("");

console.log(
    "STEP 4: PARSING PRODUCT FROM HTML..."
);


const parsedProduct =

    parseProductFromHtml(

        clean,

        options

    );


console.log("");

console.log(

    "FREE PARSER OK"

);

console.log(

    parsedProduct

);

        /* ==========================
           STEP 5
           NORMALIZE PRODUCT
        ========================== */

        console.log("");

        console.log(

            "STEP 5: NORMALIZING PRODUCT..."

        );


        const product =

    normalizeProduct(

        parsedProduct

    );

        console.log(

            "NORMALIZER OK"

        );


        /* ==========================
           RETURN RESULT
        ========================== */

        console.log("");

        console.log(

            "========== IMPORT SUCCESS =========="

        );

        console.log(

            product

        );

        console.log(

            "===================================="

        );


        return res.json({

            success: true,

            url,

            title:
                htmlResult.title,

            product

        });

    }


    catch (error) {

        console.error("");

        console.error(

            "========== IMPORT ERROR =========="

        );

        console.error(

            error

        );

        console.error(

            "=================================="

        );


        return res.status(500).json({

            success: false,

            message:

                error.message

        });

    }

}

