/* ==========================================
   IMPORT CONTROLLER
========================================== */
import { downloadHtml } from "../services/html.service.js";
export async function importProduct(req, res) {

    try {

        console.log("");

        console.log("========== IMPORT ==========");

        console.log(req.body);

        console.log("============================");

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

        const result = await downloadHtml(url);

return res.json(result);

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}