/* ==========================================
   HTML SERVICE
========================================== */

import axios from "axios";

const USER_AGENT =
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36";

export async function downloadHtml(url) {

    console.log("");

    console.log("========== DOWNLOAD HTML ==========");

    console.log(url);

    console.log("===================================");

    try {

        const response = await axios.get(url, {

            timeout: 30000,

            headers: {

                "User-Agent": USER_AGENT,

                "Accept":
                    "text/html,application/xhtml+xml"

            }

        });

        return {

            success: true,

            url,

            html: response.data

        };

    }

    catch (error) {

        console.error(error.message);

        return {

            success: false,

            url,

            html: "",

            error: error.message

        };

    }

}