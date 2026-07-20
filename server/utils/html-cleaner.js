/* ==========================================
   HTML CLEANER
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
       REMOVE COMMON CLASSES
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
        ".ads"
    ).remove();

    /* ==========================
       MAIN CONTENT
    ========================== */

    let content = "";

    if ($("article").length) {

        content = $("article").first().html();

    }

    else if ($("main").length) {

        content = $("main").first().html();

    }

    else {

        content = $("body").html();

    }

    console.log("HTML CLEAN DONE");

    return content || "";

}