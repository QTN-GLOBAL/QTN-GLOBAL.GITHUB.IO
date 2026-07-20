/* ==========================================
   IMPORT CONTROLLER
========================================== */

import { downloadHtml } from "../services/html.service.js";
import { cleanHtml } from "../utils/html-cleaner.js";
import { buildPrompt } from "../utils/prompt-builder.js";
import { parseProduct } from "../services/mock-ai.service.js";

/* ==========================================
   IMPORT PRODUCT
========================================== */

export async function importProduct(req, res) {

    try {

        console.log("");
        console.log("========== IMPORT REQUEST ==========");
        console.log(req.body);
        console.log("====================================");

        const {

            url = "",

            options = {}

        } = req.body;

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

        const htmlResult = await downloadHtml(url);

        if (!htmlResult.success) {

            return res.status(500).json(htmlResult);

        }

        console.log("DOWNLOAD OK");

        /* ==========================
           STEP 2
           CLEAN HTML
        ========================== */

        const cleanHtmlResult = cleanHtml(

            htmlResult.html

        );

        console.log("HTML CLEAN OK");

        /* ==========================
           STEP 3
           BUILD PROMPT
        ========================== */

        const prompt = buildPrompt(

            cleanHtmlResult,

            options

        );

        console.log("PROMPT OK");

        /* ==========================
           STEP 4
           MOCK AI
        ========================== */

        const aiResult = await parseProduct(

            prompt

        );

        console.log("MOCK AI OK");

        /* ==========================
           RETURN
        ========================== */

        return res.json({

            success: true,

            url,

            title: htmlResult.title,

            result: aiResult

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}