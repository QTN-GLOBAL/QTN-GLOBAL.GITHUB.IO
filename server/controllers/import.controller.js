/* ==========================================
   IMPORT CONTROLLER
========================================== */

import { downloadHtml } from "../services/html.service.js";
import { cleanHtml } from "../utils/html-cleaner.js";

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

        console.log("DOWNLOAD OK");

        /* ==========================
           STEP 2
           CLEAN HTML
        ========================== */

        const clean = cleanHtml(

            result.html

        );

        console.log("");

        console.log("HTML CLEAN OK");

        /* ==========================
           RETURN
        ========================== */

        return res.json({

            success: true,

            url,

            title: result.title,

            html: clean

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