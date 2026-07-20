/* ==========================================
   HTML SERVICE
========================================== */

import axios from "axios";
import * as cheerio from "cheerio";

const USER_AGENT =
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36";

/* ==========================================
   DOWNLOAD HTML
========================================== */

export async function downloadHtml(url) {

    console.log("");

    console.log("========== DOWNLOAD HTML ==========");

    console.log(url);

    console.log("===================================");

    try {

        if (!url.startsWith("http")) {

            throw new Error("Invalid URL");

        }

        const response = await axios.get(url, {

            timeout: 30000,

            headers: {

                "User-Agent": USER_AGENT,

                "Accept":
                    "text/html,application/xhtml+xml"

            }

        });

        const html = response.data;

        const $ = cheerio.load(html);

        const title = $("title").first().text().trim();

        console.log("PAGE TITLE:");

        console.log(title);

        return {

            success: true,

            url,

            title,

            html

        };

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            url,

            title: "",

            html: "",

            error: error.message

        };

    }

}