/* ==========================================
   IMPORT CONTROLLER
========================================== */

import { downloadHtml } from "../services/html.service.js";
import { parseProductWithAI } from "../services/openai.service.js";

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

        const result = await downloadHtml(url);

        if (!result.success) {

            return res.status(500).json(result);

        }

        console.log("");
        console.log("HTML DOWNLOAD OK");

        /* ==========================
           STEP 2
           OPENAI PARSE
        ========================== */

        const aiResult = await parseProductWithAI(

            result.html,

            options

        );

        console.log("");
        console.log("OPENAI PARSE OK");

        /* ==========================
           RETURN
        ========================== */

        return res.json({

            success: true,

            url,

            title: result.title || "",

            data: aiResult

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