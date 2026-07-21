/* ==========================================
   IMPORT CONTROLLER
========================================== */

import { downloadHtml } from "../services/html.service.js";

import { cleanHtml } from "../utils/html-cleaner.js";

import { parseProductWithAI } from "../services/openai.service.js";

import { normalizeProduct } from "../utils/product-normalizer.js";


/* ==========================================
   IMPORT PRODUCT
========================================== */

export async function importProduct(req, res) {

    try {

        console.log("");

        console.log("====================================");

        console.log("IMPORT PRODUCT REQUEST");

        console.log("====================================");

        console.log(req.body);

        console.log("====================================");


        /* ==========================
           REQUEST DATA
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

                message: "Missing Product URL"

            });

        }


        /* ==========================
           STEP 1
           DOWNLOAD HTML
        ========================== */

        console.log("");

        console.log("STEP 1");

        console.log("Downloading website...");


        const htmlResult =

            await downloadHtml(url);


        if (!htmlResult.success) {

            return res.status(500).json({

                success: false,

                message:

                    htmlResult.message ||

                    "Cannot download website."

            });

        }


        console.log("");

        console.log("DOWNLOAD OK");

        console.log(

            "HTML LENGTH:",

            htmlResult.html?.length || 0

        );


        /* ==========================
           STEP 2
           CLEAN HTML
        ========================== */

        console.log("");

        console.log("STEP 2");

        console.log("Cleaning HTML...");


        const clean =

            cleanHtml(

                htmlResult.html

            );


        console.log("");

        console.log("HTML CLEAN OK");

        console.log(

            "CLEAN HTML LENGTH:",

            clean?.length || 0

        );


        /* ==========================
           STEP 3
           OPENAI
        ========================== */

        console.log("");

        console.log("STEP 3");

        console.log(

            "Sending product data to OpenAI..."

        );


        const aiResult =

            await parseProductWithAI(

                clean,

                options

            );


        console.log("");

        console.log("OPENAI OK");


        /* ==========================
           STEP 4
           NORMALIZE PRODUCT
        ========================== */

        console.log("");

        console.log("STEP 4");

        console.log(

            "Normalizing product..."

        );


        const product =

            normalizeProduct(

                aiResult

            );


        console.log("");

        console.log("NORMALIZER OK");


        console.log("");

        console.log(

            "========== FINAL PRODUCT =========="

        );

        console.log(product);

        console.log(

            "==================================="

        );


        /* ==========================
           RETURN PRODUCT
        ========================== */

        return res.json({

            success: true,

            url,

            title:

                htmlResult.title || "",

            product

        });


    }

    catch (error) {


        console.error("");

        console.error(

            "========== IMPORT ERROR =========="

        );

        console.error(error);

        console.error(

            "==================================="

        );


        return res.status(500).json({

            success: false,

            message:

                error.message ||

                "Product import failed."

        });

    }

}