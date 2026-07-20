/* ==========================================
   IMPORT CONTROLLER
========================================== */

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

        return res.json({

            success: true,

            message: "Controller Ready",

            url,

            options

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