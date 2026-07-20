/* ==========================================
   IMPORT CONTROLLER
========================================== */

import { downloadHtml } from "../services/html.service.js";

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
           DOWNLOAD HTML
        ========================== */

        const result = await downloadHtml(url);

        if (!result.success) {

            return res.status(500).json(result);

        }

        /* ==========================
           NEXT:
           HTML CLEANER
           PROMPT BUILDER
           OPENAI
        ========================== */

        return res.json({

            success: true,

            url,

            options,

            title: result.title || "",

            html: result.html

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