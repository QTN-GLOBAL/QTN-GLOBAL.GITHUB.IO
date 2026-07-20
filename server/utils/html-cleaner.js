/* ==========================================
   HTML CLEANER V2
========================================== */

import * as cheerio from "cheerio";

/* ==========================================
   CLEAN HTML
========================================== */

export function cleanHtml(html) {

    console.log("");

    console.log("========== HTML CLEAN ==========");

    const $ = cheerio.load(html);

    /* ==========================
       REMOVE USELESS TAGS
    ========================== */

    $(
        "script," +
        "style," +
        "noscript," +
        "iframe," +
        "svg," +
        "canvas," +
        "header," +
        "footer," +
        "nav," +
        "aside," +
        "form"
    ).remove();

    /* ==========================
       REMOVE COMMON BLOCKS
    ========================== */

    $(
        ".header," +
        ".footer," +
        ".menu," +
        ".navbar," +
        ".navigation," +
        ".sidebar," +
        ".popup," +
        ".modal," +
        ".banner," +
        ".advertisement," +
        ".ads," +
        ".social," +
        ".language-select," +
        ".header-top," +
        ".header-bot," +
        ".main-slide," +
        ".menu-product"
    ).remove();

    /* ==========================
       TRY FIND PRODUCT CONTENT
    ========================== */

    const selectors = [

        "article",

        "main",

        ".product-detail",

        ".product-content",

        ".product-info",

        ".product",

        ".entry-content",

        ".post-content",

        ".node-content",

        ".pane-content",

        ".content",

        "#content",

        "#main"

    ];

    let content = "";

    for (const selector of selectors) {

        const node = $(selector).first();

        if (node.length) {

            const html = node.html();

            if (html && html.length > 500) {

                console.log("FOUND:", selector);

                content = html;

                break;

            }

        }

    }

    /* ==========================
       FALLBACK
    ========================== */

    if (!content) {

        console.log("NO PRODUCT SELECTOR FOUND");

        content = $("body").html() || "";

    }

    /* ==========================
       NORMALIZE
    ========================== */

    content = content

        .replace(/\n+/g, "\n")

        .replace(/\t+/g, "")

        .replace(/\s{2,}/g, " ")

        .trim();

    console.log("");

    console.log("HTML LENGTH:", content.length);

    console.log("");

    console.log("========== HTML CLEAN DONE ==========");

    return content;

}